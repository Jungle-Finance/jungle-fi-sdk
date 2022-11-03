import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import { Vault, VaultInfo } from "./types.js";
import { IDL, JungleMsolV1 } from "./jungle_msol_v1";
import { EndPoint, JAuthorityAccount, VaultRedeemLayout } from "../common/types";
import { VaultPlatformProvider } from "../common/api";
import { findAssociatedTokenAddress, findMultipleAssociatedTokenAddress } from "../common/utils";
import { VaultMath } from "../common/shared";
import { MsolVaultMath } from "./math";
import { Connection } from "@solana/web3.js";
import {
    LIQ_POOL_MSOL_LEG,
    LIQ_POOL_MSOL_LEG_AUTHORITY,
    LIQ_POOL_SOL_LEG_PDA,
    LIQUID_STAKING_PROGRAM,
    MSOL_MINT_AUTHORITY,
    RESERVE_PDA
} from "./msol";

export class JungleMsolPlatformProvider extends VaultPlatformProvider<JungleMsolV1, VaultInfo> {
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

    createMath(cacheTimeoutMs = 0): VaultMath<VaultInfo> {
        return new MsolVaultMath(this.connection, cacheTimeoutMs);
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
            Warmup: "Native-SOL",
            Active: vaultInfo.msolMint,
            Expired: "Native-SOL",
            Unstaking: null
        };
    }

    deposit(amount: number, userAddress: anchor.web3.PublicKey, vault: Vault) {
        const [iTo, jTo] = findMultipleAssociatedTokenAddress(
            userAddress,
            vault.iMint,
            vault.jMint
        );

        return this.program.methods
            .deposit(new anchor.BN(amount))
            .accounts({
                depositor: userAddress,
                vaultInfo: vault.publicKey,
                iMint: vault.iMint,
                jMint: vault.jMint,
                msolMint: vault.msolMint,
                iTo,
                jTo,
                solHoldingPool: vault.solHoldingPool,
                msolHoldingPool: vault.msolHoldingPool,
                jAuthority: vault.jAuthority,
                msolState: vault.msolState,
                marinadeProgram: LIQUID_STAKING_PROGRAM,
                liqPoolSolLegPda: LIQ_POOL_SOL_LEG_PDA,
                liqPoolMsolLeg: LIQ_POOL_MSOL_LEG,
                liqPoolMsolLegAuthority: LIQ_POOL_MSOL_LEG_AUTHORITY,
                reservePda: RESERVE_PDA,
                msolMintAuthority: MSOL_MINT_AUTHORITY,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemIAndJ(amount: number, userAddress: anchor.web3.PublicKey, vault: Vault) {
        const [to, iFrom, jFrom] = findMultipleAssociatedTokenAddress(
            userAddress,
            vault.msolMint,
            vault.iMint,
            vault.jMint
        );

        return this.program.methods
            .redeemIAndJ(new anchor.BN(amount))
            .accounts({
                withdrawAuthority: userAddress,
                vaultInfo: vault.publicKey,
                msolMint: vault.msolMint,
                iMint: vault.iMint,
                jMint: vault.jMint,
                msolTo: to,
                iFrom,
                jFrom,
                solHoldingPool: vault.solHoldingPool,
                msolHoldingPool: vault.msolHoldingPool,
                solFeeWallet: vault.solFeeWallet,
                msolFeeWallet: vault.msolFeeWallet,
                jAuthority: vault.jAuthority,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemI(iAmount: number, userAddress: anchor.web3.PublicKey, vault: Vault) {
        const iFrom = findAssociatedTokenAddress(userAddress, vault.iMint);

        return this.program.methods
            .redeemI(new anchor.BN(iAmount))
            .accounts({
                vaultInfo: vault.publicKey,
                iMint: vault.iMint,
                withdrawAuthority: userAddress,
                iFrom,
                iRedeemPool: vault.iRedeemPool,
                solFeeWallet: vault.solFeeWallet,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemJ(
        jAmount: number,
        userAddress: anchor.web3.PublicKey,
        jAuthorityAccount: JAuthorityAccount
    ) {
        const jFrom = findAssociatedTokenAddress(userAddress, jAuthorityAccount.jMint);

        return this.program.methods
            .redeemJ(new anchor.BN(jAmount))
            .accounts({
                withdrawAuthority: userAddress,
                jMint: jAuthorityAccount.jMint,
                jFrom,
                jAuthority: jAuthorityAccount.publicKey,
                jRedeemPool: jAuthorityAccount.jRedeemPool,
                feeWallet: jAuthorityAccount.feeWallet,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    crank(executor: anchor.web3.PublicKey, vault: Vault) {
        const lifecyclePhase = vault.lifecyclePhase;
        if ("expired" in lifecyclePhase && vault.claimTicket) {
            return this.program.methods
                .crankWarmup()
                .accounts({
                    executor: executor,
                    vaultInfo: vault.publicKey,
                    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
                })
                .instruction();
        }

        if ("warmup" in lifecyclePhase) {
            return this.program.methods
                .crankActive()
                .accounts({
                    executor: executor,
                    vaultInfo: vault.publicKey,
                    msolMint: vault.msolMint,
                    solHoldingPool: vault.solHoldingPool,
                    msolHoldingPool: vault.msolHoldingPool,
                    msolState: vault.msolState,
                    marinadeProgram: LIQUID_STAKING_PROGRAM,
                    liqPoolSolLegPda: LIQ_POOL_SOL_LEG_PDA,
                    liqPoolMsolLeg: LIQ_POOL_MSOL_LEG,
                    liqPoolMsolLegAuthority: LIQ_POOL_MSOL_LEG_AUTHORITY,
                    reservePda: RESERVE_PDA,
                    msolMintAuthority: MSOL_MINT_AUTHORITY,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                    systemProgram: anchor.web3.SystemProgram.programId
                })
                .instruction();
        }

        if ("active" in lifecyclePhase) {
            return this.program.methods
                .crankUnstaking()
                .accounts({
                    executor: executor,
                    vaultInfo: vault.publicKey,
                    msolMint: vault.msolMint,
                    solHoldingPool: vault.solHoldingPool,
                    msolHoldingPool: vault.msolHoldingPool,
                    claimTicket: vault.claimTicket,
                    msolState: vault.msolState,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    marinadeProgram: LIQUID_STAKING_PROGRAM
                })
                .instruction();
        }

        if ("unstaking" in lifecyclePhase && vault.claimTicket) {
            return this.program.methods
                .crankExpired()
                .accounts({
                    executor: executor,
                    vaultInfo: vault.publicKey,
                    iRedeemPool: vault.iRedeemPool,
                    jRedeemPool: vault.jRedeemPool,
                    solHoldingPool: vault.solHoldingPool,
                    claimTicket: vault.claimTicket,
                    msolState: vault.msolState,
                    reservePda: RESERVE_PDA,
                    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    marinadeProgram: LIQUID_STAKING_PROGRAM
                })
                .instruction();
        }

        return Promise.reject(Error("Vault is in an undefined state!"));
    }
}
