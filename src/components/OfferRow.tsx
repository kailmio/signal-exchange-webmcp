import { freshnessLabel } from "../domain/marketplace";
import type { DataOffer } from "../domain/types";
import { Icon } from "./Icons";

export function OfferRow({ offer, selected, recommended, unlocked, rank, onSelect }: { offer: DataOffer; selected: boolean; recommended: boolean; unlocked: boolean; rank: number; onSelect: () => void }) {
  return (
    <button type="button" className={`offer-row${selected ? " is-selected" : ""}${recommended ? " is-recommended" : ""}`} onClick={onSelect} aria-pressed={selected} aria-label={`Select ${offer.title} by ${offer.seller}, ${offer.rentalCredits} credits`}>
      <span className="offer-rank">{recommended ? <><Icon name="spark" size={24}/><small>Top match</small></> : <strong>{rank}</strong>}</span>
      <span className="offer-identity"><span className="offer-emblem"><Icon name="signal" size={34}/></span><span><strong>{offer.title}</strong><small>by {offer.seller} <span className="verified">{offer.publishedBy === "agent" ? "agent" : offer.publishedBy === "manual" ? "person" : "demo"}</span></small><p>{offer.description}</p></span></span>
      <span className="offer-metric"><small>Trust</small><strong><Icon name="shield" size={22}/>{offer.trustScore || "New"}</strong><span>{offer.trustScore ? "Demo score" : "Not reviewed"}</span></span>
      <span className="offer-metric"><small>{offer.publishedBy === "system" ? "Freshness" : "Listing"}</small><strong><Icon name="clock" size={20}/>{offer.publishedBy === "system" ? freshnessLabel(offer.freshnessHours) : "New sample"}</strong><span>{offer.coverage}</span></span>
      <span className="offer-metric"><small>Sample delivery</small><strong><Icon name="file" size={20}/>JSON · CSV</strong><span>{offer.sampleRows.length} usable rows</span></span>
      <span className="offer-price"><small>7-day rental</small><strong>{offer.rentalCredits}</strong><span>credits</span>{unlocked ? <em>Access active</em> : <em>{selected ? "Selected" : "View deal"}</em>}</span>
    </button>
  );
}
