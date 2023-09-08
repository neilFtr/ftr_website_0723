import {Fragment, useCallback, useMemo,useEffect } from 'react';
import VaultListOptions from '@vaults/components/list/VaultListOptions';
import {VaultsListEmpty} from '@vaults/components/list/VaultsListEmpty';
import {VaultsListInternalMigrationRow} from '@vaults/components/list/VaultsListInternalMigrationRow';
import {VaultsListRetired} from '@vaults/components/list/VaultsListRetired';
import {VaultsListRow} from '@vaults/components/list/VaultsListRow';
import {useAppSettings} from '@vaults/contexts/useAppSettings';
import {useFilteredVaults} from '@vaults/hooks/useFilteredVaults';
import {useSortVaults} from '@vaults/hooks/useSortVaults';
import {useFetchFTR} from '@common/hooks/useFetch';
import Wrapper from '@vaults/Wrapper';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {useSessionStorage} from '@yearn-finance/web-lib/hooks/useSessionStorage';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';
import ListHead from '@common/components/ListHead';
import ListHero from '@common/components/ListHero';
import ValueAnimation from '@common/components/ValueAnimation';
import type {TYDaemonVault, TYDaemonVaults} from '@common/schemas/yDaemonVaultsSchemas';

import {useYearn} from '@common/contexts/useYearn';
import {getVaultName} from '@common/utils';
import type {TAddress, TDict} from '@yearn-finance/web-lib/types';
import * as anchor from "@project-serum/anchor";
import { web3, Wallet } from "@project-serum/anchor";



import type {NextRouter} from 'next/router';
import type {ReactElement, ReactNode} from 'react';

import type {TListHeroCategory} from '@common/components/ListHero';

import type {TSortDirection} from '@common/types/types';
import type {TPossibleSortBy} from '@vaults/hooks/useSortVaults';


const web33 = require('@solana/web3.js');




function HeaderUserPosition(): ReactElement {


	const formatedYouEarned = useMemo((): string => {
		const amount = 0;
		return formatAmount(amount) ?? '';
	}, [0]);

	const formatedYouHave = useMemo((): string => {
		return formatAmount(0) ?? '';
	}, [0]);

	return (
		<Fragment>
			<div className={'col-span-12 w-full md:col-span-8'}>
				<p className={'pb-2 text-lg text-neutral-900 md:pb-6 md:text-3xl'}>{'Deposited'}</p>
				<b className={'font-number text-4xl text-neutral-900 md:text-7xl'}>
					<ValueAnimation
						identifier={'youHave'}
						value={formatedYouHave}
						defaultValue={'0,00'}
						prefix={'$'} />
				</b>
			</div>
			<div className={'col-span-12 w-full md:col-span-4'}>
				<p className={'pb-2 text-lg text-neutral-900 md:pb-6 md:text-3xl'}>{'Earnings'}</p>
				<b className={'font-number text-3xl text-neutral-900 md:text-7xl'}>
					<ValueAnimation
						identifier={'youEarned'}
						value={formatedYouEarned}
						defaultValue={'0,00'}
						prefix={'$'} />
				</b>
			</div>
		</Fragment>
	);
}

