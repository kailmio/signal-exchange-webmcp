import { describe, expect, it } from "vitest";
import { CommandService } from "../domain/commands";
import { createInitialState } from "../state/reducer";
import { attachPersistence, loadPersistedState, STORAGE_KEY } from "../state/persistence";
import { createStore } from "../state/store";

describe("exchange persistence", () => {
  it("rejects corrupt or incompatible data", () => { expect(loadPersistedState({ getItem: () => "bad-json" })).toBeNull(); expect(loadPersistedState({ getItem: () => JSON.stringify({ version: 99 }) })).toBeNull(); });
  it("persists access and wallet but never pending deal content", () => { let saved = ""; const storage = { getItem: (key: string) => key === STORAGE_KEY ? saved : null, setItem: (_key: string, value: string) => { saved = value; } }; const store = createStore(createInitialState()); attachPersistence(store, storage); const service = new CommandService(store, { now: () => 100, id: () => "token" }); const preview = service.previewDataDeal({ offerId: "offer-metropulse", bidCredits: 20, durationDays: 7 }, "manual"); expect(saved).toBe(""); if (!preview.ok) throw new Error("preview should succeed"); service.approveVisibleDeal("manual"); service.commitDataDeal(preview.data.token, "manual"); expect(saved).not.toContain("proposedContent"); expect(saved).not.toContain("approvedPreviewToken"); const restored = loadPersistedState(storage); expect(restored?.exchange.content.walletCredits).toBe(78); expect(restored?.exchange.content.access[0].offerId).toBe("offer-metropulse"); });
});
