import * as anchor from "@project-serum/anchor";
import { EndPoint } from "../common/types";

export const RAY_STAKE_PROGRAM = new anchor.web3.PublicKey(
    "EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q"
);
export type RayStakingConstants = {
    RAY_STAKING_PROGRAM: anchor.web3.PublicKey;
    RAY_LP_VAULT: anchor.web3.PublicKey;
    RAY_REWARD_VAULT: anchor.web3.PublicKey;
    RAY_POOL_AUTHORITY: anchor.web3.PublicKey;
    RAY_STAKE_POOL: anchor.web3.PublicKey;
    RAY_MINT: anchor.web3.PublicKey;
};

export const getRayStakingConstants = (cluster: EndPoint | undefined): RayStakingConstants => {
    switch (cluster) {
        case EndPoint.dev: {
            return {
                RAY_STAKING_PROGRAM: new anchor.web3.PublicKey(
                    "85BFyr98MbCUU9MVTEgzx1nbhWACbJqLzho6zd6DZcWL"
                ),
                RAY_REWARD_VAULT: new anchor.web3.PublicKey(
                    "9DhwgSRJU3gwVVh5WJ5aHKeoctpH58DkGnB164ndW2bZ"
                ),
                RAY_LP_VAULT: new anchor.web3.PublicKey(
                    "CsVrHa9qZLduuFDHnrHa47v741Q43ywtDfcstKJpaq5k"
                ),
                RAY_POOL_AUTHORITY: new anchor.web3.PublicKey(
                    "9EZ6Y5hpZBvngBcaYVQiGh9xQL5dZunuynoDSXWfnLoS"
                ),
                RAY_STAKE_POOL: new anchor.web3.PublicKey(
                    "6Sey8z91CLTXfDq697FURZmpyCBqaekmupyj14Aqjh79"
                ),
                RAY_MINT: new anchor.web3.PublicKey("FSRvxBNrQWX2Fy2qvKMLL3ryEdRtE3PUTZBcdKwASZTU")
            };
        }
        default: {
            return {
                RAY_STAKING_PROGRAM: new anchor.web3.PublicKey(
                    "EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q"
                ),
                RAY_LP_VAULT: new anchor.web3.PublicKey(
                    "8tnpAECxAT9nHBqR1Ba494Ar5dQMPGhL31MmPJz1zZvY"
                ),
                RAY_REWARD_VAULT: new anchor.web3.PublicKey(
                    "BihEG2r7hYax6EherbRmuLLrySBuSXx4PYGd9gAsktKY"
                ),
                RAY_POOL_AUTHORITY: new anchor.web3.PublicKey(
                    "4qD717qKoj3Sm8YfHMSR7tSKjWn5An817nArA6nGdcUR"
                ),
                RAY_STAKE_POOL: new anchor.web3.PublicKey(
                    "4EwbZo8BZXP5313z5A2H11MRBP15M5n6YxfmkjXESKAW"
                ),
                RAY_MINT: new anchor.web3.PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R")
            };
        }
    }
};

export async function findStakerInfoV2Address(
    vaultInfoAddress: anchor.web3.PublicKey,
    RAY_STAKE_POOL: anchor.web3.PublicKey,
    RAY_STAKING_PROGRAM: anchor.web3.PublicKey
) {
    return await anchor.web3.PublicKey.findProgramAddress(
        [
            RAY_STAKE_POOL.toBuffer(),
            vaultInfoAddress.toBuffer(),
            Buffer.from("staker_info_v2_associated_seed")
        ],
        RAY_STAKE_PROGRAM
    );
}
