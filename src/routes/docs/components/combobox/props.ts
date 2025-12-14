export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const comboboxRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'value',
		type: 'unknown',
		default: 'undefined',
		description: 'Value'
	},
	{
		name: 'values',
		type: 'unknown[]',
		default: 'undefined',
		description: 'Values'
	},
	{
		name: 'query',
		type: 'string',
		default: "''",
		description: 'Query'
	},
	{
		name: 'text',
		type: 'string',
		default: "''",
		description: 'Text'
	},
	{
		name: 'multiple',
		type: 'boolean',
		default: 'false',
		description: 'Multiple'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'placements',
		type: 'string[]',
		default: "''",
		description: 'Placements'
	},
	{
		name: 'placement',
		type: 'string',
		default: "''",
		description: 'Placement'
	},
	{
		name: 'offset',
		type: 'number',
		default: '0',
		description: 'Offset'
	},
	{
		name: 'factory',
		type: 'Factory<ComboboxBond>',
		default: 'undefined',
		description: 'Factory'
	}
];
