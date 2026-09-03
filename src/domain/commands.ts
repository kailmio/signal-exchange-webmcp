import { createCustomContent, createSampleContent } from "./sampleMission";
import { getPowerAvailability, previewPower, recommendPower } from "./powers";
import type {
  ActivityEntry,
  AppState,
  CommandError,
  CommandResult,
  Origin,
  PendingPreview,
  PowerId,
} from "./types";
import type { AppStore } from "../state/store";

interface CommandDeps {
  now?: () => number;
  id?: () => string;
}

export class CommandService {
  private readonly now: () => number;
  private readonly id: () => string;

  constructor(private readonly store: AppStore, deps: CommandDeps = {}) {
    this.now = deps.now ?? Date.now;
    this.id = deps.id ?? (() => crypto.randomUUID());
  }

  private activity(origin: Origin, kind: ActivityEntry["kind"], summary: string, power?: PowerId): ActivityEntry {
    const history = this.store.getState().history;
    return {
      id: this.id(),
      sequence: (history.at(-1)?.sequence ?? 0) + 1,
      origin,
      kind,
      power,
      summary,
      createdAt: this.now(),
    };
  }

  private fail<T>(origin: Origin, commandError: CommandError): CommandResult<T> {
    this.store.dispatch({
      type: "ADD_ACTIVITY",
      entry: this.activity(origin, "error", commandError.message),
      notice: { tone: "error", text: `${commandError.message} ${commandError.nextAction}` },
    });
    return { ok: false, error: commandError };
  }

  inspect(origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    this.store.dispatch({
      type: "ADD_ACTIVITY",
      entry: this.activity(origin, "inspect", origin === "agent" ? "WebMCP · Board inspected" : "Board inspected"),
    });
    return {
      ok: true,
      data: {
        mission: state.board.content.goal,
        revision: state.board.revision,
        cards: state.board.content.cards,
        focusedCardId: state.board.content.focusedCardId,
        pendingPreview: state.preview
          ? { power: state.preview.power, outcomeTitle: state.preview.outcomeTitle, expiresAt: state.preview.expiresAt }
          : null,
        recentHistory: state.history.slice(-5),
      },
    };
  }

  listPowers(origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    const recommendation = recommendPower(state.board.content);
    this.store.dispatch({
      type: "SET_RECOMMENDATION",
      recommendation,
      entry: this.activity(origin, "recommend", `${origin === "agent" ? "WebMCP · " : ""}Recommend ${recommendation.power[0].toUpperCase()}${recommendation.power.slice(1)}`, recommendation.power),
    });
    return { ok: true, data: { powers: getPowerAvailability(state.board.content), recommendation } };
  }

  previewCardPlay(
    input: { power: PowerId; targetCardId?: string },
    origin: Origin = "agent",
  ): CommandResult<Omit<PendingPreview, "proposedContent"> & { committed: false }> {
    if (!(["forge", "focus", "wild"] as string[]).includes(input.power)) {
      return this.fail(origin, { code: "INVALID_INPUT", message: "Unknown power.", nextAction: "Choose Forge, Focus, or Wild." });
    }
    const state = this.store.getState();
    const proposal = previewPower(state.board.content, input.power, input.targetCardId);
    if (!proposal.ok) return this.fail(origin, proposal.error);
    const createdAt = this.now();
    const preview: PendingPreview = {
      token: this.id(),
      baseRevision: state.board.revision,
      origin,
      power: input.power,
      targetCardId: input.targetCardId,
      ...proposal.data,
      createdAt,
      expiresAt: createdAt + 5 * 60_000,
    };
    this.store.dispatch({
      type: "SET_PREVIEW",
      preview,
      entry: this.activity(origin, "preview", `${origin === "agent" ? "WebMCP · " : ""}Preview ${input.power[0].toUpperCase()}${input.power.slice(1)}`, input.power),
    });
    const { proposedContent: _proposedContent, ...publicPreview } = preview;
    return { ok: true, data: { ...publicPreview, committed: false } };
  }

