# Product Requirements Document

## Product Summary

This product is a polished, self-contained mission-planning web application in which a person and a WebMCP-capable agent collaborate on the same visible board. The person's goal and ideas appear as tangible cards. Two power cards—Forge and Focus—let the board evolve through clear, dramatic, reversible actions.

The agent does more than answer in a separate chat. It can inspect the board's current state, understand which powers are available, recommend a suitable card, prepare an exact preview, and apply that preview after explicit human approval. The person can also explore and play the same cards directly in the interface.

The defining product promise is: **agent actions become visible objects with understandable consequences**. A person should always be able to see what the agent knows, what it proposes, what will change, what already changed, and how to undo it.

The hackathon version proves this interaction model through one narrow workflow: turning a fuzzy project mission into an actionable next move. It is not a universal browser layer or a general project-management suite.

## Product Principles

1. **Shared state, not parallel conversations.** The board is the source of truth for both the person and the agent.
2. **Recommendation before action.** The agent explains which card fits the current situation before a change is proposed.
3. **Preview before mutation.** Every state-changing card reveals its exact effect before it can be committed.
4. **Human control is visible.** Approval, rejection, expiration, history, and undo are product states rather than implied chat etiquette.
5. **Theatre serves comprehension.** Card motion and visual spectacle make cause and effect easier to follow; they must not hide or delay the result.
6. **The demo begins immediately.** A judge should understand the premise within 15 seconds without creating an account, reading documentation, or entering data.
7. **Graceful capability boundaries.** When WebMCP is unavailable, the product says so plainly and remains explorable through manual controls.

## Target User

### Primary user

A solo maker, designer, developer, or small creative team member who has a fuzzy project goal and is collaborating with an AI agent to decide what to do next.

The primary user:

- is comfortable asking an agent for help but dislikes copying advice between chat and a work surface;
- needs to turn vague ideas into concrete work quickly;
- wants the speed of agentic action without surrendering awareness or control;
- values an interface that feels expressive and alive rather than administrative;
- may be encountering WebMCP for the first time.

### Secondary user

A hackathon judge or curious visitor who wants to understand and test the human-agent interaction model quickly. This person may spend less than two minutes with the live application and may judge partly from the video and written description.

### Future audience

The long-term ambition is a familiar card-based interaction language for ordinary web users. That broader audience is an aspiration, not a requirement for this version.

## User Problem

Current agent-assisted work often splits one task across two disconnected surfaces: the person sees the application, while the agent responds in chat with incomplete context. Recommendations are delivered as prose, changes may happen without a legible preview, and the person has to translate or verify the result manually.

This creates three practical failures:

- **Context failure:** the agent may not understand the live state the person sees.
- **Action ambiguity:** the person may not know exactly what an agent action will change.
- **Trust failure:** completed actions are difficult to audit, reverse, or distinguish from suggestions.

The product addresses those failures by making available actions into visible cards, giving the agent structured access to the board, and requiring a preview/approval/commit sequence for mutation.

## Success Definition

The product succeeds when a first-time visitor can:

1. understand that the visible board is shared with an agent;
2. ask an agent to inspect it and receive a contextually sensible card recommendation;
3. see the exact proposed effect before anything changes;
4. approve the change and watch the board update clearly;
5. undo a committed play;
7. repeat the core experience without reloading or repairing the application.

For the submission demo, the complete sequence should fit comfortably into 60–90 seconds.

## Core User Journey

### 1. Immediate arrival

The visitor opens the application directly into a complete sample mission. The screen already contains:

- a concise mission statement;
- several deliberately vague idea cards;
- an empty or uncommitted focus area;
- the Forge and Focus power cards;
- a small agent-readiness indicator;
- a compact activity history;
- a secondary action to start a custom mission.

The interface contains one short sentence explaining the loop: ask an agent to inspect the board, review its recommendation, and approve a card play.

### 2. Agent inspection and recommendation

The visitor asks a connected agent to inspect the board and recommend a card. The agent receives the current mission, visible cards, focus state, available powers, and recent history.

The agent recommends one power and gives a short reason tied to the current board. A recommendation does not change the board. The interface visibly records that the board was inspected and may highlight the recommended card without implying that it has been played.

### 3. Preview

The visitor asks the agent to preview the recommended play. A preview surface appears in the application and shows:

