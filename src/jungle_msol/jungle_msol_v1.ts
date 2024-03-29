export type JungleMsolV1 = {
  "version": "0.2.0",
  "name": "jungle_msol_v1",
  "instructions": [
    {
      "name": "initVault",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores SOL, accumulated and unstaked vault rewards redeemed from here"
          ]
        },
        {
          "name": "jRedeemPool",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Stores SOL, unstaked vault assets redeemed from here"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL is held here during warmup. This is the owner",
            "of the mSOL holding pool, and the beneficiary",
            "of the order unstake operation, before dividing",
            "unstaked assets to i and j redeem pools."
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Staked mSOL stored here during active phase"
          ]
        },
        {
          "name": "solFeeWallet",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Warmup and redeem pool fees"
          ]
        },
        {
          "name": "msolFeeWallet",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Active phase fees, mSOL"
          ]
        },
        {
          "name": "msolState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activePhaseStartTimestamp",
          "type": "i64"
        },
        {
          "name": "activePhaseEndTimestamp",
          "type": "i64"
        },
        {
          "name": "feeRate",
          "type": "f64"
        }
      ]
    },
    {
      "name": "initJAccounts",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "f64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault PDA"
          ]
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Reward receipt token"
          ]
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stake receipt token"
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "iTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Depositor's i-mint account"
          ]
        },
        {
          "name": "jTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Depositor's j-mint account"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL is held here during warmup. This is the owner",
            "of the mSOL holding pool, and the beneficiary",
            "of the order unstake operation, before dividing",
            "unstaked assets to i and j redeem pools."
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Staked mSOL stored here during active phase"
          ]
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Signer for MintTo instructions of j_mint."
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolSolLegPda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLeg",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemIAndJ",
      "accounts": [
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ijAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemJ",
      "accounts": [
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "jAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemI",
      "accounts": [
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "iAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankWarmup",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankActive",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, unpermissioned executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault whose lifecycle will be advanced into the active phase."
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL holdings prior to active phase"
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "mSOL holdings during active phase"
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolSolLegPda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLeg",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankUnstaking",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, permissionless executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault to crank into Unstaking phase"
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solHoldingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimTicket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "PDA that stores mSOL state"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankExpired",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, unpermissioned executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault whose lifecycle will be advanced into the expired phase."
          ]
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Destination of the vault staking rewards."
          ]
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Destination of the vault staked assets."
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Beneficiary of the claim ticket. From here, the",
            "SOL is apportioned out to the I and J redeem pools."
          ]
        },
        {
          "name": "claimTicket",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The claim ticket for the unstaking operation that takes place",
            "during [crank_unstaked]."
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "editVault",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolFeeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activePhaseStartTimestamp",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "activePhaseEndTimestamp",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "feeRate",
          "type": {
            "option": "f64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "jAuthority",
      "docs": [
        "Signs for J operations on behalf of the program.",
        "Since J-mint and related operations operate across vaults,",
        "no single vault_info can own it. Instead, we need a common owner."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "jRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMint",
            "docs": [
              "Staked asset receipt mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "docs": [
              "Fee rate, percentage."
            ],
            "type": "f64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultAuthority",
            "docs": [
              "The program administrator that can sign for edits to this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "activePhaseStartTimestamp",
            "docs": [
              "SSBOE for when the vault enters Active phase"
            ],
            "type": "i64"
          },
          {
            "name": "activePhaseEndTimestamp",
            "docs": [
              "SSBOE for when the vault leaves Active phase and enters Expired phase"
            ],
            "type": "i64"
          },
          {
            "name": "iMint",
            "docs": [
              "Rewards mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMint",
            "docs": [
              "Staked asset receipt mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jAuthority",
            "docs": [
              "PDA signer for minting j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "lifecyclePhase",
            "docs": [
              "The vault's current lifecycle phase, updated via Crank instruction"
            ],
            "type": "u8"
          },
          {
            "name": "pad0",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "solFeeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "msolFeeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "docs": [
              "Fee rate, percentage."
            ],
            "type": "f64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pad1",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "iRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning i_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "solHoldingPool",
            "docs": [
              "Temporary holding pool for warmup phase"
            ],
            "type": "publicKey"
          },
          {
            "name": "msolHoldingPool",
            "docs": [
              "Staked mSOL stored here during active phase"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMintedThisLifecycle",
            "docs": [
              "Amount staked in the vault during the current lifecycle"
            ],
            "type": "u64"
          },
          {
            "name": "msolState",
            "docs": [
              "PDA that stores mSOL state"
            ],
            "type": "publicKey"
          },
          {
            "name": "msolPerMegasolInitial",
            "docs": [
              "How many msol lamports 1_000 sol is worth at the start of the current lifecycle's active phase"
            ],
            "type": {
              "defined": "OptionNonzeroU64"
            }
          },
          {
            "name": "claimTicket",
            "docs": [
              "Order Unstake claim ticket.",
              "`Pubkey::default` means there is no claim ticket",
              "(zero-copy types cannot take `Option`)."
            ],
            "type": "publicKey"
          },
          {
            "name": "eventId",
            "docs": [
              "i64 is chosen here because it is more compatible with SQL databases"
            ],
            "type": "i64"
          },
          {
            "name": "space",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TicketAccountData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stateAddress",
            "type": "publicKey"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "lamportsAmount",
            "type": "u64"
          },
          {
            "name": "createdEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OptionNonzeroU64",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inner",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultLifecyclePhase",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Warmup"
          },
          {
            "name": "Active"
          },
          {
            "name": "Unstaking"
          },
          {
            "name": "Expired"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeserializeErrorDiscriminator",
      "msg": "Invalid Discriminator"
    },
    {
      "code": 6001,
      "name": "DeserializeError",
      "msg": "Deserialization Error"
    },
    {
      "code": 6002,
      "name": "SerializeError",
      "msg": "Serialization Error"
    },
    {
      "code": 6003,
      "name": "InvalidTimestamp",
      "msg": "Invalid timestamp configuration parameters"
    },
    {
      "code": 6004,
      "name": "InvalidFeeRate",
      "msg": "Invalid fee rate or fee rate decimals"
    },
    {
      "code": 6005,
      "name": "LowBalance",
      "msg": "balance too low"
    },
    {
      "code": 6006,
      "name": "LowIBalance",
      "msg": "I balance too low"
    },
    {
      "code": 6007,
      "name": "LowJBalance",
      "msg": "J balance too low"
    },
    {
      "code": 6008,
      "name": "LowJRedeem",
      "msg": "J-redeem pool balance too low"
    },
    {
      "code": 6009,
      "name": "DepositOnExpiredVault",
      "msg": "Cannot perform user deposit on expired vault"
    },
    {
      "code": 6010,
      "name": "RedeemIAndJOnExpiredVault",
      "msg": "Cannot perform withdrawal from staking on expired vault"
    },
    {
      "code": 6011,
      "name": "WithdrawAmountTooSmall",
      "msg": "Amount is too small to perform withdrawal"
    },
    {
      "code": 6012,
      "name": "AbsurdMathResults",
      "msg": "Absurd math results"
    },
    {
      "code": 6013,
      "name": "InvalidLifecyclePhaseChange",
      "msg": "Invalid VaultLifecyclePhase change"
    },
    {
      "code": 6014,
      "name": "ISupplyNotEmptyStakePoolEmpty",
      "msg": "Cannot perform deposit because i-Supply isn't empty but stake pool is empty"
    },
    {
      "code": 6015,
      "name": "ISupplyEmptyStakePoolNotEmpty",
      "msg": "Cannot perform deposit because i-Supply is empty but stake pool isn't empty"
    },
    {
      "code": 6016,
      "name": "InvalidMintDecimals",
      "msg": "Incorrect mint decimals for use as an I-token or J-token mint"
    },
    {
      "code": 6017,
      "name": "InvalidMintSupply",
      "msg": "Cannot initialize I-token or J-token mint with non-zero supply"
    }
  ]
};

export const IDL: JungleMsolV1 = {
  "version": "0.2.0",
  "name": "jungle_msol_v1",
  "instructions": [
    {
      "name": "initVault",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores SOL, accumulated and unstaked vault rewards redeemed from here"
          ]
        },
        {
          "name": "jRedeemPool",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Stores SOL, unstaked vault assets redeemed from here"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL is held here during warmup. This is the owner",
            "of the mSOL holding pool, and the beneficiary",
            "of the order unstake operation, before dividing",
            "unstaked assets to i and j redeem pools."
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Staked mSOL stored here during active phase"
          ]
        },
        {
          "name": "solFeeWallet",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Warmup and redeem pool fees"
          ]
        },
        {
          "name": "msolFeeWallet",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Active phase fees, mSOL"
          ]
        },
        {
          "name": "msolState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activePhaseStartTimestamp",
          "type": "i64"
        },
        {
          "name": "activePhaseEndTimestamp",
          "type": "i64"
        },
        {
          "name": "feeRate",
          "type": "f64"
        }
      ]
    },
    {
      "name": "initJAccounts",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "f64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault PDA"
          ]
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Reward receipt token"
          ]
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stake receipt token"
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "iTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Depositor's i-mint account"
          ]
        },
        {
          "name": "jTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Depositor's j-mint account"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL is held here during warmup. This is the owner",
            "of the mSOL holding pool, and the beneficiary",
            "of the order unstake operation, before dividing",
            "unstaked assets to i and j redeem pools."
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Staked mSOL stored here during active phase"
          ]
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Signer for MintTo instructions of j_mint."
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolSolLegPda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLeg",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account used for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemIAndJ",
      "accounts": [
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ijAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemJ",
      "accounts": [
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "jMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "jAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "jAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemI",
      "accounts": [
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "withdrawAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "iFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "iAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankWarmup",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankActive",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, unpermissioned executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault whose lifecycle will be advanced into the active phase."
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL holdings prior to active phase"
          ]
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "mSOL holdings during active phase"
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolSolLegPda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLeg",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "liqPoolMsolLegAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "msolMintAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankUnstaking",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, permissionless executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault to crank into Unstaking phase"
          ]
        },
        {
          "name": "msolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solHoldingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolHoldingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimTicket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "PDA that stores mSOL state"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crankExpired",
      "accounts": [
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signing, fee-paying, unpermissioned executor of this operation."
          ]
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault whose lifecycle will be advanced into the expired phase."
          ]
        },
        {
          "name": "iRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Destination of the vault staking rewards."
          ]
        },
        {
          "name": "jRedeemPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Destination of the vault staked assets."
          ]
        },
        {
          "name": "solHoldingPool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Beneficiary of the claim ticket. From here, the",
            "SOL is apportioned out to the I and J redeem pools."
          ]
        },
        {
          "name": "claimTicket",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The claim ticket for the unstaking operation that takes place",
            "during [crank_unstaked]."
          ]
        },
        {
          "name": "msolState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "reservePda",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Marinade account for CPI"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marinadeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "editVault",
      "accounts": [
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solFeeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "msolFeeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activePhaseStartTimestamp",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "activePhaseEndTimestamp",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "feeRate",
          "type": {
            "option": "f64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "jAuthority",
      "docs": [
        "Signs for J operations on behalf of the program.",
        "Since J-mint and related operations operate across vaults,",
        "no single vault_info can own it. Instead, we need a common owner."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "jRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMint",
            "docs": [
              "Staked asset receipt mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "docs": [
              "Fee rate, percentage."
            ],
            "type": "f64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultAuthority",
            "docs": [
              "The program administrator that can sign for edits to this vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "activePhaseStartTimestamp",
            "docs": [
              "SSBOE for when the vault enters Active phase"
            ],
            "type": "i64"
          },
          {
            "name": "activePhaseEndTimestamp",
            "docs": [
              "SSBOE for when the vault leaves Active phase and enters Expired phase"
            ],
            "type": "i64"
          },
          {
            "name": "iMint",
            "docs": [
              "Rewards mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMint",
            "docs": [
              "Staked asset receipt mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jAuthority",
            "docs": [
              "PDA signer for minting j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "lifecyclePhase",
            "docs": [
              "The vault's current lifecycle phase, updated via Crank instruction"
            ],
            "type": "u8"
          },
          {
            "name": "pad0",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "solFeeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "msolFeeWallet",
            "docs": [
              "Destination wallet for fees collected on redeem instructions."
            ],
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "docs": [
              "Fee rate, percentage."
            ],
            "type": "f64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pad1",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "iRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning i_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "jRedeemPool",
            "docs": [
              "Stores base_mint redeemable for burning j_mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "solHoldingPool",
            "docs": [
              "Temporary holding pool for warmup phase"
            ],
            "type": "publicKey"
          },
          {
            "name": "msolHoldingPool",
            "docs": [
              "Staked mSOL stored here during active phase"
            ],
            "type": "publicKey"
          },
          {
            "name": "jMintedThisLifecycle",
            "docs": [
              "Amount staked in the vault during the current lifecycle"
            ],
            "type": "u64"
          },
          {
            "name": "msolState",
            "docs": [
              "PDA that stores mSOL state"
            ],
            "type": "publicKey"
          },
          {
            "name": "msolPerMegasolInitial",
            "docs": [
              "How many msol lamports 1_000 sol is worth at the start of the current lifecycle's active phase"
            ],
            "type": {
              "defined": "OptionNonzeroU64"
            }
          },
          {
            "name": "claimTicket",
            "docs": [
              "Order Unstake claim ticket.",
              "`Pubkey::default` means there is no claim ticket",
              "(zero-copy types cannot take `Option`)."
            ],
            "type": "publicKey"
          },
          {
            "name": "eventId",
            "docs": [
              "i64 is chosen here because it is more compatible with SQL databases"
            ],
            "type": "i64"
          },
          {
            "name": "space",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TicketAccountData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stateAddress",
            "type": "publicKey"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "lamportsAmount",
            "type": "u64"
          },
          {
            "name": "createdEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OptionNonzeroU64",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inner",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultLifecyclePhase",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Warmup"
          },
          {
            "name": "Active"
          },
          {
            "name": "Unstaking"
          },
          {
            "name": "Expired"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DeserializeErrorDiscriminator",
      "msg": "Invalid Discriminator"
    },
    {
      "code": 6001,
      "name": "DeserializeError",
      "msg": "Deserialization Error"
    },
    {
      "code": 6002,
      "name": "SerializeError",
      "msg": "Serialization Error"
    },
    {
      "code": 6003,
      "name": "InvalidTimestamp",
      "msg": "Invalid timestamp configuration parameters"
    },
    {
      "code": 6004,
      "name": "InvalidFeeRate",
      "msg": "Invalid fee rate or fee rate decimals"
    },
    {
      "code": 6005,
      "name": "LowBalance",
      "msg": "balance too low"
    },
    {
      "code": 6006,
      "name": "LowIBalance",
      "msg": "I balance too low"
    },
    {
      "code": 6007,
      "name": "LowJBalance",
      "msg": "J balance too low"
    },
    {
      "code": 6008,
      "name": "LowJRedeem",
      "msg": "J-redeem pool balance too low"
    },
    {
      "code": 6009,
      "name": "DepositOnExpiredVault",
      "msg": "Cannot perform user deposit on expired vault"
    },
    {
      "code": 6010,
      "name": "RedeemIAndJOnExpiredVault",
      "msg": "Cannot perform withdrawal from staking on expired vault"
    },
    {
      "code": 6011,
      "name": "WithdrawAmountTooSmall",
      "msg": "Amount is too small to perform withdrawal"
    },
    {
      "code": 6012,
      "name": "AbsurdMathResults",
      "msg": "Absurd math results"
    },
    {
      "code": 6013,
      "name": "InvalidLifecyclePhaseChange",
      "msg": "Invalid VaultLifecyclePhase change"
    },
    {
      "code": 6014,
      "name": "ISupplyNotEmptyStakePoolEmpty",
      "msg": "Cannot perform deposit because i-Supply isn't empty but stake pool is empty"
    },
    {
      "code": 6015,
      "name": "ISupplyEmptyStakePoolNotEmpty",
      "msg": "Cannot perform deposit because i-Supply is empty but stake pool isn't empty"
    },
    {
      "code": 6016,
      "name": "InvalidMintDecimals",
      "msg": "Incorrect mint decimals for use as an I-token or J-token mint"
    },
    {
      "code": 6017,
      "name": "InvalidMintSupply",
      "msg": "Cannot initialize I-token or J-token mint with non-zero supply"
    }
  ]
};
