import { afterEach, describe, expect, it } from "vitest";
import { CommandService } from "../domain/commands";
import { createInitialState } from "../state/reducer";
import { createStore } from "../state/store";
import { registerWebMcpTools } from "../webmcp/registerTools";

interface CapturedRegistration {
  tool: WebMCP.ModelContextTool;
  signal?: AbortSignal;
}

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");

function installDocument(modelContext?: WebMCP.ModelContext) {
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { modelContext },
  });
}

afterEach(() => {
  if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
  else Reflect.deleteProperty(globalThis, "document");
});

describe("WebMCP adapter", () => {
  it("registers the complete tool set with truthful annotations and structured results", async () => {
    const registrations: CapturedRegistration[] = [];
    const modelContext = {
      registerTool: async (tool: WebMCP.ModelContextTool, options?: WebMCP.ModelContextRegisterToolOptions) => {
        registrations.push({ tool, signal: options?.signal });
      },
    } as unknown as WebMCP.ModelContext;
    installDocument(modelContext);

    const store = createStore(createInitialState());
    const commands = new CommandService(store, { now: () => 1_000, id: () => "test-id" });
    const unregister = await registerWebMcpTools(store, commands);

    expect(registrations.map(({ tool }) => tool.name)).toEqual([
      "inspect_mission_board",
      "list_card_powers",
      "preview_card_play",
      "commit_card_play",
      "undo_last_play",
      "load_demo_mission",
    ]);
    expect(registrations[0].tool.annotations?.readOnlyHint).toBe(true);
    expect(registrations[1].tool.annotations?.readOnlyHint).not.toBe(true);
    expect(store.getState().connection).toBe("ready");

    const stateBeforeInspect = store.getState();
    const inspectResult = await registrations[0].tool.execute({}, { signal: new AbortController().signal });
    expect(store.getState()).toBe(stateBeforeInspect);
    expect(inspectResult).toMatchObject({
      content: [{ type: "text" }],
      structuredContent: { ok: true },
    });

    await registrations[1].tool.execute({}, { signal: new AbortController().signal });
    expect(store.getState().recommendation?.power).toBe("forge");

    unregister();
    expect(registrations.every(({ signal }) => signal?.aborted)).toBe(true);
  });

  it("falls back cleanly when the browser does not expose WebMCP", async () => {
    installDocument();
    const store = createStore(createInitialState());
    const commands = new CommandService(store);

    const unregister = await registerWebMcpTools(store, commands);

    expect(store.getState().connection).toBe("manual");
    expect(unregister()).toBeUndefined();
  });
});
