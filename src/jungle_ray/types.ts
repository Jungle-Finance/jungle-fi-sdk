import * as anchor from "@project-serum/anchor";
import { AccountWithKey } from "../common/types";

export type Vault = AccountWithKey<VaultInfo>;

// TODO Render this obselete if possible
/// PDA that stores the metadata for a given Jungle-RAY vault.
export type VaultInfo = {
    vaultAuthority: anchor.web3.PublicKey;
    activePhaseStartTimestamp: anchor.BN;
    activePhaseEndTimestamp: anchor.BN;
    iMint: anchor.web3.PublicKey;
    jMint: anchor.web3.PublicKey;
    jAuthority: anchor.web3.PublicKey;
    lifecyclePhase: any;
    //vaultLifecyclePhase: VaultPhase;
    //vaultLifecyclePhase: typeof VaultLifecyclePhase;
    feeWallet: anchor.web3.PublicKey;
    feeRate: number;
    bump: number;
    iRedeemPool: anchor.web3.PublicKey;
    jRedeemPool: anchor.web3.PublicKey;
    holdingPool: anchor.web3.PublicKey;
    baseMint: anchor.web3.PublicKey;
    jMintedThisLifecycle: anchor.BN;
    stakeProgram: anchor.web3.PublicKey;
    stakePool: anchor.web3.PublicKey;
    stakerInfoV2: anchor.web3.PublicKey;
};
