import { CommandService } from "./domain/commands";
import { loadPersistedState, attachPersistence } from "./state/persistence";
import { createInitialState } from "./state/reducer";
import { createStore } from "./state/store";

export const appStore = createStore(createInitialState(loadPersistedState()));
export const commands = new CommandService(appStore);
attachPersistence(appStore);
