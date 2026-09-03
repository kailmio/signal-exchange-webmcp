import type { MissionCard } from "../domain/types";
import { Icon } from "./Icons";

const ideaIcons = ["idea", "reveal", "control"] as const;

export function MissionCardView({
  card,
  index,
  selected,
  changed,
  onSelect,
}: {
  card: MissionCard;
  index: number;
  selected: boolean;
  changed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`mission-card mission-card--${card.kind}${selected ? " is-selected" : ""}${changed ? " is-changed" : ""}`}
      onClick={onSelect}
      type="button"
      aria-pressed={selected}
      aria-label={`${card.title}. ${card.kind === "idea" ? "Select as Forge target" : "Select as Focus target"}`}
    >
      <span className="mission-card__icon"><Icon name={card.kind === "action" ? "check" : ideaIcons[index % 3]} size={26} /></span>
      <span className="mission-card__title">{card.title}</span>
      <span className="mission-card__detail">{card.detail}</span>
      {card.completionCheck ? <span className="mission-card__check">Done when: {card.completionCheck}</span> : null}
      <span className="mission-card__status">{card.status}</span>
    </button>
  );
}
