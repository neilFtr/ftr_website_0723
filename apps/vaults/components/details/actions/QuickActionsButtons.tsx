import {useCallback, useEffect, useState} from 'react';
import {useAsync} from '@react-hookz/web';
import {useActionFlow} from '@vaults/contexts/useActionFlow';
import {useSolver} from '@vaults/contexts/useSolver';
import {useWalletForZap} from '@vaults/contexts/useWalletForZaps';
import {Button} from '@yearn-finance/web-lib/components/Button';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {MAX_UINT_256} from '@yearn-finance/web-lib/utils/constants';
import {toBigInt, toNormalizedBN} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {isEth} from '@yearn-finance/web-lib/utils/isEth';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';
import {defaultTxStatus} from '@yearn-finance/web-lib/utils/web3/transaction';
import {useWallet} from '@common/contexts/useWallet';
import {Solver} from '@common/schemas/yDaemonTokenListBalances';

import type {ReactElement} from 'react';
import type {TNormalizedBN} from '@yearn-finance/web-lib/utils/format.bigNumber';

function VaultDetailsQuickActionsButtons({button_message,button_is_clicked,is_busy}: {button_message:any,button_is_clicked:any,is_busy:any}): ReactElement {

		const {
		possibleOptionsFrom, actionParams, onUpdateSelectedOptionFrom, onChangeAmount,
		maxDepositPossible, isDepositing
		} = useActionFlow();

		let msgg="Redeem"
		if(isDepositing){
			msgg="Deposit"
		}
		if(button_message=="Create Account"){
			msgg="Create Account"
		}
		return (
			<Button
				className={'w-full'}
				isBusy={is_busy}

				onClick={(e:any) => button_is_clicked(isDepositing,e)}>
				{msgg}
			</Button>
		);


}

export default VaultDetailsQuickActionsButtons;
