import type { ActivityEntry, AppState, ExchangeContent } from "../domain/types";
import type { AppStore } from "./store";
import type { PersistedSlice } from "./reducer";

const STORAGE_KEY = "signal-exchange:v1";
const STORAGE_VERSION = 1;
interface Envelope { version: number; exchange: AppState["exchange"]; undoExchange: ExchangeContent | null; history: ActivityEntry[] }

function isExchangeContent(value: unknown): value is ExchangeContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ExchangeContent>;
  return typeof candidate.exchangeId === "string" && typeof candidate.walletCredits === "number" && Boolean(candidate.brief) && Array.isArray(candidate.offers) && Array.isArray(candidate.access);
}

export function loadPersistedState(storage: Pick<Storage, "getItem"> = localStorage): PersistedSlice | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Envelope>;
    if (parsed.version !== STORAGE_VERSION || !parsed.exchange || typeof parsed.exchange.revision !== "number" || !isExchangeContent(parsed.exchange.content) || !Array.isArray(parsed.history)) return null;
    return { exchange: parsed.exchange, undoExchange: parsed.undoExchange && isExchangeContent(parsed.undoExchange) ? parsed.undoExchange : null, history: parsed.history.slice(-20) };
  } catch { return null; }
}

export function attachPersistence(store: AppStore, storage: Pick<Storage, "setItem"> = localStorage): () => void {
  let lastRevision = store.getState().exchange.revision;
  return store.subscribe(() => {
    const state = store.getState();
    if (state.exchange.revision === lastRevision) return;
    lastRevision = state.exchange.revision;
    try { storage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, exchange: state.exchange, undoExchange: state.undoExchange, history: state.history.slice(-20) } satisfies Envelope)); }
    catch { store.dispatch({ type: "SET_PERSISTENCE", persistence: "unavailable", notice: { tone: "error", text: "This session works, but the committed rental cannot survive refresh." } }); }
  });
}

export { STORAGE_KEY };
