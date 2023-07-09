//@ts-nocheck
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import {useActionFlow} from '@vaults/contexts/useActionFlow';
import {VaultDetailsTabsWrapper} from '@vaults/components/details/tabs/VaultDetailsTabsWrapper';
import {VaultActionsTabsWrapper} from '@vaults/components/details/VaultActionsTabsWrapper';
import {VaultDetailsHeader} from '@vaults/components/details/VaultDetailsHeader';
import ActionFlowContextApp from '@vaults/contexts/useActionFlow';
import {WithSolverContextApp} from '@vaults/contexts/useSolver';
import Wrapper from '@vaults/Wrapper';
import { RandomIdlV2 } from "../../../RandomIdlV2";
import {yToast} from '@yearn-finance/web-lib/components/yToast';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import CHAINS from '@yearn-finance/web-lib/utils/web3/chains';
import TokenIcon from '@common/components/TokenIcon';
import { OrcaWhirlpoolClient } from "@orca-so/whirlpool-sdk";
import {useYearn} from '@common/contexts/useYearn';
import {useFetch} from '@common/hooks/useFetch';
import {type TYDaemonVault, yDaemonVaultSchema} from '@common/schemas/yDaemonVaultsSchemas';
import {variants} from '@common/utils/animations';
import {useYDaemonBaseURI} from '@common/utils/getYDaemonBaseURI';
import {useDismissToasts} from '@yearn-finance/web-lib/hooks/useDismissToasts';
import { TransactionBuilder, resolveOrCreateATA, deriveATA, DecimalUtil, Percentage } from "@orca-so/common-sdk";
import { Token, TOKEN_PROGRAM_ID  ,ASSOCIATED_TOKEN_PROGRAM_ID,  MintInfo,getAssociatedTokenAddress,createAssociatedTokenAccountInstruction,
  MintLayout,
  AccountInfo,
  AccountLayout,
  u64 } from "@solana/spl-token";
import {
  ORCA_WHIRLPOOL_PROGRAM_ID, ORCA_WHIRLPOOLS_CONFIG,
  PDAUtil, PriceMath, TickUtil, AccountFetcher, SwapUtils,
  swapQuoteByInputToken, WhirlpoolContext, buildWhirlpoolClient,
  increaseLiquidityQuoteByInputToken, decreaseLiquidityQuoteByLiquidity,
  collectFeesQuote, collectRewardsQuote, TickArrayUtil, PoolUtil,swapQuoteByOutputToken,
} from "@orca-so/whirlpools-sdk";

import * as anchor from "@project-serum/anchor";
import { web3, Wallet } from "@project-serum/anchor";

import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  Signer,clusterApiUrl, Connection,sendAndConfirmTransaction,SYSVAR_RENT_PUBKEY
} from "@solana/web3.js";

import { useAnchorWallet,useWallet,useConnection } from "@solana/wallet-adapter-react";

import { RandomIdl } from "../../../randomIdl";

import type {GetServerSideProps} from 'next';
import type {NextRouter} from 'next/router';
import type {ReactElement} from 'react';


import toast, { Toaster } from 'react-hot-toast';

const web33 = require('@solana/web3.js');
const toastit = (to_toast:any) => toast(to_toast,{
  duration: 7000});

class ContractBumps {
  constructor() {
            this.contractAccount=0;
            this.contractUsdc=0;
            this.contractUnderlyingVault=0;
  }
}


class UserBumps {
  constructor() {
            this.contractAccount=0;
            this.userAccount=0;
            this.usdcUserAta=0;
            this.underlyingUserAta=0;
            this.underlyingEscrow=0;
            this.usdcEscrow=0;
  }
}

const vaults_FTR=[
			{"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","ftr_sc_addy":"3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E","ftr_vault_type":"Distributor","type":"Automated","symbol":"Onchain Funding Arbitrage","display_symbol":"Onchain funding arb","formated_symbol":"OnchainFArb","name":"Onchain Funding Arbitrage","display_name":"Funding Arbitrage","formated_name":"Funding Arbitrage","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png","version":"0.4.6","category":"Onchain","inception":1675027391,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Onchain Funding Arbitrage","symbol":"OnchainFArb","type":"Curve LP","display_name":"Onchain Funding Arbitrage","display_symbol":"OnchainFArb","description":"This vault runs a funding arbitrage strategy. The vault's funds can be deployed on Drift Zeta or Mango markets. The vault does not hold any market exposure. The vault is rigorously hedged. The yield presented is a 14 days estimation. The yield is floating. There is no guarantee about the future yield created by this vault.","icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},"tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4543.2132083857305,"tvl_delegated":0,"tvl":4543.2132083857305,"price":296.529102},"apy":{"type":"crv","gross_apr":0.7151501957902291,"net_apy":0.89569016529357,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0},"error":""},"details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Curve CLEV-ETH-f","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},"strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}},
			{"address":"0x3a51269E0707A3416044bad5066858A12198fCf6","ftr_sc_addy":"5MKGZyWmVAyJC2n38oDJDh3kGXo8xCvQVBH8CzeAKQV3","ftr_vault_type":"Whirlpool","type":"Automated","symbol":"stSOL automated LP","display_symbol":"stSOL automated LP","formated_symbol":"WhirlStSOLAuto","name":"stSOL automated LP","display_name":"stSOL automated LP","formated_name":"stSOL automated LP","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png","version":"0.4.6","category":"Whirlpool","inception":1675027391,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"Onchain Concentrated Liquidity M","display_symbol":"CLEVETH-f",
			"description":"This vault exploits a proprietary market making strategy, fully onchain, relying on orca Whirlpools. Your account is segregated from the other users accounts. Your funds are available at any time","icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},"tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4543.2132083857305,"tvl_delegated":0,"tvl":4543.2132083857305,"price":296.529102},"apy":{"type":"crv","gross_apr":0.7151501957902291,"net_apy":0.89569016529357,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0},"error":""},"details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Curve CLEV-ETH-f","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},"strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}},
		]

