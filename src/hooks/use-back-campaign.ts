'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { backCampaign } from '@/lib/contract-client';
import { useWallet } from '@/hooks/use-wallet';

export function useBackCampaign(address: string | null) {
  const queryClient = useQueryClient();
  const { signTransaction } = useWallet();

  return useMutation({
    mutationFn: async ({
      campaignId,
      amount,
    }: {
      campaignId: number;
      amount: number;
    }) => {
      if (!address) {
        throw new Error('Connect a wallet before backing a campaign.');
      }

      return backCampaign(campaignId, address, amount, signTransaction);
    },
    onSuccess: async ({ campaign }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
        queryClient.invalidateQueries({ queryKey: ['balance'] }),
      ]);
      queryClient.setQueryData(['campaign', campaign.id], campaign);
    },
  });
}
