import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Idl, Program, Provider, web3 } from "@project-serum/anchor";
import {
    AccountWithKey,
    EndPoint,
    JAuthorityAccount,
    JungleVaultInfo,
    JungleVaultProgram,
    VaultRedeemLayout
} from "./types";
import { VaultMath } from "./shared";
import { fetchJAuthorityByAddress, findJAuthorityAddress } from "./utils";

export abstract class VaultPlatformProvider<T extends Idl, V extends JungleVaultInfo> {
    protected connection: Connection;
    public program: anchor.Program<T>;
    protected cluster: EndPoint;

    constructor(connection: Connection, programId: anchor.web3.PublicKey, cluster: EndPoint) {
        this.cluster = cluster;
        this.connection = connection;
        this.program = this.createProgram(
            programId,
            new AnchorProvider(
                connection,
                {
                    publicKey: PublicKey.default,
                    signTransaction(): Promise<Transaction> {
                        return Promise.reject();
                    },
                    signAllTransactions(): Promise<Transaction[]> {
                        return Promise.reject();
                    }
                },
                { commitment: connection.commitment }
            )
        );
    }

    private async sendTransactionAndConfirm(
        signers: anchor.web3.Signer[],
        instruction: TransactionInstruction[],
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        const sendConfig = confirmOptions ?? { commitment: this.connection.commitment };

        const transaction = new Transaction({
            feePayer: signers[0].publicKey,
            ...(await this.connection.getLatestBlockhash(sendConfig.commitment))
        });
        transaction.add(...instruction);
        transaction.sign(...signers);

        return web3.sendAndConfirmTransaction(this.connection, transaction, signers, sendConfig);
    }

    abstract createProgram(programId: anchor.web3.PublicKey, provider: Provider): anchor.Program<T>;

    abstract createMath(cacheTimeoutMs: number): VaultMath<V>;

    abstract fetchVault(
        vaultInfoAddress: anchor.web3.PublicKey,
        commitment?: anchor.web3.Commitment
    ): Promise<AccountWithKey<V>>;

    abstract getVaultRedeemLayout(vaultInfo: V): VaultRedeemLayout;

    async fetchJAuthority(
        jMint: anchor.web3.PublicKey,
        commitment?: anchor.web3.Commitment
    ): Promise<JAuthorityAccount> {
        const jAuthorityAddress = (await findJAuthorityAddress(jMint, this.program.programId))[0];
        return this.fetchJAuthorityByAddress(jAuthorityAddress, commitment);
    }

    async fetchJAuthorityByAddress(
        jAuthorityAddress: anchor.web3.PublicKey,
        commitment?: anchor.web3.Commitment
    ): Promise<JAuthorityAccount> {
        return {
            publicKey: jAuthorityAddress,
            ...(await fetchJAuthorityByAddress(
                jAuthorityAddress,
                this.program as unknown as Program<JungleVaultProgram>,
                commitment
            ))
        };
    }

    // Instructions

    abstract deposit(
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>
    ): Promise<TransactionInstruction>;

    async depositRpc(
        signers: anchor.web3.Signer[],
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return this.sendTransactionAndConfirm(
            signers,
            [await this.deposit(amount, userAddress, vault)],
            confirmOptions
        );
    }

    abstract redeemIAndJ(
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>
    ): Promise<TransactionInstruction>;

    async redeemIAndJRpc(
        signers: anchor.web3.Signer[],
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return this.sendTransactionAndConfirm(
            signers,
            [await this.redeemIAndJ(amount, userAddress, vault)],
            confirmOptions
        );
    }

    abstract redeemI(
        iAmount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>
    ): Promise<TransactionInstruction>;

    async redeemIRpc(
        signers: anchor.web3.Signer[],
        amount: number,
        userAddress: anchor.web3.PublicKey,
        vault: AccountWithKey<V>,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return this.sendTransactionAndConfirm(
            signers,
            [await this.redeemI(amount, userAddress, vault)],
            confirmOptions
        );
    }

    abstract redeemJ(
        jAmount: number,
        userAddress: anchor.web3.PublicKey,
        jAuthorityAccount: JAuthorityAccount
    ): Promise<TransactionInstruction>;

    async redeemJRpc(
        signers: anchor.web3.Signer[],
        jAmount: number,
        userAddress: anchor.web3.PublicKey,
        jAuthorityAccount: JAuthorityAccount,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return this.sendTransactionAndConfirm(
            signers,
            [await this.redeemJ(jAmount, userAddress, jAuthorityAccount)],
            confirmOptions
        );
    }

    abstract crank(
        executor: anchor.web3.PublicKey,
        vault: AccountWithKey<V>
    ): Promise<TransactionInstruction>;

    async crankRpc(
        signers: anchor.web3.Signer[],
        executor: anchor.web3.PublicKey,
        vault: AccountWithKey<V>,
        confirmOptions?: anchor.web3.ConfirmOptions
    ): Promise<anchor.web3.TransactionSignature> {
        return this.sendTransactionAndConfirm(
            signers,
            [await this.crank(executor, vault)],
            confirmOptions
        );
    }
}
