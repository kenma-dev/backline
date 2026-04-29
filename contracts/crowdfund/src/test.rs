extern crate std;

use soroban_sdk::testutils::{Address as _, Ledger};
use soroban_sdk::{Address, Env, String};

use crate::{ContractError, CrowdfundContract, CrowdfundContractClient};

fn create_campaign_fixture(
    env: &Env,
    client: &CrowdfundContractClient<'_>,
    creator: &Address,
    goal: i128,
    deadline: u64,
) -> u32 {
    client.create_campaign(
        creator,
        &String::from_str(env, "Backline Live EP"),
        &String::from_str(env, "Studio and release funding"),
        &goal,
        &deadline,
    )
}

#[test]
fn creates_and_reads_campaign() {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|ledger| {
        ledger.timestamp = 100;
    });

    let creator = Address::generate(&env);
    let contract_id = env.register(CrowdfundContract, ());
    let client = CrowdfundContractClient::new(&env, &contract_id);

    let campaign_id = create_campaign_fixture(&env, &client, &creator, 500, 1_000);
    let campaign = client.get_campaign(&campaign_id);

    assert_eq!(campaign.id, 1);
    assert_eq!(campaign.creator, creator);
    assert_eq!(campaign.goal, 500);
    assert_eq!(campaign.raised, 0);
}

#[test]
fn tracks_backers_and_total_raised() {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|ledger| {
        ledger.timestamp = 100;
    });

    let creator = Address::generate(&env);
    let backer_one = Address::generate(&env);
    let backer_two = Address::generate(&env);
    let contract_id = env.register(CrowdfundContract, ());
    let client = CrowdfundContractClient::new(&env, &contract_id);

    let campaign_id = create_campaign_fixture(&env, &client, &creator, 1_000, 1_500);
    client.back_campaign(&campaign_id, &backer_one, &150);
    client.back_campaign(&campaign_id, &backer_two, &200);
    client.back_campaign(&campaign_id, &backer_one, &50);

    assert_eq!(client.get_total_raised(&campaign_id), 400);
    assert_eq!(client.get_backers_count(&campaign_id), 2);
}

#[test]
fn refunds_failed_campaigns_after_deadline() {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|ledger| {
        ledger.timestamp = 100;
    });

    let creator = Address::generate(&env);
    let backer = Address::generate(&env);
    let contract_id = env.register(CrowdfundContract, ());
    let client = CrowdfundContractClient::new(&env, &contract_id);

    let campaign_id = create_campaign_fixture(&env, &client, &creator, 1_000, 150);
    client.back_campaign(&campaign_id, &backer, &250);

    env.ledger().with_mut(|ledger| {
        ledger.timestamp = 200;
    });

    let refunded = client.refund(&campaign_id, &backer);
    assert_eq!(refunded, 250);
}

#[test]
fn prevents_claim_before_goal_or_deadline() {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|ledger| {
        ledger.timestamp = 100;
    });

    let creator = Address::generate(&env);
    let contract_id = env.register(CrowdfundContract, ());
    let client = CrowdfundContractClient::new(&env, &contract_id);

    let campaign_id = create_campaign_fixture(&env, &client, &creator, 1_000, 500);
    let result = client.try_claim_funds(&campaign_id, &creator);

    assert_eq!(result, Err(Ok(ContractError::DeadlineNotReached)));
}
