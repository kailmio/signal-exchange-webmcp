import { describe, expect, it } from "vitest";
import { CommandService } from "../domain/commands";
import { parseSampleRows, serializeRows } from "../domain/dataDelivery";
import type { CommandResult, PublishOfferInput } from "../domain/types";
import { createInitialState } from "../state/reducer";
import { createStore } from "../state/store";
import { attachPersistence, loadPersistedState } from "../state/persistence";

const example: PublishOfferInput = { title: "Laneway Signals", seller: "Local Research", description: "Synthetic weekend foot traffic", coverage: "Sydney Newtown", source: "Synthetic test fixture, not observed data", license: "Evaluation only; no redistribution", rentalCredits: 24, minimumCredits: 22, sampleRowsJson: JSON.stringify([{ zone: "Newtown", visits: 420 }, { zone: "Surry Hills", visits: 310 }]), confirmPublish: true };
function harness() { let time = 1000; let id = 0; const store = createStore(createInitialState()); const service = new CommandService(store, { now: () => time, id: () => `test-${++id}` }); return { store, service, clock: (value: number) => { time = value; } }; }
function success<T>(result: CommandResult<T>): T { if (!result.ok) throw new Error(result.error.message); return result.data; }
function errorCode(result: CommandResult<unknown>) { return result.ok ? "" : result.error.code; }
function rent(service: CommandService, offerId: string) { const preview = success(service.previewDataDeal({ offerId, bidCredits: 20, durationDays: 7 })); success(service.approveVisibleDeal()); success(service.commitDataDeal(preview.token)); }

