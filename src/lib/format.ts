import type { Campaign } from '@/types';

export function truncateAddress(address: string): string {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 4)}...${address.slice(-3)}`;
}

export function formatXlm(amount: number): string {
  return `${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} XLM`;
}

export function getProgress(raised: number, goal: number): number {
  if (goal <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((raised / goal) * 100));
}

export function getDaysRemaining(deadline: string): number {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getCampaignStatus(campaign: Campaign): 'active' | 'funded' | 'ended' {
  const isEnded = new Date(campaign.deadline).getTime() <= Date.now();

  if (isEnded) {
    return campaign.raised >= campaign.goal ? 'funded' : 'ended';
  }

  return campaign.raised >= campaign.goal ? 'funded' : 'active';
}

export function formatRelativeUpdate(updatedAt: number): string {
  if (!updatedAt) {
    return 'Just now';
  }

  const seconds = Math.max(0, Math.floor((Date.now() - updatedAt) / 1000));
  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
}
