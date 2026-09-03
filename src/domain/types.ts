export type PowerId = "forge" | "focus";
export type Origin = "agent" | "manual" | "system";
export type CardKind = "idea" | "action";
export type CardStatus = "open" | "forged" | "focused";

export interface MissionCard {
  id: string;
  kind: CardKind;
  title: string;
  detail: string;
  completionCheck?: string;
  status: CardStatus;
  sourceCardId?: string;
}

export interface BoardContent {
  missionId: string;
  mode: "sample" | "custom";
  goal: string;
  cards: MissionCard[];
  focusedCardId: string | null;
}

export interface CommittedBoard {
  revision: number;
  content: BoardContent;
}

export interface ChangeSummary {
  kind: "add" | "update" | "focus";
  cardId?: string;
  label: string;
  before?: string;
  after?: string;
}

export interface PendingPreview {
  token: string;
  baseRevision: number;
  origin: Origin;
  power: PowerId;
  targetCardId?: string;
  outcomeKey?: string;
  outcomeTitle: string;
  rationale: string;
  changes: ChangeSummary[];
  proposedContent: BoardContent;
  createdAt: number;
  expiresAt: number;
}

export type ActivityKind =
  | "inspect"
  | "recommend"
  | "preview"
  | "commit"
  | "cancel"
  | "undo"
  | "reset"
  | "error";

export interface ActivityEntry {
  id: string;
  sequence: number;
  origin: Origin;
  kind: ActivityKind;
  power?: PowerId;
  summary: string;
  createdAt: number;
}

export interface Recommendation {
  power: PowerId;
  reason: string;
}

export interface Notice {
  tone: "info" | "success" | "error";
  text: string;
}

export interface AppState {
  board: CommittedBoard;
  undoBoard: BoardContent | null;
  preview: PendingPreview | null;
  history: ActivityEntry[];
  recommendation: Recommendation | null;
  connection: "checking" | "ready" | "manual";
  persistence: "available" | "unavailable";
  committing: boolean;
  notice: Notice | null;
  lastChangedCardIds: string[];
}

export type CommandErrorCode =
  | "POWER_UNAVAILABLE"
  | "TARGET_REQUIRED"
  | "TARGET_NOT_FOUND"
  | "PREVIEW_NOT_FOUND"
  | "PREVIEW_TOKEN_MISMATCH"
  | "PREVIEW_STALE"
  | "PREVIEW_EXPIRED"
  | "COMMIT_IN_PROGRESS"
  | "NOTHING_TO_UNDO"
  | "CONFIRMATION_REQUIRED"
  | "INVALID_INPUT";

export interface CommandError {
  code: CommandErrorCode;
  message: string;
  nextAction: string;
}

export type CommandResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: CommandError };

export interface PowerDefinition {
  id: PowerId;
  name: string;
  effect: string;
  accent: "amber" | "cyan";
}

export interface PowerAvailability extends PowerDefinition {
  available: boolean;
  reason?: string;
}

export interface PowerProposal {
  outcomeKey: string;
  outcomeTitle: string;
  rationale: string;
  changes: ChangeSummary[];
  proposedContent: BoardContent;
}
