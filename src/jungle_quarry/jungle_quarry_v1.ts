export type JungleQuarryV1 = {
    version: "0.1.0";
    name: "jungle_quarry_v1";
    instructions: [
        {
            name: "initVault";
            accounts: [
                {
                    name: "vaultAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "iMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "iRedeemPool";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "jRedeemPool";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "holdingPool";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "miner";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "minerVault";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "quarry";
                    isMut: true;
                    isSigner: false;
                    docs: ["Quarry to claim from."];
                },
                {
                    name: "rewarder";
                    isMut: false;
                    isSigner: false;
                    docs: ["Rewarder"];
                },
                {
                    name: "redeemer";
                    isMut: false;
                    isSigner: false;
                    docs: ["Redeemer"];
                },
                {
                    name: "minter";
                    isMut: true;
                    isSigner: false;
                    docs: ["[quarry_mint_wrapper::Minter] information."];
                },
                {
                    name: "quarryMineProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rewardsTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "rewardsTokenMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "mintWrapper";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "claimFeeTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "redemptionVault";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "activePhaseStartTimestamp";
                    type: "i64";
                },
                {
                    name: "activePhaseEndTimestamp";
                    type: "i64";
                },
                {
                    name: "feeRate";
                    type: "f64";
                }
            ];
        },
        {
            name: "initJAccounts";
            accounts: [
                {
                    name: "vaultAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "jAuthority";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "jMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jRedeemPool";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "feeRate";
                    type: "f64";
                }
            ];
        },
        {
            name: "deposit";
            accounts: [
                {
                    name: "depositAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "from";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iTo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jTo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "holdingPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "quarryMineProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "miner";
                    isMut: true;
                    isSigner: false;
                    docs: ["Claim accounts"];
                },
                {
                    name: "quarry";
                    isMut: true;
                    isSigner: false;
                    docs: ["Quarry to claim from."];
                },
                {
                    name: "minerVault";
                    isMut: true;
                    isSigner: false;
                    docs: ["Vault of the miner, holds staked tokens."];
                },
                {
                    name: "rewardsTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ["Destination account when miner claims rewards (owned by miner)."];
                },
                {
                    name: "rewarder";
                    isMut: false;
                    isSigner: false;
                    docs: ["Rewarder"];
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "amount";
                    type: "u64";
                }
            ];
        },
        {
            name: "redeemIAndJ";
            accounts: [
                {
                    name: "withdrawAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "iMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "to";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iFrom";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jFrom";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "holdingPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "feeWallet";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "quarryMineProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "miner";
                    isMut: true;
                    isSigner: false;
                    docs: ["Claim accounts"];
                },
                {
                    name: "quarry";
                    isMut: true;
                    isSigner: false;
                    docs: ["Quarry to claim from."];
                },
                {
                    name: "minerVault";
                    isMut: true;
                    isSigner: false;
                    docs: ["Vault of the miner, holds staked tokens."];
                },
                {
                    name: "rewardsTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ["Destination account when miner claims rewards (owned by miner)."];
                },
                {
                    name: "rewarder";
                    isMut: false;
                    isSigner: false;
                    docs: ["Rewarder"];
                },
                {
                    name: "mintWrapper";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "mintWrapperProgram";
                    isMut: false;
                    isSigner: false;
                    docs: ["Mint wrapper program."];
                },
                {
                    name: "minter";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "rewardsTokenMint";
                    isMut: true;
                    isSigner: false;
                    docs: ["Mint of the rewards token."];
                },
                {
                    name: "claimFeeTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ["Account to send claim fees to."];
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "ijAmount";
                    type: "u64";
                }
            ];
        },
        {
            name: "redeemJ";
            accounts: [
                {
                    name: "withdrawAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "jMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "to";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jFrom";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "jRedeemPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "feeWallet";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "jAmount";
                    type: "u64";
                }
            ];
        },
        {
            name: "redeemI";
            accounts: [
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iMint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "withdrawAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "to";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iFrom";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "iRedeemPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "feeWallet";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "iAmount";
                    type: "u64";
                }
            ];
        },
        {
            name: "crank";
            accounts: [
                {
                    name: "executor";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "baseMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "iMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "jMint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "iRedeemPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "jRedeemPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "holdingPool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "mintWrapper";
                    isMut: true;
                    isSigner: false;
                    docs: ["Mint wrapper."];
                },
                {
                    name: "mintWrapperProgram";
                    isMut: false;
                    isSigner: false;
                    docs: ["Mint wrapper program."];
                },
                {
                    name: "quarryMineProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "quarryRedeemerProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "minter";
                    isMut: true;
                    isSigner: false;
                    docs: ["[quarry_mint_wrapper::Minter] information."];
                },
                {
                    name: "rewardsTokenMint";
                    isMut: true;
                    isSigner: false;
                    docs: ["Mint of the rewards token."];
                },
                {
                    name: "rewardsTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ["Destination account when miner claims rewards (owned by miner)."];
                },
                {
                    name: "claimFeeTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ["Account to send claim fees to."];
                },
                {
                    name: "miner";
                    isMut: true;
                    isSigner: false;
                    docs: ["Claim accounts"];
                },
                {
                    name: "quarry";
                    isMut: true;
                    isSigner: false;
                    docs: ["Quarry to claim from."];
                },
                {
                    name: "rewarder";
                    isMut: false;
                    isSigner: false;
                    docs: ["Rewarder"];
                },
                {
                    name: "redeemer";
                    isMut: true;
                    isSigner: false;
                    docs: ["Redeemer"];
                },
                {
                    name: "redemptionVault";
                    isMut: true;
                    isSigner: false;
                    docs: ["Redemption Vault"];
                },
                {
                    name: "minerVault";
                    isMut: true;
                    isSigner: false;
                    docs: ["Vault of the miner, holds staked tokens."];
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: "editVault";
            accounts: [
                {
                    name: "vaultAuthority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "activePhaseStartTimestamp";
                    type: "i64";
                },
                {
                    name: "activePhaseEndTimestamp";
                    type: "i64";
                },
                {
                    name: "feeRate";
                    type: "f64";
                }
            ];
        }
    ];
    accounts: [
        {
            name: "jAuthority";
            docs: [
                "Signs for J operations on behalf of the program.",
                "Since J-mint and related operations operate across vaults,",
                "no single vault_info can own it. Instead, we need a common owner."
            ];
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "jRedeemPool";
                        type: "publicKey";
                    },
                    {
                        name: "baseMint";
                        type: "publicKey";
                    },
                    {
                        name: "jMint";
                        type: "publicKey";
                    },
                    {
                        name: "feeWallet";
                        type: "publicKey";
                    },
                    {
                        name: "feeRate";
                        type: "f64";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    }
                ];
            };
        },
        {
            name: "vaultInfo";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "vaultAuthority";
                        type: "publicKey";
                    },
                    {
                        name: "activePhaseStartTimestamp";
                        type: "i64";
                    },
                    {
                        name: "activePhaseEndTimestamp";
                        type: "i64";
                    },
                    {
                        name: "iMint";
                        type: "publicKey";
                    },
                    {
                        name: "jMint";
                        type: "publicKey";
                    },
                    {
                        name: "jAuthority";
                        type: "publicKey";
                    },
                    {
                        name: "lifecyclePhase";
                        type: {
                            name: "lifecyclePhase";
                            defined: "VaultLifecyclePhase";
                        };
                    },
                    {
                        name: "feeWallet";
                        type: "publicKey";
                    },
                    {
                        name: "feeRate";
                        type: "f64";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "iRedeemPool";
                        type: "publicKey";
                    },
                    {
                        name: "jRedeemPool";
                        type: "publicKey";
                    },
                    {
                        name: "holdingPool";
                        type: "publicKey";
                    },
                    {
                        name: "baseMint";
                        type: "publicKey";
                    },
                    {
                        name: "jMintedThisLifecycle";
                        type: "u64";
                    },
                    {
                        name: "miner";
                        type: "publicKey";
                    },
                    {
                        name: "quarry";
                        type: "publicKey";
                    },
                    {
                        name: "rewarder";
                        type: "publicKey";
                    },
                    {
                        name: "redeemer";
                        type: "publicKey";
                    },
                    {
                        name: "minter";
                        type: "publicKey";
                    },
                    {
                        name: "rewardsTokenAccount";
                        type: "publicKey";
                    },
                    {
                        name: "rewardsTokenMint";
                        type: "publicKey";
                    },
                    {
                        name: "mintWrapper";
                        type: "publicKey";
                    },
                    {
                        name: "claimFeeTokenAccount";
                        type: "publicKey";
                    },
                    {
                        name: "minerVault";
                        type: "publicKey";
                    },
                    {
                        name: "redemptionVault";
                        type: "publicKey";
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: "VaultLifecyclePhase";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Warmup";
                    },
                    {
                        name: "Active";
                    },
                    {
                        name: "Expired";
                    }
                ];
            };
        }
    ];
    errors: [
        {
            code: 6000;
            name: "InvalidTimestamp";
            msg: "Invalid timestamp configuration parameters";
        },
        {
            code: 6001;
            name: "InvalidFeeRate";
            msg: "Invalid fee rate or fee rate decimals";
        },
        {
            code: 6002;
            name: "LowBalance";
            msg: "balance too low";
        },
        {
            code: 6003;
            name: "LowIBalance";
            msg: "I balance too low";
        },
        {
            code: 6004;
            name: "LowJBalance";
            msg: "J balance too low";
        },
        {
            code: 6005;
            name: "LowJRedeem";
            msg: "J-redeem pool balance too low";
        },
        {
            code: 6006;
            name: "DepositOnExpiredVault";
            msg: "Cannot perform user deposit on expired vault";
        },
        {
            code: 6007;
            name: "RedeemIAndJOnExpiredVault";
            msg: "Cannot perform withdrawal from staking on expired vault";
        },
        {
            code: 6008;
            name: "WithdrawAmountTooSmall";
            msg: "Amount is too small to perform withdrawal";
        },
        {
            code: 6009;
            name: "AbsurdMathResults";
            msg: "Absurd math results";
        },
        {
            code: 6010;
            name: "InvalidLifecyclePhaseChange";
            msg: "Invalid VaultLifecyclePhase change";
        },
        {
            code: 6011;
            name: "ISupplyNotEmptyStakePoolEmpty";
            msg: "Cannot perform deposit because i-Supply isn't empty but stake pool is empty";
        },
        {
            code: 6012;
            name: "ISupplyEmptyStakePoolNotEmpty";
            msg: "Cannot perform deposit because i-Supply is empty but stake pool isn't empty";
        }
    ];
};

