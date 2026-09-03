import { readFile, writeFile } from "node:fs/promises";

const paragraphs = (await readFile(new URL("./narration.txt", import.meta.url), "utf8"))
  .trim()
  .split(/\r?\n\s*\r?\n/);

// Boundaries come from ffmpeg silencedetect on narration.wav. The very short
// Focus sentence shares a spoken segment with the start of Wild, so it gets a
// proportional split at 26.35s.
const bounds = [
  [0.18, 7.09],
  [7.09, 13.60],
  [13.60, 24.05],
  [24.05, 26.35],
  [26.35, 31.67],
  [31.67, 39.11],
  [39.11, 41.25],
  [41.25, 52.02],
];

const transcript = paragraphs.flatMap((paragraph, paragraphIndex) => {
  const words = paragraph.split(/\s+/);
  const [start, end] = bounds[paragraphIndex];
  const weights = words.map((word) => Math.max(1, word.replace(/[^\p{L}\p{N}]/gu, "").length));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = start;
  return words.map((text, index) => {
    const duration = ((end - start) * weights[index]) / totalWeight;
    const item = { text, start: Number(cursor.toFixed(3)), end: Number((cursor + duration).toFixed(3)) };
    cursor += duration;
    return item;
  });
});

await writeFile(new URL("./transcript.json", import.meta.url), `${JSON.stringify(transcript, null, 2)}\n`);
