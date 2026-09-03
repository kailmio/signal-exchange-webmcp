import { describe, expect, it } from "vitest";
import { createSampleContent } from "../domain/sampleMission";
import { getPowerAvailability, previewPower, recommendPower } from "../domain/powers";
import type { PowerId } from "../domain/types";

describe("power engine", () => {
  it("creates a stable playable sample", () => {
    const first = createSampleContent();
    const second = createSampleContent();
    expect(first).toEqual(second);
    expect(new Set(first.cards.map((card) => card.id)).size).toBe(first.cards.length);
    expect(recommendPower(first).power).toBe("forge");
    expect(getPowerAvailability(first).find((power) => power.id === "focus")?.available).toBe(false);
  });

  it("forges one idea into four checked actions", () => {
    const result = previewPower(createSampleContent(), "forge", "idea-tangible");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const actions = result.data.proposedContent.cards.filter((card) => card.kind === "action");
    expect(actions).toHaveLength(4);
    expect(actions.every((card) => card.completionCheck && /^[A-Z]/.test(card.title))).toBe(true);
    expect(result.data.proposedContent.cards.find((card) => card.id === "idea-tangible")?.status).toBe("forged");
  });

  it("rejects missing and already-forged Forge targets", () => {
    const missing = previewPower(createSampleContent(), "forge");
    expect(missing.ok ? "" : missing.error.code).toBe("TARGET_REQUIRED");
    const forged = previewPower(createSampleContent(), "forge", "idea-tangible");
    if (!forged.ok) throw new Error("fixture should forge");
    const repeat = previewPower(forged.data.proposedContent, "forge", "idea-tangible");
    expect(repeat.ok ? "" : repeat.error.code).toBe("POWER_UNAVAILABLE");
  });

  it("focuses exactly one action", () => {
    const forged = previewPower(createSampleContent(), "forge", "idea-tangible");
    if (!forged.ok) throw new Error("fixture should forge");
    const focused = previewPower(forged.data.proposedContent, "focus");
    expect(focused.ok).toBe(true);
    if (!focused.ok) return;
    expect(focused.data.proposedContent.cards.filter((card) => card.status === "focused")).toHaveLength(1);
    expect(focused.data.proposedContent.focusedCardId).toBeTruthy();
    expect(recommendPower(forged.data.proposedContent).power).toBe("focus");
    expect(recommendPower(focused.data.proposedContent).power).toBe("forge");
  });

  it("exposes only Forge and Focus", () => {
    expect(getPowerAvailability(createSampleContent()).map((power) => power.id)).toEqual(["forge", "focus"]);
    const invalid = previewPower(createSampleContent(), "random" as PowerId);
    expect(invalid.ok ? "" : invalid.error.code).toBe("INVALID_INPUT");
  });
});
