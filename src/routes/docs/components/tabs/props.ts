export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const tabsRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Active tab value'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];

export const tabProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Tab identifier'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disable tab'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];

export const tabsBodyProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Content identifier matching Tab value'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];
