# Signal Exchange Fidelity Ledger

| Element | Concept intent | Implemented behavior | Status |
| --- | --- | --- | --- |
| Composition | Dense market at left; agent evidence and approval at right. | Responsive marketplace/sidebar split with one-screen desktop narrative. | Faithful |
| Offer comparison | Three credible datasets with scannable differences. | Trust, freshness, formats, rows, license, coverage, and credits come from typed state. | Faithful |
| Recommendation | One strong choice without removing agency. | Brass edge and Agent pick label; all alternatives remain visible. | Faithful |
| Approval | Exact deal consequence before mutation. | Counteroffer panel lists wallet, access, and delivery deltas plus explicit CTA. | Enhanced |
| Agent evidence | Actions must be visible, not hidden in chat. | Activity distinguishes WebMCP, manual, and system origins. | Enhanced |
| Data access | Purchase outcome should feel concrete. | Commit reveals active rental metadata and schema fields; undo removes them. | Enhanced |
| Mobile | Preserve full task rather than a decorative crop. | Compact offers and vertical Activity/deal sequence at 360px. | Faithful |

Intentional divergence: the implementation makes the preview/commit boundary and simulation disclosure more explicit than the visual concept because both are central to trustworthy agent commerce.

## Two-sided extension QA

The participant-approved product goal expands the earlier concept without a visual redesign. Reference: `signal-exchange-concept-1280x800.png`; new functional surface specification: `two-sided-extension.md`.

- Palette: original midnight/brass/cyan tokens retained; no new visual theme or raster assets.
- Layout: horizontal market rows and right-hand Activity/approval preserved. Publisher and source/sample panels extend the existing bordered-panel family; more vertical scrolling is intentional.
- Typography: serif headings and controls with system-sans metadata retained; new inputs and JSON blocks have explicit font rules.
- Copy: hero deliberately changes to the participant's two-sided thesis. Publish, search, licensing and download controls are approved functional additions. Misleading verified badges are replaced with demo/person/agent attribution.
- Data presentation: concrete row counts and seller earnings replace schema-only delivery; exact seller license appears in preview and manifest.
- Responsive: 1280×800 and 360×800 verified. Direct browser layout measurement at 360px reports no elements beyond the viewport; manual mobile negotiation/approval/commit passed.
- Visual inspection: accepted concept and desktop/mobile implementation screenshots were inspected using image viewing. The approved extension preserves the design system; the longer page and new workflow copy are intentional deviations.

Actual browser evidence: human publication → WebMCP discovery/inspection/negotiation → blocked unapproved commit → UI approval → WebMCP commit/delivery; agent publication → manual mobile rental. JSON/CSV/manifest files were downloaded and validated. No app console errors observed.
