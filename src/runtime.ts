import { CommandService } from "./domain/commands";
import { loadPersistedState, attachPersistence, STORAGE_KEY } from "./state/persistence";
import { createInitialState } from "./state/reducer";
import { createStore } from "./state/store";

const persisted = loadPersistedState();
const initialState = createInitialState(persisted);
try {
  if (!persisted && localStorage.getItem(STORAGE_KEY)) {
    initialState.notice = { tone: "error", text: "Saved data was incompatible, so the exchange demo was restored safely." };
  }
} catch {
  initialState.persistence = "unavailable";
}

export const appStore = createStore(initialState);
export const commands = new CommandService(appStore);
attachPersistence(appStore);
