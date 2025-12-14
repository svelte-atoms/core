export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const labelProps: PropDefinition[] = [
	{
		name: 'for',
		type: 'string | null',
		default: "''",
		description: 'For'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Children'
	}
];
