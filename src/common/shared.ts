import {
    AmountAfterFees,
    calcDepositReturnChecks,
    calcRedeemIAndJReturns,
    calcRedeemIReturns,
    calcRedeemJReturns,
    calcToRedeemPoolsAmounts,
    ContractMathResult,
    J_REDEEM_POOL_AMOUNT_TO_SMALL,
    PercentageYield,
    RedeemPoolAmounts
} from "./math";
import JSBI from "jsbi";
import { fetchTokenAccountBalance, fetchTokenSupply } from "./utils";
import { Connection } from "@solana/web3.js";
import { JAuthority, JungleVaultInfo, SharedVaultInfo } from "./types";
import TimedCache from "./cache";

export abstract class VaultMath<V> {
    protected readonly connection: Connection;
    protected readonly cache: TimedCache;

    protected constructor(connection: Connection, cacheTimeoutMs = 0) {
        this.connection = connection;
        this.cache = new TimedCache(cacheTimeoutMs);
    }

    abstract calcDepositReturns(amount: JSBI, vaultInfo: V): Promise<ContractMathResult<JSBI>>;

    abstract calcRedeemIAndJReturns(
        ij_amount: JSBI,
        vaultInfo: V
    ): Promise<ContractMathResult<AmountAfterFees>>;

    abstract calcRedeemIReturns(
        i_amount: JSBI,
        vaultInfo: V
    ): Promise<ContractMathResult<AmountAfterFees>>;

    abstract calcRedeemJReturns(
        amountJ: JSBI,
        jAuthority: JAuthority
    ): Promise<ContractMathResult<AmountAfterFees>>;

    abstract calcToRedeemPoolsAmounts(vaultInfo: V): Promise<ContractMathResult<RedeemPoolAmounts>>;

    abstract calcJRedeemPoolAmount(jAuthority: JAuthority): Promise<ContractMathResult<JSBI>>;

    abstract calcIRedeemPoolAmount(vaultInfo: V): Promise<ContractMathResult<JSBI>>;

    abstract calcYieldPercentages(vaultInfo: V): Promise<PercentageYield>;

    abstract fetchStakedAmount(vaultInfo: V): Promise<number>;
}

export abstract class GenericVaultMath<V extends JungleVaultInfo> extends VaultMath<V> {
    constructor(connection: Connection, cacheTimeoutMs: number) {
        super(connection, cacheTimeoutMs);
    }

    async calcRedeemIAndJReturns(
        ij_amount: JSBI,
        vaultInfo: V
    ): Promise<ContractMathResult<AmountAfterFees>> {
        return calcRedeemIAndJReturns(
            vaultInfo.lifecyclePhase,
            ij_amount,
            await this.cache.cacheResult(fetchTokenSupply, vaultInfo.iMint, this.connection),
            JSBI.BigInt(await this.fetchStakedAmount(vaultInfo)),
            vaultInfo.feeRate
        );
    }

    async calcRedeemIReturns(
        i_amount: JSBI,
        vaultInfo: V
    ): Promise<ContractMathResult<AmountAfterFees>> {
        const result = await this.calcIRedeemPoolAmount(vaultInfo);

        if (result.error || result.result == null) {
            return {
                error: result.error,
                result: null
            };
        }

        return calcRedeemIReturns(
            vaultInfo.lifecyclePhase,
            i_amount,
            await this.cache.cacheResult(fetchTokenSupply, vaultInfo.iMint, this.connection),
            result.result,
            vaultInfo.feeRate
        );
    }
}

export abstract class SharedVaultMath<V extends SharedVaultInfo> extends GenericVaultMath<V> {
    constructor(connection: Connection, cacheTimeoutMs: number) {
        super(connection, cacheTimeoutMs);
    }

    async calcRedeemJReturns(
        amountJ: JSBI,
        jAuthority: JAuthority
    ): Promise<ContractMathResult<AmountAfterFees>> {
        const redeemPoolBalance = await this.cache.cacheResult(
            fetchTokenAccountBalance,
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

    async calcDepositReturns(amount: JSBI, vaultInfo: V): Promise<ContractMathResult<JSBI>> {
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

        // do math
        // let ij_amount = amount * i_supply / total_staked;
        const ij_amount = JSBI.divide(JSBI.multiply(amount, i_supply), total_staked);

        return {
            result: ij_amount,
            error: null
        };
    }

    async calcJRedeemPoolAmount(jAuthority: JAuthority): Promise<ContractMathResult<JSBI>> {
        return {
            error: null,
            result: await this.cache.cacheResult(
                fetchTokenAccountBalance,
                jAuthority.jRedeemPool,
                this.connection
            )
        };
    }

    async calcIRedeemPoolAmount(vaultInfo: V): Promise<ContractMathResult<JSBI>> {
        return {
            error: null,
            result: await this.cache.cacheResult(
                fetchTokenAccountBalance,
                vaultInfo.iRedeemPool,
                this.connection
            )
        };
    }

    async calcToRedeemPoolsAmounts(vaultInfo: V): Promise<ContractMathResult<RedeemPoolAmounts>> {
        return calcToRedeemPoolsAmounts(
            JSBI.BigInt(vaultInfo.jMintedThisLifecycle),
            await this.cache.cacheResult(
                fetchTokenAccountBalance,
                vaultInfo.holdingPool,
                this.connection
            )
        );
    }
}