const underlying_tokens=[{mint: new PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"), decimals: 9},{mint: new PublicKey("RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a"), decimals: 2},{mint: new PublicKey("3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh"), decimals: 8}]
const relevant_whirpools=["AXtdSZ2mpagmtM5aipN5kV9CyGBA8dxhSBnqMRp7UpdN","6bskSanDywHt17rRXRbnx1zoErCeCpst5P4544s6cZka","55BrDTCLWayM16GwrMEQU57o4PTm6ceF9wavSdNZcEiy"]
const products_website_names=["stSOL/USDC Whirlpool","RLB/USDC Whirlpool","wBTC/USDC Whirlpool"]



const ftr_token_multiplier=1000000000;
const usdc_token_multiplier=1000000;
const fr_token_multiplier=1000000000;



let current_pool_addy="DeKY5iwoYLgKzufMoGkU8ZccjiZKWb4KDdF6BX2XZv25";
let current_pool_name="perpFRv1";
let product_reader_name="Fixed Rate";


const delay = ms => new Promise(res => setTimeout(res, ms));





const getTokenAccountBalance = async (mint_ta)=>{


      let ta_balance =0
    const connection_r = new Connection("https://solana-mainnet.rpc.extrnode.com",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});
    let mintPublicKey = new PublicKey(mint_ta);
    let amouuuunt=await connection_r.getTokenAccountBalance(mintPublicKey)


  return amouuuunt.value 
}

function Index(): ReactElement | null {
	const {address, isActive} = useWeb3();
	const {safeChainID} = useChainID();
	const {vaults} = useYearn();
	const router = useRouter();
	const [userHasToSetup, setUserHasToSetup] = useState("Startit");
	const [underlyingUserAddy, setUnderlyingUserAddy] = useState("Startit");
	const [usdcUserAddy, setUsdcUserAddy] = useState("Startit");
	const [underlyingInVaultAddy, setUnderlyingInVaultAddy] = useState("Startit");
	const [usdcInVaultAddy, setUsdcInVaultAddy] = useState("Startit");
	const [underlyingUserAmount, setUnderlyingUserAmount] = useState(0);
	const [usdcUserAmount, setUsdcUserAmount] = useState(0);
	const [ftr_user_addy, set_ftr_user_addy] = useState("0");
	
	const [underlyingInVaultAmount, setUnderlyingInVaultAmount] = useState(0);
	const [usdcInVaultAmount, setUsdcInVaultAmount] = useState(0);
	const [wp_lp_underlying_position, set_wp_lp_underlying_position] = useState(0);
	const [wp_lp_usdc_position, set_wp_lp_usdc_position] = useState(0);
	const [user_position_ptf, set_user_position_ptf] = useState(0);
	const [user_input_1, set_user_input_1] = useState(0);
	const [user_input_2, set_user_input_2] = useState(0);
	const [program, setProgram] = useState(null);
	const [button_message, set_button_message] = useState("Deposit");
	const [is_busy, set_is_busy] = useState(false);
	const [maturity_price, set_maturity_price] = useState(0);
  	const [user_whirpool_mint_found, set_user_whirpool_mint_found] = useState("0");
  	const [additionnal_info_product, set_additionnal_info_product] = useState("0");
  	




	let vaults_ftrr: TDict<TYDaemonVault>={}
	vaults_ftrr["0x3A51269e0707A3416044bad5066858A12198fcf7"]=
		{"address":"0x3A51269e0707A3416044bad5066858A12198fcf7",
		"ftr_sc_addy":"3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E",
		"ftr_type":"Distributor",
		"ftr_pool_id":"DeKY5iwoYLgKzufMoGkU8ZccjiZKWb4KDdF6BX2XZv25",
		"type":"Automated","symbol":"stSOL automated LP","display_symbol":"Onchain Funding Arbitrage","formated_symbol":"Onchain Funding Arbitrage","name":"Onchain Funding Arbitrage","display_name":"Onchain Funding Arbitrage","formated_name":"Onchain Funding Arbitrage","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png","version":"0.4.6","category":"Volatile","inception":1675027391,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"Onchain Funding Arbitrage","display_symbol":"CLEVETH-f",
		"description":"This vault runs a funding arbitrage strategy. The vault's funds can be deployed on Drift Zeta or Mango markets. The vault does not hold any market exposure. The vault is rigorously hedged. The yield presented is a 14 days estimation. The yield is floating. There is no guarantee about the future yield created by this vault.","icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},"tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4543.2132083857305,"tvl_delegated":0,"tvl":4543.2132083857305,"price":296.529102},
		"apy":{"type":"crv","gross_apr":0.7151501957902291,"net_apy":0.89569016529357,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
		"details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
		"strategies":[],
		"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
		

	vaults_ftrr["0x3a51269e0707A3416044BAD5066858a12198fcf6"]=
		{"address":"0x3a51269e0707A3416044BAD5066858a12198fcf6",
		"ftr_sc_addy":"5MKGZyWmVAyJC2n38oDJDh3kGXo8xCvQVBH8CzeAKQV3",
		"ftr_type":"Whirlpool",
		"ftr_pool_id":"hehe3",
		"type":"Automated","symbol":"stSOL automated LP","display_symbol":"stSOL automated LP","formated_symbol":"stSOLLP","name":"stSOL automated LP","display_name":"stSOL automated LP","formated_name":"stSOL automated LP","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png","version":"0.4.6","category":"Volatile","inception":1675027391,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"stSOL LP","display_symbol":"CLEVETH-f",

		"description":"This vault exploits a proprietary market making strategy, fully onchain, relying on orca Whirlpools. Your account is segregated from the other users accounts. Your funds are available at any time",

		"icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},"tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4543.2132083857305,"tvl_delegated":0,"tvl":4543.2132083857305,"price":296.529102},
		"apy":{"type":"crv","gross_apr":0.7151501957902291,"net_apy":0.89569016529357,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
		"details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
		"strategies":[],
		"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
		


	let product_name="stSOL/USDC Whirlpool"

	const {toast, toastMaster} = yToast();
	const {dismissAllToasts} = useDismissToasts();
	const [toastState, set_toastState] = useState<{id?: string; isOpen: boolean}>({isOpen: false});
	const {yDaemonBaseUri} = useYDaemonBaseURI({chainID: Number(router.query.chainID)});

	const [currentVault, set_currentVault] = useState<TYDaemonVault | undefined>(vaults_ftrr[toAddress(router.query.address as string)]);
	let isLoadingVault=false
	let vault=vaults_ftrr[router.query.address as string]
	console.log(toAddress(router.query.address as string))
	console.log('VAULT SELECTED')
	console.log(vault)
	console.log(vaults_ftrr)
	let strname=router.query.address as string



	//---------------------------------------  LOADING ANCHOR ENV  --------------------------------


	const wallet = useAnchorWallet();
	const connected=wallet;
	
	useEffect(() => {
	    if (wallet?.publicKey?.toString() && connected) {
	      loadAnchor();
	
	    }
	  }, [wallet?.publicKey?.toString() || "", connected]);

	const loadAnchor = async () => {

		let loc:any=RandomIdl;
		if (vault["ftr_sc_addy"]=="3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E")
			{loc=RandomIdlV2}
	    const programId = new PublicKey(
	      vault["ftr_sc_addy"],
	    );

	    const connection = new web33.Connection("https://rpc.helius.xyz/?api-key=f887483d-4017-4d59-a456-3a3638be952d", {
	      commitment: "processed",
	    });


	    const provider = new anchor.AnchorProvider(connection, wallet, {
	      commitment: "processed",
	    });


	    const newProgram = new anchor.Program(loc, programId, provider);
		setProgram(newProgram);
	  	console.log("Updating stuff, Anchor loaded")
	  	if (vault["ftr_sc_addy"]=="3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E")
			{UpdateAccountDistributor("stSOL/USDC Whirlpool",newProgram)}
		else{
			    UpdateAccount("stSOL/USDC Whirlpool",newProgram)
			}
	  };

	//---------------------------------------  END LOADING ANCHOR ENV  --------------------------------


const MainButtonIsClicked = async (e : any,e2 : any) => {
  console.log("STAAAARTING CUSTOM REFRESH")
  console.log(e)
  if (true){
      if (vault["ftr_sc_addy"]=="5MKGZyWmVAyJC2n38oDJDh3kGXo8xCvQVBH8CzeAKQV3"){
      	if(button_message=="Create Account")
  	    {
  	    	createUserAccount()
  	    }
  
  	    else if (e)
  	    {
  	    	InvestFixedRate()
  		}
  
  	    else if(!e)
  	    {
  	    	RedeemFixedRate()
  	    }
  
  
  	}
  
  	if (vault["ftr_sc_addy"]=="3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E"){
  		if(button_message=="Create Account")
  	    {
  	    	createUserAccountDistributor()
  	    }
  	    else if (e)
  	    {
  	    	InvestFixedRateDistributor()
  		}
  
  	    else if(!e)
  	    {
  	    	RedeemFixedRateDistributor()
  	    }
  
  
  	}
  }
}


const input_user_1_t = (e : any) => {
console.log(e)


}


const UpdateAccount = async (product_name:any,local_program:any) => {

	const orca = new OrcaWhirlpoolClient({ });
	let ssr=await orca.offchain.getPools()

	toastit("Status:  Updating data, please allow up to 20s")
	//set_message_status("Status : Updating data")

	console.log("UPDATING")
	console.log(local_program)

	if (connected){
	    if (local_program !=undefined){
			const prgrm:anchor.Program=local_program  ;

			const { provider } = prgrm;
			let authority=provider.wallet.publicKey;
			let wallet=provider.wallet
			const connection_r_locc2 = new Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});
			provider.connection=connection_r_locc2
			let connection=provider.connection
			const USDC = {mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), decimals: 6};



			let ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc")
			let ORCA_WHIRLPOOLS_CONFIG_DEVNET=new PublicKey("FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR")
			const managerAddy=new PublicKey("3hS9vE11qAYLWMrmssCpNNHX3Af9vBsocUP1ryUCkMrc")

			const fetcher = new AccountFetcher(connection);

			const whirlpool_ctx = WhirlpoolContext.from(connection, wallet, ORCA_WHIRLPOOL_PROGRAM_ID, fetcher);
			const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);
			let relevant_pool_pk = new PublicKey(relevant_whirpools[products_website_names.indexOf(product_name)]) //PDAUtil.getWhirlpool(ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET, ORCA_WHIRLPOOLS_CONFIG_DEVNET, USDC.mint, USDT.mint, 64).publicKey;
			const sol_usdc_whirpool_fclient = await whirlpool_client.getPool(relevant_pool_pk, true);
	


			let LIDO_SSOL =underlying_tokens[products_website_names.indexOf(product_name)];




			LIDO_SSOL=underlying_tokens[products_website_names.indexOf(product_name)]
			relevant_pool_pk=new PublicKey(relevant_whirpools[products_website_names.indexOf(product_name)])
			const UNDERLYING=LIDO_SSOL;
			let volume_pool=0
			let expected_fees=0
			try{
				let pool_name_str=relevant_pool_pk.toString()
				let volume_pool=ssr[relevant_pool_pk.toString()].volume.week*52
				let expected_fees=volume_pool*ssr[relevant_pool_pk.toString()].lpsFeeRate
			}
			catch{
				console.log("Error while calculating apr")
			}


			let local_user_has_to_setup=false

			let contract_name="v1000001".substring(0,9)
			const [contractAccount, contractAccountBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[Buffer.from(contract_name),UNDERLYING.mint.toBuffer(),managerAddy.toBuffer()],
			prgrm.programId);




			const [contractUsdcAta,contractUsdcAtaBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[contractAccount.toBuffer(), USDC.mint.toBuffer()],
			prgrm.programId
			);


			const [contractUnderlyingAta,contractUnderlyingAtaBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[ contractAccount.toBuffer(), UNDERLYING.mint.toBuffer()],
			prgrm.programId
			);

			let bumps = new ContractBumps();
			// @ts-ignore
			bumps.contractAccount = contractAccountBump;
			// @ts-ignore
			bumps.contractUsdc = contractUsdcAtaBump;
			// @ts-ignore
			bumps.contractUnderlying = contractUnderlyingAtaBump;



			const [userAccount, useraccountBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[contractAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
			prgrm.programId);

			const [userUsdcAta,userUsdcAtaBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[userAccount.toBuffer(), USDC.mint.toBuffer(),wallet.publicKey.toBuffer()],
			prgrm.programId
			);


			const [userUnderlyingAta,userUnderlyingAtaBump] =
			await anchor.web3.PublicKey.findProgramAddress(
			[ userAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
			prgrm.programId
			);



			let user_bumps = new UserBumps()
			user_bumps.contractAccount=contractAccountBump;
			user_bumps.userAccount=useraccountBump;
			user_bumps.usdcUserAta=userUsdcAtaBump;
			user_bumps.underlyingUserAta=userUnderlyingAtaBump;
			user_bumps.underlyingEscrow=contractUnderlyingAtaBump;
			user_bumps.usdcEscrow=contractUsdcAtaBump;
	      	let user_usdc_ta2=await deriveATA(wallet.publicKey, USDC.mint)

	        try{

				const contract_account:any = await prgrm.account.contractAccount.fetch(contractAccount);


				console.log("Contract Account loaded well")
				toastit("Status:  Updating your token accounts : USDC")
				let user_usdc_in_wallet=0
				let user_fixedrate_in_wallet=0

				let user_usdc_in_wallet_addy=0
				let user_fixedrate_in_wallet_addy=0
		
				let user_account_test = await provider.connection.getAccountInfo(userAccount);  
		
				await delay(500);

				console.log("Loading user account")
				if (user_account_test==null){

					set_button_message("Create Account")
					local_user_has_to_setup=true
				
					//    set_existing_user_account(false);
	         	}else{
	         		set_button_message("Is Oke")

	         		console.log("Step-1")
					const user_account:any = await prgrm.account.userAccount.fetch(userAccount);
					await delay(500)
				
					let user_usdc_ta=await deriveATA(wallet.publicKey, USDC.mint)
					
					const solana_t = new web33.Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/");
					


					console.log("Searching for user USDC")
					const account_ta_test_usdc = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
					mint: USDC.mint});
		            if (account_ta_test_usdc.value.length>0){
						console.log("User USDC found")
						try{

							let max_wallet_usdc=-1
							let userUsdcAccount_l_p:any = 0
							console.log(account_ta_test_usdc.value.length)
							for (var index_addy=0; index_addy < account_ta_test_usdc.value.length; index_addy++) {
								userUsdcAccount_l_p= await getTokenAccountBalance(account_ta_test_usdc.value[index_addy].pubkey);
								await delay(500);
								user_usdc_in_wallet=(Math.round(((Number(userUsdcAccount_l_p.amount)/usdc_token_multiplier))*100)/100);
								user_usdc_in_wallet_addy=account_ta_test_usdc.value[0].pubkey
								if (user_usdc_in_wallet>max_wallet_usdc){
									max_wallet_usdc=user_usdc_in_wallet
									setUsdcUserAddy(user_usdc_in_wallet_addy)
									setUsdcUserAmount(user_usdc_in_wallet)
									user_usdc_ta=user_usdc_in_wallet_addy
								}
							}
							console.log(user_usdc_in_wallet)

						}catch{
							console.log("Issue refreshing")
						}
					}else{
						console.log("NO User USDC found")
						toastit("Status : NO USDC found, are you sure you have USDC in your wallet ?")
					}






					toastit("Status:  Updating your token accounts : Underlying")
					let user_underlying_ta=await deriveATA(wallet.publicKey, UNDERLYING.mint)


					console.log("Searching for user Underlying")
					const account_ta_test_FixedRate = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
					mint: UNDERLYING.mint});

					if (account_ta_test_FixedRate.value.length>0){
						console.log("User Underlying found")
						try{
							let userFRAccount_l_p = await getTokenAccountBalance(account_ta_test_FixedRate.value[0].pubkey);
							await delay(500);
							user_fixedrate_in_wallet=(Math.round(((Number(userFRAccount_l_p.amount)/fr_token_multiplier))*100)/100);
							user_fixedrate_in_wallet_addy=account_ta_test_FixedRate.value[0].pubkey
							setUnderlyingUserAddy(user_fixedrate_in_wallet_addy)
							setUnderlyingUserAmount(user_fixedrate_in_wallet)

							console.log("user_fixedrate_in_wallet2")
							console.log(user_fixedrate_in_wallet)
						}catch{
							console.log("Issue refreshing")
						}
					}else{
						console.log("NO User Underlying found")
						toastit("Status : NO Underlying found, are you sure you have some of the relevant non USDC token in your wallet ?")

					}

					console.log("Done searching for USDC / UNDERLYING addys")
			        let t1n=0
			        let t2n=0
			        try{
			      
			            let balance_t1=await getTokenAccountBalance(userUsdcAta)
			            await delay(500)
			          
			            let balance_t2=await getTokenAccountBalance(userUnderlyingAta)
			       
			            t1n=Number(balance_t1.uiAmountString)
			            t2n=Number(balance_t2.uiAmountString)
			            setUnderlyingInVaultAmount(Number(t2n))
			            setUsdcInVaultAmount(Number(t1n))

			        }catch{console.log("error retreiving ata of sc account")
			                          toastit("Status:  SC user ATAs not found, please Setup account again")
			                          local_user_has_to_setup=true
			        }
			    

			    	if(false){
			    				        await delay(500)
			    				        try{
			    				            let balance_t1_w=await getTokenAccountBalance(user_usdc_ta)
			    				            await delay(500)
			    				            let balance_t2_w= await getTokenAccountBalance(user_underlying_ta)
			    				            setUsdcInVaultAddy(balance_t1_w.uiAmountString)
			    				     
			    	
			    	
			    				            console.log("USDC in account : "+balance_t1_w.uiAmountString)
			    				            console.log("Underlying in account : "+balance_t2_w.uiAmountString)
			    				        }catch{console.log("error retreiving ata of user wallet ")
			    							toastit("Status:  Token accounts not found, please make sure you have the 2 tokens to send to Whirlpools ")
			    				        }
			    				        await delay(1000)
			    	}


			        if (true){

						let response = await connection.getTokenAccountsByOwner(new PublicKey(userAccount.toString()), // owner here
						{
						programId: TOKEN_PROGRAM_ID,
						}
						);

						let expected_apy_fees=0
						await delay(1000)
						let nb_positions=0
						let current_position_token1=0
						let current_position_token2=0
						let rprice=0
						const relevant_pool_whirlpool   = await fetcher.getPool(relevant_pool_pk);
						toastit("Status : Searching for the orca position")

						for(let i=0; i<response.value.length; i++){
							try{
								await delay(500)

								console.log("Working with")
								console.log(response.value[i].pubkey.toString()); //use i instead of 0

								const tokenAccountInfo = await connection.getAccountInfo(response.value[i].pubkey);
								console.log("TA mint")

								const decodedTokenAccountInfo = AccountLayout.decode(tokenAccountInfo.data);
								let minnnt_str=decodedTokenAccountInfo.mint.toString()
								console.log(minnnt_str)

								if (minnnt_str==LIDO_SSOL.mint.toString() || minnnt_str==USDC.mint.toString()){
									console.log("Found usdc or underlying")
									continue
								}
							
								if (relevant_token.includes(minnnt_str)){
									console.log("Discarding...")
									continue
								}
								toastit("Status : Searching ")
								console.log(decodedTokenAccountInfo.mint.toString());
								console.log("Step10")
								set_user_whirpool_mint_found(decodedTokenAccountInfo.mint.toString())
								let position_mint=new PublicKey(decodedTokenAccountInfo.mint.toString())
								const position_pda = PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET,position_mint );
								const [address_test_postion_ta] = await PublicKey.findProgramAddress(
								[userAccount.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), position_mint.toBuffer()],
								ASSOCIATED_TOKEN_PROGRAM_ID
								);
								const sol_usdc_whirpool_fclient = await whirlpool_client.getPool(relevant_pool_pk, true);
								let av_fr_amt=await getTokenAccountBalance(response.value[i].pubkey.toString())

								if(av_fr_amt.amount=="1"){
									console.log("Step11")

									const position_data = await fetcher.getPosition(position_pda.publicKey, true);
									//console.log(position_data)
									const position_struct=await whirlpool_client.getPosition(position_pda.publicKey)

									const pool_data=sol_usdc_whirpool_fclient.getData()
									const quote_avt = await decreaseLiquidityQuoteByLiquidity(
									position_data.liquidity,
									Percentage.fromFraction(0, 100),
									position_struct,
									sol_usdc_whirpool_fclient,
									);

									rprice=PriceMath.sqrtPriceX64ToPrice(new anchor.BN(relevant_pool_whirlpool.sqrtPrice),UNDERLYING.decimals,USDC.decimals).toNumber()
									current_position_token1=current_position_token1+DecimalUtil.fromU64(quote_avt.tokenEstA,UNDERLYING.decimals).toNumber()
									current_position_token2=current_position_token2+DecimalUtil.fromU64(quote_avt.tokenEstB,USDC.decimals).toNumber()

									console.log(pool_data)
									console.log("Detected position. Liquidity : ")

									let share_in_the_pool=Number(position_data.liquidity.toString())/Number(relevant_pool_whirlpool.liquidity.toString())

									expected_apy_fees=expected_fees*share_in_the_pool
									nb_positions=nb_positions+1
									console.log(nb_positions)
									set_user_whirpool_mint_found(decodedTokenAccountInfo.mint.toString())
									console.log("Saving product_addys")
									console.log(decodedTokenAccountInfo.mint.toString())
								}//If its a whirlpool pos end
							}catch{
								console.log("Error searching orca position UpdateAccount")
							}
						}//End of loop
					
						set_wp_lp_underlying_position(current_position_token1+t2n)
						set_wp_lp_usdc_position(current_position_token2+t1n)


						let ramtt=(current_position_token1+t2n)*rprice+current_position_token2+t1n
						let inrange_money=current_position_token1*rprice+current_position_token2
						let final_apy=expected_apy_fees/inrange_money
						if (inrange_money==0){
							final_apy=0
						}
						set_user_position_ptf(ramtt)
						//setInfo3("Your invested capital : "+Math.round((ramtt)*1000)/1000)

					}//end part whirlpools


			   

				}//Check if user account exists or not

			
				if (local_user_has_to_setup){
				
				}
				console.log("Done updating data")
				toastit("Status : Done updating data")
			}catch{
			
			    toastit("Status : Error, please click on the main ReUpdate button")
			    console.log("Error general Update Account")
			}

		}//END if (local_program !=undefined){

    }//END 	if (connected){

  };


