import { cloneBoardContent } from "./sampleMission";
import type {
  BoardContent,
  CommandError,
  MissionCard,
  PowerAvailability,
  PowerDefinition,
  PowerId,
  PowerProposal,
} from "./types";

export const POWER_DEFINITIONS: readonly PowerDefinition[] = [
  { id: "forge", name: "Forge", effect: "Turn one idea into clear actions", accent: "amber" },
  { id: "focus", name: "Focus", effect: "Choose the highest-leverage next move", accent: "cyan" },
];

type ProposalResult = { ok: true; data: PowerProposal } | { ok: false; error: CommandError };

function error(code: CommandError["code"], message: string, nextAction: string): ProposalResult {
  return { ok: false, error: { code, message, nextAction } };
}

function openIdeas(content: BoardContent): MissionCard[] {
  return content.cards.filter((card) => card.kind === "idea" && card.status !== "forged");
}

function actions(content: BoardContent): MissionCard[] {
  return content.cards.filter((card) => card.kind === "action");
}

export function getPowerAvailability(content: BoardContent): PowerAvailability[] {
  const ideas = openIdeas(content);
  const actionable = actions(content);
  return POWER_DEFINITIONS.map((power) => {
    if (power.id === "forge") {
      return { ...power, available: ideas.length > 0, reason: ideas.length ? undefined : "Every idea is already forged." };
    }
    if (power.id === "focus") {
      return { ...power, available: actionable.length > 0, reason: actionable.length ? undefined : "Forge an idea to create actions first." };
    }
    return { ...power, available: actionable.length > 0, reason: actionable.length ? undefined : "Forge an idea to create actions first." };
  });
}

export function recommendPower(content: BoardContent): { power: PowerId; reason: string } {
  if (actions(content).length > 0 && !content.focusedCardId) {
    return { power: "focus", reason: "You have actions to choose from, but no single next move." };
  }
  if (content.focusedCardId) {
    return openIdeas(content).length > 0
      ? { power: "forge", reason: "The next move is chosen; forge another idea to deepen the plan." }
      : { power: "focus", reason: "The board is structured; refocus when a different move becomes more valuable." };
  }
  if (openIdeas(content).length > 0) {
    return { power: "forge", reason: "The board still has a promising idea that needs concrete actions." };
  }
  return { power: "focus", reason: "The board is structured; choose the move that deserves attention now." };
}

const FORGE_TEMPLATES = [
  ["Map the shared state", "List the board fields the person and agent must see.", "A typed board snapshot is visible to both paths."],
  ["Register the tools", "Expose the smallest useful WebMCP capability set.", "The agent discovers all six named tools."],
  ["Prove the handoff", "Preview one exact change before allowing commit.", "The visible preview and committed result match."],
  ["Capture the moment", "Record the shortest sequence that proves human control.", "The demo shows preview, approval, history, and undo."],
] as const;

function forge(content: BoardContent, targetCardId?: string): ProposalResult {
  if (!targetCardId) return error("TARGET_REQUIRED", "Forge needs one idea card.", "Choose an open idea and preview Forge again.");
  const target = content.cards.find((card) => card.id === targetCardId);
  if (!target || target.kind !== "idea") return error("TARGET_NOT_FOUND", "That idea is not on the current board.", "Inspect the board and choose an existing idea ID.");
  if (target.status === "forged") return error("POWER_UNAVAILABLE", "That idea has already been forged.", "Choose another open idea.");

  const proposed = cloneBoardContent(content);
  proposed.cards = proposed.cards.map((card) => (card.id === target.id ? { ...card, status: "forged" } : card));
  const generated = FORGE_TEMPLATES.map(([title, detail, completionCheck], index) => ({
    id: `${target.id}-action-${index + 1}`,
    kind: "action" as const,
    title,
    detail,
    completionCheck,
    status: "open" as const,
    sourceCardId: target.id,
  }));
  proposed.cards.push(...generated);
  return {
    ok: true,
    data: {
      outcomeKey: "forge-actions",
      outcomeTitle: "Forge into four actions",
      rationale: `“${target.title}” is promising but still too abstract to execute.`,
      changes: [
        { kind: "update", cardId: target.id, label: `Mark “${target.title}” as forged`, before: "Open", after: "Forged" },
        ...generated.map((card) => ({ kind: "add" as const, cardId: card.id, label: card.title, after: card.completionCheck })),
      ],
      proposedContent: proposed,
    },
  };
}

function focus(content: BoardContent, targetCardId?: string): ProposalResult {
  const available = actions(content);
  const target = targetCardId ? available.find((card) => card.id === targetCardId) : available[0];
  if (!target) return error("POWER_UNAVAILABLE", "Focus needs at least one action card.", "Forge an idea first, then preview Focus.");
  const proposed = cloneBoardContent(content);
  const previous = content.cards.find((card) => card.id === content.focusedCardId);
  proposed.focusedCardId = target.id;
  proposed.cards = proposed.cards.map((card) => ({
    ...card,
    status: card.id === target.id ? "focused" : card.kind === "action" && card.status === "focused" ? "open" : card.status,
  }));
  return {
    ok: true,
    data: {
      outcomeKey: "focus-next",
      outcomeTitle: "Choose the next move",
      rationale: `“${target.title}” unlocks the clearest proof with the least dependency.`,
      changes: [
        {
          kind: "focus",
          cardId: target.id,
          label: `Focus “${target.title}”`,
          before: previous?.title ?? "No action focused",
          after: target.title,
        },
      ],
      proposedContent: proposed,
    },
  };
}

export function previewPower(content: BoardContent, power: PowerId, targetCardId?: string): ProposalResult {
  if (power === "forge") return forge(content, targetCardId);
  if (power === "focus") return focus(content, targetCardId);
  return error("INVALID_INPUT", "Unknown power.", "Choose Forge or Focus.");
}
