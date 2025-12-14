export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const collapsibleRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Control the open state'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disable interaction'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];