const InvestFixedRate = async () => {
  toastit("Status : Started Investing Product")
  if (program!=undefined){
		const prgrm:anchor.Program=program  ;

		const { provider } = prgrm;
		let authority=provider.wallet.publicKey;
		let wallet=provider.wallet

		let contract_name="v1000001".substring(0,9)

		let connection=provider.connection
		const connection_r_locc = new Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});
		const connection_r_locc2 = new Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});
		provider.connection=connection_r_locc
		const fetcher = new AccountFetcher(connection_r_locc2);

		const whirlpool_ctx = WhirlpoolContext.from(connection_r_locc2, wallet, ORCA_WHIRLPOOL_PROGRAM_ID, fetcher);
		const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);


		const managerAddy=new PublicKey("3hS9vE11qAYLWMrmssCpNNHX3Af9vBsocUP1ryUCkMrc")
		const userAddy=wallet.publicKey


		let LIDO_SSOL=underlying_tokens[products_website_names.indexOf(product_name)]
		let relevant_pool_pk=new PublicKey(relevant_whirpools[products_website_names.indexOf(product_name)])


		const USDC = {mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), decimals: 6};

		const UNDERLYING=LIDO_SSOL;






		const [contractAccount, contractaccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[Buffer.from(contract_name),UNDERLYING.mint.toBuffer(),managerAddy.toBuffer()],
		program.programId);




		let bumps = new ContractBumps();
		bumps.contractAccount = contractaccountBump;


		///                   DECLARING PDAS
		let user_usdc_ta=usdcUserAddy
		let user_underlying_ta=underlyingUserAddy

		const [contractUsdcAta,contractUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), USDC.mint.toBuffer()],
		program.programId
		);


		const [contractUnderlyingAta,contractUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ contractAccount.toBuffer(), UNDERLYING.mint.toBuffer()],
		program.programId
		);






		const [userAccount, useraccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId);

		const [userUsdcAta,userUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[userAccount.toBuffer(), USDC.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);


		const [userUnderlyingAta,userUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ userAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);

		try{
			let all_txs=[]
			if (true){
				console.log("----------------------Add collateral to sc ---------------------")
				const amount_ts = DecimalUtil.toU64(DecimalUtil.fromNumber(user_input_2 /* SAMO */), USDC.decimals);
				console.log(contractUsdcAta.toString())
				setUserHasToSetup("SENDING TRANSACTION")
				let tx1_addcoll= program.instruction.addCollateralToSc(
					amount_ts,
					{
					accounts: {
					userAuthority: wallet.publicKey,
					userAta:user_usdc_ta,
					contractAta:userUsdcAta,
					contractAccount,
					managerAddy,
					userAccount,
					tokenMint:USDC.mint,
					tokenProgram: TOKEN_PROGRAM_ID,
					underlyingMint:UNDERLYING.mint
					},
					}
				);
				all_txs.push(tx1_addcoll)

			}


			if (true){
				console.log("----------------------Add collateral to sc ---------------------")
				const amount_ts = DecimalUtil.toU64(DecimalUtil.fromNumber(user_input_1 /* SAMO */), UNDERLYING.decimals);
				console.log(contractUsdcAta.toString())
				setUserHasToSetup("SENDING TRANSACTION")
				let tx2_addcoll= program.instruction.addCollateralToSc(
					amount_ts,
					{
					accounts: {
					userAuthority: wallet.publicKey,
					userAta:user_underlying_ta,
					contractAta:userUnderlyingAta,
					contractAccount,
					managerAddy,
					userAccount,
					tokenMint:UNDERLYING.mint,
					tokenProgram: TOKEN_PROGRAM_ID,
					underlyingMint:UNDERLYING.mint
					},
					}
				);
				all_txs.push(tx2_addcoll)

			}


            const transactiong_r = new TransactionBuilder(program, program.provider.wallet)
             
            .addInstruction({instructions: all_txs, cleanupInstructions: [], signers: []});
            transactiong_r.provider=program.provider
   
            const signatureg = await transactiong_r.buildAndExecute();
            console.log("TX went throught !!")
            console.log(signatureg)

		
			toastit("Status : Success, updating data after 30s")
			toastit("Tx id : "+signatureg)
			await delay(30000)
			UpdateAccount("stSOL/USDC Whirlpool",program)


		}catch{
	
		toastit("Status : Connection lost")
		await delay(30000)
		//UpdateAccount("stSOL/USDC Whirlpool",program)
		}



	}//End check program exists
}
  

 const RedeemFixedRate = async () => {


	toastit("Status : Started redeeming product")
	if (program!=undefined){
		const prgrm:anchor.Program=program;
		const { provider } = prgrm;

		let connection=provider.connection
		let authority=provider.wallet.publicKey;
		let wallet=provider.wallet

		let ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc")
		let ORCA_WHIRLPOOLS_CONFIG_DEVNET=new PublicKey("FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR")




		const relevant_segm=[64,128]


		let LIDO_SSOL=underlying_tokens[products_website_names.indexOf(product_name)]
		let relevant_pool_pk=new PublicKey(relevant_whirpools[products_website_names.indexOf(product_name)])
		let relevant_segm_loc=relevant_segm[products_website_names.indexOf(product_name)]

		const USDC = {mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), decimals: 6};

		const UNDERLYING=LIDO_SSOL;







		let contract_name="v1000001".substring(0,9)
		const connection_r_locc = new Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});

		provider.connection=connection_r_locc
		const fetcher = new AccountFetcher(connection);
		console.log("-------")
		console.log("Current signer :")
		console.log(wallet.publicKey.toString())

		const whirlpool_ctx = WhirlpoolContext.from(connection, wallet, ORCA_WHIRLPOOL_PROGRAM_ID, fetcher);
		const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);
		const managerAddy=new PublicKey("3hS9vE11qAYLWMrmssCpNNHX3Af9vBsocUP1ryUCkMrc")
		const userAddy=wallet.publicKey
		let user_usdc_ta=usdcUserAddy
		let user_underlying_ta=underlyingUserAddy


		const [contractAccount, contractAccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[Buffer.from(contract_name),UNDERLYING.mint.toBuffer(),managerAddy.toBuffer()],
		program.programId);




		let bumps = new ContractBumps();
		bumps.contractAccount = contractAccountBump;




		const [contractUsdcAta,contractUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), USDC.mint.toBuffer()],
		program.programId
		);


		const [contractUnderlyingAta,contractUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ contractAccount.toBuffer(), UNDERLYING.mint.toBuffer()],
		program.programId
		);






		const [userAccount, useraccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId);

		const [userUsdcAta,userUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[userAccount.toBuffer(), USDC.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);


		const [userUnderlyingAta,userUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ userAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);



		let response = await connection.getTokenAccountsByOwner(
		new PublicKey(userAccount.toString()), // owner here
		{
		programId: TOKEN_PROGRAM_ID,
		}
		);


		await delay(1000)
		toastit("Status : Searching for your orca position")
		console.log("FOUND ADDY MINT ")
		console.log(user_whirpool_mint_found.toString())
		const sol_usdc_whirpool_fclient = await whirlpool_client.getPool(relevant_pool_pk, true);

		const all_ta_found=[]
		const pool_data=sol_usdc_whirpool_fclient.getData()
		for(let i=0; i<response.value.length; i++){
			try{
				if (i>1 && user_whirpool_mint_found.toString().length>5){
					break
				}
				console.log("Working with")
				toastit("Status : Searching... ")

				await delay(1000)
				let addy_to_use_here=response.value[i].pubkey.toString()
				let av_fr_amt=await getTokenAccountBalance(response.value[i].pubkey.toString())
				let real_balance=av_fr_amt.amount
				if (user_whirpool_mint_found.toString().length>5){
					addy_to_use_here=user_whirpool_mint_found.toString()
					real_balance="1"
				}

				console.log(addy_to_use_here.toString()); //use i instead of 0
				await delay(1000)

				let position_mint=new PublicKey(addy_to_use_here)
				const position_pda = PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET,position_mint );
				const [address_test_postion_ta] = await PublicKey.findProgramAddress(
				[userAccount.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), position_mint.toBuffer()],
				ASSOCIATED_TOKEN_PROGRAM_ID
				);

				await delay(1000)

				if(real_balance=="1"){
					console.log("Detected position. Liquidity : ")

					for (let attempt_id=0;attempt_id<15;attempt_id++){

							const position_data = await fetcher.getPosition(position_pda.publicKey, true);
							if(position_data.liquidity.toString()!="0"){

								if (attempt_id>1){
									toastit("Status : Reducing liquidity failed. Please validate the new attempt")
								}

								try{
									const position_data = await fetcher.getPosition(position_pda.publicKey, true);
									await delay(2000)
									const quote = await decreaseLiquidityQuoteByLiquidity(
									position_data.liquidity,
									Percentage.fromFraction(0, 100),
									await whirlpool_client.getPosition(position_pda.publicKey),
									sol_usdc_whirpool_fclient,
									);

									console.log("DECREASING")
									toastit("Status : Withdrawing liquidity from orca please validate transaction (1/2)")
									
									console.log("relevant_pool_pk")
									console.log(relevant_pool_pk.toString())
									console.log(PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, relevant_segm_loc, relevant_pool_pk, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey.toString())
									console.log(PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, relevant_segm_loc, relevant_pool_pk, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey.toString())
									await program.rpc
									.reduceLiquidityOrcaUser(
									quote.liquidityAmount,
									new anchor.BN(1),
									new anchor.BN(1), {
									accounts: {
									whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
									contractAccount,
									userAccount,
									whirlpool: relevant_pool_pk,
									tokenProgram: TOKEN_PROGRAM_ID,
									positionAuthority: wallet.publicKey,
									position: position_pda.publicKey,
									positionTokenAccount: address_test_postion_ta,
									tokenOwnerAccountA: userUnderlyingAta,
									tokenOwnerAccountB: userUsdcAta ,
									tokenVaultA: sol_usdc_whirpool_fclient.getData().tokenVaultA,
									tokenVaultB: sol_usdc_whirpool_fclient.getData().tokenVaultB,
									tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, relevant_segm_loc, relevant_pool_pk, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
									tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, relevant_segm_loc, relevant_pool_pk, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
									tokenMint:UNDERLYING.mint,
									managerAddy
									}
									});


									await delay(15000)
									toastit("Status : Closed an existing orca position, please wait for the next step")
									

									
								}catch (err) {
									console.log("This is the error message", err.toString());
									toastit("Status : Error withdrawing liquidity, please validate next attempt")
								}

							}else{break}//Si le nb de token == 0 alors on sort


					}//end loop attempts

				}//end if balance==1

			}catch (err) {
			console.log("This is the error message for that account", err.toString());
			}
		}//end loop by token ids

		toastit("Status : Done with closing orca positions")



		
		let balance_t2_w=await getTokenAccountBalance(userUnderlyingAta.toString())
		let balance_t1_w=await getTokenAccountBalance(userUsdcAta.toString())
		let all_instructions=[]

		if(balance_t1_w.amount>0){
		
			console.log("----------------------Take collateral back to the users TA---------------------")
			const amount_ts = DecimalUtil.toU64(DecimalUtil.fromNumber(balance_t1_w.amount /* SAMO */), 0);
			console.log(contractUsdcAta.toString())
			const ta1_inst = program.instruction.withdrawCollateralToUa(
			amount_ts,
			{
			accounts: {
			userAuthority: wallet.publicKey,
			userAta:user_usdc_ta,
			contractAta:userUsdcAta,
			contractAccount,
			managerAddy,
			userAccount,
			tokenMint:USDC.mint,
			tokenProgram: TOKEN_PROGRAM_ID,
			underlyingMint:UNDERLYING.mint
			},
			}
			);

			all_instructions.push(ta1_inst)
		}

		if (balance_t2_w.amount>0){
		
			
			console.log("----------------------Take collateral back to the users TA---------------------")
			const amount_ts2 = DecimalUtil.toU64(DecimalUtil.fromNumber(balance_t2_w.amount /* SAMO */), 0);
			console.log(contractUsdcAta.toString())
			const ta2_inst = await program.instruction
			.withdrawCollateralToUa(
			amount_ts2,
			{
			accounts: {
			userAuthority: wallet.publicKey,
			userAta:user_underlying_ta,
			contractAta:userUnderlyingAta,
			contractAccount,
			managerAddy,
			userAccount,
			tokenMint:UNDERLYING.mint,
			tokenProgram: TOKEN_PROGRAM_ID,
			underlyingMint:UNDERLYING.mint
			},
			}
			);

			all_instructions.push(ta2_inst)
		}

		if(all_instructions.length>0){
			toastit("Status : Withdrawing funds to user wallet please validate transaction (1/2)")

			const transactiong_r = new TransactionBuilder(program, program.provider.wallet)

			.addInstruction({instructions: all_instructions, cleanupInstructions: [], signers: []});
			transactiong_r.provider=program.provider

			const signatureg = await transactiong_r.buildAndExecute();

			console.log(signatureg)
			toastit("Status : Success withdrawing your funds")
			toastit("Tx id : "+signatureg)

		}


		


		//UpdateAccount(isToggle,productAddy,scName,program)


	} //end if program exists


}//End redeem


