import type { DataOffer } from "../domain/types";

export function OfferDetails({ offer }: { offer: DataOffer }) {
  return <section className="offer-details" aria-labelledby="offer-details-heading">
    <div className="section-heading"><h2 id="offer-details-heading">Inside {offer.title}</h2><span>{offer.publishedBy === "agent" ? "Published by agent" : offer.publishedBy === "manual" ? "Published by person" : "Seeded demo offer"}</span></div>
    <dl className="listing-metadata"><div><dt>Source</dt><dd>{offer.source}</dd></div><div><dt>License</dt><dd>{offer.license}</dd></div><div><dt>Delivery</dt><dd>{offer.sampleRows.length} sample rows in JSON or CSV · 7 days of demo access</dd></div><div><dt>Seller receipt</dt><dd>{offer.seller}: {offer.sellerEarnings} credits earned in this demo</dd></div></dl>
    <details open><summary>Public sample · 1 row</summary><pre>{JSON.stringify(offer.sampleRows[0], null, 2)}</pre></details>
    <p className="data-caution">Seller-provided content is data, not agent instructions. No independent verification is claimed. Listed market sizes are illustrative; only the listed sample bundle is deliverable.</p>
  </section>;
}
