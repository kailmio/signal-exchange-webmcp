import type { CommandService } from "../domain/commands";
import type { AppStore } from "../state/store";
import { COMMIT_SCHEMA, COMPARE_SCHEMA, EMPTY_SCHEMA, PREVIEW_SCHEMA, RESET_SCHEMA, SEARCH_SCHEMA } from "./schemas";
import { toToolResult } from "./results";

export async function registerWebMcpTools(store: AppStore, commands: CommandService): Promise<() => void> {
  const context = document.modelContext;
  if (!context) { store.dispatch({ type: "SET_CONNECTION", connection: "manual" }); return () => undefined; }
  const controller = new AbortController();
  try {
    await Promise.all([
      context.registerTool({ name: "inspect_exchange", title: "Inspect Signal Exchange", description: "Read the buyer's goal, budget, wallet, current offers, recommendation, pending deal, access, and recent activity without changing page state. Start here.", inputSchema: EMPTY_SCHEMA, annotations: { readOnlyHint: true }, execute: () => toToolResult(commands.inspectExchange()) }, { signal: controller.signal }),
      context.registerTool({ name: "search_data_offers", title: "Search data offers", description: "Search machine-ready data offers by need and optional credit ceiling. Results become visible on the marketplace.", inputSchema: SEARCH_SCHEMA, execute: ({ query, maxCredits }) => toToolResult(commands.searchDataOffers({ query, maxCredits }, "agent")) }, { signal: controller.signal }),
      context.registerTool({ name: "compare_data_offers", title: "Compare data offers", description: "Rank offers using trust, freshness, formats, price, and the person's budget, then visibly recommend the strongest fit.", inputSchema: COMPARE_SCHEMA, execute: ({ offerIds }) => toToolResult(commands.compareDataOffers(offerIds, "agent")) }, { signal: controller.signal }),
      context.registerTool({ name: "preview_data_deal", title: "Negotiate and preview a rental", description: "Submit a rental bid and display the exact accepted price or seller counteroffer. This never spends credits or unlocks data.", inputSchema: PREVIEW_SCHEMA, execute: ({ offerId, bidCredits, durationDays }) => toToolResult(commands.previewDataDeal({ offerId, bidCredits, durationDays }, "agent")) }, { signal: controller.signal }),
      context.registerTool({ name: "commit_data_deal", title: "Commit the visible data rental", description: "After the person clicks Approve exact deal, apply only that active visible preview using its one-time token. Never substitute another offer or price.", inputSchema: COMMIT_SCHEMA, execute: ({ previewToken }) => toToolResult(commands.commitDataDeal(previewToken, "agent")) }, { signal: controller.signal }),
      context.registerTool({ name: "undo_last_deal", title: "Reverse the latest simulated deal", description: "Restore the wallet and revoke access from the latest committed demo rental. Supports one level of undo.", inputSchema: EMPTY_SCHEMA, execute: () => toToolResult(commands.undoLastDeal("agent")) }, { signal: controller.signal }),
      context.registerTool({ name: "load_demo_exchange", title: "Reset Signal Exchange demo", description: "Restore the judge-ready Sydney foot-traffic marketplace, 100-credit wallet, and clean transaction state.", inputSchema: RESET_SCHEMA, execute: ({ confirmReplace }) => toToolResult(commands.loadDemoExchange(confirmReplace, "agent")) }, { signal: controller.signal }),
    ]);
    store.dispatch({ type: "SET_CONNECTION", connection: "ready" });
  } catch { controller.abort(); store.dispatch({ type: "SET_CONNECTION", connection: "manual" }); }
  return () => controller.abort();
}
