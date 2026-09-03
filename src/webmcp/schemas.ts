export const EMPTY_SCHEMA = { type: "object", properties: {}, additionalProperties: false } as const;

export const PREVIEW_SCHEMA = {
  type: "object",
  properties: {
    power: {
      type: "string",
      enum: ["forge", "focus"],
      description: "The visible power card to preview.",
    },
    targetCardId: {
      type: "string",
      description: "Required for Forge. Use a card ID returned by inspect_mission_board.",
      maxLength: 100,
    },
  },
  required: ["power"],
  additionalProperties: false,
} as const;

export const COMMIT_SCHEMA = {
  type: "object",
  properties: {
    previewToken: {
      type: "string",
      description: "The token returned by preview_card_play for the exact visible preview.",
      maxLength: 100,
    },
  },
  required: ["previewToken"],
  additionalProperties: false,
} as const;

export const LOAD_DEMO_SCHEMA = {
  type: "object",
  properties: {
    confirmReplace: {
      type: "boolean",
      description: "Set true to acknowledge that modified board state will be replaced.",
    },
  },
  required: ["confirmReplace"],
  additionalProperties: false,
} as const;
