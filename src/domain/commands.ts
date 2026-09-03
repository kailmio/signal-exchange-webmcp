import { compareOffers, previewDeal, publicOffer, searchOffers } from "./marketplace";
import { createSampleExchange } from "./sampleExchange";
import type { ActivityEntry, AppState, CommandError, CommandResult, Origin, PendingDeal } from "./types";
import type { AppStore } from "../state/store";

interface CommandDeps { now?: () => number; id?: () => string }

export class CommandService {
  private readonly now: () => number;
  private readonly id: () => string;
  constructor(private readonly store: AppStore, deps: CommandDeps = {}) { this.now = deps.now ?? Date.now; this.id = deps.id ?? (() => crypto.randomUUID()); }
  private activity(origin: Origin, kind: ActivityEntry["kind"], summary: string, detail?: string): ActivityEntry { return { id: this.id(), sequence: (this.store.getState().history.at(-1)?.sequence ?? 0) + 1, origin, kind, summary, detail, createdAt: this.now() }; }
  private fail<T>(origin: Origin, error: CommandError): CommandResult<T> { this.store.dispatch({ type: "ADD_ACTIVITY", entry: this.activity(origin, "error", error.message), notice: { tone: "error", text: `${error.message} ${error.nextAction}` } }); return { ok: false, error }; }

