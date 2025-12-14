export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const listRootProps: PropDefinition[] = [
	{
		name: 'ordered',
		type: 'boolean',
		default: 'false',
		description: 'Use ordered list (ol)'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];