const createUserAccount = async () => {
	toastit("Status : Started setting up onchain accounts")

	if (program!=undefined){
		const prgrm:anchor.Program=program;
		const { provider } = prgrm;

		let authority=provider.wallet.publicKey;
		let wallet=provider.wallet

		const connection_r_locc = new Connection("https://blue-attentive-bush.solana-mainnet.discover.quiknode.pro/6a78e36743a8484646a2d0141ec40bf4c16218be/",{ commitment : "processed",confirmTransactionInitialTimeout:  5000});
		provider.connection=connection_r_locc
		let connection=provider.connection
		const fetcher = new AccountFetcher(connection);


		let LIDO_SSOL=underlying_tokens[products_website_names.indexOf(product_name)]
		let relevant_pool_pk=new PublicKey(relevant_whirpools[products_website_names.indexOf(product_name)])

		const UNDERLYING=LIDO_SSOL;
		const USDC = {mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), decimals: 6};


		const managerAddy=new PublicKey("3hS9vE11qAYLWMrmssCpNNHX3Af9vBsocUP1ryUCkMrc")


		let contract_name="v1000001".substring(0,9)
		let ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc")
		let ORCA_WHIRLPOOLS_CONFIG_DEVNET=new PublicKey("FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR")

		console.log("Current signer :")
		console.log(wallet.publicKey.toString())
		const whirlpool_ctx = WhirlpoolContext.from(connection, wallet, ORCA_WHIRLPOOL_PROGRAM_ID, fetcher);
		const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);

		console.log("Initial signer")
		console.log(managerAddy.toString())




		const [contractAccount, contractAccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[Buffer.from(contract_name),UNDERLYING.mint.toBuffer(),managerAddy.toBuffer()],
		program.programId);




		const [contractUsdcAta,contractUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), USDC.mint.toBuffer()],
		program.programId
		);


		const [contractUnderlyingAta,contractUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ contractAccount.toBuffer(), UNDERLYING.mint.toBuffer()],
		program.programId
		);

		let bumps = new ContractBumps();
		bumps.contractAccount = contractAccountBump;
		bumps.contractUsdc = contractUsdcAtaBump;
		bumps.contractUnderlying = contractUnderlyingAtaBump;



		const [userAccount, useraccountBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[contractAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId);

		const [userUsdcAta,userUsdcAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[userAccount.toBuffer(), USDC.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);


		const [userUnderlyingAta,userUnderlyingAtaBump] =
		await anchor.web3.PublicKey.findProgramAddress(
		[ userAccount.toBuffer(), UNDERLYING.mint.toBuffer(),wallet.publicKey.toBuffer()],
		program.programId
		);



		let user_bumps = new UserBumps()
		user_bumps.contractAccount=contractAccountBump;
		user_bumps.userAccount=useraccountBump;
		user_bumps.usdcUserAta=userUsdcAtaBump;
		user_bumps.underlyingUserAta=userUnderlyingAtaBump;
		user_bumps.underlyingEscrow=contractUnderlyingAtaBump;
		user_bumps.usdcEscrow=contractUsdcAtaBump;


		if (true){
			try{
				console.log("----------------------Creating the user account---------------------")
				console.log(userAccount.toString())

				let tx1_crea_user=await program.instruction.initUser(
				user_bumps,
				{
				accounts: {
				userAuthority: wallet.publicKey,
				underlyingMint:UNDERLYING.mint,
				usdcMint:USDC.mint,
				userAccount,
				contractAccount,
				managerAddy,
				systemProgram: anchor.web3.SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
				},
				}
				);


				let tx2_crea_user=await program.instruction.initUsersPdas(
				{
				accounts: {
				userAuthority: wallet.publicKey,
				underlyingMint:UNDERLYING.mint,
				usdcMint:USDC.mint,
				userVaultUnderlyingTa:userUnderlyingAta,
				userVaultUsdcTa:userUsdcAta,
				userAccount,
				contractAccount,
				managerAddy,
				systemProgram: anchor.web3.SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
				},
				}
				);


				const transactiong_r = new TransactionBuilder(program, program.provider.wallet)

				.addInstruction({instructions: [tx1_crea_user,tx2_crea_user], cleanupInstructions: [], signers: []});
				transactiong_r.provider=program.provider

				const signatureg = await transactiong_r.buildAndExecute();
				toastit("Status : Successfully created user accounts, updating in 30s, please wait")
				toastit("Tx id : "+signatureg)
				await delay(30000);
				UpdateAccount("stSOL/USDC Whirlpool",program)
				console.log(signatureg)


				console.log("----------------------Done creating the user ATA---------------------")
			}catch (err) {
			console.log("This is the error message", err.toString());
			toastit("Status : Error creating the user pdas, please try again ."+err.toString())
			}
		}

	}else{
		console.log("Program doesnt exist")
	}




  }// End create account



