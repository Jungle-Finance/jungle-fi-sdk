import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import { VaultInfo } from "./types.js";
import { IDL, JungleRayV1 } from "./jungle_ray_v1";
import { getRayStakingConstants } from "./ray.js";
import { AccountWithKey, EndPoint, JAuthorityAccount, VaultRedeemLayout } from "../common/types";
import { VaultPlatformProvider } from "../common/api";
import { findMultipleAssociatedTokenAddress } from "../common/utils";
import { RayVaultMath } from "./math";
import { Connection } from "@solana/web3.js";
import { Vault } from "./types";

export class JungleRayPlatformProvider extends VaultPlatformProvider<JungleRayV1, VaultInfo> {
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
        return new RayVaultMath(this.connection, cacheTimeoutMs);
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
        const { RAY_STAKING_PROGRAM, RAY_LP_VAULT, RAY_REWARD_VAULT, RAY_POOL_AUTHORITY } =
            getRayStakingConstants(this.cluster);

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
                vaultInfo: vault.publicKey,
                iMint: vault.iMint,
                jMint: vault.jMint,
                from: from,
                iTo: iTo,
                jTo: jTo,
                holdingPool: vault.holdingPool,
                stakerInfoV2: vault.stakerInfoV2,
                stakePool: vault.stakePool,
                poolAuthority: RAY_POOL_AUTHORITY,
                vaultLpTokenAccount: RAY_LP_VAULT,
                vaultRewardTokenAccount: RAY_REWARD_VAULT,
                stakeProgram: RAY_STAKING_PROGRAM,
                jAuthority: vault.jAuthority,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
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
        const {
            RAY_STAKING_PROGRAM,
            RAY_LP_VAULT,
            RAY_REWARD_VAULT,
            RAY_POOL_AUTHORITY,
            RAY_MINT
        } = getRayStakingConstants(this.cluster);

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
                baseMint: RAY_MINT,
                iMint: vault.iMint,
                jMint: vault.jMint,
                to: to,
                iFrom: iFrom,
                jFrom: jFrom,
                holdingPool: vault.holdingPool,
                feeWallet: vault.feeWallet,
                stakerInfoV2: vault.stakerInfoV2,
                stakePool: vault.stakePool,
                poolAuthority: RAY_POOL_AUTHORITY,
                vaultLpTokenAccount: RAY_LP_VAULT,
                vaultRewardTokenAccount: RAY_REWARD_VAULT,
                stakeProgram: RAY_STAKING_PROGRAM,
                jAuthority: vault.jAuthority,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .instruction();
    }

    redeemI(iAmount: number, userAddress: anchor.web3.PublicKey, vault: AccountWithKey<VaultInfo>) {
        const { RAY_MINT } = getRayStakingConstants(this.cluster);

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
                baseMint: RAY_MINT,
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
        const { RAY_MINT } = getRayStakingConstants(this.cluster);

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
                baseMint: RAY_MINT,
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
        const { RAY_POOL_AUTHORITY, RAY_LP_VAULT, RAY_REWARD_VAULT, RAY_STAKING_PROGRAM } =
            getRayStakingConstants(this.cluster);

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
                stakePool: vault.stakePool,
                stakerInfoV2: vault.stakerInfoV2,
                poolAuthority: RAY_POOL_AUTHORITY,
                vaultLpTokenAccount: RAY_LP_VAULT,
                vaultRewardTokenAccount: RAY_REWARD_VAULT,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                stakeProgram: RAY_STAKING_PROGRAM
            })
            .instruction();
    }
}