function Index(): ReactElement {
	const {safeChainID} = useChainID();
	
	let {vaults, vaultsMigrations, vaultsRetired, isLoadingVaultList,ftr_vaults_data} = useYearn();

  	let vaults_ftrr: TDict<TYDaemonVault>={}
  let funding_arb_apr=0
  let funding_arb_tvl=0
  let funding_arb_cap=0
  let last_price=100

  let exo_funding_arb_apr=0
  let exo_funding_arb_tvl=0
  let exo_funding_arb_cap=0
  let exo_last_price=100

  let deribit_lping_apr=0
  let deribit_lping_tvl=0
  let deribit_lping_cap=0
  let deribit_lping_last_price=100


  let drift_lping_apr=0
  let drift_lping_tvl=0
  let drift_lping_cap=0
  let drift_lping_last_price=100

  let last_price_whrlpl=1
  let cap_whirlpools=50000
    let whirlpool_tvl=0
    let whirlpool_apr=0
  if (ftr_vaults_data){
    console.log("DATAAAAA MAIN INDEX")
    console.log(ftr_vaults_data)

    whirlpool_tvl=ftr_vaults_data["WhirlpoolStSOLUSDC"]["tvl"]
      whirlpool_apr=Number(ftr_vaults_data["WhirlpoolStSOLUSDC"]["apr"])/100
      cap_whirlpools=ftr_vaults_data["WhirlpoolStSOLUSDC"]["tvl"]/cap_whirlpools
      last_price_whrlpl=100+Number(ftr_vaults_data["WhirlpoolStSOLUSDC"]["last_price"])

      //funding_arb_apr=Number(ftr_vaults_data["VanillaFArb"]["apr"])/100
    //funding_arb_tvl=ftr_vaults_data["VanillaFArb"]["tvl"]
    last_price=100//ftr_vaults_data["VanillaFArb"]["last_price"]
    //funding_arb_cap=Number(ftr_vaults_data["VanillaFArb"]["tvl"])/120


    exo_funding_arb_apr=Number(ftr_vaults_data["ExosticFArb"]["apr"])/100
    //exo_funding_arb_tvl=ftr_vaults_data["ExosticFArb"]["tvl"]
    exo_last_price=100//ftr_vaults_data["ExosticFArb"]["last_price"]
    //exo_funding_arb_cap=Number(ftr_vaults_data["ExosticFArb"]["tvl"])/500

    deribit_lping_apr=Number(ftr_vaults_data["DriftMM"]["apr"])/100
    deribit_lping_tvl=ftr_vaults_data["DriftMM"]["tvl"]
    deribit_lping_cap=0
    deribit_lping_last_price=100

    drift_lping_apr=Number(ftr_vaults_data["DeribitMM"]["apr"])/100
    drift_lping_tvl=ftr_vaults_data["DeribitMM"]["tvl"]
    drift_lping_cap=0
    drift_lping_last_price=100

      

  }

  vaults_ftrr["0x3A51269e0707A3416044bad5066858A12198fcf7"]=
    {"address":"0x3A51269e0707A3416044bad5066858A12198fcf7",
    "ftr_sc_addy":"3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E",
    "ftr_type":"Distributor",
    "ftr_pool_id":"3LMviePb5vhhhBUYE3wXMMtqCLhEaPdsBjJaTifbH9rj",
    "type":"Automated",
    "symbol":"FundingArb",
    "display_symbol":"Onchain Funding Arbitrage",
    "formated_symbol":"Onchain Funding Arbitrage",
    "name":"Onchain Funding Arbitrage",
    "display_name":"Onchain Funding Arbitrage",
    "formated_name":"Onchain Funding Arbitrage",
    "icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png",
    "version":String(last_price),
    "category":"Volatile",
    "inception":funding_arb_cap,
    "decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,
    "token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],
    "name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"FundingArb","type":"Curve LP",
    "display_name":"Onchain Funding Arbitrage","display_symbol":"FundingArb",
    "description":"This vault runs a floating rate funding arbitrage strategy. The performance of this vault is variable and there is no guarantee about the future yield of this vault being positive. The vault's funds can be deployed on Drift, Zeta, Mango Markets or Bybit. The vault does not hold any market exposure (its a rigorous 0 delta vault). The performance presented is a 7 days estimation, net of fees. The redemption of this vault can take 24h to 48h [RISKS] The vaults holds different risks, including but not limited to : Funding rate risk, execution risk, Solana chain downtime, Drift-Mango-Zeta smart contract risk, Bybit counterparty risk, liquidity gap risk. This vault uses a leverage from 2 to 4. The management of the funds of this vault is centralized : this is not a fully trustless vault. The funds of this vault will be managed by the following account : Gwirg7qtpxVmvnFjrXj1vEGiv4qK6Yv3Hefush9xkz2w. [FEES] The vault charges a 0.3% deposit fee. This vault also locks 2% of the amounts invested (used to purchase and lock FTR). This FTR amount is unlocked when you redeem the product, which can lead into a positive / negative peformance depending on the FTR price change over the period. The vault implements a 10% performance fee (applied on your positive P&L).",
      
    "icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},
    "tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4543.2132083857305,"tvl_delegated":0,"tvl":funding_arb_tvl,"price":296.529102},
    "apy":{"type":"crv","gross_apr":funding_arb_apr*0.9,"net_apy":funding_arb_apr,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},
    "points":{"week_ago":0,"month_ago":0,"inception":20},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
    "details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
    "strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"10","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"10","currentAmount":"0","availableAmount":"10"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
       
  if (true){
    vaults_ftrr["0x3a51269e0707A3416044BAD5066858a12198fcf6"]=
      {"address":"0x3a51269e0707A3416044BAD5066858a12198fcf6",
      "ftr_sc_addy":"5MKGZyWmVAyJC2n38oDJDh3kGXo8xCvQVBH8CzeAKQV3",
      "ftr_type":"Whirlpool",
      "ftr_pool_id":"hehe3",
      "type":"Automated","symbol":"stSOL automated LP","display_symbol":"stSOL automated LP","formated_symbol":"stSOLLP","name":"stSOL automated LP","display_name":"stSOL automated LP","formated_name":"stSOL automated LP","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png","version":"0.4.6","category":"Volatile",
      "inception":0,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"stSOL LP","display_symbol":"CLEVETH-f",
      "description":"This vault exploits a proprietary market making strategy, fully onchain, relying on Orca Whirlpools. Your account is segregated from the other users accounts. Your funds are available at any time. The smart contract is built so that the manager can only swap, create and close positions : the manager never has access to your funds. This vault is trustless, redemptions are instant. [RISKS] Future FTR Client for Orca Whirlpools smart contract risk. Orca Whirlpools smart contract risk. Please make sure your understand the risks of providing concentrated liquidity, especially the impermanent loss risk. If you think the underlying coin is going up/down in straight line, this strategy is not adapted. Liquidity gap risk. Lido stSOL smart contract risk. Market risk : this vault has a structural spot long exposure and can never be short or leveraged. This strategy is not delta neutral. This strategy does not use a stop loss. We might rebalance to get the vault 100% in USDC (risk off) if we think the conditions justify it. [FEES] The vault charges 15% of the fees generated by the position. No deposit / withdraw fees. No fees on the performance of the underlying tokens. The performance presented on the chart is before fees. The overperformance is calculated by comparing the performance of the strategy to a portfolio of 50% token A and 50% token B .",
      "icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},
      "tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":1000,"tvl_delegated":0,"tvl":whirlpool_tvl,"price":296.529102},
      "apy":{"type":"crv","gross_apr":whirlpool_apr,"net_apy":0,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
      "details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1500,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
      "strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
      
    vaults_ftrr["0x3a51269E0707A3416044bad5066858A12198fCf5"]=
      {"address":"0x3a51269E0707A3416044bad5066858A12198fCf5",
      "ftr_sc_addy":"3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E",
      "ftr_type":"Distributor",
      "ftr_pool_id":"hehe4",
      "type":"Automated","symbol":"Exotic Funding Arb","display_symbol":"Exotic Funding Arb","formated_symbol":"ExoFArb","name":"Exotic Funding Arb","display_name":"Exotic Funding Arb","formated_name":"Exotic Funding Arb","icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png",
      "version":String(exo_last_price),
      "category":"Velodrome",
      "inception":exo_funding_arb_cap,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"stSOL LP","display_symbol":"CLEVETH-f",
      "description": "This vault runs a floating rate funding arbitrage strategy. The performance of this vault is variable and there is no guarantee about the future yield of this vault being positive. The vault's funds can be deployed on Drift, Zeta, Mango Markets, Bybit, Opnx and HyperLiquid. The vault does not hold any market exposure (its a rigorous 0 delta vault). The performance presented is a 7 days estimation, net of fees. The redemption of this vault can take 24h to 48h [RISKS] The vaults holds different risks, including but not limited to : Funding rate risk, execution risk, Solana chain downtime, Drift-Mango-Zeta smart contract risk, Bybit, Opnx, Hyperliquid counterparty risk, oUSD depeg risk, liquidity gap risk. This vault uses a leverage from 2 to 4. The management of the funds of this vault is centralized : this is not a fully trustless vault. We strongly advise potential users to DYOR on Opnx. The oUSD depeg risk is slighly mitigated in this strategy but the risk of loss in capital is significantly higher than the vanilla funding rate product. This is not a risk free APR. [FEES] The vault charges a 0.3% deposit fee. This vault also locks 3% of the amounts invested (used to purchase and lock FTR). This FTR amount is unlocked when you redeem the product, which can lead into a positive / negative peformance depending on the FTR price change over the period. The vault implements a 10% performance fee (applied on your positive P&L).",
      

      "icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},
      "tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4243.2132083857305,"tvl_delegated":0,"tvl":exo_funding_arb_tvl,"price":296.529102},
      "apy":{"type":"crv","gross_apr":funding_arb_apr*0.9,"net_apy":exo_funding_arb_apr*0.9,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
      "details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
      "strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
      
    let name4="Deribit LPing BTCUSD"
    vaults_ftrr["0x3A51269E0707A3416044BaD5066858a12198FCf4"]=
      {"address":"0x3A51269E0707A3416044BaD5066858a12198FCf4",
      "ftr_sc_addy":"3XeZoQirC8ZvHJn1Qy875g4Z7GFoAocrrzcjgxbfm22E",
      "ftr_type":"Distributor",
      "ftr_pool_id":"hehe6",
      "type":"Automated","symbol":name4,"display_symbol":name4,"formated_symbol":"ExoFArb","name":name4,"display_name":name4,"formated_name":name4,"icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png",
      "version":String(deribit_lping_last_price),
      "category":"Velodrome",
      "inception":exo_funding_arb_cap,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"stSOL LP","display_symbol":"CLEVETH-f",
      "description": "This vault runs a leveraged grid trading strategy. This vault should perform well in ranging markets and mean reverting environment. It will underperform the underlying asset in trending conditions. The performance of this vault is variable and there is no guarantee about the future performance of this vault being positive. The vault's funds can only be deployed on Deribit, in the BTC/USDC market. The vault  will hold  market exposure for potentially multiple days (its not a rigorous 0 delta vault). On average, the exposure of the vault will be 0. The performance presented is a 30 days estimation, net of fees. The redemption of this vault can take 24h to 48h [RISKS] The vaults holds different risks, including but not limited to : Funding rate risk, slippage / liquidity gap risk, Solana chain downtime, Drift smart contract risk, . This vault uses a leverage from 3 to 7. The management of the funds of this vault is centralized : this is not a fully trustless vault. This is not a risk free APR. [FEES] The vault charges a 0.3% deposit fee. This vault also locks 3% of the amounts invested (used to purchase and lock FTR). This FTR amount is unlocked when you redeem the product, which can lead into a positive / negative peformance depending on the FTR price change over the period. The vault implements a 10% performance fee (applied on your positive P&L).",
      

      "icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},
      "tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4243.2132083857305,"tvl_delegated":0,"tvl":deribit_lping_tvl,"price":296.529102},
      "apy":{"type":"crv","gross_apr":deribit_lping_apr*0.9,"net_apy":deribit_lping_apr*0.9,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
      "details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
      "strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
      
    name4="Drift LPing SOLUSD"
    vaults_ftrr["0x3A51269e0707A3416044BaD5066858A12198FcF3"]=
      {"address":"0x3A51269e0707A3416044BaD5066858A12198FcF3",
      "ftr_sc_addy":"5MKGZyWmVAyJC2n38oDJDh3kGXo8xCvQVBH8CzeAKQV3",
      "ftr_type":"Distributor",
      "ftr_pool_id":"hehe5",
      "type":"Automated","symbol":name4,"display_symbol":name4,"formated_symbol":"ExoFArb","name":name4,"display_name":name4,"formated_name":name4,"icon":"https://assets.smold.app/api/token/1/0x3a51269E0707A3416044bad5066858A12198fCf5/logo-128.png",
      "version":String(drift_lping_last_price),
      "category":"Velodrome",
      "inception":exo_funding_arb_cap,"decimals":18,"chainID":1,"riskScore":1.9634787522152766,"endorsed":true,"emergency_shutdown":false,"token":{"address":"0x6C280dB098dB673d30d5B34eC04B6387185D3620","underlyingTokensAddresses":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x72953a5C32413614d24C29c84a66AE4B59581Bbf"],"name":"Curve.fi Factory Crypto Pool: CLEV/ETH","symbol":"CLEVETH-f","type":"Curve LP","display_name":"stSOL LP","display_symbol":"CLEVETH-f",
      "description": "This vault runs a leveraged grid trading strategy. This vault should perform well in ranging markets and mean reverting environment. It will underperform the underlying asset in trending conditions. The performance of this vault is variable and there is no guarantee about the future performance of this vault being positive. The vault's funds can only be deployed on Drift, in the SOL/USDC market. The vault  will hold  market exposure for potentially multiple days (its not a rigorous 0 delta vault). On average, the exposure of the vault will be 0. The performance presented is a 30 days estimation, net of fees. The redemption of this vault can take 24h to 48h [RISKS] The vaults holds different risks, including but not limited to : Funding rate risk, slippage / liquidity gap risk, Solana chain downtime, Drift smart contract risk, . This vault uses a leverage from 3 to 7. The management of the funds of this vault is centralized : this is not a fully trustless vault. This is not a risk free APR. [FEES] The vault charges a 0.3% deposit fee. This vault also locks 3% of the amounts invested (used to purchase and lock FTR). This FTR amount is unlocked when you redeem the product, which can lead into a positive / negative peformance depending on the FTR price change over the period. The vault implements a 10% performance fee (applied on your positive P&L).",
      

      "icon":"https://assets.smold.app/api/token/1/0x6C280dB098dB673d30d5B34eC04B6387185D3620/logo-128.png","decimals":18},
      "tvl":{"total_assets":"15321306332980869102","total_delegated_assets":"0","tvl_deposited":4243.2132083857305,"tvl_delegated":0,"tvl":drift_lping_tvl,"price":296.529102},
      "apy":{"type":"crv","gross_apr":funding_arb_apr*0.9,"net_apy":drift_lping_apr*0.9,"staking_rewards_apr":0,"fees":{"performance":0.1,"withdrawal":0,"management":0,"keep_crv":0,"cvx_keep_crv":0},"points":{"week_ago":0,"month_ago":0,"inception":0},"composite":{"boost":2.5,"pool_apy":0.0001933754333323101,"boosted_apr":0.7148185920019143,"base_apr":0.2859274368007657,"cvx_apr":0.4574356177111497,"rewards_apr":0}},
      "details":{"management":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","governance":"0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52","guardian":"0x2C01B4AD51a67E2d8F02208F54dF9aC4c0B778B6","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","depositLimit":"10000000000000000000000000000000","availableDepositLimit":"9999999999984678693667019130898","comment":"Concentrated liquidity market making","apyTypeOverride":"","apyOverride":0,"order":286,"performanceFee":1000,"managementFee":0,"depositsDisabled":false,"withdrawalsDisabled":false,"allowZapIn":true,"allowZapOut":true,"retired":false,"hideAlways":false},
      "strategies":[{"address":"0xEE341d18939562D6D8A34ea31Fe9BdA55bACb947","name":"StrategyCurveBoostedFactory-CLEVETH-f","displayName":"Curve Boost","description":"Supplies {{token}} to [Curve Finance](https://curve.fi) and stakes it in gauge to collect any available tokens and earn enhanced CRV rewards thanks to [Yearn's locked CRV boost](https://docs.yearn.finance/getting-started/guides/how-boost-works). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"15041529720494645680","totalLoss":"0","totalGain":"11587075871941007617","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"15041529720494645680","creditAvailable":"279776612486223422","debtOutstanding":"0","expectedReturn":"1549944828288110449","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1686264683,"activation":1675027391,"keepCRV":0,"debtRatio":10000,"debtLimit":0,"withdrawalQueuePosition":1,"doHealthCheck":true,"inQueue":true,"emergencyExit":false,"isActive":true},"risk":{"riskScore":2,"riskGroup":"Curve Boosted Factory","riskDetails":{"TVLImpact":1,"auditScore":5,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Yellow","currentTVL":"158570117.28708875","availableTVL":"-61346114.77387886","currentAmount":"463000629.32106197","availableAmount":"-2013.3633712140868"}}},{"address":"0xd73B085C715ADeE2551f5bAbc28200E79f739b0A","name":"StrategyConvexFactory-CLEVETH-f","displayName":"Convex Reinvest","description":"Supplies {{token}} to [Convex Finance](https://www.convexfinance.com/stake) boosted by Convex's veCRV to earn CRV and CVX (and any other available tokens). Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.","details":{"keeper":"0x0D26E894C2371AB6D20d99A65E991775e3b5CAd7","strategist":"0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7","rewards":"0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde","healthCheck":"0xDDCea799fF1699e98EDF118e0629A974Df7DF012","totalDebt":"0","totalLoss":"0","totalGain":"0","minDebtPerHarvest":"0","maxDebtPerHarvest":"115792089237316195423570985008687907853269984665640564039457584007913129639935","estimatedTotalAssets":"0","creditAvailable":"0","debtOutstanding":"0","expectedReturn":"0","delegatedAssets":"0","delegatedValue":"0","version":"0.4.5","protocols":["Convex Finance","Curve Finance"],"apr":0,"performanceFee":0,"lastReport":1675027391,"activation":1675027391,"keepCRV":0,"debtLimit":0,"withdrawalQueuePosition":0,"doHealthCheck":false,"inQueue":true,"emergencyExit":false,"isActive":false},"risk":{"riskScore":2,"riskGroup":"Convex Factory","riskDetails":{"TVLImpact":0,"auditScore":4,"codeReviewScore":2,"complexityScore":2,"longevityImpact":2,"protocolSafetyScore":2,"teamKnowledgeScore":1,"testingScore":3},"allocation":{"status":"Green","currentTVL":"0","availableTVL":"0","currentAmount":"0","availableAmount":"0"}}}],"migration":{"available":false,"address":"0x3a51269E0707A3416044bad5066858A12198fCf5","contract":"0x0000000000000000000000000000000000000000"},"staking":{"available":false,"address":"0x0000000000000000000000000000000000000000","tvl":0,"risk":0}}
      
      

      }
	console.log(vaults)
	vaults=vaults_ftrr

	//---------------------------------------  LOADING ANCHOR ENV  --------------------------------



	//---------------------------------------  ENDLOADING ANCHOR ENV  --------------------------------





	const [sort, set_sort] = useSessionStorage<{sortBy: TPossibleSortBy, sortDirection: TSortDirection}>(
		'yVaultsSorting', {sortBy: 'apy', sortDirection: 'desc'}
	);
	const {shouldHideDust, shouldHideLowTVLVaults, category, searchValue, set_category, set_searchValue} = useAppSettings();



	/* 🔵 - Yearn Finance **************************************************************************
	**	It's best to memorize the filtered vaults, which saves a lot of processing time by only
	**	performing the filtering once.
	**********************************************************************************************/
	const curveVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Curve');
	const velodromeVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Velodrome');
	const stablesVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Stablecoin');
	const balancerVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Balancer');
	const cryptoVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Volatile');
	const holdingsVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Volatile');
	const migratableVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Volatile');
	const retiredVaults = useFilteredVaults(vaults, ({category}): boolean => category === 'Volatile');

	const categoriesToDisplay = useMemo((): TListHeroCategory<string>[] => {
		const categories = [
			{value: 'Featured Vaults', label: 'Featured', isSelected: category === 'Featured Vaults'},
			{value: 'Crypto Vaults', label: 'Crypto', isSelected: category === 'Crypto Vaults'},
			{value: 'Stables Vaults', label: 'Stables', isSelected: category === 'Stables Vaults'},
			{value: 'Curve Vaults', label: 'Curve', isSelected: category === 'Curve Vaults'}
		];
		if (safeChainID === 10) {
			categories.push({value: 'Velodrome Vaults', label: 'Velodrome', isSelected: category === 'Velodrome Vaults'});
		} else {
			categories.push({value: 'Balancer Vaults', label: 'Balancer', isSelected: category === 'Balancer Vaults'});
		}
		return [
			...categories,
			{value: 'All Vaults', label: 'All', isSelected: category === 'All Vaults'}
		];
	}, [category, safeChainID]);

	/* 🔵 - Yearn Finance **************************************************************************
	**	First, we need to determine in which category we are. The vaultsToDisplay function will
	**	decide which vaults to display based on the category. No extra filters are applied.
	**	The possible lists are memoized to avoid unnecessary re-renders.
	**********************************************************************************************/
	const vaultsToDisplay = useMemo((): TYDaemonVault[] => {
		let _vaultList: TYDaemonVault[] = [...Object.values(vaults || {})] as TYDaemonVault[];

		if (category === 'Curve Vaults') {
			_vaultList = curveVaults;
		} else if (category === 'Balancer Vaults') {
			_vaultList = balancerVaults;
		} else if (category === 'Velodrome Vaults') {
			_vaultList = velodromeVaults;
		} else if (category === 'Stables Vaults') {
			_vaultList = stablesVaults;
		} else if (category === 'Crypto Vaults') {
			_vaultList = cryptoVaults;
		} else if (category === 'Holdings') {
			_vaultList = holdingsVaults;
		} else if (category === 'Featured Vaults') {
			_vaultList.sort((a, b): number => ((b.tvl.tvl || 0) * (b?.apy?.net_apy || 0)) - ((a.tvl.tvl || 0) * (a?.apy?.net_apy || 0)));
			_vaultList = _vaultList.slice(0, 10);
		}

		if (shouldHideLowTVLVaults && category !== 'Holdings') {
			_vaultList = _vaultList.filter((vault): boolean => (vault?.tvl?.tvl || 0) > 10_000);
		}

		return _vaultList;
	}, [vaults, category, shouldHideLowTVLVaults, curveVaults, balancerVaults, velodromeVaults, stablesVaults, cryptoVaults, holdingsVaults]);

	/* 🔵 - Yearn Finance **************************************************************************
	**	Then, on the vaultsToDisplay list, we apply the search filter. The search filter is
	**	implemented as a simple string.includes() on the vault name.
	**********************************************************************************************/
	const searchedVaultsToDisplay = useMemo((): TYDaemonVault[] => {
		const vaultsToUse = [...vaultsToDisplay];

		if (searchValue === '') {
			return vaultsToUse;
		}
		return vaultsToUse.filter((vault): boolean => {
			const searchString = getVaultName(vault);
			return searchString.toLowerCase().includes(searchValue.toLowerCase());
		});
	}, [vaultsToDisplay, searchValue]);

	/* 🔵 - Yearn Finance **************************************************************************
	**	Then, once we have reduced the list of vaults to display, we can sort them. The sorting
	**	is done via a custom method that will sort the vaults based on the sortBy and
	**	sortDirection values.
	**********************************************************************************************/
	const sortedVaultsToDisplay = useSortVaults([...searchedVaultsToDisplay], sort.sortBy, sort.sortDirection);

	/* 🔵 - Yearn Finance **************************************************************************
	**	Callback method used to sort the vaults list.
	**	The use of useCallback() is to prevent the method from being re-created on every render.
	**********************************************************************************************/
	const onSort = useCallback((newSortBy: string, newSortDirection: string): void => {
		set_sort({sortBy: newSortBy as TPossibleSortBy, sortDirection: newSortDirection as TSortDirection});
	}, [set_sort]);

	/* 🔵 - Yearn Finance **************************************************************************
	**	The VaultList component is memoized to prevent it from being re-created on every render.
	**	It contains either the list of vaults, is some are available, or a message to the user.
	**********************************************************************************************/
	const VaultList = useMemo((): ReactNode => {
		if (isLoadingVaultList && category === 'Holdings') {
			return (
				<VaultsListEmpty
					isLoading={isLoadingVaultList}
					sortedVaultsToDisplay={sortedVaultsToDisplay}
					currentCategory={category} />
			);
		}
		if (isLoadingVaultList || isZero(sortedVaultsToDisplay.length)) {
			return (
				<VaultsListEmpty
					isLoading={isLoadingVaultList}
					sortedVaultsToDisplay={sortedVaultsToDisplay}
					currentCategory={category} />
			);
		}
		return (
			sortedVaultsToDisplay.map((vault): ReactNode => {
				if (!vault) {
					return (null);
				}
				return <VaultsListRow key={vault.address} currentVault={vault} />;
			})
		);
	}, [category, isLoadingVaultList, sortedVaultsToDisplay]);
	console.log('Category ffs')
	return (
		<section className={'mt-4 grid w-full grid-cols-12 gap-y-10 pb-10 md:mt-20 md:gap-x-10 md:gap-y-20'}>

			

			<div className={'relative col-span-12 flex w-full flex-col bg-neutral-100'}>
				<div className={'absolute right-8 top-8'}>
					<VaultListOptions />
				</div>
				<ListHero
					headLabel={category}
					searchLabel={`Search ${category}`}
					searchPlaceholder={'YFI Vault'}
					categories={[
						categoriesToDisplay,
						[
							{
								value: 'Holdings',
								label: 'Holdings',
								isSelected: category === 'Holdings',
								node: (
									<Fragment>
										{'Holdings'}
										<span className={`absolute -right-1 -top-1 flex h-2 w-2 ${category === 'Holdings' || isZero(migratableVaults?.length + retiredVaults?.length) ? 'opacity-0' : 'opacity-100'}`}>
											<span className={'absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-600 opacity-75'}></span>
											<span className={'relative inline-flex h-2 w-2 rounded-full bg-pink-500'}></span>
										</span>
									</Fragment>
								)
							}
						]
					]}
					onSelect={set_category}
					searchValue={searchValue}
					set_searchValue={set_searchValue} />


				<Renderable shouldRender={category === 'Holdings' && retiredVaults?.length > 0}>
					<div>
						{retiredVaults.filter((vault): boolean => !!vault).map((vault): ReactNode =>
							<VaultsListRetired key={vault.address} currentVault={vault} />
						)}
					</div>
				</Renderable>

				<Renderable shouldRender={category === 'Holdings' && migratableVaults?.length > 0}>
					<div>
						{migratableVaults.filter((vault): boolean => !!vault).map((vault): ReactNode =>
							<VaultsListInternalMigrationRow key={vault.address} currentVault={vault} />
						)}
					</div>
				</Renderable>

				<div className={'mt-4'} />
				<ListHead
					sortBy={sort.sortBy}
					sortDirection={sort.sortDirection}
					onSort={onSort}
					items={[
						{label: 'Strategy', value: 'name', sortable: true},
						{label: 'APR', value: 'apy', sortable: true, className: 'col-span-2'},
						{label: 'Cap', value: 'available', sortable: true, className: 'col-span-2'},
						{label: 'InceptionPerf', value: 'deposited', sortable: true, className: 'col-span-2'},
						{label: 'TVL', value: 'tvl', sortable: true, className: 'col-span-2'}
					]} />

				{VaultList}
			</div>

		</section>
	);
}


Index.getLayout = function getLayout(page: ReactElement, router: NextRouter): ReactElement {
	return <Wrapper router={router}>{page}</Wrapper>;
};

export default Index;
