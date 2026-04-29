import type { Metadata } from 'next';
import '@/app/globals.css';
import { ErrorBoundary } from '@/components/error-boundary';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Backline | Stellar Crowdfund',
  description:
    'Backline is a production-quality crowdfunding app for creators and supporters built with Next.js and Soroban.',
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
