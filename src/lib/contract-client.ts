import {
  backDemoCampaign,
  claimDemoCampaign,
  createDemoCampaign,
  readCampaigns,
  refundDemoCampaign,
} from '@/lib/demo-store';
import { env } from '@/lib/env';
import type { Campaign, CampaignFormValues } from '@/types';

function createMockHash(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 15)}`;
}

export function getCampaignOperationMode(): 'contract' | 'demo' {
  return env.contractId ? 'contract' : 'demo';
}

export async function listCampaigns(): Promise<Campaign[]> {
  return readCampaigns();
}

export async function getCampaign(campaignId: number): Promise<Campaign> {
  const campaigns = readCampaigns();
  const campaign = campaigns.find((item) => item.id === campaignId);

  if (!campaign) {
    throw new Error('Campaign not found');
  }

  return campaign;
}

export async function createCampaign(
  values: CampaignFormValues,
  creator: string,
): Promise<{ campaign: Campaign; hash: string; mode: 'contract' | 'demo' }> {
  if (env.contractId) {
    throw new Error(
      'Contract RPC mode is not fully configured in this environment yet. Clear NEXT_PUBLIC_CONTRACT_ID to use the demo flow.',
    );
  }

  const campaign = createDemoCampaign(values, creator);
  return {
    campaign,
    hash: createMockHash('create'),
    mode: getCampaignOperationMode(),
  };
}

export async function backCampaign(
  campaignId: number,
  address: string,
  amount: number,
): Promise<{ campaign: Campaign; hash: string; mode: 'contract' | 'demo' }> {
  if (env.contractId) {
    throw new Error(
      'Contract RPC mode is not fully configured in this environment yet. Clear NEXT_PUBLIC_CONTRACT_ID to use the demo flow.',
    );
  }

  const campaign = backDemoCampaign(campaignId, address, amount);
  return {
    campaign,
    hash: createMockHash('back'),
    mode: getCampaignOperationMode(),
  };
}

export async function claimCampaignFunds(
  campaignId: number,
): Promise<{ campaign: Campaign; hash: string; mode: 'contract' | 'demo' }> {
  const campaign = await getCampaign(campaignId);

  if (new Date(campaign.deadline).getTime() > Date.now()) {
    throw new Error('Funds can only be claimed after the deadline.');
  }

  if (campaign.raised < campaign.goal) {
    throw new Error('Campaign goal has not been met.');
  }

  return {
    campaign: claimDemoCampaign(campaignId),
    hash: createMockHash('claim'),
    mode: getCampaignOperationMode(),
  };
}

export async function refundCampaignContribution(
  campaignId: number,
  address: string,
): Promise<{ campaign: Campaign; hash: string; mode: 'contract' | 'demo' }> {
  const campaign = await getCampaign(campaignId);

  if (new Date(campaign.deadline).getTime() > Date.now()) {
    throw new Error('Refunds are only available after the deadline.');
  }

  if (campaign.raised >= campaign.goal) {
    throw new Error('Refunds are unavailable because the campaign met its goal.');
  }

  return {
    campaign: refundDemoCampaign(campaignId, address),
    hash: createMockHash('refund'),
    mode: getCampaignOperationMode(),
  };
}
