import type { ActivityEntry } from "../domain/types";
import { Icon } from "./Icons";

function relativeTime(entry: ActivityEntry): string { if (entry.createdAt < 10) return "Ready"; const seconds = Math.max(0, Math.floor((Date.now() - entry.createdAt) / 1000)); return seconds < 5 ? "Just now" : seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`; }

export function ActivityRail({ history }: { history: ActivityEntry[] }) {
  return <section className="activity-rail" aria-label="Agent activity"><h2>Activity</h2><ol>{[...history].reverse().slice(0, 4).map((entry) => <li className={`activity-item activity-item--${entry.origin}`} key={entry.id}><span className="activity-icon"><Icon name={entry.kind === "undo" ? "undo" : entry.kind === "error" ? "clock" : entry.kind === "compare" ? "spark" : "check"} size={19}/></span><span><strong>{entry.summary}</strong>{entry.detail ? <p>{entry.detail}</p> : null}<small>{relativeTime(entry)}</small></span></li>)}</ol></section>;
}