  commitCardPlay(previewToken: string, origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    if (state.committing) return this.fail(origin, { code: "COMMIT_IN_PROGRESS", message: "A card is already committing.", nextAction: "Wait for the current commit to finish." });
    if (!state.preview) return this.fail(origin, { code: "PREVIEW_NOT_FOUND", message: "There is no active preview.", nextAction: "Preview a card before committing it." });
    if (state.preview.token !== previewToken) return this.fail(origin, { code: "PREVIEW_TOKEN_MISMATCH", message: "That preview is no longer active.", nextAction: "Inspect the current preview and use its token." });
    if (state.preview.baseRevision !== state.board.revision) return this.fail(origin, { code: "PREVIEW_STALE", message: "The board changed after this preview.", nextAction: "Create a fresh preview." });
    if (this.now() > state.preview.expiresAt) return this.fail(origin, { code: "PREVIEW_EXPIRED", message: "This preview expired.", nextAction: "Preview the card again." });

    this.store.dispatch({ type: "SET_COMMITTING", committing: true });
    const preview = this.store.getState().preview!;
    this.store.dispatch({
      type: "COMMIT_PREVIEW",
      preview,
      entry: this.activity(origin, "commit", `${origin === "agent" ? "WebMCP · " : ""}Commit ${preview.power[0].toUpperCase()}${preview.power.slice(1)}`, preview.power),
    });
    return {
      ok: true,
      data: {
        committed: true,
        revision: this.store.getState().board.revision,
        power: preview.power,
        outcomeTitle: preview.outcomeTitle,
        changes: preview.changes,
      },
    };
  }

  cancelPreview(origin: Origin = "manual"): CommandResult<{ cancelled: true }> {
    if (!this.store.getState().preview) return this.fail(origin, { code: "PREVIEW_NOT_FOUND", message: "There is no preview to cancel.", nextAction: "Choose a card to create one." });
    this.store.dispatch({ type: "CANCEL_PREVIEW", entry: this.activity(origin, "cancel", "Preview cancelled") });
    return { ok: true, data: { cancelled: true } };
  }

  undoLastPlay(origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    if (!state.undoBoard) return this.fail(origin, { code: "NOTHING_TO_UNDO", message: "Nothing is undoable yet.", nextAction: "Commit a card play first." });
    this.store.dispatch({
      type: "UNDO",
      restored: state.undoBoard,
      entry: this.activity(origin, "undo", `${origin === "agent" ? "WebMCP · " : ""}Undo latest card play`),
    });
    return { ok: true, data: { restored: true, revision: this.store.getState().board.revision } };
  }

  loadDemoMission(confirmReplace: boolean, origin: Origin = "agent"): CommandResult<Record<string, unknown>> {
    const state = this.store.getState();
    const fresh = createSampleContent();
    const changed = JSON.stringify(state.board.content) !== JSON.stringify(fresh);
    if (changed && !confirmReplace) return this.fail(origin, { code: "CONFIRMATION_REQUIRED", message: "Reset would replace modified work.", nextAction: "Call again with confirmReplace set to true." });
    this.store.dispatch({
      type: "RESET",
      content: fresh,
      entry: this.activity(origin, "reset", `${origin === "agent" ? "WebMCP · " : ""}Sample mission loaded`),
    });
    return { ok: true, data: { loaded: true, revision: this.store.getState().board.revision, mission: fresh.goal } };
  }

  createCustomMission(goal: string, ideas: string[]): CommandResult<Record<string, unknown>> {
    if (!goal.trim()) return this.fail("manual", { code: "INVALID_INPUT", message: "Mission goal cannot be empty.", nextAction: "Enter one short goal." });
    const content = createCustomContent(goal, ideas);
    this.store.dispatch({ type: "CREATE_CUSTOM", content, entry: this.activity("manual", "reset", "Custom mission created") });
    return { ok: true, data: { created: true, mission: content.goal } };
  }
}

export function snapshotForParity(state: AppState): unknown {
  return { board: state.board, undoBoard: state.undoBoard, preview: state.preview, recommendation: state.recommendation };
}
