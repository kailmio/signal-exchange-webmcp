import type { PowerAvailability, PowerId } from "../domain/types";
import { Icon } from "./Icons";

export function PowerCard({
  power,
  recommended,
  active,
  onPlay,
}: {
  power: PowerAvailability;
  recommended: boolean;
  active: boolean;
  onPlay: (power: PowerId) => void;
}) {
  return (
    <button
      type="button"
      className={`power-card power-card--${power.accent}${recommended ? " is-recommended" : ""}${active ? " is-active" : ""}`}
      disabled={!power.available}
      onClick={() => onPlay(power.id)}
      aria-label={`${power.name}. ${power.effect}${recommended ? ". Recommended" : ""}`}
    >
      <span className="power-card__frame" aria-hidden="true" />
      <span className="power-card__name">{power.name}</span>
      <span className="power-card__icon"><Icon name={power.id} size={88} /></span>
      <span className="power-card__effect">{power.effect}</span>
      <span className="power-card__state">{recommended ? "Recommended" : power.available ? "Preview power" : power.reason}</span>
    </button>
  );
}