- the selected power;
- the target card or affected board area;
- the exact additions, removals, moves, or text changes;
- a short rationale;
- a clear statement that the board has not changed yet;
- approve and cancel actions;
- an indication that the preview is temporary.

Only one preview may be active at a time.

### 4. Approval and commit

The person approves either by using the visible approve control or by explicitly asking the agent to commit the preview. The exact previewed change is applied; the application does not silently regenerate a different result during commitment.

The relevant card animates, affected board items move or unfold, and the history records a human-readable summary. The result remains understandable with motion disabled.

### 5. Continued play

The visitor repeats the loop with another power. The updated board state influences the next recommendation. A power that is no longer useful should be described as unavailable or low-value rather than blindly recommended.

### 6. Undo

The visitor undoes the latest committed play. The board returns to its immediately previous committed state, the reversal is visible, and history records the undo. Undo never resurrects an expired or cancelled preview.

### 7. Reset or custom mission

The visitor can restore the original sample mission at any time. They can also start a custom mission by entering a short goal. A custom mission opens with a small set of starter idea cards so the board is never a dead blank canvas.

## Epics And User Stories

### Epic 1: Understand the product immediately

#### Story 1.1 — Start with a complete demonstration

As a first-time visitor, I want to see a meaningful mission and playable board immediately so that I can understand the product without setup.

Acceptance criteria:

- Opening the live URL displays a complete sample board without login, onboarding, or required typing.
- The mission, idea cards, three power cards, readiness state, and history are visible in the first viewport on a typical laptop.
- The page includes one concise instruction describing the inspect, recommend, preview, and approve loop.
- No empty skeleton, setup wizard, or blocking modal appears on first load.
- A clearly secondary action offers a custom mission without competing with the main demo.

#### Story 1.2 — Understand whether agent interaction is available

As a visitor, I want to know whether my browser supports the agent interaction so that I do not mistake an unavailable capability for a broken application.

Acceptance criteria:

- The interface displays one of three plain-language states: Agent ready, Checking agent connection, or Manual demo mode.
- The state does not rely on color alone.
- Manual demo mode briefly explains that the card experience remains available but direct agent tools require a WebMCP-capable browser.
- The board remains usable while capability status is being checked.

### Epic 2: Create and understand a mission board

#### Story 2.1 — Read the board at a glance

As a maker, I want to understand my mission, current ideas, and selected next action at a glance so that I know what state the project is in.

Acceptance criteria:

- The mission is visually distinct from idea cards and the power-card hand.
- Each idea card has a stable title, short description, and visible status.
- The focus area clearly indicates either the selected next action or that no action has been focused yet.
- Recently changed cards are visually distinguishable without obscuring their text.
- The board remains understandable when animations are disabled.

#### Story 2.2 — Start a custom mission

As a maker, I want to enter my own short goal so that I can test the card interaction on something relevant to me.

Acceptance criteria:

- A visitor can open the custom-mission action from the sample board.
- The form asks for one required mission statement and offers up to three optional starter ideas.
- Whitespace-only goals cannot be submitted, and the reason is shown next to the field.
- Creating a mission replaces the current board only after an explicit confirmation.
- A custom mission begins with at least two usable idea cards, using neutral starter prompts when optional ideas were not supplied.
- The visitor can restore the sample mission afterward.

#### Story 2.3 — Preserve committed work

As a returning visitor, I want my committed board to survive a refresh so that an accidental reload does not erase progress.

Acceptance criteria:

- Refreshing restores the most recent committed mission, cards, focus state, and history.
- An active but uncommitted preview is discarded on refresh.
- After refresh, a short history entry or notice explains that the pending preview was not applied.
- If saved board data cannot be read, the application loads the sample mission and displays a recoverable notice instead of a blank or broken page.

### Epic 3: Receive a useful card recommendation

#### Story 3.1 — Let the agent inspect shared state

As a person collaborating with an agent, I want the agent to read the same board I see so that its advice reflects the current mission rather than a copied description.

Acceptance criteria:

- An inspection returns the visible mission, all current idea cards, current focus, playable powers, and recent committed actions.
- Inspection does not mutate, select, reorder, or focus anything.
- The interface records that an inspection occurred without presenting it as a completed card play.
- Repeated inspection returns the updated committed state after a card has been played or undone.

#### Story 3.2 — Receive a contextual recommendation

As a maker, I want the agent to recommend a power with a reason tied to my board so that the recommendation feels purposeful.

