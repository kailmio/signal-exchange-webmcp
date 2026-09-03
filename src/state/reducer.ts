import { createSampleExchange } from "../domain/sampleExchange";
import type { ActivityEntry, AppState, ExchangeContent, Notice, PendingDeal, Recommendation } from "../domain/types";

export type AppAction =
  | { type: "SET_CONNECTION"; connection: AppState["connection"] }
  | { type: "SET_PERSISTENCE"; persistence: AppState["persistence"]; notice?: Notice }
  | { type: "ADD_ACTIVITY"; entry: ActivityEntry; notice?: Notice }
  | { type: "SET_SEARCH"; offerIds: string[]; entry: ActivityEntry }
  | { type: "SET_RECOMMENDATION"; recommendation: Recommendation; entry: ActivityEntry }
  | { type: "SET_PREVIEW"; preview: PendingDeal; entry: ActivityEntry }
  | { type: "APPROVE_PREVIEW"; previewToken: string; entry: ActivityEntry }
  | { type: "CANCEL_PREVIEW"; entry: ActivityEntry }
  | { type: "SET_COMMITTING"; committing: boolean }
  | { type: "COMMIT_PREVIEW"; preview: PendingDeal; entry: ActivityEntry }
  | { type: "UNDO"; restored: ExchangeContent; entry: ActivityEntry }
  | { type: "RESET"; content: ExchangeContent; entry: ActivityEntry }
  | { type: "CLEAR_NOTICE" };

const INITIAL_HISTORY: ActivityEntry[] = [
  { id: "activity-market", sequence: 1, origin: "system", kind: "reset", summary: "Marketplace ready", detail: "3 verified data offers", createdAt: 1 },
  { id: "activity-agent", sequence: 2, origin: "system", kind: "search", summary: "Waiting for your agent", detail: "Goal and budget are set", createdAt: 2 },
];

export interface PersistedSlice { exchange: AppState["exchange"]; undoExchange: ExchangeContent | null; history: ActivityEntry[] }

export function createInitialState(persisted?: PersistedSlice | null): AppState {
  const content = persisted?.exchange.content ?? createSampleExchange();
  return { exchange: persisted?.exchange ?? { revision: 0, content }, undoExchange: persisted?.undoExchange ?? null, visibleOfferIds: content.offers.map((offer) => offer.id), recommendation: null, preview: null, approvedPreviewToken: null, history: persisted?.history?.slice(-20) ?? INITIAL_HISTORY, connection: "checking", persistence: "available", committing: false, notice: persisted ? { tone: "info", text: "Committed rental restored. Pending deal previews are never restored." } : null };
}

function append(history: ActivityEntry[], entry: ActivityEntry): ActivityEntry[] { return [...history, entry].slice(-20); }

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CONNECTION": return { ...state, connection: action.connection };
    case "SET_PERSISTENCE": return { ...state, persistence: action.persistence, notice: action.notice ?? state.notice };
    case "ADD_ACTIVITY": return { ...state, history: append(state.history, action.entry), notice: action.notice ?? state.notice };
    case "SET_SEARCH": return { ...state, visibleOfferIds: action.offerIds, recommendation: null, preview: null, approvedPreviewToken: null, history: append(state.history, action.entry), notice: { tone: "info", text: `${action.offerIds.length} matching offers are visible.` } };
    case "SET_RECOMMENDATION": return { ...state, recommendation: action.recommendation, history: append(state.history, action.entry), notice: { tone: "info", text: "Agent comparison complete. Review the recommended offer." } };
    case "SET_PREVIEW": return { ...state, preview: action.preview, approvedPreviewToken: null, history: append(state.history, action.entry), notice: { tone: "info", text: "Deal preview ready. No credits have been used." } };
    case "APPROVE_PREVIEW": return { ...state, approvedPreviewToken: action.previewToken, history: append(state.history, action.entry), notice: { tone: "success", text: "Exact deal approved. The agent may now commit this token." } };
    case "CANCEL_PREVIEW": return { ...state, preview: null, approvedPreviewToken: null, history: append(state.history, action.entry), notice: { tone: "info", text: "Deal cancelled. Wallet and access are unchanged." } };
    case "SET_COMMITTING": return { ...state, committing: action.committing };
    case "COMMIT_PREVIEW": return { ...state, undoExchange: state.exchange.content, exchange: { revision: state.exchange.revision + 1, content: action.preview.proposedContent }, preview: null, approvedPreviewToken: null, committing: false, history: append(state.history, action.entry), notice: { tone: "success", text: `${action.preview.durationDays}-day access unlocked for ${action.preview.agreedCredits} credits.` } };
    case "UNDO": return { ...state, exchange: { revision: state.exchange.revision + 1, content: action.restored }, undoExchange: null, preview: null, approvedPreviewToken: null, recommendation: null, history: append(state.history, action.entry), notice: { tone: "success", text: "Simulated deal reversed. Credits restored." } };
    case "RESET": return { ...state, exchange: { revision: state.exchange.revision + 1, content: action.content }, undoExchange: null, visibleOfferIds: action.content.offers.map((offer) => offer.id), recommendation: null, preview: null, approvedPreviewToken: null, history: append(state.history, action.entry), notice: { tone: "success", text: "Signal Exchange demo reset." } };
    case "CLEAR_NOTICE": return { ...state, notice: null };
    default: return state;
  }
}
