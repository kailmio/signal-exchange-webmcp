import { afterEach, describe, expect, it } from "vitest";
import { CommandService } from "../domain/commands";
import { createInitialState } from "../state/reducer";
import { createStore } from "../state/store";
import { registerWebMcpTools } from "../webmcp/registerTools";

interface Captured { tool: WebMCP.ModelContextTool; signal?: AbortSignal }
const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
function installDocument(modelContext?: WebMCP.ModelContext) { Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext } }); }
afterEach(() => { if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument); else Reflect.deleteProperty(globalThis, "document"); });

describe("WebMCP exchange adapter", () => {
  it("registers seven coherent tools with structured results and cleanup", async () => { const captured: Captured[] = []; const modelContext = { registerTool: async (tool: WebMCP.ModelContextTool, options?: WebMCP.ModelContextRegisterToolOptions) => { captured.push({ tool, signal: options?.signal }); } } as unknown as WebMCP.ModelContext; installDocument(modelContext); const store = createStore(createInitialState()); const unregister = await registerWebMcpTools(store, new CommandService(store, { now: () => 1_000, id: () => "id" })); expect(captured.map(({ tool }) => tool.name)).toEqual(["inspect_exchange", "search_data_offers", "compare_data_offers", "preview_data_deal", "commit_data_deal", "undo_last_deal", "load_demo_exchange"]); expect(captured[0].tool.annotations?.readOnlyHint).toBe(true); const result = await captured[0].tool.execute({}, { signal: new AbortController().signal }); expect(result).toMatchObject({ content: [{ type: "text" }], structuredContent: { ok: true } }); expect(store.getState().connection).toBe("ready"); unregister(); expect(captured.every(({ signal }) => signal?.aborted)).toBe(true); });
  it("falls back when WebMCP is unavailable", async () => { installDocument(); const store = createStore(createInitialState()); const unregister = await registerWebMcpTools(store, new CommandService(store)); expect(store.getState().connection).toBe("manual"); expect(unregister()).toBeUndefined(); });
});