Acceptance criteria:

- A recommendation names one of the currently available powers.
- The reason references a visible mission detail, idea card, or focus state.
- The recommended card becomes subtly highlighted on the board.
- Highlighting a recommendation does not create a preview or mutate the mission.
- If no power is useful, the agent can state that plainly rather than forcing a recommendation.

### Epic 4: Preview and control every mutation

#### Story 4.1 — See exact consequences before approval

As the owner of the board, I want to preview a card's exact effect so that I can decide whether to allow it.

Acceptance criteria:

- The preview identifies the power and every board item that would change.
- Added content, removed content, movement, and status changes are visually differentiated.
- The preview explicitly states that no change has been applied.
- During preview, the committed card text, ordering, keyboard focus, and history do not change.
- The preview can be cancelled without producing a history entry for a committed play.
- Creating a second preview replaces the first only after the interface makes the replacement clear.

#### Story 4.2 — Approve the exact preview

As the owner of the board, I want approval to apply exactly what I reviewed so that the agent cannot substitute a different result.

Acceptance criteria:

- Approval applies the same affected items and text shown in the active preview.
- A changed, expired, cancelled, or missing preview cannot be committed.
- Rejected commits leave the board unchanged and explain what the visitor should do next.
- Approval can be initiated from the visible board or through an explicit instruction to the agent.
- After approval, the preview closes, the board updates, and a new history item appears.

#### Story 4.3 — Cancel safely

As the owner of the board, I want to reject a proposal without side effects so that exploration feels safe.

Acceptance criteria:

- Cancel returns the interface to the prior committed state.
- No idea card, focus state, or mission text changes.
- The cancelled preview cannot later be committed.
- The interface remains ready for a new recommendation or preview.

### Epic 5: Play Forge

#### Story 5.1 — Turn ambiguity into actionable work

As a maker with a vague idea, I want Forge to expand it into a short action sequence so that I know what concrete progress looks like.

Acceptance criteria:

- Forge requires one existing idea card as its target.
- The preview shows between three and five proposed action cards.
- Every proposed action has a concise verb-led title and one observable completion check.
- The preview preserves the original idea and shows how it will be marked after expansion.
- On approval, the action cards appear in a readable sequence and the source idea is visibly marked as forged.
- Forge cannot silently target a different idea during commitment.
- Attempting to Forge an already forged card produces a clear no-change result and suggests selecting another idea.

### Epic 6: Play Focus

#### Story 6.1 — Choose one highest-leverage next action

As a maker with multiple possible actions, I want Focus to elevate one next move so that I can stop scanning and begin.

Acceptance criteria:

- Focus requires at least one actionable card.
- The preview names the proposed action and explains why it has priority in one short sentence.
- The preview identifies any previous focus that will be replaced.
- On approval, exactly one action occupies the focus area.
- Non-focused cards remain available but become visually quieter rather than disappearing.
- Playing Focus again can replace the current choice through the same preview and approval flow.
- When no actionable card exists, Focus explains that Forge or adding an idea is required first.

### Epic 8: Understand history and reverse a play

#### Story 8.1 — See what happened

As a collaborator, I want a concise activity history so that I can distinguish inspection, preview, commitment, cancellation, reset, and undo.

Acceptance criteria:

- History is visible without covering the board.
- Each entry has a timestamp or relative order, an action label, and a short human-readable result.
- Agent-originated and direct manual actions are distinguishable using text or iconography, not color alone.
- The latest committed play is visually identifiable as undoable.
- History does not display hidden system data or raw internal payloads in the primary view.

#### Story 8.2 — Undo the latest committed play

As the owner of the board, I want to undo the latest play so that experimentation remains trustworthy.

Acceptance criteria:

- Undo is available after a committed Forge or Focus play.
- Undo restores the immediately previous committed board state.
- Undo creates its own history entry.
- A second undo is unavailable in the MVP unless a newer card is played after the first undo.
- Inspection, recommendation highlighting, preview, cancellation, and reset notices are not treated as undoable card plays.
- Reset creates a new baseline, is not an undoable card play, and leaves undo unavailable until another card is committed.
- If no play is undoable, the interface explains that nothing has changed yet.

### Epic 9: Explore without a connected agent

#### Story 9.1 — Use manual demo mode

As a visitor without WebMCP support, I want to explore the same card effects manually so that I can still understand the product.

