import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WalletButton } from '@/components/wallet-button';
import { WalletProvider } from '@/hooks/use-wallet';

describe('WalletButton', () => {
  it('connects and disconnects through the wallet modal', async () => {
    const user = userEvent.setup();
    Object.assign(window, { __BACKLINE_TEST_WALLET__: true });

    render(
      <WalletProvider>
        <WalletButton />
      </WalletProvider>,
    );

    await user.click(screen.getByRole('button', { name: /connect wallet/i }));
    await user.click(screen.getByRole('button', { name: /albedo/i }));

    expect(screen.getByText(/galb...111/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /disconnect/i }));

    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
  });
});
