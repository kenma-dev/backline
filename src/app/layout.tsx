import type { Metadata } from 'next';
import '@/app/globals.css';
import { ErrorBoundary } from '@/components/error-boundary';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Backline - Decentralized Crowdfunding on Stellar',
  description:
    'Launch and back campaigns on the Stellar blockchain with live progress, wallet-native flows, and reward token incentives.',
  keywords: ['crowdfunding', 'stellar', 'soroban', 'blockchain', 'web3'],
  authors: [{ name: 'Backline' }],
  openGraph: {
    title: 'Backline - Decentralized Crowdfunding on Stellar',
    description: 'Transparent creator funding on Stellar with live updates and BLR rewards.',
    type: 'website',
    url: 'https://backline-web.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backline',
    description: 'Decentralized crowdfunding on Stellar with live campaign updates.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ErrorBoundary>
            <div className="min-h-screen">
              <Navbar />
              <main id="top" className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-6 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
