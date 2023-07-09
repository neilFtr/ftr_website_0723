const STAKING_REWARDS_ZAP_ABI = [{'inputs':[{'internalType':'address', 'name':'_stakingPoolRegistry', 'type':'address'}], 'stateMutability':'nonpayable', 'type':'constructor'}, {'anonymous':false, 'inputs':[{'indexed':true, 'internalType':'address', 'name':'previousOwner', 'type':'address'}, {'indexed':true, 'internalType':'address', 'name':'newOwner', 'type':'address'}], 'name':'OwnershipTransferred', 'type':'event'}, {'anonymous':false, 'inputs':[{'indexed':false, 'internalType':'address', 'name':'token', 'type':'address'}, {'indexed':false, 'internalType':'uint256', 'name':'amount', 'type':'uint256'}], 'name':'Recovered', 'type':'event'}, {'anonymous':false, 'inputs':[{'indexed':false, 'internalType':'address', 'name':'registry', 'type':'address'}], 'name':'UpdatedPoolRegistry', 'type':'event'}, {'anonymous':false, 'inputs':[{'indexed':true, 'internalType':'address', 'name':'user', 'type':'address'}, {'indexed':true, 'internalType':'address', 'name':'targetVault', 'type':'address'}, {'indexed':false, 'internalType':'uint256', 'name':'amount', 'type':'uint256'}], 'name':'ZapIn', 'type':'event'}, {'inputs':[], 'name':'owner', 'outputs':[{'internalType':'address', 'name':'', 'type':'address'}], 'stateMutability':'view', 'type':'function'}, {'inputs':[{'internalType':'address', 'name':'tokenAddress', 'type':'address'}, {'internalType':'uint256', 'name':'tokenAmount', 'type':'uint256'}], 'name':'recoverERC20', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function'}, {'inputs':[], 'name':'renounceOwnership', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function'}, {'inputs':[{'internalType':'address', 'name':'_stakingPoolRegistry', 'type':'address'}], 'name':'setPoolRegistry', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function'}, {'inputs':[], 'name':'stakingPoolRegistry', 'outputs':[{'internalType':'address', 'name':'', 'type':'address'}], 'stateMutability':'view', 'type':'function'}, {'inputs':[{'internalType':'address', 'name':'newOwner', 'type':'address'}], 'name':'transferOwnership', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function'}, {'inputs':[{'internalType':'address', 'name':'_targetVault', 'type':'address'}, {'internalType':'uint256', 'name':'_underlyingAmount', 'type':'uint256'}], 'name':'zapIn', 'outputs':[{'internalType':'uint256', 'name':'', 'type':'uint256'}], 'stateMutability':'nonpayable', 'type':'function'}] as const;

export default STAKING_REWARDS_ZAP_ABI;
