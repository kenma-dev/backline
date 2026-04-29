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

## Live Testnet Deployment

- Contract ID: `CD3FVQNCYZW3WCHVQK2QFTDUX7SUP5RYPY2O5O5C375R3O466ZXWB4HX`
- Deploy transaction:
  `https://stellar.expert/explorer/testnet/tx/d9ee7961280a9ac8df7ec633e0534e108b47b29dbae542ee70697f80a4b50e19`
