# Signal Exchange Scope

## Product goal

Trade agent-ready data with humans or agents, by humans or agents.

The broader product is a two-sided marketplace: either side may be operated by a person or their authorized agent. This build proves one complete rental interaction in a shared browser session.

## Audience and concrete problem

Small operators, independent researchers and agent builders need structured data they can inspect and use, with understandable sources and terms. Data contributors need a way to supply it to people or agents. The demo buyer wants Sydney foot-traffic signals for a weekend pop-up; a contributor publishes a synthetic sample for that decision.

## Approved two-sided flow

Publish a structured sample and terms → discover → inspect one public row → negotiate against the seller's price floor → approve the exact agreement → transfer simulated credits to the seller → receive actual sample rows and a manifest → undo.

## In scope

- Person and WebMCP publishing through the same validated command service.
- Three seed offers and up to 20 total local listings, each with 2–50 scalar JSON rows.
- Ten WebMCP tools, exact license terms, fixed seven-day rentals, buyer budget and wallet checks.
- Buyer debits and per-listing seller proceeds; JSON/CSV sample delivery and license/source manifest.
- Visible human approval, one-time/revision/expiry token checks, revocation and undo that preserves later listings.
- Desktop/mobile controls, manual fallback, local persistence and truthful attribution.

## Out of scope

Production multi-user identity, cross-device synchronization, real payments, auctions, seller-to-seller messages, independent provenance validation, legal enforcement, secure content protection and real commercial datasets. Automatic owner-delegated approval policies are a future capability; this demo requires an explicit human approval click.

## Success

A judge can publish a sample, have an agent discover and negotiate it, approve 22 credits, receive four usable rows, see both balances, and undo. The judge can distinguish working functionality from simulated commerce.
