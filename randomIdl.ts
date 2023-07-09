export const RandomIdl = {
  "version": "0.1.0",
  "name": "future_whirpool_clients",
  "instructions": [
    {
      "name": "initializeMmContract",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": [
        {
          "name": "contractName",
          "type": "string"
        },
        {
          "name": "bumps",
          "type": {
            "defined": "ContractBumps"
          }
        }
      ]
    },
    {
      "name": "initPdas",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractVaultUnderlyingTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractVaultUsdcTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "UserBumps"
          }
        }
      ]
    },
    {
      "name": "initUsersPdas",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userVaultUnderlyingTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userVaultUsdcTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": []
    },
    {
      "name": "initUsersRewardPdas",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userVaultRewardTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": []
    },
    {
      "name": "initUsersRewardPdasUser",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userVaultRewardTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
        }
      ],
      "args": []
    },
    {
      "name": "addCollateralToSc",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
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
      "name": "withdrawCollateralToUa",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
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
      "name": "withdrawCollateralToUaUnderlying",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
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
      "name": "withdrawCollateralToUaReward",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardMint",
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
      "name": "createSwapOrca",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "managerSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "openPositionOnOrca",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
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
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "OpenPositionBumps"
          }
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "addLiquidityOrcaF",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "collectFeesOrca",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectFeesTreasury",
      "accounts": [
        {
          "name": "contractAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectRewardOrca",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "reduceLiquidityOrcaF",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closePositionOnOrca",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectFeesOrcaUser",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasuryAccountB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectRewardOrcaUser",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "reduceLiquidityOrcaUser",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closePositionOnOrcaUser",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "contractAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "managerAddy",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "ContractAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractName",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "bumps",
            "type": {
              "defined": "ContractBumps"
            }
          },
          {
            "name": "contractAuthority",
            "type": "publicKey"
          },
          {
            "name": "managerAuthority",
            "type": "publicKey"
          },
          {
            "name": "isHalted",
            "type": "bool"
          },
          {
            "name": "isHaltedDeposit",
            "type": "bool"
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          },
          {
            "name": "underlyingMint",
            "type": "publicKey"
          },
          {
            "name": "ftrMint",
            "type": "publicKey"
          },
          {
            "name": "underlyingEscrow",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "capProduct",
            "type": "u64"
          },
          {
            "name": "currentTvlLiquidity",
            "type": "u64"
          },
          {
            "name": "currentTvlUsdc",
            "type": "u64"
          },
          {
            "name": "currentTvlUnderlying",
            "type": "u64"
          },
          {
            "name": "currentTvlEscrow",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractAccount",
            "type": "publicKey"
          },
          {
            "name": "bumps",
            "type": {
              "defined": "UserBumps"
            }
          },
          {
            "name": "userAuthority",
            "type": "publicKey"
          },
          {
            "name": "managerAuthority",
            "type": "publicKey"
          },
          {
            "name": "ishalted",
            "type": "bool"
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          },
          {
            "name": "underlyingMint",
            "type": "publicKey"
          },
          {
            "name": "underlyingDeposited",
            "type": "u64"
          },
          {
            "name": "usdcDeposited",
            "type": "u64"
          },
          {
            "name": "underlyingWithdrawn",
            "type": "u64"
          },
          {
            "name": "usdcWithdrawn",
            "type": "u64"
          },
          {
            "name": "feesUnderlyingGathered",
            "type": "u64"
          },
          {
            "name": "feesUsdcGathered",
            "type": "u64"
          },
          {
            "name": "feesUnderlyingStreas",
            "type": "u64"
          },
          {
            "name": "feesUsdcStreas",
            "type": "u64"
          },
          {
            "name": "lastRequestedWithdrawal",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ContractBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractAccount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "UserBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAccount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "OpenPositionBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "8SHZa8DXeyoRMBJS37aAvEMrxpDKDNxcrDniTy3BDSEd"
  }
}