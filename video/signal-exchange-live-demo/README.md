# Signal Exchange — narrated live demo

Final MP4 exported 4 September 2026 after participant review: `renders/signal-exchange-webmcp-demo.mp4`. Duration 139.400 seconds, 1920x1080 H.264 at 30 fps, AAC stereo at 48 kHz, 28,997,169 bytes. Voice-only; no background music. Published publicly to OutSmart Your Brain with participant approval: https://youtu.be/e3yAC_muBbw. YouTube publication confirmed; checks completed with no issues found.

Export verification: full FFmpeg decode completed without errors; eight representative frames from the actual MP4 were visually inspected. Audio is present and non-silent (mean -16.9 dBFS, peak -1.1 dBFS). HyperFrames `check --samples 16` passed before export with no lint, runtime, layout or contrast failures.

## What is real

- Browser frames come from the deployed Signal Exchange app.
- tool-trace.json contains actual WebMCP inputs and structured results from Codex.
- The participant approved and manually committed a rental in their visible browser tab. Codex retrieved its sample data through WebMCP.
- The supplier-controls demonstration and the participant take use equivalent built-in Laneway examples in different tabs; this is an edited tutorial, not a single uninterrupted transaction recording.
- Read delivery returns four actual JSON rows; the totals 785 and 600 are calculated from those synthetic rows.
- Undo and subsequent denied delivery were performed through WebMCP; an agent also published Harbour Weekend Sample.

## Limits and editorial treatment

The application uses local storage, synthetic samples, simulated credits and counterparties. No real commercial data was purchased. Access checks are workflow controls, not DRM. Downloaded copies cannot be recalled.

Idle waits are shortened. Some actual captured frames are held for narration. The precise approval click fell between capture segments; the edit shows the real before/after approval states and the captured manual-commit transition. No fabricated clicks, chat messages or tool responses are inserted. The agent panel contains labelled excerpts from the recorded tool log. Narration is AI-generated Kokoro Nova, loudness-normalized to -16 LUFS / -1.5 dBTP. A human listening review remains part of acceptance.

## Review

Run HyperFrames 0.8.27 from this directory:

```powershell
npx hyperframes@0.8.27 check --samples 16
npx hyperframes@0.8.27 preview --port 3028
```

Studio project: http://localhost:3028/#project/signal-exchange-live-demo (when preview is running).

Verified 4 September 2026: lint passed across all nine composition files; runtime/contrast validation passed with zero errors, warnings or contrast failures; a sixteen-point layout inspection passed with zero findings after correcting the chapter-seven media crop. Main-agent visual review covered all eight chapters and the before/after crop fix. Studio loaded the full 02:19 timeline and playback advanced successfully; the audio track is present and the preview volume is 100%, unmuted. Human listening review is still required.

The optional standalone animation-map utility could not load its `@hyperframes/producer` dependency. Choreography was instead checked through timeline inspection, rendered snapshots, and Studio playback. This is not reported as an animation-map pass.

Captured reference HTML is preserved as `capture/extracted/page-source.html.txt` so Studio does not mistake the captured website for a video composition. Nothing from the source capture was discarded.

The public YouTube demo is available at https://youtu.be/e3yAC_muBbw. `YOUTUBE.md` contains its title, description, chapter timestamps and publication record. Use that URL in the hackathon entry; publishing the video does not submit the project.

## Reproduction

The repository includes the eight HTML chapters, master timeline, vendored animation runtime, normalized narration, prepared footage and the images referenced by the composition. To reproduce the edit, install Node.js and FFmpeg, then run from this directory:

```powershell
npx --yes hyperframes@0.8.27 check --samples 16
npx --yes hyperframes@0.8.27 render . --output renders/signal-exchange-webmcp-demo.mp4 --quality high
```

The render uses the included media; no model download, API key or voice regeneration is needed. Raw frame captures, duplicate working audio, intermediate snapshots, cache directories and the final rendered MP4 are kept out of Git. Their absence does not prevent rendering the prepared composition. Source-capture extraction and original voice/frame regeneration are optional production steps below, not prerequisites for replaying the edit.

Third-party notice: `vendor/gsap.min.js` is GSAP 3.15.0 and retains its original GreenSock copyright and Standard License notice. The repository's MIT license does not replace that dependency's terms.

- beats.json: exact spoken scene text.
- prepare-media.mjs voice: writes narration.txt and per-scene text files.
- generate-voice.py: produces measured local narration using Kokoro ONNX model/voice paths passed as arguments.
- transcribe-voice.py: local faster-whisper fallback because whisper-cpp was absent.
- prepare-media.mjs footage: converts raw captured browser frames into playable clips, shortening long idle waits. raw-frames is ignored by Git.
- timing.json and transcript.json: measured segment lengths and ASR word timestamps. ASR contains minor proper-name spelling errors; visible text follows the real app and approved script.
- evidence/: actual delivered sample, manifest and recording provenance.

Source requirement checked 4 September 2026: https://webmcp.devpost.com/ — public YouTube demo under three minutes, with audio covering the product and WebMCP use.
