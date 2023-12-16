import * as anchor from "@project-serum/anchor";
import { JungleRayV1 } from "../jungle_ray";
import { JungleQuarryV1 } from "../jungle_quarry";
import { JungleMsolV1 } from "../jungle_msol";
import { VaultInfo as RayVaultInfo } from "../jungle_ray/types";
import { VaultInfo as QuarryVaultInfo } from "../jungle_quarry/types";
import { VaultInfo as MsolVaultInfo } from "../jungle_msol/types";
import { PublicKey } from "@solana/web3.js";

export enum EndPoint {
    main = "mainnet-beta",
    dev = "devnet",
    local = "localnet"
}

export type JungleVaultProgram = JungleRayV1 | JungleQuarryV1 | JungleMsolV1;
export type JungleVaultInfo = RayVaultInfo | QuarryVaultInfo | MsolVaultInfo;
export type SharedVaultInfo = RayVaultInfo | QuarryVaultInfo;

export type AccountWithKey<T> = T & { publicKey: PublicKey };

export type JungleVault = AccountWithKey<JungleVaultInfo>;
export type JAuthorityAccount = AccountWithKey<JAuthority>;

export type JAuthority = {
    jRedeemPool: anchor.web3.PublicKey;
    baseMint: anchor.web3.PublicKey;
    jMint: anchor.web3.PublicKey;
    feeWallet: anchor.web3.PublicKey;
    feeRate: number;
};

export type TypedKeyMap<K extends string, V> = { [k in K]: V };

export type VaultPhaseKey = "Warmup" | "Active" | "Unstaking" | "Expired";

// eslint-disable-next-line @typescript-eslint/ban-types
export type VaultPhase = { warmup: {} } | { active: {} } | { unstaking: {} } | { expired: {} };

export const VaultLifecyclePhase: TypedKeyMap<VaultPhaseKey, VaultPhase> = {
    Warmup: { warmup: {} },
    Active: { active: {} },
    Unstaking: { unstaking: {} },
    Expired: { expired: {} }
};

export type Asset = PublicKey | "Native-SOL" | "mSOL" | null; // Supports SPL token mint, native solana, and no asset
export type VaultRedeemLayout = TypedKeyMap<VaultPhaseKey, Asset>;
