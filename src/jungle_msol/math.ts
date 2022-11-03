import { GenericVaultMath } from "../common/shared";
import { VaultInfo } from "./types";
import {
    AmountAfterFees,
    calcDepositReturnChecks,
    calcRedeemJReturns,
    calcToRedeemPoolsAmounts,
    ContractMathResult,
    J_REDEEM_POOL_AMOUNT_TO_SMALL,
    PercentageYield,
    RedeemPoolAmounts
} from "../common/math";
import JSBI from "jsbi";
import {
    fetchAccountBalance,
    fetchTokenAccountBalance,
    fetchTokenSupply,
    getMinimumBalanceForEmptyAccountRentExemption,
    readUint64FromAccount
} from "../common/utils";
import { JAuthority } from "../common/types";

export class MsolVaultMath extends GenericVaultMath<VaultInfo> {
    async fetchStakedAmount(vaultInfo: VaultInfo): Promise<number> {
        if ("warmup" in vaultInfo.lifecyclePhase) {
            const rentExceptBalance = await this.cache.cacheResult(
                getMinimumBalanceForEmptyAccountRentExemption,
                this.connection
            );
            return JSBI.toNumber(
                JSBI.subtract(
                    await this.cache.cacheResult(
                        fetchAccountBalance,
                        vaultInfo.solHoldingPool,
                        this.connection
                    ),
                    rentExceptBalance
                )
            );
        } else if ("active" in vaultInfo.lifecyclePhase) {
            return JSBI.toNumber(
                await this.cache.cacheResult(
                    fetchTokenAccountBalance,
                    vaultInfo.msolHoldingPool,
                    this.connection
                )
            );
        }
        return 0;
    }

    async calcRedeemJReturns(
        amountJ: JSBI,
        jAuthority: JAuthority
    ): Promise<ContractMathResult<AmountAfterFees>> {
        const redeemPoolBalance = await this.cache.cacheResult(
            fetchAccountBalance,
            jAuthority.jRedeemPool,
            this.connection
        );
        if (JSBI.lessThan(redeemPoolBalance, amountJ)) {
            return {
                error: J_REDEEM_POOL_AMOUNT_TO_SMALL,
                result: null
            };
        }

        return calcRedeemJReturns(amountJ, jAuthority.feeRate);
    }

    /**
     * Return the amount of sol left inside the J redeem pool.
     *
     * This implementation deviates from the contract code as we do not want to return
     * the rent except balance here which would indicate something is left inside
     * the pool even when all J tokens have been burned.
     *
     * @param jAuthority the JAuthority of the vault group
     */
    async calcJRedeemPoolAmount(jAuthority: JAuthority): Promise<ContractMathResult<JSBI>> {
        const fullPoolAmount = await this.cache.cacheResult(
            fetchAccountBalance,
            jAuthority.jRedeemPool,
            this.connection
        );
        const rentExceptBalance = await this.cache.cacheResult(
            getMinimumBalanceForEmptyAccountRentExemption,
            this.connection
        );

        return {
            error: null,
            result: JSBI.subtract(fullPoolAmount, rentExceptBalance)
        };
    }

    async calcIRedeemPoolAmount(vaultInfo: VaultInfo): Promise<ContractMathResult<JSBI>> {
        const fullPoolAmount = await this.cache.cacheResult(
            fetchAccountBalance,
            vaultInfo.iRedeemPool,
            this.connection
        );
        const rentExceptBalance = await this.cache.cacheResult(
            getMinimumBalanceForEmptyAccountRentExemption,
            this.connection
        );

        return {
            error: null,
            result: JSBI.subtract(fullPoolAmount, rentExceptBalance)
        };
    }

    async calcDepositReturns(
        amount: JSBI,
        vaultInfo: VaultInfo
    ): Promise<ContractMathResult<JSBI>> {
        if (!vaultInfo.msolPerMegasolInitial) {
            return {
                error: "vaultInfo's msolPerMegasolInitial is null",
                result: null
            };
        }

        const i_supply = await this.cache.cacheResult(
            fetchTokenSupply,
            vaultInfo.iMint,
            this.connection
        );
        const total_staked = JSBI.BigInt(await this.fetchStakedAmount(vaultInfo));

        const depositCheck = calcDepositReturnChecks(
            vaultInfo.lifecyclePhase,
            amount,
            i_supply,
            total_staked
        );
        if (depositCheck) {
            return depositCheck;
        }

        const initialExchangeRate = JSBI.BigInt(vaultInfo.msolPerMegasolInitial);

        // fetch current exchangeRate
        const mSolPrice =
            (await this.cache.cacheResult(
                readUint64FromAccount,
                vaultInfo.msolState,
                this.connection,
                512
            )) / 0x1_0000_0000;

        const LAMPORTS_PER_MEGASOL = 1_000_000_000_000_000;
        const exchangeRate = JSBI.BigInt(Math.floor(LAMPORTS_PER_MEGASOL / mSolPrice));

        // calc returnAmount = amount * exchangeRate / initialExchangeRate
        const returnAmount = JSBI.divide(JSBI.multiply(amount, exchangeRate), initialExchangeRate);

        return {
            error: null,
            result: returnAmount
        };
    }

    async calcToRedeemPoolsAmounts(
        vaultInfo: VaultInfo
    ): Promise<ContractMathResult<RedeemPoolAmounts>> {
        // TODO check to see if we should return the mSOL amount or conversion to SOL while we are un unstaking before expired.
        return calcToRedeemPoolsAmounts(
            JSBI.BigInt(vaultInfo.jMintedThisLifecycle),
            await this.cache.cacheResult(
                fetchAccountBalance,
                vaultInfo.solHoldingPool,
                this.connection
            )
        );
    }

    async calcYieldPercentages(vaultInfo: VaultInfo): Promise<PercentageYield> {
        return {
            apy: 0,
            apr: 0
        };
    }
}
