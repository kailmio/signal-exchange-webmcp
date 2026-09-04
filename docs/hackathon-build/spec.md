# Signal Exchange Technical Specification

React renders an external store. Pure marketplace and data-delivery functions perform validation and serialization. The command service is shared by UI and ten tools registered through `document.modelContext.registerTool`.

## State and transactions

Offers include source, explicit license, sample fields/rows, publication origin and seller earnings. Rentals include the agreed license and expiry. Publishing increments the exchange revision, clears any pending approval, and extends the prior undo snapshot with the new offer so undo cannot delete a later publication.

A rental proposal contains the exact buyer debit, seller credit, license and data delivery count. One-time tokens are bound to a revision and five-minute expiry. Only a page-level human click records approval. Commit applies the proposal atomically; undo restores the preceding financial/access snapshot.

## Tools

`inspect_exchange`, `publish_data_offer`, `inspect_data_offer`, `search_data_offers`, `compare_data_offers`, `preview_data_deal`, `commit_data_deal`, `read_rented_data`, `undo_last_deal`, `load_demo_exchange`.

Inspection, offer inspection and data reading are read-only. All mutation tools visibly update page state and Activity. Publishing requires owner-authorized confirmation and validates metadata, prices and sample structure at runtime as well as in the closed input schema.

## Delivery and limits

Listings accept 2–50 rows, at most 12 consistently named fields, scalar values and a 20,000-character JSON payload. At most 20 offers are allowed. One row is publicly inspectable. An active approved rental permits full JSON/CSV serialization with a source/license manifest; reading is denied at expiry or after undo. CSV quoting and formula-prefix neutralization reduce spreadsheet execution risk.

Data is client-local and inspectable; these checks demonstrate workflow permissions, not a security boundary. Seller text is explicitly untrusted data, never instructions.

## Persistence

The v2 namespace stores committed offers, samples, earnings, rentals, undo and recent history. Pending approval is not serialized. The loader validates nested structures. Earlier v1 state is left untouched; there is no destructive migration.

## Verification

Unit/integration tests cover both roles, publication validation, pricing, exact license, token approval, expiry, read-only behavior, sample delivery, CSV escaping, seller credits, undo, persistence and tool registration. Browser QA covers a human-published/agent-rented listing and agent-published/manually-rented listing, actual file downloads, reload and 1280px/360px layouts.
