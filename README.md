# Backline

Backline is a Stellar testnet crowdfunding dApp built with Next.js, TypeScript, Tailwind CSS, React Query, and a Soroban smart contract. Creators can launch campaigns with goals and deadlines, backers can contribute XLM, and campaigns support claim/refund flows after the deadline.

## Status

This repository is actively in progress.

Implemented so far:
- Next.js frontend scaffold with typed React structure
- Multi-wallet flow wired toward StellarWalletsKit
- Campaign list, details, and create pages
- Cached balance and campaign hooks
- Transaction status UI and loading states
- Soroban crowdfund contract workspace with Rust tests
- Claim and refund actions in the frontend demo flow

Still pending before the full three-level submission is complete:
- Clean `pnpm` install and lockfile generation in this environment
- Full live wallet transaction integration against testnet
- Testnet contract deployment and real contract ID wiring
- Final screenshots, demo video, and hosted deployment links

## Features

- Multi-wallet connection UX for Freighter, Albedo, and xBull
- Wallet balance display with cache-aware UI
- Campaign creation and backing flow
- Claim funds after a successful campaign deadline
- Refund flow for unsuccessful campaigns after deadline
- Loading spinners, shimmer placeholders, and transaction feedback
- React Query caching with refetch intervals for campaign updates
- Soroban contract workspace for campaign lifecycle rules

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- StellarWalletsKit
- `@stellar/stellar-sdk`
- Soroban / `soroban-sdk`
- Vitest

## Environment Variables

Copy `.env.example` to `.env` and fill in values as needed:

```bash
VITE_NETWORK=testnet
VITE_CONTRACT_ID=
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_STELLAR_EXPERT_URL=https://stellar.expert/explorer/testnet
```

Note:
- the frontend has been migrated to Next.js, so these should be renamed to `NEXT_PUBLIC_*` before final deployment wiring.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the frontend:

```bash
pnpm dev
```

Run frontend tests:

```bash
pnpm test
```

Run Soroban contract tests:

```bash
pnpm contract:test
```

Build the Soroban contract:

```bash
pnpm contract:build
```

## Soroban Contract

The Soroban workspace lives in [contracts/crowdfund](/home/pk/Documents/Stellar/project-1/contracts/crowdfund).

Current contract surface:
- `create_campaign`
- `back_campaign`
- `get_campaign`
- `get_total_raised`
- `get_backers_count`
- `claim_funds`
- `refund`

## Submission Placeholders

These need to be filled in before final delivery:

- Contract address: `TBD`
- Live demo link: `TBD`
- Demo video link: `TBD`
- Wallet screenshot: `TBD`
- Campaign list screenshot: `TBD`
- Transaction screenshot: `TBD`
- Test results screenshot: `TBD`

## License

MIT
