import type {ReactElement} from 'react';

function LogoYearn(props: React.SVGProps<SVGSVGElement> & {back?: string, front?: string}): ReactElement {
	return (
		<svg
			{...props}
			width={'32'}
			height={'32'}
			viewBox={'0 0 32 32'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<circle
				cx={'16'}
				cy={'16'}
				r={'16'}
				fill={'currentColor'}
				className={props?.back || 'text-neutral-900'}/>

		</svg>
	);
}

export default LogoYearn;

