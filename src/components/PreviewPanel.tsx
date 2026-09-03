import type { PendingPreview } from "../domain/types";
import { Icon } from "./Icons";

export function PreviewPanel({
  preview,
  committing,
  onApprove,
  onCancel,
}: {
  preview: PendingPreview;
  committing: boolean;
  onApprove: () => void;
  onCancel: () => void;
}) {
  return (
    <section className={`preview-panel preview-panel--${preview.power}`} aria-labelledby="preview-title">
      <div className="preview-panel__heading">
        <Icon name={preview.power} size={34} />
        <div><h2 id="preview-title">{preview.power} preview</h2><p>Nothing has changed yet</p></div>
      </div>
      <div className="preview-panel__rule" />
      <span className="micro-label">Outcome</span>
      <h3>{preview.outcomeTitle}</h3>
      <p className="preview-panel__rationale">{preview.rationale}</p>
      <span className="micro-label">Change preview</span>
      <div className="preview-panel__changes">
        {preview.changes.slice(0, 4).map((change, index) => (
          <div className="preview-change" key={`${change.cardId ?? "mission"}-${index}`}>
            <strong>{change.label}</strong>
            {change.before ? <span className="preview-change__before">{change.before}</span> : null}
            {change.after ? <span className="preview-change__after">{change.after}</span> : null}
          </div>
        ))}
      </div>
      <div className="preview-panel__actions">
        <button className="button button--primary" onClick={onApprove} disabled={committing} type="button">
          {committing ? "Committing…" : "Approve play"}
        </button>
        <button className="button button--secondary" onClick={onCancel} disabled={committing} type="button">Cancel</button>
      </div>
      <p className="preview-panel__expiry"><Icon name="clock" size={16} /> Preview expires in 5 minutes</p>
    </section>
  );
}
