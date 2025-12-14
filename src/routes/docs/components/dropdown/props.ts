export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dropdownRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'value',
		type: 'T',
		default: 'undefined',
		description: 'Value'
	},
	{
		name: 'values',
		type: 'T[]',
		default: 'undefined',
		description: 'Values'
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
		name: 'keys',
		type: 'string[]',
		default: "''",
		description: 'Keys'
	},
	{
		name: 'factory',
		type: 'Factory<DropdownBond>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const dropdownTriggerProps: PropDefinition[] = [];
