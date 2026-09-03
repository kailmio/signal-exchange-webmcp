import { useEffect, useMemo, useState } from "react";
import { appStore, commands } from "./runtime";
import { useAppState } from "./state/store";
import { getPowerAvailability, recommendPower } from "./domain/powers";
import { createSampleContent } from "./domain/sampleMission";
import type { PowerId } from "./domain/types";
import { registerWebMcpTools } from "./webmcp/registerTools";
import { ActivityRail } from "./components/ActivityRail";
import { CustomMissionDialog } from "./components/CustomMissionDialog";
import { Icon } from "./components/Icons";
import { MissionCardView } from "./components/MissionCardView";
import { PowerCard } from "./components/PowerCard";
import { PreviewPanel } from "./components/PreviewPanel";
import "./styles/tokens.css";
import "./styles/app.css";

export default function App() {
  const state = useAppState(appStore);
  const [selectedCardId, setSelectedCardId] = useState<string | null>("idea-tangible");
  const [dialogOpen, setDialogOpen] = useState(false);
  const powers = useMemo(() => getPowerAvailability(state.board.content), [state.board.content]);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void registerWebMcpTools(appStore, commands).then((unregister) => {
      if (disposed) unregister();
      else cleanup = unregister;
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (dialogOpen) setDialogOpen(false);
        else if (state.preview) commands.cancelPreview("manual");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen, state.preview]);

  const playPower = (power: PowerId) => {
    const targetCardId = power === "forge"
      ? state.board.content.cards.find((card) => card.id === selectedCardId && card.kind === "idea" && card.status !== "forged")?.id
        ?? state.board.content.cards.find((card) => card.kind === "idea" && card.status !== "forged")?.id
      : power === "focus" && state.board.content.cards.find((card) => card.id === selectedCardId && card.kind === "action")
        ? selectedCardId ?? undefined
        : undefined;
    commands.previewCardPlay({ power, targetCardId }, "manual");
  };

  const reset = () => {
    const modified = JSON.stringify(state.board.content) !== JSON.stringify(createSampleContent());
    if (!modified || window.confirm("Replace this board with the sample mission?")) {
      commands.loadDemoMission(true, "manual");
      setSelectedCardId("idea-tangible");
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand"><Icon name="mark" size={32} /><span>Mission Deck</span></div>
        <div className={`connection connection--${state.connection}`}>
          <span className="connection__dot" />
          {state.connection === "ready" ? "Agent ready" : state.connection === "checking" ? "Checking agent connection" : "Manual demo mode"}
          {state.connection === "manual" ? <span className="sr-only">. Every card remains available without an agent.</span> : null}
        </div>
        <div className="header-actions">
          <button type="button" onClick={() => setDialogOpen(true)}>New mission</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
      </header>

      <main className="workspace">
        <section className={`board${state.preview ? " has-preview" : ""}`} aria-label="Mission board">
          <div className="mission-copy">
            <h1>{state.board.content.goal}</h1>
            <p>Ask your agent to inspect the board, then review and approve a card play.</p>
          </div>

          <div className="board-stage">
            <div className="card-lane" aria-label="Mission cards">
              {state.board.content.cards.map((card, index) => (
                <MissionCardView
                  key={card.id}
                  card={card}
                  index={index}
                  selected={selectedCardId === card.id}
                  changed={state.lastChangedCardIds.includes(card.id)}
                  onSelect={() => setSelectedCardId(card.id)}
                />
              ))}
            </div>
            {state.preview ? (
              <PreviewPanel
                preview={state.preview}
                committing={state.committing}
                onApprove={() => commands.commitCardPlay(state.preview!.token, "manual")}
                onCancel={() => commands.cancelPreview("manual")}
              />
            ) : (
              <section className="focus-zone" aria-label="Focused action">
                <Icon name="focus" size={48} />
                <span>Focus</span>
                {state.board.content.focusedCardId ? (
                  <strong>{state.board.content.cards.find((card) => card.id === state.board.content.focusedCardId)?.title}</strong>
                ) : <p>No action<br />focused yet</p>}
              </section>
            )}
          </div>

          <div className="power-table">
            <span className="power-table__label">Choose your power</span>
            <div className="power-hand" aria-label="Card powers">
              {powers.map((power) => (
                <PowerCard
                  key={power.id}
                  power={power}
                  recommended={(state.recommendation?.power ?? recommendPower(state.board.content).power) === power.id}
                  active={state.preview?.power === power.id}
                  onPlay={playPower}
                />
              ))}
            </div>
          </div>
        </section>

        <ActivityRail history={state.history} canUndo={Boolean(state.undoBoard)} onUndo={() => commands.undoLastPlay("manual")} />
      </main>

      {state.notice ? <div className={`notice notice--${state.notice.tone}`} role="status" aria-live="polite">{state.notice.text}<button type="button" aria-label="Dismiss notice" onClick={() => appStore.dispatch({ type: "CLEAR_NOTICE" })}>×</button></div> : null}
      <CustomMissionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCreate={(goal, ideas) => { commands.createCustomMission(goal, ideas); setSelectedCardId(null); setDialogOpen(false); }} />
    </div>
  );
}
