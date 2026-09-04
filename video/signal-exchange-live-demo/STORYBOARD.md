# Recorded walkthrough storyboard

Format: 1920x1080 landscape, under three minutes. Audio: Kokoro neural voiceover; no music competing with instruction. Source: DESIGN.md. Final timing comes from generated voice segments and transcription, not these estimates.

## Locked measured timing

The generated narration is 139.376 seconds. Transcription was read in full and covers all eight chapters, with minor ASR spelling errors (Laneway, Surry Hills, copies). This is not a substitute for a human listening review. Preserve exact on-screen spelling from the app, not these ASR mistakes. No burned-in captions are requested. Review audio measures -16.76 LUFS / -1.49 dBTP after normalization.

| Beat | Start | Duration |
| --- | ---: | ---: |
| 01-problem | 0.000 | 13.673 |
| 02-supplier | 13.673 | 16.723 |
| 03-agent | 30.396 | 16.809 |
| 04-negotiate | 47.205 | 17.385 |
| 05-handoff | 64.589 | 16.446 |
| 06-delivery | 81.035 | 20.819 |
| 07-control | 101.855 | 16.105 |
| 08-webmcp | 117.959 | 21.417 |

Use each voice segment's measured boundaries, with local transcript cues within the beat. Prior estimated durations below are superseded by this table.

## Composition contract

Each beat is one external template in compositions/ with composition ID matching timing.json. Build a 1920x1080 root with data-start=0 and the measured duration. Use scoped CSS. Scene-content fills the canvas with flex column, padding 44px 48px, gap 18px. Header label 22px, a short headline 60px, then the main evidence row flex:1 and a footer 20px. Use the actual screenshot/video large (about 1320x742) with an adjacent 456px annotation column; when a portrait-ish participant viewport is used, crop a meaningful page region or make the screenshot and trace larger, never distort it. All body text >=24px. Video muted playsinline, timed with unique IDs and data-track-index. No video inside a timed div. Use a non-timed wrapper and hold its last captured frame when the clip ends. Root handles chapter transitions, so no beat exits. All visible regions have restrained entrance animation, using three eases across the regions. Do not animate actual UI labels independently from the screenshot. The actual recording supplies mid-scene motion; avoid distractingly floating screenshots. CSS end layout is authoritative. Vendor GSAP is ../vendor/gsap.min.js. Root handles all narration and transitions; sub-compositions contain no audio.

Footage clips in footage/manifest.json have shortened idle gaps. Use their actual durations. Later remaining time may hold the last real frame (copy raw-frames/<shot>/<last-frame> into evidence/ via normal binary asset copy), explicitly show "Recorded session · waits shortened". Never fabricate clicks or insert mock state. For the handoff, 09e shows before approval and 09f starts AFTER approval and records the participant's manual commit. The precise approval click fell between capture segments; show the real before/after states, not an animated fake click. Use a clear crossfade between takes.

## Asset audit

Compatibility correction: HyperFrames 0.8.27 Studio resolves external composition assets from the project root. Use `vendor/gsap.min.js`, `footage/`, `evidence/`, and `capture/` without `../`, superseding the earlier generic relative-path contract.

| Asset | Assignment | Treatment |
| --- | --- | --- |
| capture/screenshots/scroll-000.png | 01, 08 | Establish the real product; gentle camera settle |
| capture/screenshots/scroll-100.png | Reference only | Superseded by live footage |
| capture/screenshots/full-page.png | Reference only | Too tall for instructional video |
| capture/assets/svgs/logo-2685cc99.svg | 01, 08 | Brand compass, restrained entrance |
| Other captured SVG icons | Skip | Already visible inside actual recordings |
| footage/*.mp4 | 02–07 | Actual browser recording, no fabricated UI |
| tool-trace.json | 03–08 | Clearly labelled, verbatim response excerpts |

## 01 — The problem (estimated 15s)

Show the marketplace large, with the compass and the organiser's goal. The viewer should immediately understand the task. Screen, heading, goal, chapter number and footer provide five purposeful layers of information, without decorative clutter. Camera settles onto the real screen, heading enters from the left, goal appears in brass. Use photo/video compositing plus a short structural rule reveal. Crossfade to publisher.

## 02 — Human controls (estimated 20s)

Actual recordings 01-open-publisher, 02-review-sample and 03-publish. Let the viewer read the source, licence, minimum and structured rows. Annotation panel names the three things being supplied: rows, provenance and terms. Browser footage provides the motion; editorial labels enter in order. No fake cursor or substituted app content. Crossfade.

## 03 — Agent perspective (estimated 22s)

Actual recordings 04-agent-search, 05-agent-inspect and 06-agent-compare. Pair large browser footage with excerpts from the real discovery and call log. Cyan tool names, warm returned values. Explain that tool results are edited excerpts, not a reconstructed chat. Page selection changes correspond to actual calls. Crossfade.

## 04 — Negotiate (estimated 19s)

Actual proposal and approval-required recordings. Hold on bid 20, price 22 and unchanged wallet. Quote the actual HUMAN_APPROVAL_REQUIRED result in coral. Show seller's floor is deterministic local logic, not a remote agent conversation. Crossfade.

## 05 — Human handoff (estimated 18s)

Use 09e for the before-approval state and 09f for the actual approved state and manual commit, followed by agent delivery. The precise approval click is not captured. Show buyer 78 and seller 22. Do not imply Codex clicked approval or committed this take. The recording is edited from two equivalent built-in examples in separate browser tabs; clearly label the switch to the participant's browser. Crossfade.

## 06 — Delivery (estimated 24s)

Record read_rented_data and actual UI download controls. Show returned JSON beside the app. The four synthetic rows are the proof; illustrative totals 785 and 600 are derived from those rows, never external evidence. Show exact licence/manifest. Crossfade.

## 07 — Control and reverse direction (estimated 17s)

Record undo followed by rejected read, then agent publication of a second synthetic listing. Show ACCESS_REQUIRED and the AGENT attribution. Retain the warning that downloaded files cannot be recalled. Crossfade.

## 08 — Implementation and limits (estimated 24s)

Use the real registration source excerpt, compass, shared-service explanation and product frame. Ten typed tools and a shared command service are explanatory overlays, not fabricated tool output. Close with the public app and repository, local-demo limit, and AI-narration disclosure. Gentle final fade only.

## Production files

index.html; DESIGN.md; SCRIPT.md; STORYBOARD.md; beats.json; narration.txt; narration.wav; transcript.json; capture/; raw-frames/ (ignored); footage/; tool-trace.json; compositions/; snapshots/.
