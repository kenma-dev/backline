import type { WalletOption } from '@/types';

export const walletOptions: WalletOption[] = [
  {
    id: 'freighter',
    name: 'Freighter',
    installUrl: 'https://www.freighter.app/',
    description: 'Best for browser extension testnet workflows.',
  },
  {
    id: 'albedo',
    name: 'Albedo',
    installUrl: 'https://albedo.link/',
    description: 'Web-based wallet and signature flow.',
  },
  {
    id: 'xbull',
    name: 'xBull',
    installUrl: 'https://xbull.app/',
    description: 'Mobile-friendly Stellar wallet with testnet support.',
  },
];
