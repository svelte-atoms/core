export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const stackProps: PropDefinition[] = [
	{
		name: 'direction',
		type: '"row" | "column" | undefined',
		default: 'undefined',
		description: 'Direction'
	},
	{
		name: 'gap',
		type: 'string | number | undefined',
		default: '\'\'',
		description: 'Gap'
	},
	{
		name: 'align',
		type: '"start" | "center" | "end" | "stretch" | undefined',
		default: 'undefined',
		description: 'Align'
	},
	{
		name: 'justify',
		type: '"start" | "center" | "end" | "between" | "around" | "evenly" | undefined',
		default: 'undefined',
		description: 'Justify'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

