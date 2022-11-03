import { SharedVaultMath } from "../common/shared";
import { VaultInfo } from "./types";
import { readUint64FromAccount } from "../common/utils";
import { PercentageYield } from "../common/math";

const NUM_CRANKS_PER_YEAR = 105_120; // 365*24*60/5 ie every 5 mins

export class QuarryVaultMath extends SharedVaultMath<VaultInfo> {
    async fetchStakedAmount(vaultInfo: VaultInfo): Promise<number> {
        return this.cache.cacheResult(readUint64FromAccount, vaultInfo.miner, this.connection, 129);
    }

    /*
        totalStaked = 270000 # approximate current value. get it from sdk like we do for redeem rate calcs
        annualRewardRate = 640_000 # i think it's around here. get it from quarry
        numCranks = 105_120 # 365*24*60/5 ie every 5 mins
        apr = totalStaked/annualRewardRate
        apy = (1 + apr/numCranks)**numCranks - 1
     */
    async calcYieldPercentages(vaultInfo: VaultInfo): Promise<PercentageYield> {
        const totalStaked = await this.fetchStakedAmount(vaultInfo);
        const annualRewardRate = await this.cache.cacheResult(
            readUint64FromAccount,
            vaultInfo.rewarder,
            this.connection,
            99
        );
        const apr = totalStaked / annualRewardRate;
        const apy = (1 + apr / NUM_CRANKS_PER_YEAR) ** NUM_CRANKS_PER_YEAR - 1;

        return {
            apy,
            apr
        };
    }
}
