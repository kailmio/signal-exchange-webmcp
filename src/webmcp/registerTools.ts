import type { CommandService } from "../domain/commands";
import type { AppStore } from "../state/store";
import type { PowerId } from "../domain/types";
import { COMMIT_SCHEMA, EMPTY_SCHEMA, LOAD_DEMO_SCHEMA, PREVIEW_SCHEMA } from "./schemas";
import { toToolResult } from "./results";

export async function registerWebMcpTools(store: AppStore, commands: CommandService): Promise<() => void> {
  const context = document.modelContext;
  if (!context) {
    store.dispatch({ type: "SET_CONNECTION", connection: "manual" });
    return () => undefined;
  }

  const controller = new AbortController();
  try {
    await Promise.all([
      context.registerTool(
        {
          name: "inspect_mission_board",
          title: "Inspect mission board",
          description: "Read the current committed mission, visible cards, focus, preview status, and recent human-readable history. Use this first before recommending a power.",
          inputSchema: EMPTY_SCHEMA,
          annotations: { readOnlyHint: true },
          execute: () => toToolResult(commands.inspect("agent")),
        },
        { signal: controller.signal },
      ),
      context.registerTool(
        {
          name: "list_card_powers",
          title: "List card powers",
          description: "List Forge, Focus, and Wild with current availability, then return and visibly highlight the best contextual recommendation without changing the committed board.",
          inputSchema: EMPTY_SCHEMA,
          annotations: { readOnlyHint: true },
          execute: () => toToolResult(commands.listPowers("agent")),
        },
        { signal: controller.signal },
      ),
      context.registerTool(
        {
          name: "preview_card_play",
          title: "Preview a card play",
          description: "Prepare and display the exact effect of Forge, Focus, or Wild without changing committed board state. Forge requires a targetCardId from inspect_mission_board.",
          inputSchema: PREVIEW_SCHEMA,
          execute: ({ power, targetCardId }) =>
            toToolResult(commands.previewCardPlay({ power: power as PowerId, targetCardId }, "agent")),
        },
        { signal: controller.signal },
      ),
      context.registerTool(
        {
          name: "commit_card_play",
          title: "Commit the visible preview",
          description: "Apply only the exact active preview previously shown to the person. Requires its one-time preview token; never generates a replacement effect.",
          inputSchema: COMMIT_SCHEMA,
          execute: ({ previewToken }) => toToolResult(commands.commitCardPlay(previewToken, "agent")),
        },
        { signal: controller.signal },
      ),
      context.registerTool(
        {
          name: "undo_last_play",
          title: "Undo the latest card play",
          description: "Restore the board immediately before the latest committed Forge, Focus, or Wild play. Supports one level of undo.",
          inputSchema: EMPTY_SCHEMA,
          execute: () => toToolResult(commands.undoLastPlay("agent")),
        },
        { signal: controller.signal },
      ),
      context.registerTool(
        {
          name: "load_demo_mission",
          title: "Load the demo mission",
          description: "Restore the stable judge-ready sample mission. This creates a fresh baseline and clears preview and undo.",
          inputSchema: LOAD_DEMO_SCHEMA,
          execute: ({ confirmReplace }) => toToolResult(commands.loadDemoMission(confirmReplace, "agent")),
        },
        { signal: controller.signal },
      ),
    ]);
    store.dispatch({ type: "SET_CONNECTION", connection: "ready" });
  } catch {
    controller.abort();
    store.dispatch({ type: "SET_CONNECTION", connection: "manual" });
  }
  return () => controller.abort();
}
