export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

const sharedProgressProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'number | null | undefined',
		default: 'null',
		description: 'Current progress value (0–max). Set to `null` for indeterminate state.'
	},
	{
		name: 'max',
		type: 'number',
		default: '100',
		description: 'Maximum value used to compute the percentage.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description:
			'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];

export const progressLinearProps: PropDefinition[] = sharedProgressProps;

export const progressCircularProps: PropDefinition[] = sharedProgressProps;
