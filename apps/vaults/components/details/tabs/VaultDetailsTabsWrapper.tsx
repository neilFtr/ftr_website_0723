import {Fragment, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {Listbox, Transition} from '@headlessui/react';
import {useIsMounted} from '@react-hookz/web';
import * as Sentry from '@sentry/nextjs';
import {VaultDetailsAbout} from '@vaults/components/details/tabs/VaultDetailsAbout';
import {VaultDetailsHistorical} from '@vaults/components/details/tabs/VaultDetailsHistorical';
import {VaultDetailsStrategies} from '@vaults/components/details/tabs/VaultDetailsStrategies';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {useSettings} from '@yearn-finance/web-lib/contexts/useSettings';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import IconAddToMetamask from '@yearn-finance/web-lib/icons/IconAddToMetamask';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {formatToNormalizedValue, toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {formatDate} from '@yearn-finance/web-lib/utils/format.time';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';
import {useFetch,useFetchFTR} from '@common/hooks/useFetch';
import IconChevron from '@common/icons/IconChevron';
import {yDaemonVaultHarvestsSchema} from '@common/schemas/yDaemonVaultsSchemas';
import {assert} from '@common/utils/assert';
import {useYDaemonBaseURI} from '@common/utils/getYDaemonBaseURI';

import type {ReactElement} from 'react';
import type {TYDaemonVault, TYDaemonVaultHarvests} from '@common/schemas/yDaemonVaultsSchemas';
import type {TSettingsForNetwork} from '@common/schemas/ySchemas';

type TTabsOptions = {
	value: number;
	label: string;
	slug?: string;
}
type TTabs = {
	selectedAboutTabIndex: number,
	set_selectedAboutTabIndex: (arg0: number) => void
}

type TExplorerLinkProps = {
	explorerBaseURI?: string;
	currentVaultAddress: string;
}

function Tabs({selectedAboutTabIndex, set_selectedAboutTabIndex}: TTabs): ReactElement {
	const router = useRouter();

	const tabs: TTabsOptions[] = useMemo((): TTabsOptions[] => [
		{value: 0, label: 'About', slug: 'about'},

	], []);

	useEffect((): void => {
		const tab = tabs.find((tab): boolean => tab.slug === router.query.tab);
		if (tab?.value) {
			set_selectedAboutTabIndex(tab?.value);
		}
	}, [router.query.tab, set_selectedAboutTabIndex, tabs]);

	return (
		<>
			<nav className={'hidden flex-row items-center space-x-10 md:flex'}>
				{tabs.map((tab): ReactElement => (
					<button
						key={`desktop-${tab.value}`}
						onClick={(): void => {
							router.replace(
								{
									query: {
										...router.query,
										tab: tab.slug
									}
								},
								undefined,
								{
									shallow: true
								}
							);
							set_selectedAboutTabIndex(tab.value);
						}}>
						<p
							title={tab.label}
							aria-selected={selectedAboutTabIndex === tab.value}
							className={'hover-fix tab'}>
							{tab.label}
						</p>
					</button>
				))}
			</nav>
			<div className={'relative z-50'}>
				<Listbox
					value={selectedAboutTabIndex}
					onChange={(value): void => set_selectedAboutTabIndex(value)}>
					{({open}): ReactElement => (
						<>
							<Listbox.Button
								className={'flex h-10 w-40 flex-row items-center border-0 border-b-2 border-neutral-900 bg-neutral-100 p-0 font-bold focus:border-neutral-900 md:hidden'}>
								<div className={'relative flex flex-row items-center'}>
									{tabs[selectedAboutTabIndex]?.label || 'Menu'}
								</div>
								<div className={'absolute right-0'}>
									<IconChevron
										className={`h-6 w-6 transition-transform ${open ? '-rotate-180' : 'rotate-0'}`} />
								</div>
							</Listbox.Button>
							<Transition
								as={Fragment}
								show={open}
								enter={'transition duration-100 ease-out'}
								enterFrom={'transform scale-95 opacity-0'}
								enterTo={'transform scale-100 opacity-100'}
								leave={'transition duration-75 ease-out'}
								leaveFrom={'transform scale-100 opacity-100'}
								leaveTo={'transform scale-95 opacity-0'}>
								<Listbox.Options className={'yearn--listbox-menu'}>
									{tabs.map((tab): ReactElement => (
										<Listbox.Option
											className={'yearn--listbox-menu-item'}
											key={tab.value}
											value={tab.value}>
											{tab.label}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</>
					)}
				</Listbox>
			</div>
		</>
	);
}

function ExplorerLink({explorerBaseURI, currentVaultAddress}: TExplorerLinkProps): ReactElement | null {
	const isMounted = useIsMounted();

	if (!explorerBaseURI || !isMounted()) {
		return null;
	}

	return (
		<a
			href={`${explorerBaseURI}/address/${currentVaultAddress}`}
			target={'_blank'}
			rel={'noopener noreferrer'}>
			<span className={'sr-only'}>{'Open in explorer'}</span>
			<IconLinkOut className={'h-5 w-5 cursor-alias text-neutral-600 transition-colors hover:text-neutral-900 md:h-6 md:w-6'} />
		</a>
	);
}

function VaultDetailsTabsWrapper({currentVault}: {currentVault: TYDaemonVault}): ReactElement {
	const {provider} = useWeb3();
	const {safeChainID} = useChainID();
	const {networks} = useSettings();
	const {yDaemonBaseUri} = useYDaemonBaseURI({chainID: safeChainID});
	const [selectedAboutTabIndex, set_selectedAboutTabIndex] = useState(0);
	const networkSettings = useMemo((): TSettingsForNetwork => networks[safeChainID], [networks, safeChainID]);

	async function onAddTokenToMetamask(address: string, symbol: string, decimals: number, image: string): Promise<void> {
		try {
			assert(provider, 'Provider is not set');
			const walletClient = await provider.getWalletClient();
			await walletClient.watchAsset({
				type: 'ERC20',
				options: {
					address: toAddress(address),
					decimals: decimals,
					symbol: symbol,
					image: image
				}
			});
		} catch (error) {
			Sentry.captureException(error);
			// Token has not been added to MetaMask.
		}
	}



	let urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=zeta_drift_strat_histo_30"
	let columnnnn="2"
	if(currentVault.ftr_pool_id=="hehe3"){
		columnnnn="3"
		urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=onchain_orca_histo_7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"
	}

	if(currentVault.ftr_pool_id=="E9EvbGFjrxDP6FQeXEJ88c9jNsJZkbdt5AhEZJaaYLGt"){
		columnnnn="2"
		urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=hyperliquid_opndx_funding_strat_30"
	}

	if(currentVault.ftr_pool_id=="hehe5"){
	columnnnn="2"
	urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=market_maker_drift_parasite_bigpic_30"
}

	if(currentVault.ftr_pool_id=="hehe6"){
	columnnnn="2"
	urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=market_maker_parasite_bigpic_30"
}


	if(currentVault.ftr_pool_id=="hehe7"){
	columnnnn="2"
	urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=directional_30"
}


	if(currentVault.ftr_pool_id=="Dfmta2YikW8yGhYgW7GNYaqjBBkZWDEWjpjNwwPk3g9Q"){
	columnnnn="2"
	urrl="https://www.stratcoins.io/maj_datas_ftr_histo_perf.php?input=semi_fr_30"
}

	console.log("URL DATA ",urrl)
	let {data: ftr_data_chart} = useFetchFTR<any>({
			endpoint: urrl,
		});


	const example_obj = {
	  name: 'Bobby Hadz',
	  country: 0,
	};

	function	FdateFTR(value: number): string {

	let	formatedDate = (new Intl.DateTimeFormat([navigator.language, 'en-US'], {
			month: 'numeric',
			day: 'numeric'
		}).format(value));
	return formatedDate
	}
	var actual_data=[{name:FdateFTR(1689340107),value:100}]



	if (ftr_data_chart){
		actual_data=[]
		let all_names=Object.getOwnPropertyNames(ftr_data_chart)
		for (let an=0;an<all_names.length;an++){
			actual_data.push({name:FdateFTR(Number(ftr_data_chart[String(an) as any]["0"])*1000),value:Number(ftr_data_chart[String(an) as any][columnnnn])})
		}
	}

	const {data: yDaemonHarvestsData} = useFetch<TYDaemonVaultHarvests>({
		endpoint: `${yDaemonBaseUri}/vaults/harvests/${currentVault.address}`,
		schema: yDaemonVaultHarvestsSchema
	});

	const harvestData = useMemo((): { name: string; value: number }[] => {
		const _yDaemonHarvestsData = [...(yDaemonHarvestsData || [])].reverse();

		let rnew=_yDaemonHarvestsData.map((harvest): { name: string; value: number } => ({
				name: formatDate(Number(harvest.timestamp) * 1000),
				value: formatToNormalizedValue(toBigInt(harvest.profit) - toBigInt(harvest.loss), currentVault.decimals)
			}))





		return (actual_data
		);
	}, [currentVault.decimals, yDaemonHarvestsData]);

	return (
		<div aria-label={'Vault Details'} className={'col-span-12 mb-4 flex flex-col bg-neutral-100'}>
			<div className={'relative flex w-full flex-row items-center justify-between px-4 pt-4 md:px-8'}>
				<Tabs
					selectedAboutTabIndex={selectedAboutTabIndex}
					set_selectedAboutTabIndex={set_selectedAboutTabIndex} />


			</div>

			<div className={'-mt-0.5 h-0.5 w-full bg-neutral-300'} />

			<Renderable shouldRender={currentVault && isZero(selectedAboutTabIndex)}>
				<VaultDetailsAbout
					currentVault={currentVault}
					harvestData={harvestData} />
			</Renderable>

			<Renderable shouldRender={currentVault && selectedAboutTabIndex === 1}>

			</Renderable>

			<Renderable shouldRender={currentVault && selectedAboutTabIndex === 2}>
				<VaultDetailsHistorical
					currentVault={currentVault}
					harvestData={harvestData} />
			</Renderable>

		</div>
	);
}

export {VaultDetailsTabsWrapper};
