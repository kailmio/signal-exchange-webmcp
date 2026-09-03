import { readFile, writeFile } from "node:fs/promises";

const paragraphs = (await readFile(new URL("./narration.txt", import.meta.url), "utf8"))
  .trim()
  .split(/\r?\n\s*\r?\n/);

// Deterministic paragraph bounds derived from ffmpeg silencedetect on the
// af_nova 0.88x narration. Word timing inside each paragraph is weighted by
// spoken token length; these timestamps drive only beat mapping, not captions.
const bounds = [
  [0.18, 3.683],
  [4.11, 11.526],
  [11.906, 29.995],
  [30.716, 40.67],
  [41.081, 48.757],
  [49.228, 56.925],
  [57.424, 60.8],
  [60.8, 63.15],
];

if (paragraphs.length !== bounds.length) {
  throw new Error(`Expected ${bounds.length} narration paragraphs, found ${paragraphs.length}`);
}

const transcript = paragraphs.flatMap((paragraph, paragraphIndex) => {
  const words = paragraph.split(/\s+/);
  const [start, end] = bounds[paragraphIndex];
  const weights = words.map((word) => Math.max(1, word.replace(/[^\p{L}\p{N}]/gu, "").length));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = start;

  return words.map((text, index) => {
    const duration = ((end - start) * weights[index]) / totalWeight;
    const item = {
      text,
      start: Number(cursor.toFixed(3)),
      end: Number((cursor + duration).toFixed(3)),
    };
    cursor += duration;
    return item;
  });
});

await writeFile(new URL("./transcript.json", import.meta.url), `${JSON.stringify(transcript, null, 2)}\n`);
