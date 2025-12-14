export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dividerProps: PropDefinition[] = [
	{
		name: 'vertical',
		type: 'boolean',
		default: 'false',
		description: 'Vertical'
	},
	{
		name: 'transparent',
		type: 'boolean',
		default: 'false',
		description: 'Transparent'
	}
];
