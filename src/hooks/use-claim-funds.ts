'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { claimCampaignFunds } from '@/lib/contract-client';

export function useClaimFunds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignId: number) => claimCampaignFunds(campaignId),
    onSuccess: async ({ campaign }) => {
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.setQueryData(['campaign', campaign.id], campaign);
    },
  });
}
