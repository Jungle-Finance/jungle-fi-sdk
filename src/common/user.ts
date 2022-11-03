import * as anchor from "@project-serum/anchor";
import { VaultPlatformProvider } from "./api";
import { AccountWithKey, JAuthorityAccount, JungleVaultInfo, JungleVaultProgram } from "./types";

export async function newVaultUser<T extends JungleVaultProgram, V extends JungleVaultInfo> (
    signer: anchor.web3.Signer,
    vaultPubkey: anchor.web3.PublicKey,
    vaultProvider: VaultPlatformProvider<T, V>
): Promise<VaultUser<T, V>> {
    const vaultInfo = await vaultProvider.fetchVault(vaultPubkey);
    const jAuthority = await vaultProvider.fetchJAuthorityByAddress(vaultInfo.jAuthority);
    return new VaultUser(signer, vaultInfo, jAuthority, vaultProvider);
}

export class VaultUser<T extends JungleVaultProgram, V extends JungleVaultInfo> {
    private readonly signer: anchor.web3.Signer;
    private readonly vault: AccountWithKey<V>;
    private readonly jAuthority: JAuthorityAccount;
    private readonly vaultProvider: VaultPlatformProvider<T, V>;

    constructor(
        signer: anchor.web3.Signer,
        vault: AccountWithKey<V>,
        jAuthority: JAuthorityAccount,
        vaultProvider: VaultPlatformProvider<T, V>
    ) {
        this.signer = signer;
        this.vault = vault;
        this.jAuthority = jAuthority;
        this.vaultProvider = vaultProvider;
    }

    async deposit(
        depositAmount: number,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return await this.vaultProvider.depositRpc(
            [this.signer],
            depositAmount,
            this.signer.publicKey,
            this.vault,
            confirmOptions
        );
    }

    async redeemIAndJ(
        redeemAmount: number,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return await this.vaultProvider.redeemIAndJRpc(
            [this.signer],
            redeemAmount,
            this.signer.publicKey,
            this.vault,
            confirmOptions
        );
    }

    async redeemI(
        redeemAmount: number,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return await this.vaultProvider.redeemIRpc(
            [this.signer],
            redeemAmount,
            this.signer.publicKey,
            this.vault,
            confirmOptions
        );
    }

    async redeemJ(
        redeemAmount: number,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return await this.vaultProvider.redeemJRpc(
            [this.signer],
            redeemAmount,
            this.signer.publicKey,
            this.jAuthority,
            confirmOptions
        );
    }

    async crank(
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return await this.vaultProvider.crankRpc(
            [this.signer],
            this.signer.publicKey,
            this.vault,
            confirmOptions
        );
    }
}
