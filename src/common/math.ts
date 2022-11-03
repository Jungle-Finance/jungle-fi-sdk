/**
 * Port of ij_lib math to typescript
 */
import JSBI from "jsbi";
import { VaultPhase } from "./types";

export const WITHDRAW_TO_SMALL = "Withdraw is too small.";
export const HOLDING_POOL_AMOUNT_TO_SMALL = "Pool amount is too small.";
export const J_REDEEM_POOL_AMOUNT_TO_SMALL = "J Redeem Pool amount is too small.";

export interface ContractMathResult<T> {
    result: T | null;
    error: string | null;
}

export interface PercentageYield {
    apr: number;
    apy: number;
}

export interface AmountAfterFees {
    gross: JSBI;
    net: JSBI;
    fees: JSBI;
}

export interface RedeemPoolAmounts {
    iRedeemAmount: JSBI;
    jRedeemAmount: JSBI;
}

export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);

/*
 STAKE_DUST_THRESHOLD = 1 since we know it's possible for the
 stake pool to have 1 "raytoshi" in it due to how we floor (round down)
 fees and return amounts.
*/
export const STAKED_DUST_THRESHOLD = JSBI.BigInt(2);

export function subtractFees(amount: JSBI, fee_rate: number): ContractMathResult<AmountAfterFees> {
    const fees = JSBI.BigInt(Math.floor(JSBI.toNumber(amount) * fee_rate)); // Floor here since we just convert to u64 in rust code
    const net = JSBI.subtract(amount, fees);
    const gross = JSBI.add(fees, net);

    // check if withdraw is too small (this function is only called during withdrawals)
    if ((fee_rate > 0 && JSBI.equal(fees, ZERO)) || JSBI.equal(net, ZERO)) {
        return {
            error: WITHDRAW_TO_SMALL,
            result: null
        };
    }

    return {
        error: null,
        result: {
            fees,
            net,
            gross
        }
    };
}

export function calcRedeemIAndJReturns(
    vaultPhase: VaultPhase,
    ij_amount: JSBI,
    i_supply: JSBI,
    total_staked: JSBI,
    fee_rate: number
): ContractMathResult<AmountAfterFees> {
    // TODO check this behavior, we used to error out on i_supply == 0 although I think this is better
    // TODO I think subtractFees will just return an amount to small though?
    if ("expired" in vaultPhase || JSBI.equal(i_supply, ZERO)) {
        return subtractFees(ZERO, fee_rate);
    }

    if ("warmup" in vaultPhase) {
        return subtractFees(ij_amount, fee_rate);
    }

    // do math
    // let gross = ij_amount * total_staked / i_supply;
    const gross = JSBI.divide(JSBI.multiply(ij_amount, total_staked), i_supply);

    return subtractFees(gross, fee_rate);
}

export function calcRedeemIReturns(
    vaultPhase: VaultPhase,
    i_amount: JSBI,
    i_supply: JSBI,
    i_redeem_pool_balance: JSBI,
    fee_rate: number
): ContractMathResult<AmountAfterFees> {
    // do math
    // let amount_before_fees = i_amount *
    //     i_redeem_pool_balance / i_supply;
    const amount_before_fees = JSBI.divide(
        JSBI.multiply(i_amount, i_redeem_pool_balance),
        i_supply
    );

    return subtractFees(amount_before_fees, fee_rate);
}

export function calcRedeemJReturns(
    amountJ: JSBI,
    feeRate: number
): ContractMathResult<AmountAfterFees> {
    return subtractFees(amountJ, feeRate);
}

export function calcToRedeemPoolsAmounts(
    staked_this_lifecycle: JSBI,
    holding_pool_balance: JSBI
): ContractMathResult<RedeemPoolAmounts> {
    if (JSBI.lessThanOrEqual(staked_this_lifecycle, holding_pool_balance)) {
        // amount_to_i_redeem = holding_pool_balance - staked_this_lifecycle
        const amount_to_i_redeem = JSBI.subtract(holding_pool_balance, staked_this_lifecycle);

        return {
            error: null,
            result: {
                iRedeemAmount: amount_to_i_redeem,
                jRedeemAmount: staked_this_lifecycle
            }
        };
    } else {
        // TODO check this later kinda weird to have an error and a result
        return {
            error: HOLDING_POOL_AMOUNT_TO_SMALL,
            result: {
                iRedeemAmount: ZERO,
                jRedeemAmount: holding_pool_balance
            }
        };
    }
}

export function calcDepositReturnChecks(
    vaultPhase: VaultPhase,
    amount: JSBI,
    i_supply: JSBI,
    total_staked: JSBI
): ContractMathResult<JSBI> | null {
    if ("warmup" in vaultPhase) {
        return {
            result: amount,
            error: null
        };
    }

    if ("expired" in vaultPhase) {
        return {
            result: ZERO,
            error: null
        };
    }

    if (JSBI.greaterThan(i_supply, ZERO) && JSBI.equal(total_staked, ZERO)) {
        return {
            result: null,
            error: `i_supply: ${i_supply} && total_staked: 0`
        };
    }

    if (JSBI.equal(i_supply, ZERO) && JSBI.greaterThan(total_staked, STAKED_DUST_THRESHOLD)) {
        return {
            result: null,
            error: `i_supply: 0 && total_staked: ${total_staked}`
        };
    }

    // This will happen if first deposit ever or possibly if all
    // i and j are redeemed in active phase.
    if (JSBI.equal(i_supply, ZERO) && JSBI.lessThanOrEqual(total_staked, STAKED_DUST_THRESHOLD)) {
        return {
            result: amount,
            error: null
        };
    }

    return null; // Return null to proceed with real math.
}

// Checks that both timestamp parameters are in the future,
// and that the start is before the end.
export function isValidTimestampInit(
    active_phase_start_timestamp: number,
    active_phase_end_timestamp: number,
    now: number
): boolean {
    // Start and end must be in the future
    if (active_phase_start_timestamp <= now || active_phase_end_timestamp <= now) {
        return false;
    }
    // Start must be before End
    return active_phase_start_timestamp < active_phase_end_timestamp;
}

export function isValidTimestampUpdate(
    current_start_timestamp: number,
    current_end_timestamp: number,
    proposed_start_timestamp: number,
    proposed_end_timestamp: number,
    now: number
): boolean {
    // Start must be before End
    if (proposed_start_timestamp >= proposed_end_timestamp) {
        return false;
    }
    // if warmup can't go straight into expired
    if (now < current_start_timestamp && proposed_end_timestamp < now) {
        return false;
    }
    // if active can't go straight into warmup
    if (
        current_start_timestamp <= now &&
        now <= current_end_timestamp &&
        now < proposed_start_timestamp
    ) {
        return false;
    }
    // if expired can't go straight into active
    return !(
        current_end_timestamp < now &&
        proposed_start_timestamp <= now &&
        now <= proposed_end_timestamp
    );
}
