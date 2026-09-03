import { describe, expect, it } from "vitest";
import { createInitialState } from "../state/reducer";
import { attachPersistence, loadPersistedState, STORAGE_KEY } from "../state/persistence";
import { createStore } from "../state/store";
import { CommandService } from "../domain/commands";

describe("persistence", () => {
  it("rejects corrupt and incompatible data", () => {
    expect(loadPersistedState({ getItem: () => "not-json" })).toBeNull();
    expect(loadPersistedState({ getItem: () => JSON.stringify({ version: 99 }) })).toBeNull();
  });

  it("persists committed state without a preview", () => {
    let saved = "";
    const storage = {
      getItem: (key: string) => (key === STORAGE_KEY ? saved : null),
      setItem: (_key: string, value: string) => {
        saved = value;
      },
    };
    const store = createStore(createInitialState());
    attachPersistence(store, storage);
    const service = new CommandService(store, { now: () => 100, id: () => "token" });
    const preview = service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "manual");
    expect(saved).toBe("");
    if (!preview.ok) throw new Error("preview should succeed");
    service.commitCardPlay(preview.data.token, "manual");
    expect(saved).not.toContain("proposedContent");
    const restored = loadPersistedState(storage);
    expect(restored?.board.content.cards.filter((card) => card.kind === "action")).toHaveLength(4);
  });
});
