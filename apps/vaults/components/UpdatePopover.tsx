import {Fragment} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {isSolverDisabled} from '@vaults/contexts/useSolver';
import Renderable from '@yearn-finance/web-lib/components/Renderable';
import IconLoader from '@yearn-finance/web-lib/icons/IconLoader';
import {useYearn} from '@common/contexts/useYearn';
import {Solver} from '@common/schemas/yDaemonTokenListBalances';

import type {ReactElement} from 'react';
import type {TSolver} from '@common/schemas/yDaemonTokenListBalances';

export default function UpdatePopover({button_is_clicked}: {button_is_clicked:any}): ReactElement {
	const {zapProvider, set_zapProvider, zapSlippage, set_zapSlippage} = useYearn();

	return (
		<Popover className={'relative flex'}  >
			{(): ReactElement => (
				<>
					<Popover.Button onClick={(e:any) => button_is_clicked("true",e)}>
						<span className={'sr-only'}>{'Settings'}</span>
						<IconLoader className={'transition-color h-4 w-4 text-neutral-400 hover:text-neutral-900'} />
					</Popover.Button>
					
				</>
			)}
		</Popover>
	);
}
