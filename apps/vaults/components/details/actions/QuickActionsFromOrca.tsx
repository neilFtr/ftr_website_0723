import {useCallback} from 'react';
import {useActionFlow} from '@vaults/contexts/useActionFlow';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';
import {formatCounterValue} from '@yearn-finance/web-lib/utils/format.value';
import {handleInputChangeEventValue} from '@yearn-finance/web-lib/utils/handlers/handleInputChangeEventValue';
import {Dropdown} from '@common/components/TokenDropdown';
import {useWallet} from '@common/contexts/useWallet';
import {useBalance} from '@common/hooks/useBalance';
import {useTokenPrice} from '@common/hooks/useTokenPrice';

import type {ChangeEvent, ReactElement} from 'react';

function VaultDetailsQuickActionsFrom({amount1,amount2,amount3,amount4,userInput1,setUserInput1,other_token_name}: {amount1:any,amount2:any,amount3:any,amount4:any,userInput1:any,setUserInput1:any,other_token_name:any}): ReactElement {
	let amt3=amount3
	let amt4=amount4
	const {isActive} = useWeb3();
	const {balances} = useWallet();
	const {
		possibleOptionsFrom, actionParams, onUpdateSelectedOptionFrom, onChangeAmount,
		maxDepositPossible, isDepositing
	} = useActionFlow();
	const selectedFromBalance = useBalance(toAddress(actionParams?.selectedOptionFrom?.value));
	const selectedOptionFromPricePerToken = useTokenPrice(toAddress(actionParams?.selectedOptionFrom?.value));
	const hasMultipleInputsToChooseFrom = isActive && isDepositing && possibleOptionsFrom.length > 1;
	const selectedFromSymbol = actionParams?.selectedOptionFrom?.symbol || 'tokens';
	const selectedFromIcon = actionParams?.selectedOptionFrom?.icon;

	function renderMultipleOptionsFallback(): ReactElement {
		return (
			<Dropdown
				defaultOption={possibleOptionsFrom[0]}
				options={possibleOptionsFrom}
				selected={actionParams?.selectedOptionFrom}
				onSelect={onUpdateSelectedOptionFrom} />
		);
	}

	const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		onChangeAmount(
			handleInputChangeEventValue(
				e.target.value,
				balances?.[toAddress(actionParams?.selectedOptionFrom?.value)]?.decimals || 18
			)
		);
	}, [actionParams?.selectedOptionFrom?.value, balances, onChangeAmount]);
	let ramount1=amount2

	let first_part="Vault has"
	let usdc_name="USDC"
	let other_token_name_r=other_token_name
	if (isDepositing){
		ramount1=amount1

		first_part="Your wallet has"
	}
	return (
		<section
			id={isActive ? 'active' : 'not-active'}
			className={'flex w-full flex-col space-x-0 md:flex-row md:space-x-4'}>
			<div className={'relative z-10 w-full space-y-2'}>
				<div className={'flex flex-row items-baseline justify-between'}>
					<label className={'text-base text-neutral-600'}>
						{isDepositing ? 'From your wallet' : 'From vault'}
					</label>
					<legend className={'font-number inline text-xs text-neutral-600 md:hidden'} suppressHydrationWarning>
							{`${other_token_name} : ${formatAmount(ramount1)}`}
					</legend>
				</div>
				<Renderable
					shouldRender={!hasMultipleInputsToChooseFrom}
					fallback={renderMultipleOptionsFallback()}>
					<div className={'flex h-10 w-full items-center justify-between bg-neutral-300 px-2 text-base text-neutral-900 md:px-3'}>
						<div className={'relative flex flex-row items-center'}>
							<div className={'h-6 w-6 flex-none rounded-full'}>
								{selectedFromIcon}
							</div>
							<p className={'overflow-x-hidden text-ellipsis whitespace-nowrap pl-2 font-normal text-neutral-900 scrollbar-none'}>
								{other_token_name}
							</p>
						</div>
					</div>
				</Renderable>

				<legend className={'font-number hidden text-xs text-neutral-600 md:inline'} suppressHydrationWarning>
						{`${other_token_name} : ${formatAmount(ramount1)}`}
				</legend>
			</div> 
			<div className={'w-full space-y-2'}>
				<label
					htmlFor={'fromAmount'}
					className={'hidden text-base text-neutral-600 md:inline'}>
					{'Amount'}
				</label>
				<div className={'flex h-10 items-center bg-neutral-0 p-2'}>
					<div className={'flex h-10 w-full flex-row items-center justify-between px-0 py-4'}>
						<input
							id={'fromAmount'}
							className={`w-full overflow-x-scroll border-none bg-transparent px-0 py-4 font-bold outline-none scrollbar-none'}`}
							type={'text'}
							autoComplete={'off'}
							
							value={userInput1}

							onChange={(e) => setUserInput1(e.target.value)} />
						<button
							onClick={(): void => setUserInput1(ramount1)}
							className={'ml-2 cursor-pointer bg-neutral-900 px-2 py-1 text-xs text-neutral-0 transition-colors hover:bg-neutral-700'}>
							{'Max'}
						</button>
					</div>
				</div>

			</div>
		</section>
	);
}

export default VaultDetailsQuickActionsFrom;
