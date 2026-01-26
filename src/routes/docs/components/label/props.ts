export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const labelProps: PropDefinition[] = [
	{
		name: 'for',
		type: 'string | null | undefined',
		default: "''",
		description: 'For'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];
