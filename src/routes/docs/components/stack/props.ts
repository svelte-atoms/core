export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const stackProps: PropDefinition[] = [
	{
		name: 'direction',
		type: "'row' | 'column'",
		default: 'undefined',
		description: 'Direction'
	},
	{
		name: 'gap',
		type: 'number | string',
		default: "''",
		description: 'Gap'
	},
	{
		name: 'align',
		type: "'start' | 'center' | 'end' | 'stretch'",
		default: 'undefined',
		description: 'Align'
	},
	{
		name: 'justify',
		type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
		default: 'undefined',
		description: 'Justify'
	}
];
