import { useState } from "react";
import { commands } from "../runtime";

function saveFile(content: string, mimeType: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: `${mimeType};charset=utf-8` }));
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function DataDeliveryPanel({ offerId }: { offerId: string }) {
  const [message, setMessage] = useState("");
  const result = commands.readRentedData(offerId, "JSON");
  function download(format: "JSON" | "CSV" | "manifest") {
    const current = commands.readRentedData(offerId, format === "CSV" ? "CSV" : "JSON");
    if (!current.ok) { setMessage(current.error.message); return; }
    const data = current.data;
    saveFile(format === "manifest" ? JSON.stringify(data.manifest, null, 2) : data.content, format === "manifest" ? "application/json" : data.mimeType, format === "manifest" ? `${offerId}-manifest.json` : data.filename);
    setMessage(`${format === "manifest" ? "License manifest" : format + " sample"} download prepared.`);
  }
  if (!result.ok) return <p role="status">{result.error.message}</p>;
  return <section className="delivery-panel" aria-labelledby="delivery-heading">
    <h3 id="delivery-heading">Your data is ready</h3>
    <p>{result.data.manifest.rowCount} usable sample rows. Download the provenance and license manifest alongside the data.</p>
    <pre aria-label="Delivered sample data">{result.data.content}</pre>
    <div className="download-actions"><button className="button button--primary" type="button" onClick={() => download("JSON")}>Download JSON</button><button className="button button--secondary" type="button" onClick={() => download("CSV")}>Download CSV</button><button className="button button--secondary" type="button" onClick={() => download("manifest")}>License manifest</button></div>
    <p role="status">{message}</p>
    <small>Undo revokes future delivery in this app. It cannot recall downloaded copies.</small>
  </section>;
}
