export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const accordionItemRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'data',
		type: 'any',
		default: 'undefined',
		description: 'Data'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'factory',
		type: 'Factory<AccordionItemBond>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const accordionItemHeaderProps: PropDefinition[] = [];

export const accordionItemBodyProps: PropDefinition[] = [];

export const accordionItemIndicatorProps: PropDefinition[] = [];

export const accordionRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'values',
		type: 'string[]',
		default: "''",
		description: 'Values'
	},
	{
		name: 'data',
		type: 'unknown',
		default: 'undefined',
		description: 'Data'
	},
	{
		name: 'multiple',
		type: 'boolean',
		default: 'false',
		description: 'Multiple'
	},
	{
		name: 'collapsible',
		type: 'boolean',
		default: 'false',
		description: 'Collapsible'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'factory',
		type: 'Factory<AccordionBond>',
		default: 'undefined',
		description: 'Factory'
	}
];
