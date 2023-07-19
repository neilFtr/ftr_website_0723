import React, {Fragment, memo,useMemo} from 'react';
import localFont from 'next/font/local';
import useSWR from 'swr';
import {AnimatePresence, domAnimation, LazyMotion, motion} from 'framer-motion';
import {useIsMounted, useLocalStorageValue, useUpdateEffect} from '@react-hookz/web';
import {WithYearn} from '@yearn-finance/web-lib/contexts/WithYearn';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {baseFetcher} from '@yearn-finance/web-lib/utils/fetchers';
import {AppHeader} from '@common/components/AppHeader';
import Meta from '@common/components/Meta';
import {Popover} from '@common/components/Popover';
import {MenuContextApp} from '@common/contexts/useMenu';
import {WalletContextApp} from '@common/contexts/useWallet';
import {YearnContextApp} from '@common/contexts/useYearn';
import {useCurrentApp} from '@common/hooks/useCurrentApp';
import IconSpinner from '@common/icons/IconSpinner';
import {variants} from '@common/utils/animations';
import {useYDaemonBaseURI} from '@common/utils/getYDaemonBaseURI';
import config from '@common/utils/wagmiConfig';
import dynamic from 'next/dynamic';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter,BackpackWalletAdapter,SolflareWalletAdapter,Coin98WalletAdapter,TrustWalletAdapter } from '@solana/wallet-adapter-wallets';
import toast, { Toaster } from 'react-hot-toast';


import { clusterApiUrl } from '@solana/web3.js';

import type { FC } from 'react';

import "./walletui.css";



import type {NextComponentType} from 'next';
import type {AppProps} from 'next/app';
import type {NextRouter} from 'next/router';
import type {ReactElement} from 'react';

import '../style.css';


// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');



const aeonik = localFont({
	variable: '--font-aeonik',
	display: 'swap',
	src: [
		{
			path: '../public/fonts/Aeonik-Regular.woff2',
			weight: '400',
			style: 'normal'
		}, {
			path: '../public/fonts/Aeonik-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	]
});


const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
    { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);


type TGetLayout = NextComponentType & {getLayout: (p: ReactElement, router: NextRouter) => ReactElement}
const WithLayout = memo(function WithLayout(props: AppProps): ReactElement {
	const {Component, pageProps, router} = props;
	const getLayout = (Component as TGetLayout).getLayout || ((page: ReactElement): ReactElement => page);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {value} = useLocalStorageValue<boolean>('yearn.finance/feedback-popover');
	const {name} = useCurrentApp(router);

	return (
		<div id={'app'} className={'mx-auto mb-0 flex max-w-6xl font-aeonik'}>
			<div className={'block min-h-[100vh] w-full'}>

				<AppHeader />

				<LazyMotion features={domAnimation}>
					<AnimatePresence mode={'wait'}>
						<motion.div
							key={name}
							initial={'initial'}
							animate={'enter'}
							exit={'exit'}
							className={'my-0 h-full md:mb-0 md:mt-16'}
							variants={variants}>
							{getLayout(<Component router={props.router} {...pageProps} />, router)}
							
						</motion.div>
					</AnimatePresence>
				</LazyMotion>
			</div>
		</div>
	);
});

function NetworkStatusIndicator(): ReactElement {
	type TStatus = 'Not Started' | 'Loading' | 'OK'
	const {safeChainID} = useChainID();
	const isMounted = useIsMounted();
	const {yDaemonBaseUri} = useYDaemonBaseURI({chainID: safeChainID});
	const {data: status, mutate} = useSWR<TStatus>(
		`${yDaemonBaseUri}/status`,
		baseFetcher,
		{revalidateOnFocus: true, revalidateOnReconnect: true, revalidateOnMount: true}
	);

	useUpdateEffect((): void => {
		mutate();
	}, [safeChainID]);

	if (!isMounted) {
		return <Fragment />;
	}
	if (status === 'OK') {
		return <Fragment />;
	}
	if (!status) {
		return <Fragment />;
	}

	return (
		<div className={'fixed inset-x-0 bottom-0 flex items-center justify-center space-x-2 bg-yearn-blue py-2 text-center text-sm text-white'}>
			<IconSpinner className={'h-3 w-3'} />
			<b>
				{'We are restarting our server. Data may be inaccurate for a few minutes.'}
			</b>
		</div>
	);
}











const App = memo(function App(props: AppProps): ReactElement {
	const {Component, pageProps, router} = props;
	const {manifest} = useCurrentApp(router);












    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */

            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
            new Coin98WalletAdapter(),
            new TrustWalletAdapter()
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );


	return (
		<MenuContextApp>
			<YearnContextApp>
				 <ConnectionProvider endpoint={endpoint}>
		            <WalletProvider wallets={wallets} autoConnect>
		                <WalletModalProvider>
							<Fragment>
								<Meta meta={manifest} />
								<WithLayout
									Component={Component}
									pageProps={pageProps}
									router={props.router} />
								<NetworkStatusIndicator />
							</Fragment>
				        </WalletModalProvider>
		            </WalletProvider>
		        </ConnectionProvider>
			</YearnContextApp>
		</MenuContextApp>
	);
});


function MyApp(props: AppProps): ReactElement {
	return (
		<main id={'main'} className={aeonik.className}>
			<WithYearn
				configOverwrite={config}
				options={{
					web3: {
						supportedChainID: [1, 10, 250, 42161, 1337]
					},
					baseSettings: {
						yDaemonBaseURI: process.env.YDAEMON_BASE_URI as string
					},
					ui: {
						shouldUseThemes: false
					}
				}}>
				<App {...props} />
			</WithYearn>
		</main>
	);
}

export default MyApp;
