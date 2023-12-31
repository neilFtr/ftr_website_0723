export const RandomIdlV2 = {
  "version": "0.1.0",
  "name": "distributor_ftr_v1",
  "instructions": [
    {
      "name": "initializeContract",
      "docs": [
        "* Initialize/Create the contract\r\n     *\r\n     * Should only be called by the super owner"
      ],
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ftrWhirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ftrMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralMint",
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
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "adminUpdatesPrice",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
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
          "name": "newPrice",
          "type": "u64"
        },
        {
          "name": "newApr",
          "type": "u64"
        },
        {
          "name": "newFtrPerContract",
          "type": "u64"
        }
      ]
    },
    {
      "name": "userBuysProduct",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFreeCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userContractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFtrAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
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
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "userSellsProduct",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFreeCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userContractAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFtrAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
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
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "userRequestsWithdrawal",
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
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
        }
      ]
    },
    {
      "name": "adminWithdraws",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFreeCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralMint",
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminTest",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "adminDeposits",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFreeCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralMint",
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminSetsVaultCap",
      "accounts": [
        {
          "name": "contractAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "contractState",
          "isMut": true,
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeUser",
      "docs": [
        "* Initialize the User State Account for the contract\r\n     *\r\n     * Should only be called by the user whose state is getting initialised\r\n     *\r\n     * One state per contract"
      ],
      "accounts": [
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contractState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFreeCollateralAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultFtrAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ftrMint",
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
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ContractState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "treasuryWallet",
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
            "name": "isHaltedTrading",
            "type": "bool"
          },
          {
            "name": "collateralMint",
            "type": "publicKey"
          },
          {
            "name": "contractMint",
            "type": "publicKey"
          },
          {
            "name": "ftrMint",
            "type": "publicKey"
          },
          {
            "name": "ftrWhirlpool",
            "type": "publicKey"
          },
          {
            "name": "capProduct",
            "type": "u64"
          },
          {
            "name": "priceContract",
            "type": "u64"
          },
          {
            "name": "lastTimePriceUpdated",
            "type": "u64"
          },
          {
            "name": "metricMultiplier",
            "type": "u64"
          },
          {
            "name": "tvlUsdcOnchain",
            "type": "u64"
          },
          {
            "name": "contractsIssued",
            "type": "u64"
          },
          {
            "name": "ftrAllocPerContract",
            "type": "u64"
          },
          {
            "name": "nbFtrLockedGlobal",
            "type": "u64"
          },
          {
            "name": "contractApr",
            "type": "u64"
          },
          {
            "name": "withdrawalFeeBps",
            "type": "u64"
          },
          {
            "name": "performanceFeeBps",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u64",
                13
              ]
            }
          }
        ]
      }
    },
    {
      "name": "UserState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractAccount",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ishalted",
            "type": "bool"
          },
          {
            "name": "usdcDeposited",
            "type": "u64"
          },
          {
            "name": "usdcWithdrawn",
            "type": "u64"
          },
          {
            "name": "usdcDepositedR",
            "type": "u64"
          },
          {
            "name": "usdcWithdrawnR",
            "type": "u64"
          },
          {
            "name": "usdcDepositedAdmin",
            "type": "u64"
          },
          {
            "name": "usdcWithdrawnAdmin",
            "type": "u64"
          },
          {
            "name": "contractBought",
            "type": "u64"
          },
          {
            "name": "averagePriceBought",
            "type": "u64"
          },
          {
            "name": "contractSold",
            "type": "u64"
          },
          {
            "name": "averagePriceSold",
            "type": "u64"
          },
          {
            "name": "requestedWithdrawal",
            "type": "u64"
          },
          {
            "name": "nbFtrLocked",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u64",
                14
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "Invalid",
      "msg": "InvalidInstruction"
    },
    {
      "code": 6002,
      "name": "ReInitialize",
      "msg": "The config has already been initialized."
    },
    {
      "code": 6003,
      "name": "UnInitialize",
      "msg": "The config has not been initialized."
    },
    {
      "code": 6004,
      "name": "InvalidArgument",
      "msg": "Argument is invalid."
    },
    {
      "code": 6005,
      "name": "Overflow",
      "msg": "An overflow occurs."
    },
    {
      "code": 6006,
      "name": "PythError",
      "msg": "Pyth has an internal error."
    },
    {
      "code": 6007,
      "name": "PythOffline",
      "msg": "Pyth price oracle is offline."
    },
    {
      "code": 6008,
      "name": "TryToSerializePriceAccount",
      "msg": "Program should not try to serialize a price account."
    },
    {
      "code": 6009,
      "name": "ContractEnded",
      "msg": "Contract has Ended Already"
    },
    {
      "code": 6010,
      "name": "ContractHalted",
      "msg": "Contract has been halted for trading and depositing"
    },
    {
      "code": 6011,
      "name": "ContractDepositHalted",
      "msg": "Contract has been halted for depositing"
    },
    {
      "code": 6012,
      "name": "ContractTradingHalted",
      "msg": "Contract has been halted for trading"
    },
    {
      "code": 6013,
      "name": "ClosePositionBiggerThanOpened",
      "msg": "Trying to close a bigger position than what you have opened"
    },
    {
      "code": 6014,
      "name": "MaturityNotReached",
      "msg": "Maturity Time not reached"
    },
    {
      "code": 6015,
      "name": "AlreadySettling",
      "msg": "Already In Settle Mode"
    },
    {
      "code": 6016,
      "name": "ShortLeaveUnhealthy",
      "msg": "Leaves Vault Unhealthy short"
    },
    {
      "code": 6017,
      "name": "CloseShortBeforeLong",
      "msg": "Need to close short before opening long"
    },
    {
      "code": 6018,
      "name": "CloseLongBeforeShort",
      "msg": "Need to close short before opening long"
    },
    {
      "code": 6019,
      "name": "PlatformUnhealthy",
      "msg": "Action leaves the platform unhealthy"
    },
    {
      "code": 6020,
      "name": "NotSettling",
      "msg": "Contract not in settling mode"
    },
    {
      "code": 6021,
      "name": "ErrorAccounting",
      "msg": "Error in internal accounting"
    },
    {
      "code": 6022,
      "name": "LeakInFAccount",
      "msg": "LeakInFreeAccountUser"
    },
    {
      "code": 6023,
      "name": "MaxCapReached",
      "msg": "MaxCapReached"
    }
  ],
  "metadata": {
    "address": "3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E"
  }
}