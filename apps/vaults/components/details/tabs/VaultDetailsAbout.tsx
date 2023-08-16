import {useIsMounted} from '@react-hookz/web';
import {GraphForVaultEarnings} from '@vaults/components/graphs/GraphForVaultEarnings';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {formatPercent} from '@yearn-finance/web-lib/utils/format.number';
import {parseMarkdown} from '@yearn-finance/web-lib/utils/helpers';

import type {ReactElement} from 'react';
import type {TYDaemonVault} from '@common/schemas/yDaemonVaultsSchemas';
import type {TGraphData} from '@common/types/types';

type TAPYLineItemProps = {
	label: string;
	value: number | string;
	hasUpperLimit?: boolean;
}
;
type TYearnFeesLineItem = {
	children: ReactElement;
	label: string;
};

function APYLineItem({value, label, hasUpperLimit}: TAPYLineItemProps): ReactElement {
	const safeValue = Number(value) || 0;

	return (
		<div className={'flex flex-row items-center justify-between'}>
			<p className={'text-sm text-neutral-500'}>{label}</p>
			<p className={'font-number text-sm text-neutral-900'} suppressHydrationWarning>
				{hasUpperLimit ? formatPercent(safeValue * 100) : formatPercent(safeValue * 100, 2, 2, 500)}
			</p>
		</div>
	);
}

function YearnFeesLineItem({children, label}: TYearnFeesLineItem): ReactElement {
	return (
		<div className={'flex flex-col space-y-0 md:space-y-2'}>
			<p className={'text-xxs text-neutral-600 md:text-xs'}>{label}</p>
			{children}
		</div>
	);
}

function VaultDetailsAbout({currentVault, harvestData}: {currentVault: TYDaemonVault, harvestData: TGraphData[]}): ReactElement {
	let chart_name='Cumulative Earnings'
	let deposit_fee="0.3%"
	if(currentVault.ftr_pool_id=="hehe3"){
		chart_name="Overperformance vs benchmark portfolio"
		deposit_fee="0%"}
	const isMounted = useIsMounted()
	;
	const {token, apy, details} = currentVault;

	function getVaultDescription(): string {
		if (token.description) {
			

			let substr_ind1=token.description.indexOf("[RISKS]")
			let real_s=token.description.substring(0,substr_ind1)
			return parseMarkdown(real_s);
		}
		return 'Sorry, we don\'t have a description for this asset right now. But did you know the correct word for a blob of toothpaste is a "nurdle". Fascinating! We\'ll work on updating the asset description, but at least you learnt something interesting. Catch ya later nurdles.';
	}

	function getVaultRisks(): string {
		if (token.description) {
			let substr_ind1=token.description.indexOf("[RISKS]")+7
			let substr_ind2=token.description.indexOf("[FEES]")
			let real_s=token.description.substring(substr_ind1,substr_ind2)
			return parseMarkdown(real_s);
		}
		return 'Sorry, we don\'t have a description for this asset right now. But did you know the correct word for a blob of toothpaste is a "nurdle". Fascinating! We\'ll work on updating the asset description, but at least you learnt something interesting. Catch ya later nurdles.';
	}

	function getVaultFees(): string {
		if (token.description) {

			let substr_ind1=token.description.indexOf("[FEES]")+6
			let real_s=token.description.substring(substr_ind1,token.description.length-1)
			return parseMarkdown(real_s);
		}
		return 'Sorry, we don\'t have a description for this asset right now. But did you know the correct word for a blob of toothpaste is a "nurdle". Fascinating! We\'ll work on updating the asset description, but at least you learnt something interesting. Catch ya later nurdles.';
	}

	return (
		<div className={'grid grid-cols-1 gap-10 bg-neutral-100 p-4 md:grid-cols-2 md:gap-32 md:p-8'}>
			<div className={'col-span-1 w-full space-y-6'}>
				<div>
					<b className={'text-neutral-900'}>{'Description'}</b>
					<p className={'mt-4 text-neutral-600'} dangerouslySetInnerHTML={{__html: getVaultDescription()}} />
					<br/>
					<b className={'text-neutral-900'}>{'Risks'}</b>
					<p className={'mt-4 text-neutral-600'} dangerouslySetInnerHTML={{__html: getVaultRisks()}} />
					<br/>
					<b className={'text-neutral-900'}>{'Fees'}</b>
					<p className={'mt-4 text-neutral-600'} dangerouslySetInnerHTML={{__html: getVaultFees()}} />
				</div>

			</div>
			<div className={'col-span-1 w-full space-y-8'}>
				<div>
					<b className={'text-neutral-900'}>{'FTR Fees'}</b>
					<div className={'mt-4 flex flex-row space-x-6 md:space-x-8'}>
						<YearnFeesLineItem label={'Deposit/Withdrawal fee'}>
							<b className={'font-number text-xl text-neutral-900'}>
								{deposit_fee}
							</b>
						</YearnFeesLineItem>
						<YearnFeesLineItem label={'Management fee'}>
							<b className={'font-number text-xl text-neutral-900'}>
								{formatPercent((details.managementFee || 0) / 100, 0)}
							</b>
						</YearnFeesLineItem>
						<YearnFeesLineItem label={'Performance fee'}>
							<b className={'font-number text-xl text-neutral-500'}>
								{formatPercent((details.performanceFee || 0) / 100, 0)}
							</b>
						</YearnFeesLineItem>
					</div>
				</div>
				<div>
					<b className={'text-neutral-900'}>{chart_name}</b>
					<div className={'-mx-2 mt-4 flex flex-row border-b border-l border-neutral-300 md:mx-0'} style={{height: 160}}>
						<Renderable shouldRender={isMounted()}>
							<GraphForVaultEarnings currentVault={currentVault} harvestData={harvestData} height={160} />
						</Renderable>
					</div>
				</div>
			</div>
		</div>
	);
}

export {VaultDetailsAbout};
