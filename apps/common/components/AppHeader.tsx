import {cloneElement, Fragment, useMemo, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {AnimatePresence} from 'framer-motion';
import {Popover, Transition} from '@headlessui/react';
import {useIsMounted} from '@react-hookz/web';
import {VaultsHeader} from '@vaults/components/header/VaultsHeader';
import {VeYfiHeader} from '@veYFI/components/header/VeYfiHeader';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import BalanceReminderPopover from '@common/components/BalanceReminderPopover';
import {useMenu} from '@common/contexts/useMenu';
import LogoYearn from '@common/icons/LogoYearn';
import {YBalHeader} from '@yBal/components/header/YBalHeader';
import {YBribeHeader} from '@yBribe/components/header/YBribeHeader';
import {YCrvHeader} from '@yCRV/components/header/YCrvHeader';
import Image from 'next/image'
import {AppName, APPS} from './Apps';
import Header from './Header';
import {MotionDiv} from './MotionDiv';

import type {ReactElement} from 'react';
import type {TMenu} from '@yearn-finance/web-lib/components/Header';

function Logo(): ReactElement {
	const {pathname} = useRouter();

	return (
		<>
			<YCrvHeader pathname={pathname} />
			<YBalHeader pathname={pathname} />
			<VaultsHeader pathname={pathname} />
			<VeYfiHeader pathname={pathname} />
			<YBribeHeader pathname={pathname} />
			<MotionDiv name={'yearn'} animate={pathname === '/' ? 'enter' : 'exit'}>
				<LogoYearn
					className={'h-8 w-8'}
					back={'text-neutral-900'}
					front={'text-neutral-0'} />
			</MotionDiv>
		</>
	);

}

function LogoPopover(): ReactElement {
	const [isShowing, set_isShowing] = useState(false);

	return (
		<Popover
			onMouseEnter={(): void => set_isShowing(true)}
			onMouseLeave={(): void => set_isShowing(false)}
			className={'relative'}>
			<Popover.Button className={'flex items-center'}>
				<Link href={'/'}>
					<span className={'sr-only'}>{'Back to home'}</span>
					<Image src="/logo192.png" alt="me" width="64" height="64" />
				</Link>
			</Popover.Button>
			<Transition
				as={Fragment}
				show={isShowing}
				enter={'transition ease-out duration-200'}
				enterFrom={'opacity-0 translate-y-1'}
				enterTo={'opacity-100 translate-y-0'}
				leave={'transition ease-in duration-150'}
				leaveFrom={'opacity-100 translate-y-0'}
				leaveTo={'opacity-0 translate-y-1'}>
				<Popover.Panel className={'absolute left-1/2 z-10 mt-6 w-80 -translate-x-1/2 px-4 pt-4 sm:px-0 md:w-96'}>
					<div >

					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

export function AppHeader(): ReactElement {
	const isMounted = useIsMounted();
	const {pathname} = useRouter();
	const {isActive} = useWeb3();
	const {onOpenMenu} = useMenu();
	const menu = useMemo((): TMenu[] => {
		const HOME_MENU = {path: '/', label: 'Home'};

		return [
			HOME_MENU,
			{path: 'https://twitter.com/ftr_finance', label: 'Twitter', target: '_blank'},

		];
	}, [pathname]);


	const supportedNetworks = useMemo((): number[] => {
		const ethereumOnlyPaths = ['/ycrv', '/ybal', '/veyfi', '/ybribe'];
		if (ethereumOnlyPaths.some((path): boolean => pathname.startsWith(path))) {
			return [1];
		}

		return [1, 10, 250, 42161];
	}, [pathname]);

	return (
		<Header
			linkComponent={<Link href={''} />}
			currentPathName={pathname}
			onOpenMenuMobile={onOpenMenu}
			nav={menu}
			supportedNetworks={supportedNetworks}
			logo={(
				<AnimatePresence mode={'wait'}>
					<LogoPopover />
				</AnimatePresence>
			)}
			extra={
				<Renderable shouldRender={isActive && isMounted()}>
					<div className={'ml-4'}>
						<BalanceReminderPopover />
					</div>
				</Renderable>
			} />
	);
}
