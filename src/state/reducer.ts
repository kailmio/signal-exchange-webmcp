import { createSampleContent } from "../domain/sampleMission";
import type {
  ActivityEntry,
  AppState,
  BoardContent,
  Notice,
  PendingPreview,
  Recommendation,
} from "../domain/types";

export type AppAction =
  | { type: "SET_CONNECTION"; connection: AppState["connection"] }
  | { type: "SET_PERSISTENCE"; persistence: AppState["persistence"]; notice?: Notice }
  | { type: "ADD_ACTIVITY"; entry: ActivityEntry; notice?: Notice }
  | { type: "SET_RECOMMENDATION"; recommendation: Recommendation; entry: ActivityEntry }
  | { type: "SET_PREVIEW"; preview: PendingPreview; entry: ActivityEntry }
  | { type: "CANCEL_PREVIEW"; entry: ActivityEntry }
  | { type: "SET_COMMITTING"; committing: boolean }
  | { type: "COMMIT_PREVIEW"; preview: PendingPreview; entry: ActivityEntry }
  | { type: "UNDO"; restored: BoardContent; entry: ActivityEntry }
  | { type: "RESET"; content: BoardContent; entry: ActivityEntry }
  | { type: "CREATE_CUSTOM"; content: BoardContent; entry: ActivityEntry }
  | { type: "CLEAR_NOTICE" };

const INITIAL_HISTORY: ActivityEntry[] = [
  {
    id: "activity-sample",
    sequence: 1,
    origin: "system",
    kind: "reset",
    summary: "Sample mission loaded",
    createdAt: 1,
  },
  {
    id: "activity-ready",
    sequence: 2,
    origin: "system",
    kind: "inspect",
    summary: "Board ready",
    createdAt: 2,
  },
];

export interface PersistedSlice {
  board: AppState["board"];
  undoBoard: BoardContent | null;
  history: ActivityEntry[];
}

export function createInitialState(persisted?: PersistedSlice | null): AppState {
  return {
    board: persisted?.board ?? { revision: 0, content: createSampleContent() },
    undoBoard: persisted?.undoBoard ?? null,
    preview: null,
    history: persisted?.history?.slice(-20) ?? INITIAL_HISTORY,
    recommendation: null,
    connection: "checking",
    persistence: "available",
    committing: false,
    notice: persisted
      ? { tone: "info", text: "Committed mission restored. Pending previews are never restored." }
      : null,
    lastChangedCardIds: [],
  };
}

function append(history: ActivityEntry[], entry: ActivityEntry): ActivityEntry[] {
  return [...history, entry].slice(-20);
}

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CONNECTION":
      return { ...state, connection: action.connection };
    case "SET_PERSISTENCE":
      return { ...state, persistence: action.persistence, notice: action.notice ?? state.notice };
    case "ADD_ACTIVITY":
      return { ...state, history: append(state.history, action.entry), notice: action.notice ?? state.notice };
    case "SET_RECOMMENDATION":
      return {
        ...state,
        recommendation: action.recommendation,
        history: append(state.history, action.entry),
      };
    case "SET_PREVIEW":
      return {
        ...state,
        preview: action.preview,
        recommendation: { power: action.preview.power, reason: action.preview.rationale },
        history: append(state.history, action.entry),
        notice: { tone: "info", text: "Preview ready. Nothing has changed yet." },
        lastChangedCardIds: [],
      };
    case "CANCEL_PREVIEW":
      return {
        ...state,
        preview: null,
        history: append(state.history, action.entry),
        notice: { tone: "info", text: "Preview cancelled. The board is unchanged." },
      };
    case "SET_COMMITTING":
      return { ...state, committing: action.committing };
    case "COMMIT_PREVIEW":
      return {
        ...state,
        undoBoard: state.board.content,
        board: { revision: state.board.revision + 1, content: action.preview.proposedContent },
        preview: null,
        committing: false,
        recommendation: null,
        history: append(state.history, action.entry),
        notice: { tone: "success", text: `${action.preview.power[0].toUpperCase()}${action.preview.power.slice(1)} committed.` },
        lastChangedCardIds: action.preview.changes.flatMap((change) => (change.cardId ? [change.cardId] : [])),
      };
    case "UNDO":
      return {
        ...state,
        board: { revision: state.board.revision + 1, content: action.restored },
        undoBoard: null,
        preview: null,
        recommendation: null,
        history: append(state.history, action.entry),
        notice: { tone: "success", text: "Latest card play undone." },
        lastChangedCardIds: [],
      };
    case "RESET":
    case "CREATE_CUSTOM":
      return {
        ...state,
        board: { revision: state.board.revision + 1, content: action.content },
        undoBoard: null,
        preview: null,
        recommendation: null,
        history: append(state.history, action.entry),
        notice: { tone: "success", text: action.type === "RESET" ? "Sample mission restored." : "Custom mission ready." },
        lastChangedCardIds: [],
      };
    case "CLEAR_NOTICE":
      return { ...state, notice: null };
    default:
      return state;
  }
}
