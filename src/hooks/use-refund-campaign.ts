'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { refundCampaignContribution } from '@/lib/contract-client';

export function useRefundCampaign(address: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignId: number) => {
      if (!address) {
        throw new Error('Connect a wallet before requesting a refund.');
      }

      return refundCampaignContribution(campaignId, address);
    },
    onSuccess: async ({ campaign }) => {
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.setQueryData(['campaign', campaign.id], campaign);
    },
  });
}
