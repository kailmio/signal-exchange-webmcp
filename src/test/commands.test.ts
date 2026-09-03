import { describe, expect, it } from "vitest";
import { CommandService } from "../domain/commands";
import { createInitialState } from "../state/reducer";
import { createStore } from "../state/store";

function harness(now = 1_000) {
  const store = createStore(createInitialState());
  let id = 0;
  const service = new CommandService(store, { now: () => now, id: () => `id-${++id}` });
  return { store, service };
}

describe("command safety", () => {
  it("previews without mutating, then commits exactly once", () => {
    const { store, service } = harness();
    const before = store.getState().board;
    const preview = service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "agent");
    expect(preview.ok).toBe(true);
    expect(store.getState().board).toEqual(before);
    if (!preview.ok) return;
    const committed = service.commitCardPlay(preview.data.token, "agent");
    expect(committed.ok).toBe(true);
    expect(store.getState().board.content.cards.filter((card) => card.kind === "action")).toHaveLength(4);
    const replay = service.commitCardPlay(preview.data.token, "agent");
    expect(replay.ok ? "" : replay.error.code).toBe("PREVIEW_NOT_FOUND");
  });

  it("rejects missing, mismatched, stale, and expired previews", () => {
    const missing = harness().service.commitCardPlay("none");
    expect(missing.ok ? "" : missing.error.code).toBe("PREVIEW_NOT_FOUND");

    const mismatchHarness = harness();
    mismatchHarness.service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" });
    const mismatch = mismatchHarness.service.commitCardPlay("wrong");
    expect(mismatch.ok ? "" : mismatch.error.code).toBe("PREVIEW_TOKEN_MISMATCH");

    const staleHarness = harness();
    staleHarness.service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" });
    const stalePreview = staleHarness.store.getState().preview!;
    staleHarness.store.dispatch({
      type: "SET_PREVIEW",
      preview: { ...stalePreview, baseRevision: stalePreview.baseRevision - 1 },
      entry: staleHarness.store.getState().history.at(-1)!,
    });
    const stale = staleHarness.service.commitCardPlay(stalePreview.token);
    expect(stale.ok ? "" : stale.error.code).toBe("PREVIEW_STALE");

    const expiredHarness = harness(999_999);
    expiredHarness.service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" });
    const expiredPreview = expiredHarness.store.getState().preview!;
    expiredHarness.store.dispatch({
      type: "SET_PREVIEW",
      preview: { ...expiredPreview, expiresAt: 0 },
      entry: expiredHarness.store.getState().history.at(-1)!,
    });
    const expired = expiredHarness.service.commitCardPlay(expiredPreview.token);
    expect(expired.ok ? "" : expired.error.code).toBe("PREVIEW_EXPIRED");
  });

  it("produces equivalent committed boards for manual and agent origins", () => {
    const manual = harness();
    const agent = harness();
    const manualPreview = manual.service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "manual");
    const agentPreview = agent.service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "agent");
    if (!manualPreview.ok || !agentPreview.ok) throw new Error("previews should succeed");
    manual.service.commitCardPlay(manualPreview.data.token, "manual");
    agent.service.commitCardPlay(agentPreview.data.token, "agent");
    expect(manual.store.getState().board).toEqual(agent.store.getState().board);
  });

  it("undoes one play and makes reset a new baseline", () => {
    const { store, service } = harness();
    const preview = service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "manual");
    if (!preview.ok) throw new Error("preview should succeed");
    service.commitCardPlay(preview.data.token, "manual");
    expect(store.getState().undoBoard).not.toBeNull();
    expect(service.undoLastPlay("manual").ok).toBe(true);
    expect(store.getState().undoBoard).toBeNull();
    service.previewCardPlay({ power: "forge", targetCardId: "idea-tangible" }, "manual");
    const token = store.getState().preview!.token;
    service.commitCardPlay(token, "manual");
    expect(service.loadDemoMission(true, "manual").ok).toBe(true);
    expect(store.getState().undoBoard).toBeNull();
  });
});
