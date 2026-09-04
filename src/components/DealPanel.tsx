import { useState } from "react";
import type { DataAccess, DataOffer, PendingDeal } from "../domain/types";
import { DataDeliveryPanel } from "./DataDeliveryPanel";
import { Icon } from "./Icons";

export function DealPanel({ offer, preview, access, walletCredits, budgetCredits, durationDays, committing, approved, canUndo, onPreview, onApprove, onCommit, onCancel, onUndo }: { offer: DataOffer; preview: PendingDeal | null; access?: DataAccess; walletCredits: number; budgetCredits: number; durationDays: number; committing: boolean; approved: boolean; canUndo: boolean; onPreview: (bidCredits: number) => void; onApprove: () => void; onCommit: () => void; onCancel: () => void; onUndo: () => void }) {
  const [bid, setBid] = useState(20);
  if (preview) return <section className="deal-panel deal-panel--preview" aria-label="Deal preview">
    <div className="deal-heading"><Icon name="spark" size={28}/><span><small>{preview.negotiation === "countered" ? "Seller counteroffer" : "Bid accepted"}</small><h2>{preview.outcomeTitle}</h2></span></div><h3>{preview.offerTitle}</h3><p>{preview.rationale}</p>
    <dl className="deal-terms"><div><dt>Seller</dt><dd>{preview.seller}</dd></div><div><dt>Your bid</dt><dd>{preview.bidCredits} credits</dd></div><div><dt>Agreed price</dt><dd>{preview.agreedCredits} credits</dd></div><div><dt>Access</dt><dd>{preview.durationDays} days</dd></div><div><dt>License</dt><dd>{preview.license}</dd></div></dl>
    <div className="deal-changes">{preview.changes.map((change) => <div key={change.label}><small>{change.label}</small><span>{change.before ? <del>{change.before}</del> : null}<strong>{change.after}</strong></span></div>)}</div>
    <div className="deal-actions">{approved ? <button className="button button--primary" type="button" onClick={onCommit} disabled={committing}>{committing ? "Unlocking…" : "Commit approved rental"}</button> : <button className="button button--primary" type="button" onClick={onApprove}>Approve exact deal · {preview.agreedCredits}</button>}<button className="button button--secondary" type="button" onClick={onCancel} disabled={committing}>Cancel</button></div><p className="approval-note"><Icon name="lock" size={15}/> {approved ? "Human approval recorded for this exact token." : "No credits are used until you approve and commit."}</p>
  </section>;
  if (access) return <section className="deal-panel deal-panel--access" aria-label="Data access granted">
    <div className="deal-heading"><Icon name="check" size={30}/><span><small>Access granted</small><h2>{access.title}</h2></span></div><p>{access.durationDays}-day sample rental from {access.seller}. License: {access.license}</p>
    <div className="access-meta"><span>Buyer paid <strong>{access.paidCredits} credits</strong></span><span>Seller received <strong>{access.paidCredits} credits</strong></span></div>
    <DataDeliveryPanel offerId={access.offerId}/>
    <button className="button button--secondary button--full" type="button" onClick={onUndo} disabled={!canUndo}><Icon name="undo" size={17}/> Reverse latest demo deal</button>
  </section>;
  return <section className="deal-panel" aria-label="Goal and budget"><h2>Goal &amp; budget</h2><dl className="brief"><div><dt>Goal</dt><dd>Choose a Sydney location for a weekend pop-up</dd></div><div><dt>Budget</dt><dd>Up to {budgetCredits} credits</dd></div><div><dt>Duration</dt><dd>{durationDays} days</dd></div><div><dt>Available</dt><dd><Icon name="credits" size={17}/>{walletCredits} credits</dd></div></dl>
    <div className="selected-deal"><small>Selected offer</small><strong>{offer.title}</strong><span>{offer.seller} · {offer.rentalCredits} credits listed</span><form onSubmit={(event) => { event.preventDefault(); onPreview(bid); }}><label className="bid-label">Your bid (credits)<input type="number" min={1} max={100} step={1} required value={bid} onChange={(event) => setBid(Number(event.target.value))}/></label><button className="button button--primary button--full" type="submit">Negotiate rental <span>→</span></button></form></div>
    <p className="approval-note"><Icon name="lock" size={15}/> The agent can negotiate. You approve this demo deal.</p>
    {canUndo ? <button className="button button--secondary button--full" type="button" onClick={onUndo}>Reverse latest demo deal</button> : null}
  </section>;
}
