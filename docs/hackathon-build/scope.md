# Project Scope

## Project Name Candidates

- Deliberately unnamed during planning. The participant will choose the final name before submission.

## One-Line Summary

A polished shared mission board where a person manipulates visible cards and an agent uses WebMCP to inspect the live board, recommend a power, preview its effect, and—with human approval—play a state-changing card.

## Target User

The first user is a solo maker or small creative team working with an AI agent to turn a fuzzy project goal into a focused, executable plan. The longer-term ambition is a broadly accessible interaction pattern for ordinary web users, but the hackathon MVP deliberately proves it in one narrow workflow.

## Problem

Today, people commonly work in a web app while an agent operates in a separate chat. The agent receives incomplete context, its recommendations arrive as detached text, and the person has weak visibility into what will change. This makes agentic work feel abstract, difficult to trust, and tedious to translate back into the interface.

The project tests a different interaction model: agent capabilities are tangible cards in the same visual space as the user's work. The agent can understand the current board and recommend a card, but consequential changes are previewed, visible, and undoable.

## Core Workflow

1. The user opens a visually complete sample mission or enters a short goal.
2. The app shows a shared board containing the mission, idea cards, a highlighted next-action area, a three-card hand, and an activity history.
3. Through WebMCP, the agent calls a read-only board inspection tool and discovers the available card powers.
4. The agent recommends one card and explains why it fits the current board.
5. The agent previews a proposed play. The app renders the exact pending change before mutation.
6. After the person approves, the agent commits the play using the preview token.
7. The board animates to its new state and records the action in an undoable history.
8. The person can undo the last play or ask the agent for another recommendation.

## What We Are Building

### Product surface

- One original, polished, responsive single-page web application.
- A dark, restrained mission-control canvas with collectible-card theatre: crisp hierarchy and fast interaction inspired by Linear, a shared visual board inspired by Miro, and satisfying card reveals inspired by modern deck-building games.
- A preloaded sample mission for an immediate judge demo, plus a small input for starting a custom mission.
- Persistent local state using browser storage; no account is required.
- A visible WebMCP connection/status indicator, recent tool activity, pending preview, and undo affordance.

### The three powers

1. **Forge** — expands one vague idea card into a short sequence of concrete actions with acceptance checks.
2. **Focus** — selects the highest-leverage next action, moves it into focus, and visually quiets lower-priority work.

### WebMCP contract

- `inspect_mission_board` — returns the current goal, cards, focus state, and recent history.
- `list_card_powers` — returns card descriptions, constraints, and whether each is currently playable.
- `preview_card_play` — validates a proposed Forge or Focus play and creates a short-lived preview token without mutating the board.
- `commit_card_play` — applies the exact previewed change using its token and records it in history.
- `undo_last_play` — reverses the latest committed card play.
- `load_demo_mission` — restores the known demonstration state.

The same domain functions power manual UI controls and WebMCP tools so the visible app and agent interface cannot drift apart.

### Time budget

The participant has 10–12 build hours. The scope ruler is:

- 1–2 hours: finish planning documents and lock interaction states.
- 5–6 hours: implement the board, domain model, three powers, and WebMCP registration.
- 2 hours: animation, responsive layout, accessibility, and browser testing.
- 1–2 hours: deploy, record the demo, complete the public repository, and prepare the Devpost entry.

## What We Are Not Building

- A browser extension or a system that modifies arbitrary third-party websites.
- A card marketplace, plugin SDK, user-authored scripts, or installable card packs.
- Accounts, authentication, cloud sync, multiplayer presence, or a backend database.
- A separate embedded AI model or API dependency; the connected WebMCP-capable agent supplies intelligence.
- Unbounded arbitrary code execution.
- Dozens of powers, complex deck construction, combat rules, currencies, progression, or collectibles.
- Third-party visual assets or source copied from Card Master.
- Drag-and-drop as a requirement; direct controls take priority unless time remains.

## Inspiration And References

- LYiHub Card Master: the idea of representing browser capabilities as playable cards and giving each capability a distinct visual identity.
- Slay the Spire and other deck builders: readable effects, anticipation, reveal, and consequence.
- Miro/FigJam: a shared spatial surface where collaborators see the same evolving state.
- Linear: restrained visual design, speed, clear state transitions, and trustworthy history.

The implementation and visual assets will be original. The GPL-licensed Card Master repository is used only as product-pattern research.

## Demo Path

1. Open directly into a polished sample mission with several deliberately vague idea cards.
2. Ask the agent to inspect the board and recommend a power.
3. The agent recommends **Forge**, previews an expansion, receives approval, and commits it; the board visibly unfolds into actionable steps.
4. Ask for the best next move. The agent recommends and plays **Focus**, centering one high-leverage action.
5. Undo the Focus play to demonstrate human control and trustworthy reversibility.

The core interaction should be understandable in the first 15 seconds and demonstrable in roughly 60–90 seconds.

## Submission Story

Most agent experiences hide capability behind chat. This project makes agent actions tangible: powers are visible, inspectable cards; the agent understands the same live state the person sees; and every mutation follows a preview/approval/commit loop with history and undo. WebMCP is not an integration badge—it is the coordination layer that lets the agent participate directly in the product.

The entry will emphasize WebMCP leverage, coherent execution, a credible trust problem, and the creative card metaphor. The final public repository will include a clear open-source license, implementation notes, browser-testing instructions, and an explicit statement that the referenced Card Master project supplied inspiration only.
