import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2] || 'footage';
if (mode === 'footage') {
  fs.mkdirSync(path.join(root, 'footage'), { recursive: true });
  const shots = fs.readdirSync(path.join(root, 'raw-frames'), { withFileTypes: true }).filter(x => x.isDirectory());
  const report = [];
  for (const shot of shots) {
    const folder = path.join(root, 'raw-frames', shot.name);
    const manifest = JSON.parse(fs.readFileSync(path.join(folder, 'frames.json'), 'utf8'));
    if (!manifest.frames.length) continue;
    const lines = [];
    let duration = 0;
    manifest.frames.forEach((frame, i, frames) => {
      const gap = i < frames.length - 1 ? frames[i + 1].timestamp - frame.timestamp : 2;
      const hold = Math.max(1 / 30, Math.min(gap, 2.5));
      lines.push(`file '${frame.file}'`, `duration ${hold.toFixed(6)}`);
      duration += hold;
    });
    lines.push(`file '${manifest.frames.at(-1).file}'`);
    const concat = path.join(folder, 'frames.ffconcat');
    fs.writeFileSync(concat, lines.join('\n'));
    const output = path.join(root, 'footage', shot.name + '.mp4');
    execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concat, '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30', '-c:v', 'libx264', '-crf', '17', '-preset', 'fast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output]);
    report.push({ shot: shot.name, duration: Math.round(duration * 1000) / 1000, frames: manifest.frames.length, realStart: manifest.start, realEnd: manifest.end, note: 'Real browser frames; gaps longer than 2.5 seconds shortened. No generated UI or mouse actions.' });
  }
  fs.writeFileSync(path.join(root, 'footage', 'manifest.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
if (mode === 'voice') {
  const beats = JSON.parse(fs.readFileSync(path.join(root, 'beats.json'), 'utf8'));
  fs.mkdirSync(path.join(root, 'voice'), { recursive: true });
  fs.writeFileSync(path.join(root, 'narration.txt'), beats.map(b => b.text).join('\n\n'));
  for (const b of beats) fs.writeFileSync(path.join(root, 'voice', b.id + '.txt'), b.text);
  console.log('Prepared narration text for ' + beats.length + ' scenes; ' + beats.map(b => b.text).join(' ').split(/\s+/).length + ' words.');
}
