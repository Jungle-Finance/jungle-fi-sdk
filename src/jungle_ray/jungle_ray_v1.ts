export type JungleRayV1 = {
    version: "0.1.0";
    name: "jungle_ray_v1";
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
                    name: "stakeProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "stakePool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "stakerInfoV2";
                    isMut: true;
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
                    docs: ['Owner of "from" account.'];
                },
                {
                    name: "vaultInfo";
                    isMut: true;
                    isSigner: false;
                    docs: ["Vault PDA"];
                },
                {
                    name: "iMint";
                    isMut: true;
                    isSigner: false;
                    docs: ["Reward receipt token"];
                },
                {
                    name: "jMint";
                    isMut: true;
                    isSigner: false;
                    docs: ["Stake receipt token"];
                },
                {
                    name: "from";
                    isMut: true;
                    isSigner: false;
                    docs: ["Depositor's base mint account"];
                },
                {
                    name: "iTo";
                    isMut: true;
                    isSigner: false;
                    docs: ["Depositor's i-mint account"];
                },
                {
                    name: "jTo";
                    isMut: true;
                    isSigner: false;
                    docs: ["Depositor's j-mint account"];
                },
                {
                    name: "holdingPool";
                    isMut: true;
                    isSigner: false;
                    docs: ["Temporarily holds base asset, e.g. when not staked."];
                },
                {
                    name: "stakePool";
                    isMut: true;
                    isSigner: false;
                    docs: ["RAY stake pool"];
                },
                {
                    name: "stakerInfoV2";
                    isMut: true;
                    isSigner: false;
                    docs: ["Staker info for the vault, e.g. amount staked, etc."];
                },
                {
                    name: "poolAuthority";
                    isMut: false;
                    isSigner: false;
                    docs: ["Signer on certain Stake program instructions."];
                },
                {
                    name: "vaultLpTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores tokens in the "LP" side of the stake_pool.'];
                },
                {
                    name: "vaultRewardTokenAccount";
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores tokens in the "reward" side of the stake_pool.'];
                },
                {
                    name: "stakeProgram";
                    isMut: false;
                    isSigner: false;
                    docs: ["Raydium Stake Program"];
                },
                {
                    name: "jAuthority";
                    isMut: false;
                    isSigner: false;
                    docs: ["Signer for MintTo instructions of j_mint."];
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
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "stakePool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "stakerInfoV2";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "poolAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "vaultLpTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultRewardTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "stakeProgram";
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
                    name: "stakePool";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "stakerInfoV2";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "poolAuthority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "vaultLpTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultRewardTokenAccount";
                    isMut: true;
                    isSigner: false;
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
                    name: "stakeProgram";
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
                        docs: ["Stores base_mint redeemable for burning j_mint"];
                        type: "publicKey";
                    },
                    {
                        name: "baseMint";
                        docs: ["Staked asset"];
                        type: "publicKey";
                    },
                    {
                        name: "jMint";
                        docs: ["Staked asset receipt mint"];
                        type: "publicKey";
                    },
                    {
                        name: "feeWallet";
                        docs: ["Destination wallet for fees collected on redeem instructions."];
                        type: "publicKey";
                    },
                    {
                        name: "feeRate";
                        docs: ["Fee rate, percentage."];
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
                        docs: ["The program administrator that can sign for edits to this vault"];
                        type: "publicKey";
                    },
                    {
                        name: "activePhaseStartTimestamp";
                        docs: ["SSBOE for when the vault enters Active phase"];
                        type: "i64";
                    },
                    {
                        name: "activePhaseEndTimestamp";
                        docs: [
                            "SSBOE for when the vault leaves Active phase and enters Expired phase"
                        ];
                        type: "i64";
                    },
                    {
                        name: "iMint";
                        docs: ["Rewards mint"];
                        type: "publicKey";
                    },
                    {
                        name: "jMint";
                        docs: ["Staked asset receipt mint"];
                        type: "publicKey";
                    },
                    {
                        name: "jAuthority";
                        docs: ["PDA signer for minting j_mint"];
                        type: "publicKey";
                    },
                    {
                        name: "lifecyclePhase";
                        docs: [
                            "The vault's current lifecycle phase, updated via Crank instruction"
                        ];
                        type: {
                            defined: "VaultLifecyclePhase";
                        };
                    },
                    {
                        name: "feeWallet";
                        docs: ["Destination wallet for fees collected on redeem instructions."];
                        type: "publicKey";
                    },
                    {
                        name: "feeRate";
                        docs: ["Fee rate, percentage."];
                        type: "f64";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "iRedeemPool";
                        docs: ["Stores base_mint redeemable for burning i_mint"];
                        type: "publicKey";
                    },
                    {
                        name: "jRedeemPool";
                        docs: ["Stores base_mint redeemable for burning j_mint"];
                        type: "publicKey";
                    },
                    {
                        name: "holdingPool";
                        docs: ["Temporary holding pool for warmup phase"];
                        type: "publicKey";
                    },
                    {
                        name: "baseMint";
                        docs: ["Staked asset"];
                        type: "publicKey";
                    },
                    {
                        name: "jMintedThisLifecycle";
                        docs: ["Amount staked in the vault during the current lifecycle"];
                        type: "u64";
                    },
                    {
                        name: "stakeProgram";
                        docs: ["Raydium Stake Program"];
                        type: "publicKey";
                    },
                    {
                        name: "stakePool";
                        docs: ["RAY stake pool, where both staked token and reward are RAY."];
                        type: "publicKey";
                    },
                    {
                        name: "stakerInfoV2";
                        docs: [
                            "Ledger account for this vault's amount staked, rewards, etc. in the stake_pool."
                        ];
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

export const IDL: JungleRayV1 = {
    version: "0.1.0",
    name: "jungle_ray_v1",
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
                    name: "stakeProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "stakerInfoV2",
                    isMut: true,
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
                    isSigner: true,
                    docs: ['Owner of "from" account.']
                },
                {
                    name: "vaultInfo",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault PDA"]
                },
                {
                    name: "iMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["Reward receipt token"]
                },
                {
                    name: "jMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["Stake receipt token"]
                },
                {
                    name: "from",
                    isMut: true,
                    isSigner: false,
                    docs: ["Depositor's base mint account"]
                },
                {
                    name: "iTo",
                    isMut: true,
                    isSigner: false,
                    docs: ["Depositor's i-mint account"]
                },
                {
                    name: "jTo",
                    isMut: true,
                    isSigner: false,
                    docs: ["Depositor's j-mint account"]
                },
                {
                    name: "holdingPool",
                    isMut: true,
                    isSigner: false,
                    docs: ["Temporarily holds base asset, e.g. when not staked."]
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                    docs: ["RAY stake pool"]
                },
                {
                    name: "stakerInfoV2",
                    isMut: true,
                    isSigner: false,
                    docs: ["Staker info for the vault, e.g. amount staked, etc."]
                },
                {
                    name: "poolAuthority",
                    isMut: false,
                    isSigner: false,
                    docs: ["Signer on certain Stake program instructions."]
                },
                {
                    name: "vaultLpTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores tokens in the "LP" side of the stake_pool.']
                },
                {
                    name: "vaultRewardTokenAccount",
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores tokens in the "reward" side of the stake_pool.']
                },
                {
                    name: "stakeProgram",
                    isMut: false,
                    isSigner: false,
                    docs: ["Raydium Stake Program"]
                },
                {
                    name: "jAuthority",
                    isMut: false,
                    isSigner: false,
                    docs: ["Signer for MintTo instructions of j_mint."]
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
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "stakerInfoV2",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "poolAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "vaultLpTokenAccount",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "vaultRewardTokenAccount",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "stakeProgram",
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
                    name: "stakePool",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "stakerInfoV2",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "poolAuthority",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "vaultLpTokenAccount",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "vaultRewardTokenAccount",
                    isMut: true,
                    isSigner: false
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
                    name: "stakeProgram",
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
                        docs: ["Stores base_mint redeemable for burning j_mint"],
                        type: "publicKey"
                    },
                    {
                        name: "baseMint",
                        docs: ["Staked asset"],
                        type: "publicKey"
                    },
                    {
                        name: "jMint",
                        docs: ["Staked asset receipt mint"],
                        type: "publicKey"
                    },
                    {
                        name: "feeWallet",
                        docs: ["Destination wallet for fees collected on redeem instructions."],
                        type: "publicKey"
                    },
                    {
                        name: "feeRate",
                        docs: ["Fee rate, percentage."],
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
                        docs: ["The program administrator that can sign for edits to this vault"],
                        type: "publicKey"
                    },
                    {
                        name: "activePhaseStartTimestamp",
                        docs: ["SSBOE for when the vault enters Active phase"],
                        type: "i64"
                    },
                    {
                        name: "activePhaseEndTimestamp",
                        docs: [
                            "SSBOE for when the vault leaves Active phase and enters Expired phase"
                        ],
                        type: "i64"
                    },
                    {
                        name: "iMint",
                        docs: ["Rewards mint"],
                        type: "publicKey"
                    },
                    {
                        name: "jMint",
                        docs: ["Staked asset receipt mint"],
                        type: "publicKey"
                    },
                    {
                        name: "jAuthority",
                        docs: ["PDA signer for minting j_mint"],
                        type: "publicKey"
                    },
                    {
                        name: "lifecyclePhase",
                        docs: [
                            "The vault's current lifecycle phase, updated via Crank instruction"
                        ],
                        type: {
                            defined: "VaultLifecyclePhase"
                        }
                    },
                    {
                        name: "feeWallet",
                        docs: ["Destination wallet for fees collected on redeem instructions."],
                        type: "publicKey"
                    },
                    {
                        name: "feeRate",
                        docs: ["Fee rate, percentage."],
                        type: "f64"
                    },
                    {
                        name: "bump",
                        type: "u8"
                    },
                    {
                        name: "iRedeemPool",
                        docs: ["Stores base_mint redeemable for burning i_mint"],
                        type: "publicKey"
                    },
                    {
                        name: "jRedeemPool",
                        docs: ["Stores base_mint redeemable for burning j_mint"],
                        type: "publicKey"
                    },
                    {
                        name: "holdingPool",
                        docs: ["Temporary holding pool for warmup phase"],
                        type: "publicKey"
                    },
                    {
                        name: "baseMint",
                        docs: ["Staked asset"],
                        type: "publicKey"
                    },
                    {
                        name: "jMintedThisLifecycle",
                        docs: ["Amount staked in the vault during the current lifecycle"],
                        type: "u64"
                    },
                    {
                        name: "stakeProgram",
                        docs: ["Raydium Stake Program"],
                        type: "publicKey"
                    },
                    {
                        name: "stakePool",
                        docs: ["RAY stake pool, where both staked token and reward are RAY."],
                        type: "publicKey"
                    },
                    {
                        name: "stakerInfoV2",
                        docs: [
                            "Ledger account for this vault's amount staked, rewards, etc. in the stake_pool."
                        ],
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
