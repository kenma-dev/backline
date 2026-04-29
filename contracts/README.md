# Backline Soroban Contracts

This workspace contains the `crowdfund` Soroban contract for Backline.

## Local workflow

1. Install the Stellar CLI and Rust target:
   - `cargo install --locked stellar-cli`
   - `rustup target add wasm32v1-none`
2. Run tests:
   - `cargo test --manifest-path contracts/crowdfund/Cargo.toml`
3. Build wasm:
   - `cargo build --target wasm32v1-none --release --manifest-path contracts/crowdfund/Cargo.toml`

## Planned deploy flow

1. Fund a Stellar testnet account.
2. Compile the contract to wasm.
3. Deploy with `stellar contract deploy --network testnet ...`
4. Save the deployed contract id in `NEXT_PUBLIC_CONTRACT_ID`.
