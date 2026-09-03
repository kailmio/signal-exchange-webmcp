import { useEffect, useMemo, useState } from "react";
import { appStore, commands } from "./runtime";
import { compareOffers } from "./domain/marketplace";
import { useAppState } from "./state/store";
import { registerWebMcpTools } from "./webmcp/registerTools";
import { ActivityRail } from "./components/ActivityRail";
import { DealPanel } from "./components/DealPanel";
import { Icon } from "./components/Icons";
import { OfferRow } from "./components/OfferRow";
import "./styles/tokens.css";
import "./styles/app.css";

export default function App() {
  const state = useAppState(appStore);
  const fallbackRecommendation = useMemo(() => compareOffers(state.exchange.content), [state.exchange.content]);
  const recommendedId = state.recommendation?.offerId ?? fallbackRecommendation?.offerId ?? state.exchange.content.offers[0].id;
  const [selectedOfferId, setSelectedOfferId] = useState(recommendedId);
  const offers = state.exchange.content.offers.filter((offer) => state.visibleOfferIds.includes(offer.id));
  const selectedOffer = state.exchange.content.offers.find((offer) => offer.id === selectedOfferId) ?? state.exchange.content.offers.find((offer) => offer.id === recommendedId) ?? state.exchange.content.offers[0];
  const activeAccess = state.exchange.content.access.find((access) => access.offerId === selectedOffer.id);

  useEffect(() => { if (state.recommendation) setSelectedOfferId(state.recommendation.offerId); }, [state.recommendation]);
  useEffect(() => { let disposed = false; let cleanup: (() => void) | undefined; void registerWebMcpTools(appStore, commands).then((unregister) => { if (disposed) unregister(); else cleanup = unregister; }); return () => { disposed = true; cleanup?.(); }; }, []);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && state.preview) commands.cancelPreview("manual"); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [state.preview]);

  const reset = () => { if (!state.exchange.content.access.length || window.confirm("Reset the simulated wallet, access, and activity state?")) { commands.loadDemoExchange(true, "manual"); setSelectedOfferId("offer-metropulse"); } };
  const runAgentDemo = () => { commands.searchDataOffers({ query: state.exchange.content.brief.query, maxCredits: state.exchange.content.brief.budgetCredits }, "manual"); commands.compareDataOffers(undefined, "manual"); setSelectedOfferId("offer-metropulse"); };

  return <div className="app-shell">
    <header className="app-header"><div className="brand"><Icon name="mark" size={34}/><span>Signal Exchange</span></div><div className={`connection connection--${state.connection}`}><span className="connection-dot"/>{state.connection === "ready" ? "Agent ready" : state.connection === "checking" ? "Connecting agent" : "Manual demo mode"}</div><div className="header-actions"><span className="wallet"><Icon name="credits" size={20}/><strong>{state.exchange.content.walletCredits}</strong> credits</span><button type="button" onClick={runAgentDemo}>Compare offers</button><button type="button" onClick={reset}>Reset</button></div></header>
    <main className="exchange-layout"><section className="marketplace"><div className="market-hero"><span>Data marketplace</span><h1>Find trusted data. Let your agent negotiate.</h1><p>Set the goal and budget. Your agent compares provenance metadata, licensing, and price before you approve the deal.</p></div><div className="market-heading"><h2>Market offers · Sydney foot-traffic data</h2><span><Icon name="search" size={17}/> {offers.length} compatible offers</span></div><div className="offer-list">{offers.map((offer, index) => <OfferRow key={offer.id} offer={offer} rank={index + 1} selected={selectedOffer.id === offer.id} recommended={state.recommendation?.offerId === offer.id} unlocked={state.exchange.content.access.some((access) => access.offerId === offer.id)} onSelect={() => setSelectedOfferId(offer.id)}/>)}</div><footer className="trust-strip"><span><Icon name="shield" size={28}/><strong>Provenance metadata</strong><small>Seller-provided trust signals</small></span><span><Icon name="license" size={28}/><strong>Clear licenses</strong><small>Usage terms before purchase</small></span><span><Icon name="file" size={28}/><strong>Machine-ready</strong><small>JSON, CSV, and Parquet</small></span></footer></section><aside className="exchange-sidebar"><ActivityRail history={state.history}/><DealPanel offer={selectedOffer} preview={state.preview} access={activeAccess} walletCredits={state.exchange.content.walletCredits} budgetCredits={state.exchange.content.brief.budgetCredits} durationDays={state.exchange.content.brief.durationDays} committing={state.committing} approved={Boolean(state.preview && state.approvedPreviewToken === state.preview.token)} canUndo={Boolean(state.undoExchange)} onPreview={() => commands.previewDataDeal({ offerId: selectedOffer.id, bidCredits: 20, durationDays: state.exchange.content.brief.durationDays }, "manual")} onApprove={() => commands.approveVisibleDeal("manual")} onCommit={() => commands.commitDataDeal(state.preview!.token, "manual")} onCancel={() => commands.cancelPreview("manual")} onUndo={() => commands.undoLastDeal("manual")}/></aside></main>
    {state.notice ? <div className={`notice notice--${state.notice.tone}`} role="status" aria-live="polite">{state.notice.text}<button type="button" aria-label="Dismiss notice" onClick={() => appStore.dispatch({ type: "CLEAR_NOTICE" })}>×</button></div> : null}
  </div>;
}
