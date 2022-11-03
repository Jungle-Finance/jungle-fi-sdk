import * as anchor from "@project-serum/anchor";
import { EndPoint } from "../common/types";

export const LIQUID_STAKING_PROGRAM = new anchor.web3.PublicKey(
    "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
);
export type MsolStakingConstants = {
    LIQUID_STAKING_PROGRAM: anchor.web3.PublicKey;
    STATE: anchor.web3.PublicKey;
    LIQ_POOL_SOL_LEG_PDA: anchor.web3.PublicKey;
    LIQ_POOL_MSOL_LEG: anchor.web3.PublicKey;
    LIQ_POOL_MSOL_LEG_AUTHORITY: anchor.web3.PublicKey;
    RESERVE_PDA: anchor.web3.PublicKey;
    MSOL_MINT: anchor.web3.PublicKey;
    MSOL_MINT_AUTHORITY: anchor.web3.PublicKey;
};
export const STATE = new anchor.web3.PublicKey("8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC");
export const LIQ_POOL_SOL_LEG_PDA = new anchor.web3.PublicKey(
    "UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q"
);
export const LIQ_POOL_MSOL_LEG = new anchor.web3.PublicKey(
    "7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE"
);
export const LIQ_POOL_MSOL_LEG_AUTHORITY = new anchor.web3.PublicKey(
    "EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL"
);
export const RESERVE_PDA = new anchor.web3.PublicKey(
    "Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN"
);
export const MSOL_MINT = new anchor.web3.PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So");
export const MSOL_MINT_AUTHORITY = new anchor.web3.PublicKey(
    "3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM"
);

export const getMsolConstants = (cluster: EndPoint | undefined): MsolStakingConstants => {
    return {
        LIQUID_STAKING_PROGRAM: new anchor.web3.PublicKey(
            "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
        ),
        STATE: new anchor.web3.PublicKey("8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"),
        LIQ_POOL_SOL_LEG_PDA: new anchor.web3.PublicKey(
            "UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q"
        ),
        LIQ_POOL_MSOL_LEG: new anchor.web3.PublicKey(
            "7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE"
        ),
        LIQ_POOL_MSOL_LEG_AUTHORITY: new anchor.web3.PublicKey(
            "EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL"
        ),
        RESERVE_PDA: new anchor.web3.PublicKey("Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN"),
        MSOL_MINT: new anchor.web3.PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
        MSOL_MINT_AUTHORITY: new anchor.web3.PublicKey(
            "3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM"
        )
    };
};