Acceptance criteria:

- Manual demo mode keeps Forge, Focus, preview, approval, history, undo, and reset available.
- Manual controls use the same visible product states as agent-triggered actions.
- For the same starting board and selected card, manual and agent-triggered play produce the same committed board and an equivalent history result.
- The interface clearly distinguishes manual demonstration from a live agent tool call.
- The product does not claim that WebMCP is connected when it is not.
- A short, non-blocking explanation tells the visitor how to test the live WebMCP path in a supported browser.

### Epic 10: Feel polished and dependable

#### Story 10.1 — Follow state changes visually

As a visitor, I want card actions to feel satisfying and legible so that the product's cause-and-effect model is memorable.

Acceptance criteria:

- Forge, Focus, commit, and undo each have a distinct visual treatment that completes within one second and never delays access to controls.
- Essential information remains readable during and after animation.
- Motion never blocks approval, cancellation, or recovery.
- Reduced-motion preferences replace large transitions with restrained fades or immediate state changes.
- The interface never relies on particle effects or animation as the only confirmation of success.

#### Story 10.2 — Use the core demo across screen sizes

As a visitor, I want the core experience to remain usable on a laptop or narrow mobile viewport so that the live demo is resilient.

Acceptance criteria:

- At a 1280 by 800 CSS-pixel viewport, the mission, board, power hand, readiness state, and compact history are visible without page scrolling.
- On a 360-pixel-wide viewport, no essential text or action is clipped horizontally.
- Mobile presents the board, power hand, preview, and history in a clear vertical order.
- Interactive controls follow a logical Tab order; Enter or Space activates the focused control, and Escape cancels a pending preview.
- Approval, cancel, undo, reset, and custom-mission actions are operable without a pointer.
- Visible focus styles are present for every interactive control.

## User-Visible States

### Application states

- **Loading:** the visual shell appears promptly; no false ready state is shown.
- **Sample ready:** the complete judge-ready mission is loaded.
- **Custom mission editing:** the person is entering a new goal and optional ideas.
- **Board ready:** no preview is pending; cards may be inspected or selected.
- **Recommendation highlighted:** one power is suggested without mutation.
- **Preview pending:** exact changes are displayed and approval/cancellation are available.
- **Committing:** a brief transition prevents duplicate approval.
- **Committed:** the board and history reflect the new state.
- **Undo available:** the latest committed play can be reversed.
- **Manual demo mode:** WebMCP is unavailable but the product loop remains interactive.
- **Recoverable error:** a requested action was invalid; the board is unchanged and the next valid action is explained.

### Power availability states

- **Available:** the current board supports the power.
- **Recommended:** the agent has suggested the power but has not previewed or played it.
- **Selected:** the person is viewing the power's details or choosing a target.
- **Previewed:** a valid temporary effect exists.
- **Unavailable:** the current board lacks a valid target; the reason is visible.
- **Recently played:** the most recent committed power is visually identified.

## Edge Cases

### Empty and first-run cases

- The sample mission must never render as an empty board.
- A custom mission with no optional ideas receives neutral starter idea cards rather than an unusable blank state.
- A whitespace-only mission is rejected inline without closing the entry form.
- If the visitor exits custom-mission entry, the prior board remains untouched.

### Sequence and concurrency cases

- A commit requested before a preview is rejected without mutation.
- A preview becomes stale when the underlying board changes, the sample is reset, a custom mission is created, or another preview replaces it.
- Duplicate approval attempts apply a card only once.
- A second preview cannot be layered over an unresolved preview without visibly replacing or cancelling the first.
- Inspection during a pending preview returns committed state plus a clear indication that an uncommitted preview exists.

### Power-specific cases

- Forge cannot act without an eligible idea target or repeatedly expand the same source card.
- Focus cannot act when the board contains no actionable cards.
- Undo after a reset is unavailable because reset establishes a new baseline.

### Persistence and recovery cases

- Committed state survives refresh; preview state does not.
- Corrupt or incompatible saved data falls back to the sample mission with an explanatory notice.
- Storage being unavailable does not block the current session; the interface explains that refresh persistence is disabled.
- Reset asks for confirmation when it would replace custom or modified work.

### Capability and error cases

