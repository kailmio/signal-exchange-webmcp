import type { ActivityEntry } from "../domain/types";
import { Icon } from "./Icons";

function relativeTime(entry: ActivityEntry): string {
  if (entry.createdAt < 10) return "Ready";
  const seconds = Math.max(0, Math.floor((Date.now() - entry.createdAt) / 1000));
  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

export function ActivityRail({ history, canUndo, onUndo }: { history: ActivityEntry[]; canUndo: boolean; onUndo: () => void }) {
  return (
    <aside className="activity-rail" aria-label="Activity history">
      <h2>Activity</h2>
      <ol className="activity-list">
        {[...history].reverse().slice(0, 5).map((entry) => (
          <li className={`activity-item activity-item--${entry.origin}`} key={entry.id}>
            <span className="activity-item__icon"><Icon name={entry.kind === "undo" ? "undo" : entry.kind === "preview" ? "wild" : entry.kind === "error" ? "clock" : "check"} size={20} /></span>
            <span><strong>{entry.summary}</strong><small>{relativeTime(entry)}</small></span>
          </li>
        ))}
        {history.length < 3 ? (
          <li className="activity-item activity-item--waiting">
            <span className="activity-item__icon"><Icon name="clock" size={20} /></span>
            <span><strong>Waiting for your agent</strong><small>Ready</small></span>
          </li>
        ) : null}
      </ol>
      <button type="button" className="undo-button" disabled={!canUndo} onClick={onUndo}>
        <Icon name="undo" size={22} /> Undo
      </button>
    </aside>
  );
}
