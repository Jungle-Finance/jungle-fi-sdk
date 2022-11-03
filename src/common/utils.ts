import * as anchor from "@project-serum/anchor";
import {
    JAuthority,
    JungleVaultProgram,
    VaultLifecyclePhase,
    VaultPhase,
    VaultPhaseKey
} from "./types";
import { PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";

export async function readUint64FromAccount(
    address: anchor.web3.PublicKey,
    connection: anchor.web3.Connection,
    offset: number
): Promise<number> {
    const accountInfo = await connection.getAccountInfo(address, "finalized");
    if (!accountInfo) {
        return 0;
    }

    return Number(new DataView(accountInfo.data.buffer, offset).getBigUint64(0, true));
}

export function getVaultPhaseKey(vaultPhase: VaultPhase): VaultPhaseKey | null {
    for (const vaultPhaseKey in VaultLifecyclePhase) {
        if (Object.keys(VaultLifecyclePhase[vaultPhaseKey])[0] === Object.keys(vaultPhase)[0]) {
            return vaultPhaseKey as VaultPhaseKey;
        }
    }
    return null;
}

export function findAssociatedTokenAddress(
    walletAddress: anchor.web3.PublicKey,
    tokenMintAddress: anchor.web3.PublicKey
): anchor.web3.PublicKey {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
            new PublicKey(walletAddress).toBuffer(),
            anchor.utils.token.TOKEN_PROGRAM_ID.toBuffer(),
            new PublicKey(tokenMintAddress).toBuffer()
        ],
        anchor.utils.token.ASSOCIATED_PROGRAM_ID
    )[0];
}

export function findMultipleAssociatedTokenAddress(
    walletAddress: anchor.web3.PublicKey,
    ...tokenMintAddressList: anchor.web3.PublicKey[]
): PublicKey[] {
    return tokenMintAddressList.map((tokenMint) =>
        findAssociatedTokenAddress(walletAddress, tokenMint)
    );
}

export async function getMinimumBalanceForEmptyAccountRentExemption(
    connection: anchor.web3.Connection
): Promise<JSBI> {
    return JSBI.BigInt(await connection.getMinimumBalanceForRentExemption(0, "finalized"));
}

export async function fetchTokenAccountBalance(
    address: anchor.web3.PublicKey,
    connection: anchor.web3.Connection
): Promise<JSBI> {
    return JSBI.BigInt(
        (await connection.getTokenAccountBalance(address, "finalized")).value.amount
    );
}

export async function fetchAccountBalance(
    address: anchor.web3.PublicKey,
    connection: anchor.web3.Connection
): Promise<JSBI> {
    return JSBI.BigInt(await connection.getBalance(address, "finalized"));
}

export async function fetchTokenSupply(
    mint: anchor.web3.PublicKey,
    connection: anchor.web3.Connection
): Promise<JSBI> {
    return JSBI.BigInt((await connection.getTokenSupply(mint, "finalized")).value.amount);
}

export async function findJAuthorityAddress(
    jMint: anchor.web3.PublicKey,
    program: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress(
        [jMint.toBuffer(), Buffer.from("j_authority")],
        <PublicKey>program
    );
}

export async function findVaultInfoAddress(
    iMint: anchor.web3.PublicKey,
    program: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress([iMint.toBuffer()], <PublicKey>program);
}

export async function fetchJAuthority(
    jMint: anchor.web3.PublicKey,
    program: anchor.Program<JungleVaultProgram>,
    commitment?: anchor.web3.Commitment
): Promise<JAuthority> {
    const jAuthorityAddress = (await findJAuthorityAddress(jMint, program.programId))[0];
    return program.account.jAuthority.fetch(jAuthorityAddress, commitment);
}

export async function fetchJAuthorityByAddress(
    address: anchor.web3.PublicKey,
    program: anchor.Program<JungleVaultProgram>,
    commitment?: anchor.web3.Commitment
): Promise<JAuthority> {
    return program.account.jAuthority.fetch(address, commitment);
}

export async function findSolHoldingPoolAddress(
    vaultInfo: anchor.web3.PublicKey,
    program: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress(
        [vaultInfo.toBuffer(), Buffer.from("sol_holding_pool")],
        program
    );
}

export async function findIRedeemPoolAddress(
    vaultInfo: anchor.web3.PublicKey,
    program: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress(
        [vaultInfo.toBuffer(), Buffer.from("i_redeem_pool")],
        program
    );
}

export async function findJRedeemPoolAddress(
    jAuthority: anchor.web3.PublicKey,
    program: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress(
        [jAuthority.toBuffer(), Buffer.from("j_redeem_pool")],
        program
    );
}