const UpdateAccountDistributor = async (product_name:any,local_program:any) => {

  toastit("Status :  Updating data, please allow up to 10s")
  //set_message_status("Status : Updating data")

  console.log("UPDATING")
  console.log(local_program)
  if (true){
    if (local_program !=undefined){
		const prgrm:anchor.Program=local_program  ;

		const { provider } = prgrm;



		const pk_poolAccount=new anchor.web3.PublicKey(current_pool_addy);
		const account:any = await prgrm.account.contractState.fetch(pk_poolAccount);
		await delay(1000);
		let authority=provider.wallet.publicKey;
		var enc = new TextEncoder()
		let contractState=new PublicKey(current_pool_addy)


		const [user, bump_user] =
		web3.PublicKey.findProgramAddressSync(
		[contractState.toBuffer(), authority.toBuffer()],
		prgrm.programId
		);

		//------------------------- UPDATING USER DETAILS (ONCHAIN) -------------------------------------------------

		let user_account_test = await provider.connection.getAccountInfo(user);  
		await delay(1000);
		console.log(user_account_test);
		if (user_account_test==null){
			console.log("User accounts isnt ready")
			set_button_message("Create Account")

		}else{
			console.log("User accounts IS ready")
			set_button_message("Is oke")


			try{
				const user_account_real:any = await prgrm.account.user.fetch(user);
				console.log((user_account_real.lockedFtr/1000).toString());
				console.log((user_account_real.possessedFixedRate/1000).toString());
				set_fixed_rate_locked_user((user_account_real.possessedFixedRate/fr_token_multiplier).toString());
				set_ftr_locked_user((user_account_real.lockedFtr/ftr_token_multiplier).toString());
			}catch{ 
				console.log("Error retreiving user details")}
			}

			//------------------------- UPDATING PRODUCT DETAILS -------------------------------------------------


			let local_price=account.priceContract/1000;
			let local_price_2=account.priceContract/usdc_token_multiplier;
			console.log("account.poolFixedRate")
			console.log(account.poolFixedRate)
			let av_fr_amt=1000
			await delay(1000);
			console.log("FIST CHECK")
			console.log(av_fr_amt )
			let av_usdc_amt=1000
			await delay(1000);
			set_maturity_price(account.priceContract/1000000);
			console.log("Maturity date NEW")
			console.log(account.maturityTime)





			let maturity_price_f=100;
			let taux_base=(account.priceContract/usdc_token_multiplier)/(account.priceContract/1000);
			let ytm_tmp=Math.round((taux_base-1)*10000)/100;
			let time_r:any=new Date();
			time_r=parseFloat(account.maturityTime)-time_r.getTime()/1000;
			time_r=time_r/(60*24*365*60)

			let apy_tmp=String(account.contractApr/10000)




			const date = new Date((account.maturityTime-24*60*60)*1000);


			//set_expected_price(110)

			//------------------------- UPDATING USER WALLET  -------------------------------------------------


			let mintPublicKey_ftr = new web3.PublicKey(account.ftrMint.toString()); 
			let mintPublicKey_usdc = new web3.PublicKey(account.collateralMint.toString());  
			let mintPublicKey_fixedRate = new web3.PublicKey(account.contractMint.toString());  

			const solana_t = new web33.Connection("https://rpc.helius.xyz/?api-key=f887483d-4017-4d59-a456-3a3638be952d");

			console.log("Owner FTR")
			await delay(1000);
			const account_ta_test_FTR = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
			mint: mintPublicKey_ftr});
			await delay(1000);
			console.log("Owner USDC")
			const account_ta_test_usdc = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
			mint: mintPublicKey_usdc});
			await delay(1000);
			console.log("Owner FixedR")
			const account_ta_test_FixedRate = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
			mint: mintPublicKey_fixedRate});
			await delay(1000);
			let user_ftr_in_wallet=0
			let user_usdc_in_wallet=0
			let user_fixedrate_in_wallet=0

			let user_ftr_in_wallet_addy=0
			let user_usdc_in_wallet_addy=0
			let user_fixedrate_in_wallet_addy=0

			console.log("Searchning for user FTR")
			if (account_ta_test_FTR.value.length>0){
			console.log("User FTR found")


			try{


			let max_wallet_ftr=-1
			let userFtrAccount_l_p:any = 0
			for (var index_addy=0; index_addy < account_ta_test_FTR.value.length; index_addy++) {

			userFtrAccount_l_p = await getTokenAccountBalance(account_ta_test_FTR.value[index_addy].pubkey);
			await delay(1000);
			user_ftr_in_wallet=(Math.round(((Number(userFtrAccount_l_p.amount)/ftr_token_multiplier))*100)/100);
			user_ftr_in_wallet_addy=account_ta_test_FTR.value[0].pubkey
			console.log(String(user_ftr_in_wallet))

			if (user_ftr_in_wallet>max_wallet_ftr){
			max_wallet_ftr=user_ftr_in_wallet
			set_ftr_user_addy(user_ftr_in_wallet_addy)
			}
			}


			}catch{
			console.log("Issue refreshing user FTR")
			}
		}else{
		console.log("NO User FTR found")

		}


		console.log("Searching for user USDC")
		if (account_ta_test_usdc.value.length>0){
		console.log("User USDC found")
		try{

		let max_wallet_usdc=-1
		let userUsdcAccount_l_p:any = 0
		for (var index_addy=0; index_addy < account_ta_test_usdc.value.length; index_addy++) {
		userUsdcAccount_l_p= await getTokenAccountBalance(account_ta_test_usdc.value[index_addy].pubkey);
		await delay(1000);
		user_usdc_in_wallet=(Math.round(((Number(userUsdcAccount_l_p.amount)/usdc_token_multiplier))*100)/100);
		user_usdc_in_wallet_addy=account_ta_test_usdc.value[0].pubkey
		if (user_usdc_in_wallet>max_wallet_usdc){
		max_wallet_usdc=user_usdc_in_wallet
		setUsdcUserAddy(user_usdc_in_wallet_addy)
		}


		}
		console.log(user_usdc_in_wallet)

		}catch{
		console.log("Issue refreshing")
		}
		}else{
		console.log("NO User USDC found")

		}





		console.log("Searching for user Fixed Rate")
		if (account_ta_test_FixedRate.value.length>0){
		console.log("User Fixed Rate found")
		try{
		let userFRAccount_l_p = await getTokenAccountBalance(account_ta_test_FixedRate.value[0].pubkey);
		await delay(1000);
		user_fixedrate_in_wallet=(Math.round(((Number(userFRAccount_l_p.amount)/fr_token_multiplier))*100)/100);
		user_fixedrate_in_wallet_addy=account_ta_test_FixedRate.value[0].pubkey 


		setUnderlyingUserAddy(user_fixedrate_in_wallet_addy)
		console.log("user_fixedrate_in_wallet2")
		console.log(user_fixedrate_in_wallet)
		}catch{
		console.log("Issue refreshing")
		}
		}else{
		console.log("NO User Fixed Rate found")


		}


		setUnderlyingUserAmount(user_fixedrate_in_wallet)
		setUsdcUserAmount(user_usdc_in_wallet)
	

		const tt="None"//new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(account.maturityTime*1000)
		console.log("Product APY (last 15 days) : "+String(maturity_price_f)+"% | Auto Roll Date : None | Available product to purchase : "+String(Math.round(Number(av_fr_amt.amount)/fr_token_multiplier).toString()) +" Products | Available USDC to withdraw : "+String(Math.round(Number(av_usdc_amt.amount)/usdc_token_multiplier).toString())+" | Inception fee : 0.3%")
		set_additionnal_info_product(tt)



		toastit("Status : Done updating data")
		//set_message_status("Status : Done updating data")
		}

	}//Check if program exists

  };



