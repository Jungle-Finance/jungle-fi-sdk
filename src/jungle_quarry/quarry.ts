import * as anchor from "@project-serum/anchor";
import { EndPoint } from "../common/types";

export type QuarryConstants = {
    QUARRY_MINE_PROGRAM: anchor.web3.PublicKey;
    QUARRY_MINT_WRAPPER_PROGRAM: anchor.web3.PublicKey;
    QUARRY_REDEEMER_PROGRAM: anchor.web3.PublicKey;
    // Probably don't hardcode JFI specific things, just get them from the vaultInfo.
    //   JFI_MINT: anchor.web3.PublicKey,
    //   JFI_QUARRY: anchor.web3.PublicKey,
    //   JFI_MINT_WRAPPER: anchor.web3.PublicKey,
    //   JFI_REWARDER: anchor.web3.PublicKey,
    //   JFI_REDEEMER: anchor.web3.PublicKey,
    //   JFI_MINTER: anchor.web3.PublicKey,
};
export const QUARRY_MINE_PROGRAM = new anchor.web3.PublicKey(
    "QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB"
);
export const QUARRY_MINT_WRAPPER_PROGRAM = new anchor.web3.PublicKey(
    "QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV"
);
export const QUARRY_REDEEMER_PROGRAM = new anchor.web3.PublicKey(
    "QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9"
);

export const getQuarryConstants = (cluster: EndPoint | undefined): QuarryConstants => {
    switch (cluster) {
        //     case EndPoint.dev: {
        //       return {
        //       }
        //     }
        default: {
            return {
                QUARRY_MINE_PROGRAM: new anchor.web3.PublicKey(
                    "QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB"
                ),
                QUARRY_MINT_WRAPPER_PROGRAM: new anchor.web3.PublicKey(
                    "QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV"
                ),
                QUARRY_REDEEMER_PROGRAM: new anchor.web3.PublicKey(
                    "QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9"
                )
                //        JFI_MINT: new anchor.web3.PublicKey("GePFQaZKHcWE5vpxHfviQtH5jgxokSs51Y5Q4zgBiMDs"),
                //        JFI_QUARRY: new anchor.web3.PublicKey("9SQZgBb7wecpAyxmX3T49cD2yXXmn72x2TL2BDVYBqB"),
                //        JFI_MINT_WRAPPER: new anchor.web3.PublicKey("EZARnar6qGf5qCwkp3pvYV3B6hszPhFNSGyiLzR3uPXb"),
                //        JFI_REWARDER: new anchor.web3.PublicKey("HsryAVAm1TA917GuGc1h6fcjBLd1gnUoEfjzQs688DAx"),
                //        JFI_REDEEMER: new anchor.web3.PublicKey("27zGCKRwhkjVJvCZJUYuu8eUfu7tFgW5W6hfumR8xr26"),
                //        JFI_MINTER: new anchor.web3.PublicKey("AKXdzBmBe56Ep68VddTQ3DyZ9wwua776hvgG3KvdkbV3"),
            };
        }
    }
};
