import {useActionFlow} from '@vaults/contexts/useActionFlow';
import {useSolver} from '@vaults/contexts/useSolver';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {formatPercent} from '@yearn-finance/web-lib/utils/format.number';
import {formatCounterValue} from '@yearn-finance/web-lib/utils/format.value';
import {Dropdown} from '@common/components/TokenDropdown';
import {useTokenPrice} from '@common/hooks/useTokenPrice';

import type {ReactElement} from 'react';

function VaultDetailsQuickActionsTo({contract_price}:{contract_price:any}): ReactElement {
	const {isActive} = useWeb3();
	const {currentVault, possibleOptionsTo, actionParams, onUpdateSelectedOptionTo, isDepositing} = useActionFlow();
	const {expectedOut, isLoadingExpectedOut} = useSolver();
	const selectedOptionToPricePerToken = useTokenPrice(toAddress(actionParams?.selectedOptionTo?.value));
	console.log("contract_price")
	console.log(contract_price)
	function renderMultipleOptionsFallback(): ReactElement {
		return (
			<Dropdown
				defaultOption={possibleOptionsTo[0]}
				options={possibleOptionsTo}
				selected={actionParams?.selectedOptionTo}
				onSelect={onUpdateSelectedOptionTo} />
		);
	}

	return (
		<section aria-label={'TO'} className={'flex w-full flex-col space-x-0 md:flex-row md:space-x-4'}>
			<div className={'relative z-10 w-full space-y-2'}>
				<div className={'flex flex-row items-baseline justify-between'}>
					<label className={'text-base text-neutral-600'}>
						{isDepositing ? 'To vault' : 'To your wallet'}
					</label>
					<legend className={'font-number inline text-xs text-neutral-600 md:hidden'} suppressHydrationWarning>
						{`APY ${formatPercent(((currentVault?.apy?.net_apy || 0) + (currentVault?.apy?.staking_rewards_apr || 0)) * 100, 2, 2, 500)}`}
					</legend>
				</div>
				<Renderable
					shouldRender={!isActive || isDepositing || possibleOptionsTo.length === 1}
					fallback={renderMultipleOptionsFallback()}>
					<div className={'flex h-10 w-full items-center justify-between bg-neutral-300 px-2 text-base text-neutral-900 md:px-3'}>
						<div className={'relative flex flex-row items-center'}>
							<div className={'h-6 w-6 flex-none rounded-full'}>
								{actionParams?.selectedOptionTo?.icon}
							</div>
							<p className={'overflow-x-hidden text-ellipsis whitespace-nowrap pl-2 font-normal text-neutral-900 scrollbar-none'}>
								{isDepositing ? actionParams?.selectedOptionTo?.symbol : 'To your wallet'}

							</p>
						</div>
					</div>
				</Renderable>
				<legend className={'font-number hidden text-xs text-neutral-600 md:inline'} suppressHydrationWarning>
					{` Price : ${Number(contract_price)}`}
				</legend>
			</div>


		</section>
	);
}

export default VaultDetailsQuickActionsTo;
