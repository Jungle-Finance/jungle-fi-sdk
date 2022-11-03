import { SharedVaultMath } from "../common/shared";
import { readUint64FromAccount } from "../common/utils";
import { VaultInfo } from "./types";
import { PercentageYield } from "../common/math";
import { PublicKey } from "@solana/web3.js";

const NUM_CRANKS_PER_YEAR = 105_120; // 365*24*60/5 ie every 5 mins
const SLOTS_PER_YEAR = 57_338_182; // (365 * 24 * 60 * 60 * 1000) /  550
const RAYDIUM_POOL_BALANCE = new PublicKey("8tnpAECxAT9nHBqR1Ba494Ar5dQMPGhL31MmPJz1zZvY");

export class RayVaultMath extends SharedVaultMath<VaultInfo> {
    fetchStakedAmount(vaultInfo: VaultInfo): Promise<number> {
        return this.cache.cacheResult(
            readUint64FromAccount,
            vaultInfo.stakerInfoV2,
            this.connection,
            72
        );
    }

    /*
        slots_per_year_estimate = arbitrary number we calc later
        reward_per_year = reward_per_slot * slots_per_year_estimate
        total_staked = rpc.balance(RAYDIUM_POOL_BALANCE)
        apr = total_staked / reward_per_year
     */
    async calcYieldPercentages(vaultInfo: VaultInfo): Promise<PercentageYield> {
        const rewardPerSlot = await this.cache.cacheResult(
            readUint64FromAccount,
            vaultInfo.stakePool,
            this.connection,
            192
        );
        const rewardPerYear = SLOTS_PER_YEAR * rewardPerSlot;
        const totalStaked = await this.cache.cacheResult(
            readUint64FromAccount,
            RAYDIUM_POOL_BALANCE,
            this.connection,
            64
        );
        const apr = totalStaked / rewardPerYear;
        const apy = (1 + apr / NUM_CRANKS_PER_YEAR) ** NUM_CRANKS_PER_YEAR - 1;

        return {
            apy,
            apr
        };
    }
}
