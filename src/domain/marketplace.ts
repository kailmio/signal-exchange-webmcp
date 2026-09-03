import { cloneExchangeContent } from "./sampleExchange";
import type { CommandError, DataOffer, ExchangeContent, PendingDeal, Recommendation } from "./types";

export type ProposalResult = { ok: true; data: Omit<PendingDeal, "token" | "baseRevision" | "origin" | "createdAt" | "expiresAt"> } | { ok: false; error: CommandError };

export function freshnessLabel(hours: number): string {
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

export function publicOffer(offer: DataOffer) {
  return { id: offer.id, title: offer.title, seller: offer.seller, description: offer.description, trustScore: offer.trustScore, freshness: freshnessLabel(offer.freshnessHours), formats: offer.formats, license: offer.license, coverage: offer.coverage, rowCount: offer.rowCount, sevenDayRentalCredits: offer.rentalCredits, sampleFields: offer.sampleFields };
}

export function searchOffers(content: ExchangeContent, query: string, maxCredits?: number): DataOffer[] {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  return content.offers.filter((offer) => {
    const haystack = `${offer.title} ${offer.seller} ${offer.description} ${offer.coverage} ${offer.formats.join(" ")}`.toLowerCase();
    return (terms.length === 0 || terms.some((term) => haystack.includes(term))) && (maxCredits === undefined || offer.rentalCredits <= maxCredits);
  });
}

function scoreOffer(offer: DataOffer, content: ExchangeContent): number {
  const freshness = Math.max(0, 30 - Math.min(30, offer.freshnessHours / 5));
  return offer.trustScore * 0.6 + freshness + (offer.rentalCredits <= content.brief.budgetCredits ? 12 : -30) + offer.formats.length * 2;
}

export function compareOffers(content: ExchangeContent, offerIds?: string[]): Recommendation | null {
  const candidates = content.offers.filter((offer) => !offerIds?.length || offerIds.includes(offer.id));
  const affordable = candidates.filter((offer) => offer.rentalCredits <= content.brief.budgetCredits);
  const ranked = [...(affordable.length ? affordable : candidates)].sort((a, b) => scoreOffer(b, content) - scoreOffer(a, content));
  const best = ranked[0];
  return best ? { offerId: best.id, comparedOfferIds: ranked.map((offer) => offer.id), reason: `${best.trustScore}% trust, updated ${freshnessLabel(best.freshnessHours)}, and ${best.rentalCredits} credits fits the ${content.brief.budgetCredits}-credit budget.` } : null;
}

export function previewDeal(content: ExchangeContent, input: { offerId: string; bidCredits: number; durationDays: number }, now: number): ProposalResult {
  const offer = content.offers.find((candidate) => candidate.id === input.offerId);
  if (!offer) return { ok: false, error: { code: "OFFER_NOT_FOUND", message: "That offer is not listed.", nextAction: "Inspect the exchange and choose a current offer ID." } };
  if (!Number.isFinite(input.bidCredits) || input.bidCredits <= 0) return { ok: false, error: { code: "INVALID_BID", message: "The bid must be a positive number of credits.", nextAction: "Submit a bid within the person's budget." } };
  if (input.durationDays !== 7) return { ok: false, error: { code: "INVALID_INPUT", message: "Demo offers use a fixed seven-day rental.", nextAction: "Set durationDays to 7." } };
  if (content.access.some((access) => access.offerId === offer.id)) return { ok: false, error: { code: "INVALID_INPUT", message: "This dataset is already unlocked.", nextAction: "Use the active rental or choose another offer." } };
  const agreedCredits = Math.min(offer.rentalCredits, Math.max(input.bidCredits, offer.minimumCredits));
  if (agreedCredits > content.brief.budgetCredits) return { ok: false, error: { code: "INVALID_BID", message: "The agreement exceeds the buyer's approved budget.", nextAction: "Choose an offer that fits the visible budget ceiling." } };
  if (agreedCredits > content.walletCredits) return { ok: false, error: { code: "INSUFFICIENT_CREDITS", message: "The wallet cannot cover this agreement.", nextAction: "Choose a lower-priced offer or reset the demo wallet." } };
  const negotiation = input.bidCredits < offer.minimumCredits ? "countered" : "accepted";
  const proposedContent = cloneExchangeContent(content);
  proposedContent.walletCredits -= agreedCredits;
  proposedContent.access = [...proposedContent.access.filter((access) => access.offerId !== offer.id), { offerId: offer.id, title: offer.title, seller: offer.seller, paidCredits: agreedCredits, durationDays: input.durationDays, grantedAt: now, sampleFields: [...offer.sampleFields] }];
  return { ok: true, data: { offerId: offer.id, offerTitle: offer.title, seller: offer.seller, bidCredits: input.bidCredits, agreedCredits, durationDays: input.durationDays, negotiation, outcomeTitle: negotiation === "countered" ? `Seller counters at ${agreedCredits} credits` : `Rental ready at ${agreedCredits} credits`, rationale: `${offer.title} is the strongest fit for the brief and remains below the ${content.brief.budgetCredits}-credit ceiling.`, changes: [{ label: "Wallet", before: `${content.walletCredits} credits`, after: `${proposedContent.walletCredits} credits` }, { label: "Access", before: "Locked", after: `${input.durationDays}-day commercial rental` }, { label: "Delivery", before: "Metadata only", after: offer.formats.join(" · ") }], proposedContent } };
}
