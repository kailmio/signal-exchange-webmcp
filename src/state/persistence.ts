import type { ActivityEntry, AppState, BoardContent } from "../domain/types";
import type { AppStore } from "./store";
import type { PersistedSlice } from "./reducer";

const STORAGE_KEY = "mission-deck:v2";
const STORAGE_VERSION = 2;

interface Envelope {
  version: number;
  board: AppState["board"];
  undoBoard: BoardContent | null;
  history: ActivityEntry[];
}

function isBoardContent(value: unknown): value is BoardContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<BoardContent>;
  return (
    typeof candidate.missionId === "string" &&
    (candidate.mode === "sample" || candidate.mode === "custom") &&
    typeof candidate.goal === "string" &&
    Array.isArray(candidate.cards) &&
    (typeof candidate.focusedCardId === "string" || candidate.focusedCardId === null)
  );
}

export function loadPersistedState(storage: Pick<Storage, "getItem"> = localStorage): PersistedSlice | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Envelope>;
    if (
      parsed.version !== STORAGE_VERSION ||
      !parsed.board ||
      typeof parsed.board.revision !== "number" ||
      !isBoardContent(parsed.board.content) ||
      !Array.isArray(parsed.history)
    ) {
      return null;
    }
    return {
      board: parsed.board,
      undoBoard: parsed.undoBoard && isBoardContent(parsed.undoBoard) ? parsed.undoBoard : null,
      history: parsed.history.slice(-20),
    };
  } catch {
    return null;
  }
}

export function attachPersistence(store: AppStore, storage: Pick<Storage, "setItem"> = localStorage): () => void {
  let lastRevision = store.getState().board.revision;
  return store.subscribe(() => {
    const state = store.getState();
    if (state.board.revision === lastRevision) return;
    lastRevision = state.board.revision;
    try {
      const envelope: Envelope = {
        version: STORAGE_VERSION,
        board: state.board,
        undoBoard: state.undoBoard,
        history: state.history.slice(-20),
      };
      storage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    } catch {
      store.dispatch({
        type: "SET_PERSISTENCE",
        persistence: "unavailable",
        notice: { tone: "error", text: "This session works, but committed changes cannot survive refresh." },
      });
    }
  });
}

export { STORAGE_KEY };
