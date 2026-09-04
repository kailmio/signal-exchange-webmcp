export type Origin = "agent" | "manual" | "system";
export type DataFormat = "JSON" | "CSV" | "Parquet";
export type SampleRow = Record<string, string | number | boolean | null>;
export interface PublishOfferInput {
  title: string; seller: string; description: string; coverage: string; source: string;
  license: string; rentalCredits: number; minimumCredits: number; sampleRowsJson: string; confirmPublish: boolean;
}

export interface DataOffer {
  id: string;
  title: string;
  seller: string;
  description: string;
  trustScore: number;
  freshnessHours: number;
  formats: DataFormat[];
  license: string;
  coverage: string;
  rowCount: number;
  rentalCredits: number;
  minimumCredits: number;
  sampleFields: string[];
  source: string;
  sampleRows: SampleRow[];
  publishedBy: Origin;
  sellerEarnings: number;
}

export interface BuyerBrief { goal: string; query: string; budgetCredits: number; durationDays: number }
export interface DataAccess { offerId: string; title: string; seller: string; paidCredits: number; durationDays: number; grantedAt: number; expiresAt: number; license: string; sampleFields: string[] }
export interface ExchangeContent { exchangeId: string; walletCredits: number; brief: BuyerBrief; offers: DataOffer[]; access: DataAccess[] }
export interface CommittedExchange { revision: number; content: ExchangeContent }
export interface DealChange { label: string; before?: string; after: string }

export interface PendingDeal {
  token: string;
  baseRevision: number;
  origin: Origin;
  offerId: string;
  offerTitle: string;
  seller: string;
  license: string;
  bidCredits: number;
  agreedCredits: number;
  durationDays: number;
  negotiation: "accepted" | "countered";
  outcomeTitle: string;
  rationale: string;
  changes: DealChange[];
  proposedContent: ExchangeContent;
  createdAt: number;
  expiresAt: number;
}

export type ActivityKind = "publish" | "search" | "compare" | "preview" | "approve" | "commit" | "cancel" | "undo" | "reset" | "error";
export interface ActivityEntry { id: string; sequence: number; origin: Origin; kind: ActivityKind; summary: string; detail?: string; createdAt: number }
export interface Recommendation { offerId: string; reason: string; comparedOfferIds: string[] }
export interface Notice { tone: "info" | "success" | "error"; text: string }

export interface AppState {
  exchange: CommittedExchange;
  undoExchange: ExchangeContent | null;
  visibleOfferIds: string[];
  searchQuery: string;
  searchMaxCredits: number;
  recommendation: Recommendation | null;
  preview: PendingDeal | null;
  approvedPreviewToken: string | null;
  history: ActivityEntry[];
  connection: "checking" | "ready" | "manual";
  persistence: "available" | "unavailable";
  committing: boolean;
  notice: Notice | null;
}

export type CommandErrorCode = "ACCESS_REQUIRED" | "ACCESS_EXPIRED" | "OFFER_NOT_FOUND" | "NO_OFFERS" | "INVALID_BID" | "INSUFFICIENT_CREDITS" | "HUMAN_APPROVAL_REQUIRED" | "PREVIEW_NOT_FOUND" | "PREVIEW_TOKEN_MISMATCH" | "PREVIEW_STALE" | "PREVIEW_EXPIRED" | "COMMIT_IN_PROGRESS" | "NOTHING_TO_UNDO" | "CONFIRMATION_REQUIRED" | "INVALID_INPUT";
export interface CommandError { code: CommandErrorCode; message: string; nextAction: string }
export type CommandResult<T> = { ok: true; data: T } | { ok: false; error: CommandError };
