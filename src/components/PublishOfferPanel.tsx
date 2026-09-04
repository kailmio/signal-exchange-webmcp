import { useEffect, useRef, useState } from "react";
import { commands } from "../runtime";

export const PUBLISH_EXAMPLE = {
  title: "Laneway Weekend Foot Traffic", seller: "Laneway Research", description: "Synthetic pedestrian counts for comparing Sydney weekend pop-up locations.",
  coverage: "Sydney · Newtown and Surry Hills", source: "Synthetic teaching sample created for Signal Exchange; not observed pedestrian data.",
  license: "Demo evaluation only · attribution required · no redistribution", rentalCredits: 24, minimumCredits: 22,
  sampleRowsJson: JSON.stringify([
    { location: "Newtown", day: "Saturday", pedestrians: 420, confidence: 0.92 },
    { location: "Surry Hills", day: "Saturday", pedestrians: 310, confidence: 0.89 },
    { location: "Newtown", day: "Sunday", pedestrians: 365, confidence: 0.91 },
    { location: "Surry Hills", day: "Sunday", pedestrians: 290, confidence: 0.88 },
  ], null, 2),
};

export function PublishOfferPanel({ onPublished, onClose }: { onPublished: (offerId: string) => void; onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  useEffect(() => { titleRef.current?.focus(); }, []);
  return <section className="publish-panel" aria-labelledby="publish-heading">
    <div className="section-heading"><h2 id="publish-heading">Publish agent-ready data</h2><button className="button button--secondary" type="button" onClick={onClose}>Close publisher</button></div>
    <p>Start with this synthetic example or enter your own non-private sample. This listing is shared only inside this browser demo, not with other users.</p>
    <form onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const result = commands.publishDataOffer({
        title: String(data.get("title")), seller: String(data.get("seller")), description: String(data.get("description")),
        coverage: String(data.get("coverage")), source: String(data.get("source")), license: String(data.get("license")),
        rentalCredits: Number(data.get("rentalCredits")), minimumCredits: Number(data.get("minimumCredits")),
        sampleRowsJson: String(data.get("sampleRowsJson")), confirmPublish: data.get("rights") === "on",
      }, "manual");
      if (result.ok) onPublished(result.data.id);
      else setError(result.error.message);
    }}>
      <div className="form-grid">
        <label>Listing title<input ref={titleRef} name="title" minLength={3} maxLength={80} required defaultValue={PUBLISH_EXAMPLE.title}/></label>
        <label>Seller name<input name="seller" minLength={3} maxLength={60} required defaultValue={PUBLISH_EXAMPLE.seller}/></label>
        <label className="span-all">Description<input name="description" minLength={3} maxLength={400} required defaultValue={PUBLISH_EXAMPLE.description}/></label>
        <label>Coverage<input name="coverage" minLength={3} maxLength={120} required defaultValue={PUBLISH_EXAMPLE.coverage}/></label>
        <label>License and permitted use<input name="license" minLength={3} maxLength={240} required defaultValue={PUBLISH_EXAMPLE.license}/></label>
        <label className="span-all">Source / provenance<input name="source" minLength={3} maxLength={300} required defaultValue={PUBLISH_EXAMPLE.source}/></label>
        <label>7-day list price (credits)<input name="rentalCredits" type="number" min={1} max={100} step={1} required defaultValue={24}/></label>
        <label>Seller's minimum (credits)<input name="minimumCredits" type="number" min={1} max={100} step={1} required defaultValue={22}/></label>
        <label className="span-all">Sample rows (JSON)<textarea name="sampleRowsJson" spellCheck={false} rows={8} required maxLength={20000} defaultValue={PUBLISH_EXAMPLE.sampleRowsJson}/><small>2–50 rows, matching fields, simple values only. JSON and CSV delivery are generated from these rows.</small></label>
      </div>
      <label className="rights-check"><input type="checkbox" name="rights" required/> I have permission to share this sample, and it contains no private data.</label>
      {error ? <p role="alert" className="form-error">{error}</p> : null}
      <button className="button button--primary" type="submit">Publish offer locally</button>
    </form>
  </section>;
}
