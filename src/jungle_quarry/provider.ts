import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import { VaultInfo } from "./types.js";
import { IDL, JungleQuarryV1 } from "./jungle_quarry_v1";
import { getQuarryConstants } from "./quarry.js";
import { AccountWithKey, EndPoint, JAuthorityAccount, VaultRedeemLayout } from "../common/types";
import { VaultPlatformProvider } from "../common/api";
import { findMultipleAssociatedTokenAddress } from "../common/utils";
import { QuarryVaultMath } from "./math";
import { Connection } from "@solana/web3.js";
import { Vault } from "./types";

export class JungleQuarryPlatformProvider extends VaultPlatformProvider<JungleQuarryV1, VaultInfo> {
    public constructor(
        connection: Connection,
        programId: anchor.web3.PublicKey,
        cluster: EndPoint
    ) {
        super(connection, programId, cluster);
    }

    createProgram(programId: anchor.web3.PublicKey, provider: Provider) {
        return new anchor.Program(IDL, programId, provider);
    }

    createMath(cacheTimeoutMs = 0) {
        return new QuarryVaultMath(this.connection, cacheTimeoutMs);
    }

    async fetchVault(
        vaultInfoAddress: anchor.web3.PublicKey,
        commitment?: anchor.web3.Commitment
    ): Promise<Vault> {
        return {
            ...(await this.program.account.vaultInfo.fetch(vaultInfoAddress, commitment)),
            publicKey: vaultInfoAddress
        };
    }

    getVaultRedeemLayout(vaultInfo: VaultInfo): VaultRedeemLayout {
        return {
            Warmup: vaultInfo.baseMint,
            Active: vaultInfo.baseMint,
            Expired: vaultInfo.baseMint,
            Unstaking: null // Phase unused in this vault implementation
        };
    }

    deposit(amount: number, userAddress: anchor.web3.PublicKey, vault: AccountWithKey<VaultInfo>) {
        const { QUARRY_MINE_PROGRAM } = getQuarryConstants(this.cluster);

        const [from, iTo, jTo] = findMultipleAssociatedTokenAddress(
            userAddress,
            vault.baseMint,
            vault.iMint,
            vault.jMint
        );

        return this.program.methods
            .deposit(new anchor.BN(amount))
            .accounts({
                depositAuthority: userAddress,
                iMint: vault.iMint,
                jMint: vault.jMint,
                from: from,
                iTo: iTo,
                jTo: jTo,
                vaultInfo: vault.publicKey,
                holdingPool: vault.holdingPool,
                jAuthority: vault.jAuthority,
                quarryMineProgram: QUARRY_MINE_PROGRAM,
                miner: vault.miner,
                quarry: vault.quarry,
                minerVault: vault.minerVault,
                rewardsTokenAccount: vault.rewardsTokenAccount,
                rewarder: vault.rewarder,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemIAndJ(
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<VaultInfo>
    ) {
        const { QUARRY_MINE_PROGRAM, QUARRY_MINT_WRAPPER_PROGRAM } = getQuarryConstants(
            this.cluster
        );

        const [to, iFrom, jFrom] = findMultipleAssociatedTokenAddress(
            userAddress,
            vault.baseMint,
            vault.iMint,
            vault.jMint
        );

        return this.program.methods
            .redeemIAndJ(new anchor.BN(amount))
            .accounts({
                withdrawAuthority: userAddress,
                vaultInfo: vault.publicKey,
                baseMint: vault.baseMint,
                iMint: vault.iMint,
                jMint: vault.jMint,
                to: to,
                iFrom: iFrom,
                jFrom: jFrom,
                holdingPool: vault.holdingPool,
                feeWallet: vault.feeWallet,
                jAuthority: vault.jAuthority,
                quarryMineProgram: QUARRY_MINE_PROGRAM,
                miner: vault.miner,
                quarry: vault.quarry,
                minerVault: vault.minerVault,
                rewardsTokenAccount: vault.rewardsTokenAccount,
                rewarder: vault.rewarder,
                mintWrapper: vault.mintWrapper,
                mintWrapperProgram: QUARRY_MINT_WRAPPER_PROGRAM,
                minter: vault.minter,
                rewardsTokenMint: vault.rewardsTokenMint,
                claimFeeTokenAccount: vault.claimFeeTokenAccount,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemI(iAmount: number, userAddress: anchor.web3.PublicKey, vault: AccountWithKey<VaultInfo>) {
        const [to, iFrom] = findMultipleAssociatedTokenAddress(
            userAddress,
            vault.baseMint,
            vault.iMint
        );

        return this.program.methods
            .redeemI(new anchor.BN(iAmount))
            .accounts({
                vaultInfo: vault.publicKey,
                iMint: vault.iMint,
                withdrawAuthority: userAddress,
                to: to,
                iFrom: iFrom,
                iRedeemPool: vault.iRedeemPool,
                baseMint: vault.baseMint,
                feeWallet: vault.feeWallet,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemJ(
        jAmount: number,
        userAddress: anchor.web3.PublicKey,
        jAuthorityAccount: JAuthorityAccount
    ) {
        const [to, jFrom] = findMultipleAssociatedTokenAddress(
            userAddress,
            jAuthorityAccount.baseMint,
            jAuthorityAccount.jMint
        );

        return this.program.methods
            .redeemJ(new anchor.BN(jAmount))
            .accounts({
                withdrawAuthority: userAddress,
                jMint: jAuthorityAccount.jMint,
                to: to,
                jFrom: jFrom,
                baseMint: jAuthorityAccount.baseMint,
                jAuthority: jAuthorityAccount.publicKey,
                jRedeemPool: jAuthorityAccount.jRedeemPool,
                feeWallet: jAuthorityAccount.feeWallet,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    crank(executor: anchor.web3.PublicKey, vault: AccountWithKey<VaultInfo>) {
        const { QUARRY_MINE_PROGRAM, QUARRY_MINT_WRAPPER_PROGRAM, QUARRY_REDEEMER_PROGRAM } =
            getQuarryConstants(this.cluster);

        return this.program.methods
            .crank()
            .accounts({
                executor: executor,
                vaultInfo: vault.publicKey,
                baseMint: vault.baseMint,
                iMint: vault.iMint,
                jMint: vault.jMint,
                jAuthority: vault.jAuthority,
                iRedeemPool: vault.iRedeemPool,
                jRedeemPool: vault.jRedeemPool,
                holdingPool: vault.holdingPool,
                mintWrapper: vault.mintWrapper,
                mintWrapperProgram: QUARRY_MINT_WRAPPER_PROGRAM,
                quarryMineProgram: QUARRY_MINE_PROGRAM,
                quarryRedeemerProgram: QUARRY_REDEEMER_PROGRAM,
                minter: vault.minter,
                rewardsTokenMint: vault.rewardsTokenMint,
                rewardsTokenAccount: vault.rewardsTokenAccount,
                claimFeeTokenAccount: vault.claimFeeTokenAccount,
                miner: vault.miner,
                quarry: vault.quarry,
                rewarder: vault.rewarder,
                redeemer: vault.redeemer,
                redemptionVault: vault.redemptionVault,
                minerVault: vault.minerVault,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
            })
            .instruction();
    }
}
