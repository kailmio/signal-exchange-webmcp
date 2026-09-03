import { useEffect, useRef, useState } from "react";

export function CustomMissionDialog({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (goal: string, ideas: string[]) => void }) {
  const [goal, setGoal] = useState("");
  const [ideas, setIdeas] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTarget = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      returnTarget?.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section
        ref={dialogRef}
        className="mission-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-dialog-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, input") ?? []).filter((item) => !item.hasAttribute("disabled"));
          const first = focusable[0];
          const last = focusable.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <span className="micro-label">New board</span>
        <h2 id="mission-dialog-title">Start a custom mission</h2>
        <p>One clear goal is enough. Starter ideas are optional.</p>
        <label>Mission goal<input ref={inputRef} value={goal} maxLength={140} aria-invalid={Boolean(error)} aria-describedby={error ? "mission-goal-error" : undefined} onChange={(event) => { setGoal(event.target.value); setError(""); }} /></label>
        <div className="dialog-ideas">
          {ideas.map((idea, index) => <label key={index}>Idea {index + 1} <span>(optional)</span><input value={idea} maxLength={90} onChange={(event) => setIdeas((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} /></label>)}
        </div>
        {error ? <p className="field-error" id="mission-goal-error" role="alert">{error}</p> : null}
        <div className="mission-dialog__actions">
          <button className="button button--secondary" onClick={onClose} type="button">Cancel</button>
          <button className="button button--primary" onClick={() => { if (!goal.trim()) { setError("Enter one short mission goal."); return; } onCreate(goal, ideas); setGoal(""); setIdeas(["", "", ""]); }} type="button">Create mission</button>
        </div>
      </section>
    </div>
  );
}
