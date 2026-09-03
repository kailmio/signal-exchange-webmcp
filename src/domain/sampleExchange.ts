import type { DataOffer, ExchangeContent } from "./types";

export const SAMPLE_OFFERS: DataOffer[] = [
  { id: "offer-metropulse", title: "MetroPulse Foot Traffic", seller: "CitySignal", description: "Hourly pedestrian counts near Sydney retail, transit, and public spaces.", trustScore: 98, freshnessHours: 2, formats: ["JSON", "CSV", "Parquet"], license: "Commercial · derived insights allowed", coverage: "Greater Sydney · 184 zones", rowCount: 12480, rentalCredits: 24, minimumCredits: 22, sampleFields: ["zone_id", "observed_at", "footfall", "confidence"] },
  { id: "offer-venuelens", title: "VenueLens Weekend Demand", seller: "VenueLens", description: "Weekend foot traffic and dwell-time signals around venues and entertainment precincts.", trustScore: 93, freshnessHours: 18, formats: ["JSON", "CSV"], license: "Commercial · no redistribution", coverage: "Sydney CBD · 76 venues", rowCount: 8420, rentalCredits: 32, minimumCredits: 29, sampleFields: ["venue_id", "time_window", "visits", "dwell_minutes"] },
  { id: "offer-retailflow", title: "RetailFlow Monthly Archive", seller: "RetailFlow", description: "Monthly retail-category footfall for historical trend and location comparisons.", trustScore: 90, freshnessHours: 144, formats: ["CSV", "Parquet"], license: "Commercial · attribution required", coverage: "NSW metro · 320 zones", rowCount: 48600, rentalCredits: 18, minimumCredits: 17, sampleFields: ["month", "postcode", "category", "visit_index"] },
];

export function cloneExchangeContent(content: ExchangeContent): ExchangeContent {
  return { ...content, brief: { ...content.brief }, offers: content.offers.map((offer) => ({ ...offer, formats: [...offer.formats], sampleFields: [...offer.sampleFields] })), access: content.access.map((access) => ({ ...access, sampleFields: [...access.sampleFields] })) };
}

export function createSampleExchange(): ExchangeContent {
  return cloneExchangeContent({ exchangeId: "signal-exchange-demo", walletCredits: 100, brief: { goal: "Choose a Sydney location for a weekend pop-up", query: "fresh Sydney retail foot traffic", budgetCredits: 40, durationDays: 7 }, offers: SAMPLE_OFFERS, access: [] });
}
