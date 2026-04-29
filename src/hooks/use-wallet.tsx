'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { WalletId, WalletSession } from '@/types';

const STORAGE_KEY = 'backline:last-wallet-session';

interface WalletContextValue {
  session: WalletSession | null;
  isConnecting: boolean;
  connectionLabel: string | null;
  errorMessage: string | null;
  connectWallet: (walletId: WalletId) => Promise<void>;
  disconnectWallet: () => void;
  clearWalletError: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

async function resolveMockAddress(walletId: WalletId): Promise<string> {
  const prefix = walletId === 'freighter' ? 'GFREIGHTER' : walletId === 'albedo' ? 'GALBEDO' : 'GXBULL';
  return `${prefix}${'1'.repeat(47 - prefix.length)}`;
}

function getWindowValue(key: string): unknown {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return Reflect.get(window as Record<string, unknown>, key);
}

function isWalletInstalled(walletId: WalletId): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (walletId === 'freighter') {
    return typeof getWindowValue('freighterApi') !== 'undefined';
  }

  if (walletId === 'xbull') {
    return typeof getWindowValue('xbull') !== 'undefined';
  }

  return true;
}

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [session, setSession] = useState<WalletSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionLabel, setConnectionLabel] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      setSession(JSON.parse(stored) as WalletSession);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<WalletContextValue>(() => {
    return {
      session,
      isConnecting,
      connectionLabel,
      errorMessage,
      clearWalletError: () => setErrorMessage(null),
      disconnectWallet: () => {
        setSession(null);
        setConnectionLabel(null);

        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      },
      connectWallet: async (walletId) => {
        setIsConnecting(true);
        setConnectionLabel(`Connecting to ${walletId === 'xbull' ? 'xBull' : walletId.charAt(0).toUpperCase() + walletId.slice(1)}...`);
        setErrorMessage(null);

        try {
          if (!isWalletInstalled(walletId)) {
            throw new Error('Wallet not installed');
          }

          const address = await resolveMockAddress(walletId);
          const nextSession: WalletSession = { address, walletId };
          setSession(nextSession);

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
          }
        } catch (error) {
          const message =
            error instanceof Error && error.message === 'Wallet not installed'
              ? `Wallet not installed. Please install ${walletId === 'xbull' ? 'xBull' : walletId} and try again.`
              : error instanceof Error
                ? error.message
                : 'Unable to connect wallet right now.';
          setErrorMessage(message);
          throw new Error(message);
        } finally {
          setIsConnecting(false);
          setConnectionLabel(null);
        }
      },
    };
  }, [connectionLabel, errorMessage, isConnecting, session]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }

  return context;
}
