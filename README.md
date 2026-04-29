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
- Claim and refund actions in the frontend live contract flow
- Live testnet contract deployment with seeded on-chain campaigns

Still pending before the full three-level submission is complete:
- Browser-side QA across Freighter, Albedo, and xBull against the live contract
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
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=CD3FVQNCYZW3WCHVQK2QFTDUX7SUP5RYPY2O5O5C375R3O466ZXWB4HX
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_EXPERT_URL=https://stellar.expert/explorer/testnet
```

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
- `get_campaign_count`
- `create_campaign`
- `back_campaign`
- `get_campaign`
- `get_total_raised`
- `get_backers_count`
- `get_backers`
- `claim_funds`
- `refund`

## Live Testnet State

- Contract ID: `CD3FVQNCYZW3WCHVQK2QFTDUX7SUP5RYPY2O5O5C375R3O466ZXWB4HX`
- Deployer address: `GDCDJTGUX4YWLQ3V4YPQLX7FNEIP2EZ3NJKSNSB64FGGBOOHKBKNXIYR`
- Backer address: `GCHU2DEMMEP4HQ7H7ARW4DGTOZRAXNZEOBDA6N77XU4XOK3JD5SBDG2U`
- Deploy transaction:
  `https://stellar.expert/explorer/testnet/tx/d9ee7961280a9ac8df7ec633e0534e108b47b29dbae542ee70697f80a4b50e19`
- Seeded campaigns:
  `1` `Backline Testnet Showcase` with `25.00 XLM` raised
  `2` `Backline Refund Test` expired before backing and remains empty
  `3` `Backline Refund Window` was backed with `5.00 XLM` and later refunded to `0.00 XLM`

## Submission Placeholders

These need to be filled in before final delivery:

- Contract address: `CD3FVQNCYZW3WCHVQK2QFTDUX7SUP5RYPY2O5O5C375R3O466ZXWB4HX`
- Live demo link: `TBD`
- Demo video link: `TBD`
- Wallet screenshot: `TBD`
- Campaign list screenshot: `TBD`
- Transaction screenshot: `TBD`
- Test results screenshot: `TBD`

## License

MIT