- Unsupported browsers show manual demo mode rather than a generic connection failure.
- A rejected agent action states why it was rejected and names the next valid step.
- Long agent-generated text is constrained in the card layout and remains available through an expanded detail view.
- Unexpected characters are displayed as text and never interpreted as executable content.
- If an action cannot complete, the committed board remains unchanged.

## What We Are Building

### Required for the submission

- Immediate sample mission and optional custom mission.
- Shared mission board with visible idea, action, and focus states.
- Forge and Focus cards.
- Agent inspection and power discovery.
- Recommendation highlighting.
- Preview, approve, cancel, and commit states.
- Visible committed state changes.
- Compact history and one-level undo.
- Sample reset.
- Manual demo mode when WebMCP is unavailable.
- Responsive desktop and 360-pixel mobile layouts.
- Keyboard access, visible focus, reduced-motion support, and non-color state cues.
- Clear testing guidance suitable for the live application and demo video.

### Quality bar

- The product loop works repeatedly from a clean sample state.
- The live state shown in the interface matches the state exposed to the agent.
- The primary demo does not depend on an external account, paid API, remote database, or slow generated response inside the app.
- Within the first 15 seconds, the demo video shows the sample board, visible powers, agent readiness, and the start of the inspect → recommend → preview sequence.
- Claims in the submission match demonstrated behavior.

## What We Would Add With More Time

- Multi-level undo and a browsable timeline.
- Drag-and-drop board arrangement.
- Additional powers and deck composition.
- User-authored power definitions with a constrained capability model.
- Shareable mission links and cloud synchronization.
- Real-time multi-user collaboration and presence.
- Templates for research, travel, learning, planning, and other domains.
- A browser extension that adapts the card metaphor to supported third-party sites.
- Rich agent recommendation cards rendered inside the application.
- Import/export, analytics, sound design, and optional haptics.
- Card progression, collectibles, achievements, or game economy.

These additions are explicitly excluded from the hackathon MVP because none is required to prove the WebMCP collaboration loop, and each would compete with polish, browser testing, or submission preparation within the 10–12 hour budget.

## Non-Goals

- The product will not claim to control arbitrary websites.
- The product will not execute arbitrary user or agent code.
- The product will not embed its own general-purpose chatbot.
- The product will not require registration or retain personal profiles.
- The product will not attempt to replace full project-management software.
- The product will not reproduce Card Master's artwork, code, branded cards, or browser-extension behavior.

## Submission Proof Points

### WebMCP Leverage

- The agent receives structured, current board state rather than a copied text description.
- The agent discovers distinct powers with availability constraints.
- The agent can participate in a multi-step inspect, recommend, preview, and commit workflow.
- The same visible board changes whether a card is initiated manually or through WebMCP.
- Preview tokens, stale-state rejection, and undo demonstrate thoughtful agent-action design rather than a single novelty tool.

### Execution

- The live application opens into a complete coherent experience.
- All three powers produce visible, repeatable results.
- Agent status, history, preview, errors, and fallback behavior are part of the product rather than hidden developer diagnostics.
- The experience works on desktop and mobile and remains usable with reduced motion.

### Potential Impact

- The product addresses a credible trust and coordination problem in agent-assisted web work.
- The interaction model is legible to non-developers: a card has a name, an effect, a preview, and a reversible consequence.
- The mission-board workflow provides a concrete first audience while suggesting broader future use.

### Creativity And Ambition

- Web capabilities become a visible deck instead of an invisible menu or chatbot command list.
- Exact preview and approval make agent actions understandable and consensual.
- Card theatre, shared state, and human approval form one coherent interaction language rather than decorative gamification.

## Demo Acceptance Path

The final build is demo-ready only when this sequence succeeds from a clean session:

1. Open the live URL and immediately see the sample mission.
2. Confirm the interface reports Agent ready in a WebMCP-capable browser.
3. Ask the agent to inspect the board and recommend a card.
4. Observe a contextual Forge recommendation without board mutation.
5. Preview Forge and see three to five exact action cards before approval.
6. Confirm recent tool activity visibly identifies the WebMCP preview and commit calls for Forge.
7. Approve and observe the board update and history entry.
8. Ask for the best next move; preview and approve Focus.
9. Undo Focus and observe restoration plus a history entry.
10. Reset the sample, confirm undo is unavailable, and repeat the flow without stale state or page repair.

The manual fallback path must also complete Forge, Focus, and undo without claiming that a WebMCP agent is connected.
