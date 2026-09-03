# Mission Deck Walkthrough Design

## Overview

Mission Deck is a near-black mission-control canvas split between a spacious planning board and a narrow activity rail. Thin borders, exact spacing, and large tactile power cards make the interface feel dependable; amber, cyan, violet, and green communicate the progression from idea to action to surprise. The walkthrough must preserve the product as evidence while adding a calm instructional layer: numbered steps, a visible cursor, short callouts, and a persistent human-control reminder.

## Colors

- **Primary Canvas**: `#070C10` — full-frame background.
- **Header Surface**: `#080D11` — navigation and tutorial chrome.
- **Raised Surface**: `#151E24` — callouts and instruction panels.
- **Primary Text**: `#F2F2ED` — headings and core labels.
- **Muted Text**: `#9AA4AA` — explanations.
- **Quiet Text**: `#69757C` — metadata.
- **Forge Amber**: `#F3A237` — select and create.
- **Focus Cyan**: `#27B9EF` — prioritize.
- **Wild Violet**: `#9B65EE` — bounded surprise.
- **Agent Ready**: `#17C968` — live WebMCP connection.
- **Error Coral**: `#EF6B68` — rejection and safety boundaries.

## Typography

- **Display**: Arial Narrow (700/800), with Arial fallback. Use for step numbers, power names, and short instructional headlines.
- **Interface**: Arial (400/700), with sans-serif fallback. Use for body text and button labels; this preserves the captured app's utilitarian register without relying on an unavailable video font.
- **Technical labels**: JetBrains Mono (500/700), with monospace fallback. Use for tool names, prompts, and state labels.
- Headlines: 72–96px. Instruction body: 28–34px. Labels: 18–22px.

## Elevation

Depth comes from one-pixel `#334048` borders, localized accent bloom, clipped screenshots, and annotation lines. Tutorial callouts sit on `#151E24` with a crisp colored edge and restrained black shadow. Never blur the product proof so heavily that controls or state changes become unreadable.

## Components

- **Product Stage**: full-size captured Mission Deck state, gently panned or zoomed.
- **Step Rail**: six numbered markers showing where the viewer is in the walkthrough.
- **Instruction Card**: one action plus one reason, no paragraph walls.
- **Cursor Beacon**: white pointer with accent ring and click pulse.
- **Target Box**: animated outline around the exact control or result being discussed.
- **State Badge**: `PREVIEW — NO CHANGE`, `COMMITTED`, or `RESTORED` proof cue.
- **Human / Agent Legend**: persistent reminder that either can propose while the person approves.

## Do's and Don'ts

### Do's

- Keep the real product state visible in every instructional beat.
- Use one numbered action at a time and repeat the exact visible control label.
- Move through amber → cyan → violet → green as the workflow develops.
- Hold hero frames long enough to read before moving the cursor.
- Make preview, commit, and undo visually distinct.

### Don'ts

- Do not open with abstract positioning or a cinematic manifesto.
- Do not invent controls or imply that Wild runs arbitrary code.
- Do not cover the approval button, activity history, or focused result.
- Do not use tiny web-sized labels, chat bubbles, or generic AI gradients.
- Do not imply that the agent can bypass human approval.