const InvestFixedRateDistributor = async () => {
  toastit("Status : Started Investing Product")
  if (program!=undefined){
    const prgrm:anchor.Program=program;
    const { provider } = prgrm;
      let authority=provider.wallet.publicKey;


    const pk_poolAccount=new anchor.web3.PublicKey(current_pool_addy);
    const account:any = await program.account.contractState.fetch(pk_poolAccount);
    console.log("-------------------------")
    console.log("INVESTED FR");

 


      let mintPublicKey_ftr = new web3.PublicKey("HEhMLvpSdPviukafKwVN8BnBUTamirptsQ6Wxo5Cyv8s"); 
      let relevant_pool_pk=new web3.PublicKey("2Dts6QkFFxcPeiKECfBxfjrqEJtRy7sSK8G2mKs8Xa3P")
      let mintPublicKey_usdc = new web3.PublicKey(account.collateralMint.toString());  
      let mintPublicKey_fixedRate = new web3.PublicKey(account.contractMint.toString());  
      const solana_t = new web33.Connection("https://rpc.helius.xyz/?api-key=f887483d-4017-4d59-a456-3a3638be952d");


      const account_ta_test_FTR = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_ftr});

      const account_ta_test_usdc = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_usdc});

      const account_ta_test_FixedRate = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_fixedRate});
      let user_account_test_FR=account_ta_test_FixedRate
     console.log(user_account_test_FR);

     if(true){
            if (user_account_test_FR==null){
             console.log("Issue with FR account, that shouldnt happen")
          }else{
            console.log("FOUND Fixed Rate Account")
          }
                



        try{

            let userUsdcAccount_l = await getTokenAccountBalance(usdcUserAddy);
            
          }catch{
            console.log("Issue finding USDC user ta")
          }


        try{


            let userFixedRateAccount_l = await getTokenAccountBalance(underlyingUserAddy);


          }catch{
            console.log("Issue finding floating user ta")

            toastit("Status : Creating relevant token account")
            let  userFixedRate = await getAssociatedTokenAddress(
              mintPublicKey_fixedRate,
              provider.wallet.publicKey
            );
            console.log(userFixedRate)
            let createUserFRateInstr = createAssociatedTokenAccountInstruction(
            program.provider.wallet.publicKey,
            userFixedRate,
            program.provider.wallet.publicKey,
            mintPublicKey_fixedRate,)

            const transactiong_r = new TransactionBuilder(program, program.provider.wallet)
             
            .addInstruction({instructions: [createUserFRateInstr], cleanupInstructions: [], signers: []});
            transactiong_r.provider=program.provider
   
            const signatureg = await transactiong_r.buildAndExecute();
          }






    const [userStateKey, userStateKeyBump] =
      web3.PublicKey.findProgramAddressSync(
        [pk_poolAccount.toBuffer(), authority.toBuffer()],
        program.programId
      );
      const [vaultFreeCollateralAta, vaultFreeCollateralAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("free"),
          userStateKey.toBuffer(),
          account.collateralMint.toBuffer(),
        ],
        program.programId
      );

      const [vaultFtrAta, vaultFtrAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("ftr"),
          userStateKey.toBuffer(),
          mintPublicKey_ftr.toBuffer(),
        ],
        program.programId
      );


  let ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc")
    const fetcher = new AccountFetcher(solana_t);  
    const relevant_pool_oracle_pubkey = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET, relevant_pool_pk).publicKey;
    const relevant_pool_whirlpool   = await fetcher.getPool(relevant_pool_pk);
  const whirlpoolCtx = WhirlpoolContext.withProvider(
    provider,
    ORCA_WHIRLPOOL_PROGRAM_ID
  );
  const whirlpoolClient = buildWhirlpoolClient(whirlpoolCtx);
    const poolData = (await whirlpoolClient.getPool(relevant_pool_pk)).getData();
    const tickArrays = await TickArrayUtil.getTickArrayPDAs(
      poolData.tickCurrentIndex,
      poolData.tickSpacing,
      3,
      whirlpoolCtx.program.programId,
      relevant_pool_pk,
      true
    );

 
       
  const account_loc:any = await program.account.contractState.fetch(pk_poolAccount);





	let number_of_fr=Number(user_input_2)*1000000/maturity_price;
	console.log("INPUT USER")
	console.log(number_of_fr)

    const whirlpool = await whirlpoolClient.getPool(relevant_pool_pk, true);
    const outputTokenQuote = await swapQuoteByOutputToken(
      whirlpool,
      mintPublicKey_ftr,
      DecimalUtil.toU64(DecimalUtil.fromNumber(number_of_fr/100/1000000), 9),
      Percentage.fromFraction(500, 10), // 0.1%
      ORCA_WHIRLPOOL_PROGRAM_ID,
      fetcher,
      true,
    );

    const whirlpool_oracle_pubkey = PDAUtil.getOracle(
      whirlpoolCtx.program.programId,
      relevant_pool_pk
    ).publicKey;

  console.log("nooo2o")

  console.log("teeeer")
      if(true){
                

      await program.rpc.userBuysProduct(
          new anchor.BN(number_of_fr),outputTokenQuote.sqrtPriceLimit,{
          accounts: {
          contractState:pk_poolAccount,
          userAuthority: provider.wallet.publicKey,
          userState:userStateKey,
          vaultFreeCollateralAta,
          vaultFtrAta,
          collateralMint:account.collateralMint,
          ftrMint:mintPublicKey_ftr,
          userCollateralAta: new PublicKey(usdcUserAddy),
          contractMint: account.contractMint,
          userContractAta: new PublicKey(underlyingUserAddy),
        whirlpoolProgram: whirlpoolCtx.program.programId,
        whirlpool: relevant_pool_pk,
        tokenVaultA: poolData.tokenVaultA,
        tokenVaultB: poolData.tokenVaultB,
        tickArray0: tickArrays[0].publicKey,
        tickArray1: tickArrays[1].publicKey,
        tickArray2: tickArrays[2].publicKey,
        oracle: whirlpool_oracle_pubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
        },

        }

        )
              console.log("WE GET THEEERE 4")
        toastit("Status : Success investing product")
          } 

        } 
}
    toastit("Status : End Investing Product")



  }
  












  const RedeemFixedRateDistributor = async () => {
  	toastit("Status : Started redeeming product")
    if (program!=undefined){
    const prgrm:anchor.Program=program;
    const { provider } = prgrm;
      let authority=provider.wallet.publicKey;


    const pk_poolAccount=new anchor.web3.PublicKey(current_pool_addy);
    const account:any = await program.account.contractState.fetch(pk_poolAccount);
    console.log("-------------------------")


 


      let mintPublicKey_ftr = new web3.PublicKey("HEhMLvpSdPviukafKwVN8BnBUTamirptsQ6Wxo5Cyv8s"); 
      let relevant_pool_pk=new web3.PublicKey("2Dts6QkFFxcPeiKECfBxfjrqEJtRy7sSK8G2mKs8Xa3P")
      let mintPublicKey_usdc = new web3.PublicKey(account.collateralMint.toString());  
      let mintPublicKey_fixedRate = new web3.PublicKey(account.contractMint.toString());  
      const solana_t = new web33.Connection("https://rpc.helius.xyz/?api-key=f887483d-4017-4d59-a456-3a3638be952d");


      const account_ta_test_FTR = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_ftr});

      const account_ta_test_usdc = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_usdc});

      const account_ta_test_FixedRate = await solana_t.getTokenAccountsByOwner(provider.wallet.publicKey, {
      mint: mintPublicKey_fixedRate});
      let user_account_test_FR=account_ta_test_FixedRate
     console.log(user_account_test_FR);


            if (user_account_test_FR==null){
             console.log("Issue with FR account, that shouldnt happen")
          }else{
            console.log("FOUND Fixed Rate Account")
          }
                



        try{


        let userUsdcAccount_l = await getTokenAccountBalance(usdcUserAddy);
        let userFixedRateAccount_l = await getTokenAccountBalance(underlyingUserAddy);

          }catch{
            console.log("Issue finding accounts")
          }




    const [userStateKey, userStateKeyBump] =
      web3.PublicKey.findProgramAddressSync(
        [pk_poolAccount.toBuffer(), authority.toBuffer()],
        program.programId
      );
      const [vaultFreeCollateralAta, vaultFreeCollateralAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("free"),
          userStateKey.toBuffer(),
          account.collateralMint.toBuffer(),
        ],
        program.programId
      );

      const [vaultFtrAta, vaultFtrAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("ftr"),
          userStateKey.toBuffer(),
          mintPublicKey_ftr.toBuffer(),
        ],
        program.programId
      );

    let [treasuryAta, treasuryAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("treasury"),
          pk_poolAccount.toBuffer(),
          account.collateralMint.toBuffer(),
        ],
        program.programId
      );
  let ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET=new PublicKey("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc")
    const fetcher = new AccountFetcher(solana_t);  
    const relevant_pool_oracle_pubkey = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID_DEVNET, relevant_pool_pk).publicKey;
    const relevant_pool_whirlpool   = await fetcher.getPool(relevant_pool_pk);
  const whirlpoolCtx = WhirlpoolContext.withProvider(
    provider,
    ORCA_WHIRLPOOL_PROGRAM_ID
  );
  const whirlpoolClient = buildWhirlpoolClient(whirlpoolCtx);
    const poolData = (await whirlpoolClient.getPool(relevant_pool_pk)).getData();
    const tickArrays = await TickArrayUtil.getTickArrayPDAs(
      poolData.tickCurrentIndex,
      poolData.tickSpacing,
      3,
      whirlpoolCtx.program.programId,
      relevant_pool_pk,
      false
    );

 
       
  const account_loc:any = await program.account.contractState.fetch(pk_poolAccount);





      let number_of_fr=Number(user_input_2)*1000000/maturity_price;


    const whirlpool = await whirlpoolClient.getPool(relevant_pool_pk, true);


    const whirlpool_oracle_pubkey = PDAUtil.getOracle(
      whirlpoolCtx.program.programId,
      relevant_pool_pk
    ).publicKey;
    const sqrt_price_limit = SwapUtils.getDefaultSqrtPriceLimit(false);
  console.log("nooo2o")


  console.log("teeeer")

