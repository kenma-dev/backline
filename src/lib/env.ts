export const env = {
  network: process.env.NEXT_PUBLIC_NETWORK ?? 'testnet',
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID ?? '',
  sorobanRpcUrl:
    process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ??
    'https://soroban-testnet.stellar.org',
  horizonUrl:
    process.env.NEXT_PUBLIC_HORIZON_URL ?? 'https://horizon-testnet.stellar.org',
  stellarExpertUrl:
    process.env.NEXT_PUBLIC_STELLAR_EXPERT_URL ??
    'https://stellar.expert/explorer/testnet',
};