  inspectExchange(): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    return { ok: true, data: { revision: state.exchange.revision, walletCredits: state.exchange.content.walletCredits, brief: state.exchange.content.brief, offers: state.exchange.content.offers.map(publicOffer), recommendation: state.recommendation, pendingDeal: state.preview ? { offerId: state.preview.offerId, outcomeTitle: state.preview.outcomeTitle, agreedCredits: state.preview.agreedCredits, expiresAt: state.preview.expiresAt, humanApproved: state.approvedPreviewToken === state.preview.token } : null, activeAccess: state.exchange.content.access, recentActivity: state.history.slice(-5) } };
  }

  searchDataOffers(input: { query: string; maxCredits?: number }, origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const offers = searchOffers(this.store.getState().exchange.content, input.query, input.maxCredits);
    if (!offers.length) return this.fail(origin, { code: "NO_OFFERS", message: "No offers match that search.", nextAction: "Broaden the query or raise the credit ceiling." });
    this.store.dispatch({ type: "SET_SEARCH", offerIds: offers.map((offer) => offer.id), entry: this.activity(origin, "search", `${origin === "agent" ? "WebMCP · " : ""}${offers.length} offers found`, input.query) });
    return { ok: true, data: { query: input.query, count: offers.length, offers: offers.map(publicOffer) } };
  }

  compareDataOffers(offerIds?: string[], origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    const content = state.exchange.content;
    const recommendation = compareOffers(content, offerIds ?? state.visibleOfferIds);
    if (!recommendation) return this.fail(origin, { code: "NO_OFFERS", message: "There are no offers to compare.", nextAction: "Search the exchange first." });
    const offer = content.offers.find((candidate) => candidate.id === recommendation.offerId)!;
    this.store.dispatch({ type: "SET_RECOMMENDATION", recommendation, entry: this.activity(origin, "compare", `${origin === "agent" ? "WebMCP · " : ""}${offer.title} recommended`, recommendation.reason) });
    return { ok: true, data: { recommendation, selectedOffer: publicOffer(offer) } };
  }

  previewDataDeal(input: { offerId: string; bidCredits: number; durationDays: number }, origin: Origin = "agent"): CommandResult<Omit<PendingDeal, "proposedContent"> & { committed: false }> {
    const state = this.store.getState();
    const proposal = previewDeal(state.exchange.content, input, this.now());
    if (!proposal.ok) return this.fail(origin, proposal.error);
    const createdAt = this.now();
    const preview: PendingDeal = { token: this.id(), baseRevision: state.exchange.revision, origin, ...proposal.data, createdAt, expiresAt: createdAt + 5 * 60_000 };
    this.store.dispatch({ type: "SET_PREVIEW", preview, entry: this.activity(origin, "preview", `${origin === "agent" ? "WebMCP · " : ""}Deal previewed`, `${preview.offerTitle} · ${preview.agreedCredits} credits`) });
    const { proposedContent: _proposedContent, ...publicPreview } = preview;
    return { ok: true, data: { ...publicPreview, committed: false } };
  }

  approveVisibleDeal(origin: Origin = "manual"): CommandResult<{ approved: true; previewToken: string }> {
    const preview = this.store.getState().preview;
    if (!preview) return this.fail(origin, { code: "PREVIEW_NOT_FOUND", message: "There is no visible deal to approve.", nextAction: "Preview a deal first." });
    this.store.dispatch({ type: "APPROVE_PREVIEW", previewToken: preview.token, entry: this.activity(origin, "approve", "Person approved exact deal", `${preview.offerTitle} · ${preview.agreedCredits} credits`) });
    return { ok: true, data: { approved: true, previewToken: preview.token } };
  }

  commitDataDeal(previewToken: string, origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    if (state.committing) return this.fail(origin, { code: "COMMIT_IN_PROGRESS", message: "A deal is already committing.", nextAction: "Wait for it to finish." });
    if (!state.preview) return this.fail(origin, { code: "PREVIEW_NOT_FOUND", message: "There is no active deal preview.", nextAction: "Preview a deal before committing it." });
    if (state.preview.token !== previewToken) return this.fail(origin, { code: "PREVIEW_TOKEN_MISMATCH", message: "That deal preview is no longer active.", nextAction: "Use the token from the visible preview." });
    if (state.approvedPreviewToken !== previewToken) return this.fail(origin, { code: "HUMAN_APPROVAL_REQUIRED", message: "The visible deal has not been approved by the person.", nextAction: "Ask the person to click Approve exact deal before committing." });
    if (state.preview.baseRevision !== state.exchange.revision) return this.fail(origin, { code: "PREVIEW_STALE", message: "The exchange changed after this preview.", nextAction: "Create a fresh deal preview." });
    if (this.now() > state.preview.expiresAt) return this.fail(origin, { code: "PREVIEW_EXPIRED", message: "This deal preview expired.", nextAction: "Negotiate the deal again." });
    this.store.dispatch({ type: "SET_COMMITTING", committing: true });
    const preview = this.store.getState().preview!;
    this.store.dispatch({ type: "COMMIT_PREVIEW", preview, entry: this.activity(origin, "commit", `${origin === "agent" ? "WebMCP · " : ""}Rental unlocked`, `${preview.offerTitle} · ${preview.agreedCredits} credits`) });
    return { ok: true, data: { committed: true, revision: this.store.getState().exchange.revision, offerId: preview.offerId, paidCredits: preview.agreedCredits, durationDays: preview.durationDays, access: this.store.getState().exchange.content.access.find((access) => access.offerId === preview.offerId) } };
  }

  cancelPreview(origin: Origin = "manual"): CommandResult<{ cancelled: true }> {
    if (!this.store.getState().preview) return this.fail(origin, { code: "PREVIEW_NOT_FOUND", message: "There is no deal preview to cancel.", nextAction: "Choose an offer first." });
    this.store.dispatch({ type: "CANCEL_PREVIEW", entry: this.activity(origin, "cancel", "Deal preview cancelled") });
    return { ok: true, data: { cancelled: true } };
  }

  undoLastDeal(origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    if (!state.undoExchange) return this.fail(origin, { code: "NOTHING_TO_UNDO", message: "There is no simulated deal to undo.", nextAction: "Commit a rental first." });
    this.store.dispatch({ type: "UNDO", restored: state.undoExchange, entry: this.activity(origin, "undo", `${origin === "agent" ? "WebMCP · " : ""}Latest deal reversed`, "Credits restored and access revoked") });
    return { ok: true, data: { restored: true, revision: this.store.getState().exchange.revision, walletCredits: this.store.getState().exchange.content.walletCredits } };
  }

  loadDemoExchange(confirmReplace: boolean, origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    const fresh = createSampleExchange();
    if (JSON.stringify(state.exchange.content) !== JSON.stringify(fresh) && !confirmReplace) return this.fail(origin, { code: "CONFIRMATION_REQUIRED", message: "Reset would replace the current simulated deal.", nextAction: "Call again with confirmReplace set to true." });
    this.store.dispatch({ type: "RESET", content: fresh, entry: this.activity(origin, "reset", `${origin === "agent" ? "WebMCP · " : ""}Exchange demo reset`) });
    return { ok: true, data: { loaded: true, revision: this.store.getState().exchange.revision, brief: fresh.brief, walletCredits: fresh.walletCredits } };
  }
}

export function snapshotForParity(state: AppState): unknown { return { exchange: state.exchange, undoExchange: state.undoExchange, preview: state.preview, approvedPreviewToken: state.approvedPreviewToken, recommendation: state.recommendation }; }