export const IDL: JungleQuarryV1 = {
    version: "0.1.0",
    name: "jungle_quarry_v1",
    instructions: [
        {
            name: "initVault",
            accounts: [
                {
                    name: "vaultAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "iMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "iRedeemPool",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "jRedeemPool",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "holdingPool",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "miner",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "minerVault",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "quarry",
                    isMut: true,
                    isSigner: false,
                    docs: ["Quarry to claim from."]
                },
                {
                    name: "rewarder",
                    isMut: false,
                    isSigner: false,
                    docs: ["Rewarder"]
                },
                {
                    name: "redeemer",
                    isMut: false,
                    isSigner: false,
                    docs: ["Redeemer"]
                },
                {
                    name: "minter",
                    isMut: true,
                    isSigner: false,
                    docs: ["[quarry_mint_wrapper::Minter] information."]
                },
                {
                    name: "quarryMineProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rewardsTokenAccount",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "rewardsTokenMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "mintWrapper",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "claimFeeTokenAccount",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "redemptionVault",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "activePhaseStartTimestamp",
                    type: "i64"
                },
                {
                    name: "activePhaseEndTimestamp",
                    type: "i64"
                },
                {
                    name: "feeRate",
                    type: "f64"
                }
            ]
        },
        {
            name: "initJAccounts",
            accounts: [
                {
                    name: "vaultAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "jAuthority",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "jMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jRedeemPool",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "feeRate",
                    type: "f64"
                }
            ]
        },
        {
            name: "deposit",
            accounts: [
                {
                    name: "depositAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "from",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iTo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jTo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "holdingPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "quarryMineProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "miner",
                    isMut: true,
                    isSigner: false,
                    docs: ["Claim accounts"]
                },
                {
                    name: "quarry",
                    isMut: true,
                    isSigner: false,
                    docs: ["Quarry to claim from."]
                },
                {
                    name: "minerVault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault of the miner, holds staked tokens."]
                },
                {
                    name: "rewardsTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ["Destination account when miner claims rewards (owned by miner)."]
                },
                {
                    name: "rewarder",
                    isMut: false,
                    isSigner: false,
                    docs: ["Rewarder"]
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "amount",
                    type: "u64"
                }
            ]
        },
        {
            name: "redeemIAndJ",
            accounts: [
                {
                    name: "withdrawAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "iMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "to",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iFrom",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jFrom",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "holdingPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "feeWallet",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "quarryMineProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "miner",
                    isMut: true,
                    isSigner: false,
                    docs: ["Claim accounts"]
                },
                {
                    name: "quarry",
                    isMut: true,
                    isSigner: false,
                    docs: ["Quarry to claim from."]
                },
                {
                    name: "minerVault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault of the miner, holds staked tokens."]
                },
                {
                    name: "rewardsTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ["Destination account when miner claims rewards (owned by miner)."]
                },
                {
                    name: "rewarder",
                    isMut: false,
                    isSigner: false,
                    docs: ["Rewarder"]
                },
                {
                    name: "mintWrapper",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "mintWrapperProgram",
                    isMut: false,
                    isSigner: false,
                    docs: ["Mint wrapper program."]
                },
                {
                    name: "minter",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "rewardsTokenMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["Mint of the rewards token."]
                },
                {
                    name: "claimFeeTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ["Account to send claim fees to."]
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "ijAmount",
                    type: "u64"
                }
            ]
        },
        {
            name: "redeemJ",
            accounts: [
                {
                    name: "withdrawAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "jMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "to",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jFrom",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "jRedeemPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "feeWallet",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "jAmount",
                    type: "u64"
                }
            ]
        },
        {
            name: "redeemI",
            accounts: [
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iMint",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "withdrawAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "to",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iFrom",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "iRedeemPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "feeWallet",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "iAmount",
                    type: "u64"
                }
            ]
        },
        {
            name: "crank",
            accounts: [
                {
                    name: "executor",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "baseMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "iMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "jMint",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "iRedeemPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "jRedeemPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "holdingPool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "mintWrapper",
                    isMut: true,
                    isSigner: false,
                    docs: ["Mint wrapper."]
                },
                {
                    name: "mintWrapperProgram",
                    isMut: false,
                    isSigner: false,
                    docs: ["Mint wrapper program."]
                },
                {
                    name: "quarryMineProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "quarryRedeemerProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "minter",
                    isMut: true,
                    isSigner: false,
                    docs: ["[quarry_mint_wrapper::Minter] information."]
                },
                {
                    name: "rewardsTokenMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["Mint of the rewards token."]
                },
                {
                    name: "rewardsTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ["Destination account when miner claims rewards (owned by miner)."]
                },
                {
                    name: "claimFeeTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ["Account to send claim fees to."]
                },
                {
                    name: "miner",
                    isMut: true,
                    isSigner: false,
                    docs: ["Claim accounts"]
                },
                {
                    name: "quarry",
                    isMut: true,
                    isSigner: false,
                    docs: ["Quarry to claim from."]
                },
                {
                    name: "rewarder",
                    isMut: false,
                    isSigner: false,
                    docs: ["Rewarder"]
                },
                {
                    name: "redeemer",
                    isMut: true,
                    isSigner: false,
                    docs: ["Redeemer"]
                },
                {
                    name: "redemptionVault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Redemption Vault"]
                },
                {
                    name: "minerVault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault of the miner, holds staked tokens."]
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: "editVault",
            accounts: [
                {
                    name: "vaultAuthority",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "activePhaseStartTimestamp",
                    type: "i64"
                },
                {
                    name: "activePhaseEndTimestamp",
                    type: "i64"
                },
                {
                    name: "feeRate",
                    type: "f64"
                }
            ]
        }
    ],
    accounts: [
        {
            name: "jAuthority",
            docs: [
                "Signs for J operations on behalf of the program.",
                "Since J-mint and related operations operate across vaults,",
                "no single vault_info can own it. Instead, we need a common owner."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "jRedeemPool",
                        type: "publicKey"
                    },
                    {
                        name: "baseMint",
                        type: "publicKey"
                    },
                    {
                        name: "jMint",
                        type: "publicKey"
                    },
                    {
                        name: "feeWallet",
                        type: "publicKey"
                    },
                    {
                        name: "feeRate",
                        type: "f64"
                    },
                    {
                        name: "bump",
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "vaultInfo",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "vaultAuthority",
                        type: "publicKey"
                    },
                    {
                        name: "activePhaseStartTimestamp",
                        type: "i64"
                    },
                    {
                        name: "activePhaseEndTimestamp",
                        type: "i64"
                    },
                    {
                        name: "iMint",
                        type: "publicKey"
                    },
                    {
                        name: "jMint",
                        type: "publicKey"
                    },
                    {
                        name: "jAuthority",
                        type: "publicKey"
                    },
                    {
                        name: "lifecyclePhase",
                        type: {
                            name: "lifecyclePhase",
                            defined: "VaultLifecyclePhase"
                        }
                    },
                    {
                        name: "feeWallet",
                        type: "publicKey"
                    },
                    {
                        name: "feeRate",
                        type: "f64"
                    },
                    {
                        name: "bump",
                        type: "u8"
                    },
                    {
                        name: "iRedeemPool",
                        type: "publicKey"
                    },
                    {
                        name: "jRedeemPool",
                        type: "publicKey"
                    },
                    {
                        name: "holdingPool",
                        type: "publicKey"
                    },
                    {
                        name: "baseMint",
                        type: "publicKey"
                    },
                    {
                        name: "jMintedThisLifecycle",
                        type: "u64"
                    },
                    {
                        name: "miner",
                        type: "publicKey"
                    },
                    {
                        name: "quarry",
                        type: "publicKey"
                    },
                    {
                        name: "rewarder",
                        type: "publicKey"
                    },
                    {
                        name: "redeemer",
                        type: "publicKey"
                    },
                    {
                        name: "minter",
                        type: "publicKey"
                    },
                    {
                        name: "rewardsTokenAccount",
                        type: "publicKey"
                    },
                    {
                        name: "rewardsTokenMint",
                        type: "publicKey"
                    },
                    {
                        name: "mintWrapper",
                        type: "publicKey"
                    },
                    {
                        name: "claimFeeTokenAccount",
                        type: "publicKey"
                    },
                    {
                        name: "minerVault",
                        type: "publicKey"
                    },
                    {
                        name: "redemptionVault",
                        type: "publicKey"
                    }
                ]
            }
        }
    ],
    types: [
        {
            name: "VaultLifecyclePhase",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Warmup"
                    },
                    {
                        name: "Active"
                    },
                    {
                        name: "Expired"
                    }
                ]
            }
        }
    ],
    errors: [
        {
            code: 6000,
            name: "InvalidTimestamp",
            msg: "Invalid timestamp configuration parameters"
        },
        {
            code: 6001,
            name: "InvalidFeeRate",
            msg: "Invalid fee rate or fee rate decimals"
        },
        {
            code: 6002,
            name: "LowBalance",
            msg: "balance too low"
        },
        {
            code: 6003,
            name: "LowIBalance",
            msg: "I balance too low"
        },
        {
            code: 6004,
            name: "LowJBalance",
            msg: "J balance too low"
        },
        {
            code: 6005,
            name: "LowJRedeem",
            msg: "J-redeem pool balance too low"
        },
        {
            code: 6006,
            name: "DepositOnExpiredVault",
            msg: "Cannot perform user deposit on expired vault"
        },
        {
            code: 6007,
            name: "RedeemIAndJOnExpiredVault",
            msg: "Cannot perform withdrawal from staking on expired vault"
        },
        {
            code: 6008,
            name: "WithdrawAmountTooSmall",
            msg: "Amount is too small to perform withdrawal"
        },
        {
            code: 6009,
            name: "AbsurdMathResults",
            msg: "Absurd math results"
        },
        {
            code: 6010,
            name: "InvalidLifecyclePhaseChange",
            msg: "Invalid VaultLifecyclePhase change"
        },
        {
            code: 6011,
            name: "ISupplyNotEmptyStakePoolEmpty",
            msg: "Cannot perform deposit because i-Supply isn't empty but stake pool is empty"
        },
        {
            code: 6012,
            name: "ISupplyEmptyStakePoolNotEmpty",
            msg: "Cannot perform deposit because i-Supply is empty but stake pool isn't empty"
        }
    ]
};
