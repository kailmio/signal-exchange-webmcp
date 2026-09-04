import type { ActivityEntry, AppState, DataOffer, ExchangeContent } from "../domain/types";
import { parseSampleRows } from "../domain/dataDelivery";
import type { AppStore } from "./store";
import type { PersistedSlice } from "./reducer";

// Retain v1 storage untouched; the new delivery schema uses a separate namespace.
const STORAGE_KEY = "signal-exchange:v2";
const STORAGE_VERSION = 2;
interface Envelope { version: number; exchange: AppState["exchange"]; undoExchange: ExchangeContent | null; history: ActivityEntry[] }

function isExchangeContent(value: unknown): value is ExchangeContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ExchangeContent>;
  return typeof candidate.exchangeId === "string" && Number.isInteger(candidate.walletCredits) && candidate.walletCredits! >= 0
    && Boolean(candidate.brief && typeof candidate.brief.goal === "string" && typeof candidate.brief.query === "string" && Number.isFinite(candidate.brief.budgetCredits) && candidate.brief.durationDays === 7)
    && Array.isArray(candidate.offers) && candidate.offers.length > 0 && candidate.offers.length <= 20 && candidate.offers.every(isOffer)
    && new Set(candidate.offers.map((offer) => offer.id)).size === candidate.offers.length
    && Array.isArray(candidate.access) && candidate.access.every((access) => access && candidate.offers!.some((offer) => offer.id === access.offerId)
      && typeof access.title === "string" && typeof access.seller === "string" && Number.isFinite(access.paidCredits)
      && access.durationDays === 7 && Number.isFinite(access.grantedAt) && Number.isFinite(access.expiresAt)
      && typeof access.license === "string" && Array.isArray(access.sampleFields) && access.sampleFields.every((field) => typeof field === "string"));
}

function isOffer(value: unknown): value is DataOffer {
  if (!value || typeof value !== "object") return false;
  const offer = value as DataOffer;
  return [offer.id, offer.title, offer.seller, offer.description, offer.coverage, offer.source, offer.license].every((field) => typeof field === "string" && field.length <= 400)
    && [offer.rentalCredits, offer.minimumCredits].every((price) => Number.isInteger(price) && price > 0 && price <= 100) && offer.minimumCredits <= offer.rentalCredits
    && Number.isFinite(offer.trustScore) && Number.isFinite(offer.freshnessHours) && Number.isInteger(offer.rowCount)
    && Number.isInteger(offer.sellerEarnings) && offer.sellerEarnings >= 0 && ["manual", "agent", "system"].includes(offer.publishedBy)
    && Array.isArray(offer.formats) && offer.formats.length > 0 && offer.formats.every((format) => ["JSON", "CSV", "Parquet"].includes(format))
    && Boolean(parseSampleRows(JSON.stringify(offer.sampleRows))) && Array.isArray(offer.sampleFields)
    && JSON.stringify(offer.sampleFields) === JSON.stringify(Object.keys(offer.sampleRows[0]));
}

export function loadPersistedState(storage: Pick<Storage, "getItem"> = localStorage): PersistedSlice | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw || raw.length > 1_000_000) return null;
    const parsed = JSON.parse(raw) as Partial<Envelope>;
    if (parsed.version !== STORAGE_VERSION || !parsed.exchange || !Number.isInteger(parsed.exchange.revision) || !isExchangeContent(parsed.exchange.content) || !Array.isArray(parsed.history)
      || !parsed.history.every((entry) => entry && typeof entry.id === "string" && typeof entry.summary === "string" && (entry.detail === undefined || typeof entry.detail === "string") && Number.isFinite(entry.createdAt) && Number.isInteger(entry.sequence) && ["manual", "agent", "system"].includes(entry.origin))) return null;
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
