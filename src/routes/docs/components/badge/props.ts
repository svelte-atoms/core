export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const badgeProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];