try{
  setUserHasToSetup("SENDING TRANSACTION")
await program.rpc.userSellsProduct( new anchor.BN(number_of_fr),sqrt_price_limit

  ,{
    accounts: {
          contractState:pk_poolAccount,
          userAuthority: provider.wallet.publicKey,
          userState:userStateKey,
          vaultFreeCollateralAta,
          vaultFtrAta,
          collateralMint:account.collateralMint,
          ftrMint:mintPublicKey_ftr,
          userCollateralAta: new PublicKey(usdcUserAddy),
          contractMint: account.contractMint,
          userContractAta: new PublicKey(underlyingUserAddy),
        whirlpoolProgram: whirlpoolCtx.program.programId,
        whirlpool: relevant_pool_pk,
        tokenVaultA: poolData.tokenVaultA,
        tokenVaultB: poolData.tokenVaultB,
        tickArray0: tickArrays[0].publicKey,
        tickArray1: tickArrays[1].publicKey,
        tickArray2: tickArrays[2].publicKey,
        oracle: whirlpool_oracle_pubkey,
        treasuryWallet:treasuryAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        },

  }

  )
    toastit("Status : Success redeeming product")
    } catch (err) {
      console.log("This is the error message", err.toString());
      //toastit("Status : Error redeeming product "+ err.toString())
    }



  }
    toastit("Status : Done redeeming product")
    setUserHasToSetup("SWAP")


  }




