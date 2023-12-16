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
    pad0: any;
    //vaultLifecyclePhase: VaultPhase;
    //vaultLifecyclePhase: typeof VaultLifecyclePhase;
    solFeeWallet: anchor.web3.PublicKey;
    msolFeeWallet: anchor.web3.PublicKey;
    feeRate: number;
    bump: number;
    pad1: any;
    iRedeemPool: anchor.web3.PublicKey;
    jRedeemPool: anchor.web3.PublicKey;
    solHoldingPool: anchor.web3.PublicKey;
    msolHoldingPool: anchor.web3.PublicKey;
    jMintedThisLifecycle: anchor.BN;
    msolState: anchor.web3.PublicKey;
    msolPerMegasolInitial: OptionNonzeroU64;
    claimTicket: anchor.web3.PublicKey;
    eventId: anchor.BN;
    space: any;
};

export type OptionNonzeroU64 = {
    inner: anchor.BN;
}