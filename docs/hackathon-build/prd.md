# Signal Exchange Product Requirements

## Product promise

A marketplace where humans and agents can trade agent-ready data with one another. Either side can use page controls or WebMCP tools, within the owner's permissions.

## Core journey

1. A contributor publishes a title, seller name, description, coverage, source, license, seven-day list price, seller minimum and 2–50 consistent JSON sample rows.
2. The contributor confirms permission and no private data. The listing appears with person/agent attribution.
3. A buyer or agent searches and inspects one public row, schema and terms.
4. A bid produces an exact accepted price or counteroffer within the buyer budget.
5. The preview includes the exact license, buyer debit, seller credit and sample delivery size.
6. A person approves the currently visible proposal; the manual control or agent commits that token.
7. The buyer receives JSON/CSV sample data with a manifest. Seller proceeds are visible.
8. Undo revokes future delivery and restores both balances, without deleting later listings.

## Functional requirements

- Shared command layer for manual and agent behavior.
- Publication validates required metadata, whole-credit prices, minimum ≤ list price, matching row fields, scalar values and bounded payloads.
- Read-only inspection and data receipt do not mutate history or state, even on denial.
- Commit rejects unapproved, missing, mismatched, stale, expired and replayed tokens.
- Data delivery is denied before an active rental, after expiry and after undo.
- CSV exports quote values and neutralize formula-leading strings.
- Pending approvals are not persisted. Malformed persisted sample structures are rejected.
- Reset confirms replacement of published listings and rentals.

## Experience requirements

Use the existing brass/cyan market terminal design. Add publishing, search, public sample and delivery panels without redesigning the brand. Make the local simulation boundary visible before interaction. All controls must fit at 360px, and the complete workflow must be keyboard-operable.

## Acceptance scenario

Human publishes Laneway's four synthetic rows → agent searches Laneway and inspects source/terms → bid 20 counters at 22 → pre-approval commit and delivery fail → human approves → commit leaves buyer 78 and seller +22 → JSON/CSV/manifest delivery works → undo restores buyer 100, seller 0 and blocks further delivery.

The reverse direction also works: an agent publishes a sample and a person rents it through the page.

## Honest limitations

One shared browser session, not separate authenticated people or autonomous seller agents. No real payment, independent verification or secure data storage. Sample files are real exports of demo rows, not a purchased commercial dataset. Downloads cannot be recalled.
