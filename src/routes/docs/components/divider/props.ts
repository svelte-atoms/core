export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dividerProps: PropDefinition[] = [
	{
		name: 'vertical',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Vertical'
	},
	{
		name: 'transparent',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Transparent'
	}
];
