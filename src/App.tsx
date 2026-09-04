import { useEffect, useRef, useState } from "react";
import { appStore, commands } from "./runtime";
import { useAppState } from "./state/store";
import { registerWebMcpTools } from "./webmcp/registerTools";
import { ActivityRail } from "./components/ActivityRail";
import { DealPanel } from "./components/DealPanel";
import { Icon } from "./components/Icons";
import { OfferRow } from "./components/OfferRow";
import { OfferDetails } from "./components/OfferDetails";
import { PublishOfferPanel } from "./components/PublishOfferPanel";
import "./styles/tokens.css";
import "./styles/app.css";

export default function App() {
  const state = useAppState(appStore);
  const content = state.exchange.content;
  const [selectedOfferId, setSelectedOfferId] = useState(content.offers[0].id);
  const [publishing, setPublishing] = useState(false);
  const [query, setQuery] = useState(content.brief.query);
  const [maxCredits, setMaxCredits] = useState(content.brief.budgetCredits);
  const publishButton = useRef<HTMLButtonElement>(null);
  const offers = content.offers.filter((offer) => state.visibleOfferIds.includes(offer.id));
  const selectedOffer = content.offers.find((offer) => offer.id === (state.preview?.offerId ?? selectedOfferId)) ?? content.offers[0];
  const activeAccess = content.access.find((access) => access.offerId === selectedOffer.id && access.expiresAt > Date.now());

  useEffect(() => { if (state.recommendation) setSelectedOfferId(state.recommendation.offerId); }, [state.recommendation]);
  useEffect(() => { setQuery(state.searchQuery); setMaxCredits(state.searchMaxCredits); }, [state.searchQuery, state.searchMaxCredits]);
  useEffect(() => { const latest = content.access.at(-1); if (latest) setSelectedOfferId(latest.offerId); }, [content.access]);
  useEffect(() => { let disposed = false; let cleanup: (() => void) | undefined; void registerWebMcpTools(appStore, commands).then((unregister) => { if (disposed) unregister(); else cleanup = unregister; }); return () => { disposed = true; cleanup?.(); }; }, []);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && state.preview) commands.cancelPreview("manual"); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [state.preview]);

  const reset = () => {
    if ((content.access.length || content.offers.some((offer) => offer.publishedBy !== "system")) && !window.confirm("Reset this local demo? Published offers, rentals and seller credits will be removed. Downloaded files are not deleted.")) return;
    commands.loadDemoExchange(true, "manual"); setSelectedOfferId("offer-metropulse"); setQuery(content.brief.query); setPublishing(false);
  };
  const closePublisher = () => { setPublishing(false); publishButton.current?.focus(); };

  return <div className="app-shell">
    <header className="app-header">
      <div className="brand"><Icon name="mark" size={34}/><span>Signal Exchange</span></div>
      <div className={`connection connection--${state.connection}`}><span className="connection-dot"/>{state.connection === "ready" ? "Agent ready" : state.connection === "checking" ? "Connecting agent" : "Manual demo mode"}</div>
      <div className="header-actions"><span className="wallet"><Icon name="credits" size={20}/><strong>{content.walletCredits}</strong> credits</span><button ref={publishButton} type="button" aria-expanded={publishing} onClick={() => setPublishing(!publishing)}>Publish data</button><button type="button" onClick={reset}>Reset</button></div>
    </header>
    <main className="exchange-layout">
      <section className="marketplace">
        <div className="market-hero"><span>Data marketplace</span><h1>Trade agent-ready data.<br/>Human or agent, either side.</h1><p>Publish a sample. Discover and negotiate an offer. Approve the exact deal and receive usable data.</p></div>
        <p className="demo-boundary">Local demo · shared browser session · simulated credits and counterparties · no accounts or real payments</p>
        <details className="quick-guide"><summary>How to try the two-sided exchange</summary><ol><li><strong>Supply:</strong> choose Publish data, review the synthetic example and publish it.</li><li><strong>Discover:</strong> search “Laneway”, select the offer and inspect its public sample and license.</li><li><strong>Trade:</strong> bid 20 credits, review the 22-credit counteroffer, approve and commit.</li><li><strong>Receive:</strong> download JSON, CSV and the license manifest. The seller receives 22 demo credits.</li></ol><p>With a WebMCP-connected agent, ask it to discover this page's tools, search for Laneway, inspect the sample, and preview a seven-day rental for 20 credits. You approve; then ask it to commit and call <code>read_rented_data</code>.</p><p>Agents can also publish with your permission using <code>publish_data_offer</code>. A tool connection is required—manual buttons do not run an AI agent.</p></details>
        {publishing ? <PublishOfferPanel onClose={closePublisher} onPublished={(id) => { setSelectedOfferId(id); closePublisher(); }}/> : null}
        <form className="market-search" onSubmit={(event) => { event.preventDefault(); commands.searchDataOffers({ query, maxCredits }, "manual"); }}>
          <label>Find data<input value={query} onChange={(event) => setQuery(event.target.value)} minLength={2} maxLength={160} required placeholder="Search title, seller or location"/></label>
          <label>Max credits<input type="number" min={1} max={100} value={maxCredits} onChange={(event) => setMaxCredits(Number(event.target.value))} required/></label>
          <button className="button button--primary" type="submit">Search offers</button>
          <button className="button button--secondary" type="button" disabled={!offers.length} onClick={() => commands.compareDataOffers(undefined, "manual")}>Compare offers</button>
        </form>
        <div className="market-heading"><h2>Market offers</h2><span><Icon name="search" size={17}/> {offers.length} visible · {content.offers.length} listed</span></div>
        <div className="offer-list">{offers.map((offer, index) => <OfferRow key={offer.id} offer={offer} rank={index + 1} selected={selectedOffer.id === offer.id} recommended={state.recommendation?.offerId === offer.id} unlocked={content.access.some((access) => access.offerId === offer.id && access.expiresAt > Date.now())} onSelect={() => { if (state.preview) commands.cancelPreview("manual"); setSelectedOfferId(offer.id); }}/>)}</div>
        {!offers.length ? <p className="empty-results" role="status">No matching offers. Broaden the query or increase the credit ceiling.</p> : null}
        <OfferDetails offer={selectedOffer}/>
        <footer className="trust-strip"><span><Icon name="shield" size={28}/><strong>Source transparency</strong><small>Seller-provided, not verified</small></span><span><Icon name="license" size={28}/><strong>Terms before trading</strong><small>Exact license in every preview</small></span><span><Icon name="file" size={28}/><strong>Usable sample data</strong><small>JSON / CSV plus a manifest</small></span></footer>
      </section>
      <aside className="exchange-sidebar">
        <ActivityRail history={state.history}/>
        <DealPanel key={selectedOffer.id} offer={selectedOffer} preview={state.preview} access={activeAccess} walletCredits={content.walletCredits} budgetCredits={content.brief.budgetCredits} durationDays={content.brief.durationDays} committing={state.committing} approved={Boolean(state.preview && state.approvedPreviewToken === state.preview.token)} canUndo={Boolean(state.undoExchange)} onPreview={(bidCredits) => commands.previewDataDeal({ offerId: selectedOffer.id, bidCredits, durationDays: content.brief.durationDays }, "manual")} onApprove={() => commands.approveVisibleDeal("manual")} onCommit={() => commands.commitDataDeal(state.preview!.token, "manual")} onCancel={() => commands.cancelPreview("manual")} onUndo={() => commands.undoLastDeal("manual")}/>
      </aside>
    </main>
    {state.notice ? <div className={`notice notice--${state.notice.tone}`} role="status" aria-live="polite">{state.notice.text}<button type="button" aria-label="Dismiss notice" onClick={() => appStore.dispatch({ type: "CLEAR_NOTICE" })}>×</button></div> : null}
  </div>;
}