const createUserAccountDistributor = async () => {
toastit("Status : Started setting up onchain accounts")
  try{
    if (program!=undefined){
     const prgrm:anchor.Program=program;
     const { provider } = prgrm;
     const pk_poolAccount=new anchor.web3.PublicKey(productAddy);
     const account:any = await program.account.contractState.fetch(pk_poolAccount);
    


//----------------------------------- CREATING TOKEN ACCOUNT FOR PRODUCT -----------------------------
      
      let mintPublicKey_ftr = new web3.PublicKey("HEhMLvpSdPviukafKwVN8BnBUTamirptsQ6Wxo5Cyv8s"); 
      let mintPublicKey_usdc = new web3.PublicKey(account.collateralMint.toString());  
      let mintPublicKey_fixedRate = new web3.PublicKey(account.contractMint.toString());  

      const solana_t = new web33.Connection("https://rpc.helius.xyz/?api-key=f887483d-4017-4d59-a456-3a3638be952d");

	// @ts-ignore
    let  userFixedRate = await getAssociatedTokenAddress(
      mintPublicKey_fixedRate,
      provider.wallet.publicKey
    );

    let all_instructions=[]

    let user_account_test_FR = await provider.connection.getAccountInfo(userFixedRate);
     console.log(user_account_test_FR);

   
      if (user_account_test_FR==null){



              // Get the instructions to add to the RPC call
          let createUserFRateInstr = createAssociatedTokenAccountInstruction(
            program.provider.wallet.publicKey,
            userFixedRate,
            program.provider.wallet.publicKey,
            mintPublicKey_fixedRate,
            

          )


          all_instructions.push(createUserFRateInstr)
          //let createUserFRateTrns = new anchor.web3.Transaction().add(createUserFRateInstr);
          //console.log(sendTransaction )

      //const signature = await sendTransaction(createUserFRateTrns, provider.connection  );
      //console.log(signature)

      //delay(5000)
  



          }else{
            console.log("FOUND Product Account")
            
          }


//----------------------------------- CREATING USER ACCOUNT ON THE SC SIDE -----------------------------

      let authority=provider.wallet.publicKey;


    const [userStateKey, userStateKeyBump] =
      web3.PublicKey.findProgramAddressSync(
        [pk_poolAccount.toBuffer(), authority.toBuffer()],
        program.programId
      );
      const [vaultFreeCollateralAta, vaultFreeCollateralAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("free"),
          userStateKey.toBuffer(),
          account.collateralMint.toBuffer(),
        ],
        program.programId
      );

      const [vaultFtrAta, vaultFtrAtaBump] =
      web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("ftr"),
          userStateKey.toBuffer(),
          mintPublicKey_ftr.toBuffer(),
        ],
        program.programId
      );
    


        console.log("Done")
       
       let user_account_test = await provider.connection.getAccountInfo(userStateKey);
       console.log(user_account_test);

        if (user_account_test==null){

       toastit("Status : Creating onchain user account, please validate transaction (1/1)")
      setUserHasToSetup("SENDING TRANSACTION")


        const inituser = await program.instruction.initializeUser( userStateKeyBump, {
              accounts: {
                userAuthority:authority,
                userState:userStateKey,
                contractState:pk_poolAccount,
                vaultFreeCollateralAta,
                vaultFtrAta,
                collateralMint:account.collateralMint,
                ftrMint:mintPublicKey_ftr,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
              },
            });







      
all_instructions.push(inituser)
            const transactiong_r = new TransactionBuilder(program, program.provider.wallet)
             
            .addInstruction({instructions: all_instructions, cleanupInstructions: [], signers: []});
            transactiong_r.provider=program.provider
   
            const signatureg = await transactiong_r.buildAndExecute();
            console.log(signatureg)









         console.log("Successfully created user ");
        }else{
          console.log("User was already created ");
      }


       let user_account_test_loc = await provider.connection.getAccountInfo(userStateKey);
       console.log(user_account_test);

        while (user_account_test_loc==null){
            toastit("Status : waiting for confirmation of your tx")
            await delay(10000);
            user_account_test_loc = await provider.connection.getAccountInfo(userStateKey);


           }



    }else{
      console.log("Program doesnt exist")
    }



  toastit("Status : Successfully creater user accounts")
  await delay(1000);
  UpdateAccount("stSOL/USDC Whirlpool",program)


      } catch (err) {
        console.log("This is the error message", err.toString());
        toastit("Status : Error creating user account "+err.toString())
        setUserHasToSetup("SETUP")
      }

  }








	useEffect((): void => {

		if (vault && !currentVault) {
			set_currentVault(vault);
		}
	}, [currentVault, vault]);

	useEffect((): void => {
		if (toastState.isOpen) {
			if (!!safeChainID && currentVault?.chainID === safeChainID) {
				toastMaster.dismiss(toastState.id);
				set_toastState({isOpen: false});
			}
			return;
		}

		if (!!safeChainID && currentVault?.chainID !== safeChainID) {
			const vaultChainName = CHAINS[Number(currentVault?.chainID || 1)]?.name;
			const chainName = CHAINS[safeChainID]?.name;

			const toastId = toast({
				type: 'warning',
				content: getToastMessage({vaultChainName, chainName}),
				duration: Infinity
			});

			set_toastState({id: toastId, isOpen: true});
		}
	}, [currentVault?.chainID, safeChainID, toast, toastMaster, toastState.id, toastState.isOpen]);

	if (isLoadingVault) {
		return (
			<div className={'relative flex h-14 flex-col items-center justify-center px-4 text-center'}>
				<div className={'flex h-10 items-center justify-center'}>
					<span className={'loader'} />
				</div>
			</div>
		);
	}

	if (!currentVault) {
		return (
			<div className={'relative flex h-14 flex-col items-center justify-center px-4 text-center'}>
				<div className={'flex h-10 items-center justify-center'}>
					<p className={'text-sm text-neutral-900'}>{'We couln\'t find this vault on the connected network.'}</p>
				</div>
			</div>
		);
	}
	//dismissAllToasts()

	return (
		<>
			<header className={'relative z-50 flex w-full items-center justify-center'}>
				<motion.div
					key={'vaults'}
					initial={'initial'}
					animate={'enter'}
					variants={variants}
					className={'z-50 -mt-6 h-12 w-12 cursor-pointer md:-mt-36 md:h-[72px] md:w-[72px]'}>
					<TokenIcon
						chainID={currentVault?.chainID || safeChainID}
						token={currentVault?.token} />
				</motion.div>
			</header>

			<section className={'mt-4 grid w-full grid-cols-12 pb-10 md:mt-0'}>
				<VaultDetailsHeader vault={currentVault} />
				<ActionFlowContextApp currentVault={currentVault}>
					<WithSolverContextApp>
						<VaultActionsTabsWrapper currentVault={currentVault} 
						amount1={underlyingUserAmount} 
						amount2={usdcUserAmount} 
						amount3={underlyingInVaultAmount} 
						amount4={usdcInVaultAmount} 
						userInput1={user_input_1}
						userInput2={user_input_2}
						setUserInput1={set_user_input_1}
						setUserInput2={set_user_input_2}
						button_message={button_message}
						button_is_clicked={MainButtonIsClicked}

						is_busy={is_busy}
						other_token_name={"STSOL"}
						
						 />
					</WithSolverContextApp>
				</ActionFlowContextApp>
				<VaultDetailsTabsWrapper currentVault={currentVault} />
			</section>
		</>
	);
}

export function getToastMessage({vaultChainName, chainName}: {vaultChainName?: string, chainName?: string}): string {
	if (vaultChainName && chainName) {
		return `Please note, this Vault is on ${vaultChainName}. You're currently connected to ${chainName}.`;
	}

	if (vaultChainName && !chainName) {
		return `Please note, this Vault is on ${vaultChainName} and you're currently connected to a different network.`;
	}

	if (!vaultChainName && chainName) {
		return `Please note, you're currently connected to ${chainName} and this Vault is on a different network.`;
	}

	return 'Please note, you\'re currently connected to a different network than this Vault.';
}

Index.getLayout = function getLayout(page: ReactElement, router: NextRouter): ReactElement {
	return (
		<Wrapper router={router}>
			{page}
		</Wrapper>
	);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {}
	};

};

export default Index;