describe("two-sided data trading", () => {
  it("publishes, discovers, inspects, negotiates and delivers a real sample", () => {
    const { store, service } = harness();
    const offer = success(service.publishDataOffer(example, "manual"));
    expect(offer.publishedBy).toBe("manual"); expect(store.getState().exchange.revision).toBe(1);
    expect(success(service.searchDataOffers({ query: "Laneway", maxCredits: 40 })).count).toBe(1);
    expect(store.getState()).toMatchObject({ searchQuery: "Laneway", searchMaxCredits: 40 });
    expect(success(service.compareDataOffers()).selectedOffer).toMatchObject({ id: offer.id });
    expect(success(service.inspectDataOffer(offer.id)).publicSample).toHaveLength(1);
    expect(errorCode(service.readRentedData(offer.id))).toBe("ACCESS_REQUIRED");
    const preview = success(service.previewDataDeal({ offerId: offer.id, bidCredits: 20, durationDays: 7 }));
    expect(preview.license).toBe(example.license); expect(preview.agreedCredits).toBe(22);
    expect(errorCode(service.commitDataDeal(preview.token))).toBe("HUMAN_APPROVAL_REQUIRED");
    expect(errorCode(service.readRentedData(offer.id))).toBe("ACCESS_REQUIRED");
    success(service.approveVisibleDeal()); success(service.commitDataDeal(preview.token));
    const delivery = success(service.readRentedData(offer.id));
    expect(JSON.parse(delivery.content)).toEqual(JSON.parse(example.sampleRowsJson));
    expect(delivery.manifest).toMatchObject({ source: example.source, license: example.license, rowCount: 2 });
    expect(store.getState().exchange.content.walletCredits).toBe(78);
    expect(store.getState().exchange.content.offers.find((item) => item.id === offer.id)?.sellerEarnings).toBe(22);
    success(service.undoLastDeal()); expect(errorCode(service.readRentedData(offer.id))).toBe("ACCESS_REQUIRED");
    expect(store.getState().exchange.content.walletCredits).toBe(100);
    expect(store.getState().exchange.content.offers.find((item) => item.id === offer.id)?.sellerEarnings).toBe(0);
  });
  it("keeps person and agent publishing/data paths equivalent except attribution", () => {
    const manual = harness(), agent = harness();
    const a = success(manual.service.publishDataOffer(example, "manual"));
    const b = success(agent.service.publishDataOffer(example, "agent"));
    expect({ ...a, publishedBy: "agent" }).toEqual(b);
    rent(manual.service, a.id); rent(agent.service, b.id);
    expect(manual.service.readRentedData(a.id)).toEqual(agent.service.readRentedData(b.id));
    expect(agent.store.getState().history.find((item) => item.kind === "publish")?.origin).toBe("agent");
  });
  it("read-only inspection/delivery leave state untouched, including failures", () => {
    const { store, service } = harness(); const before = store.getState();
    service.inspectDataOffer("missing"); service.inspectDataOffer("offer-metropulse"); service.readRentedData("offer-metropulse");
    expect(store.getState()).toBe(before); rent(service, "offer-metropulse");
    const rented = store.getState(); service.readRentedData("offer-metropulse", "CSV"); expect(store.getState()).toBe(rented);
  });
  it("denies agent approval impersonation", () => { const { service } = harness(); service.previewDataDeal({ offerId: "offer-metropulse", bidCredits: 20, durationDays: 7 }); expect(errorCode(service.approveVisibleDeal("agent"))).toBe("HUMAN_APPROVAL_REQUIRED"); });
  it("rejects expired delivery and permits a new rental after expiry", () => {
    const { store, service, clock } = harness(); rent(service, "offer-metropulse");
    clock(store.getState().exchange.content.access[0].expiresAt);
    expect(errorCode(service.readRentedData("offer-metropulse"))).toBe("ACCESS_EXPIRED");
    expect(service.previewDataDeal({ offerId: "offer-metropulse", bidCredits: 20, durationDays: 7 }).ok).toBe(true);
  });
  it("preserves later published offers while reversing both sides of a deal", () => {
    const { store, service } = harness(); rent(service, "offer-metropulse");
    const added = success(service.publishDataOffer(example)); success(service.undoLastDeal());
    expect(store.getState().exchange.content.offers.some((offer) => offer.id === added.id)).toBe(true);
    expect(store.getState().exchange.content.offers[0].sellerEarnings).toBe(0);
    expect(store.getState().exchange.content.walletCredits).toBe(100);
  });
  it("invalidates pending approval when publishing changes the exchange", () => {
    const { store, service } = harness(); const deal = success(service.previewDataDeal({ offerId: "offer-metropulse", bidCredits: 20, durationDays: 7 }));
    service.approveVisibleDeal(); service.publishDataOffer(example);
    expect(store.getState().approvedPreviewToken).toBeNull(); expect(service.commitDataDeal(deal.token).ok).toBe(false);
  });
  it("requires publishing permission and validates metadata, samples and prices", () => {
    const { store, service } = harness();
    for (const change of [{ confirmPublish: false }, { source: "" }, { title: "x".repeat(81) }, { minimumCredits: 25 }, { rentalCredits: NaN }, { minimumCredits: 1.5 }, { sampleRowsJson: "[]" }, { sampleRowsJson: '[{"x":1},{"y":2}]' }]) expect(service.publishDataOffer({ ...example, ...change }).ok).toBe(false);
    expect(store.getState().exchange.content.offers).toHaveLength(3); expect(store.getState().exchange.revision).toBe(0);
  });
  it("rejects oversized, nested, prototype and inconsistent samples", () => {
    for (const input of ['[{"constructor":1},{"constructor":2}]', '[{"x":{}},{"x":{}}]', JSON.stringify(Array.from({ length: 51 }, () => ({ x: 1 }))), ' '.repeat(20001), '[{"x":1},null]']) expect(parseSampleRows(input)).toBeNull();
  });
  it("CSV escapes quotes, commas and formula-leading strings", () => {
    const csv = serializeRows(["value"], [{ value: '=HYPERLINK("https://example.com")' }, { value: "  +SUM(1,2)" }, { value: 'one,"two"' }], "CSV");
    expect(csv).toContain('"\'=HYPERLINK(""https://example.com"")"');
    expect(csv).toContain('"\'  +SUM(1,2)"'); expect(csv).toContain('"one,""two"""');
  });
  it("persists published rows, exact license, proceeds and access without approvals", () => {
    const { store, service } = harness(); let saved = ""; attachPersistence(store, { setItem: (_key, value) => { saved = value; } });
    const offer = success(service.publishDataOffer(example)); rent(service, offer.id);
    const restored = loadPersistedState({ getItem: () => saved }); expect(restored?.exchange.content).toEqual(store.getState().exchange.content);
    expect(saved).not.toContain("approvedPreviewToken"); expect(saved).not.toContain("proposedContent");
    const corrupt = JSON.parse(saved); corrupt.exchange.content.offers[0].sampleRows = [null]; expect(loadPersistedState({ getItem: () => JSON.stringify(corrupt) })).toBeNull();
  });
  it("clears visible results for an empty search and does not compare hidden offers", () => {
    const { store, service } = harness(); expect(success(service.searchDataOffers({ query: "zzznomatch" })).count).toBe(0);
    expect(store.getState().visibleOfferIds).toEqual([]); expect(service.compareDataOffers().ok).toBe(false);
  });
  it("requires confirmation before resetting seller listings", () => { const { store, service } = harness(); service.publishDataOffer(example); expect(errorCode(service.loadDemoExchange(false))).toBe("CONFIRMATION_REQUIRED"); expect(store.getState().exchange.content.offers).toHaveLength(4); });
  it("rejects fractional bids and unsupported delivery formats", () => { const { service } = harness(); expect(service.previewDataDeal({ offerId: "offer-metropulse", bidCredits: 20.5, durationDays: 7 }).ok).toBe(false); expect(errorCode(service.readRentedData("offer-metropulse", "Parquet" as "JSON"))).toBe("INVALID_INPUT"); });
});
