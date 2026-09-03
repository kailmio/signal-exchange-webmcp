import { useSyncExternalStore } from "react";
import type { AppState } from "../domain/types";
import { reducer, type AppAction } from "./reducer";

export interface AppStore {
  getState: () => AppState;
  dispatch: (action: AppAction) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createStore(initialState: AppState): AppStore {
  let state = initialState;
  const listeners = new Set<() => void>();
  return {
    getState: () => state,
    dispatch: (action) => {
      const next = reducer(state, action);
      if (next === state) return;
      state = next;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useAppState(store: AppStore): AppState {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
