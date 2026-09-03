import type { BoardContent, MissionCard } from "./types";

export const SAMPLE_GOAL = "Turn a rough concept into a launch-ready WebMCP demo";

export const SAMPLE_CARDS: MissionCard[] = [
  {
    id: "idea-tangible",
    kind: "idea",
    title: "Make actions tangible",
    detail: "Turn abstract steps into clear, visible outcomes.",
    status: "open",
  },
  {
    id: "idea-reveal",
    kind: "idea",
    title: "Create a memorable reveal",
    detail: "Deliver a moment that clicks and sticks.",
    status: "open",
  },
  {
    id: "idea-control",
    kind: "idea",
    title: "Keep the human in control",
    detail: "Ensure humans guide, approve, and stay in charge.",
    status: "open",
  },
];

export function cloneBoardContent(content: BoardContent): BoardContent {
  return {
    ...content,
    cards: content.cards.map((card) => ({ ...card })),
  };
}

export function createSampleContent(): BoardContent {
  return cloneBoardContent({
    missionId: "mission-sample",
    mode: "sample",
    goal: SAMPLE_GOAL,
    cards: SAMPLE_CARDS,
    focusedCardId: null,
    wildDrawIndex: 0,
  });
}

function cleanText(value: string, maxLength: number): string {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function createCustomContent(goal: string, ideas: string[]): BoardContent {
  const cleanGoal = cleanText(goal, 140);
  const provided = ideas.map((idea) => cleanText(idea, 90)).filter(Boolean).slice(0, 3);
  const titles =
    provided.length > 0
      ? provided
      : ["Clarify the first useful outcome", "Choose one proof worth showing"];

  return {
    missionId: crypto.randomUUID(),
    mode: "custom",
    goal: cleanGoal,
    cards: titles.map((title, index) => ({
      id: crypto.randomUUID(),
      kind: "idea",
      title,
      detail: index === 0 ? "Shape this into something concrete." : "Decide what success looks like.",
      status: "open",
    })),
    focusedCardId: null,
    wildDrawIndex: 0,
  };
}
