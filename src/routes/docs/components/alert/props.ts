export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const alertRootProps: PropDefinition[] = [
	{
		name: 'dismissible',
		type: 'boolean',
		default: 'false',
		description: 'Dismissible'
	},
	{
		name: 'dismissed',
		type: 'boolean',
		default: 'false',
		description: 'Dismissed'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'extend',
		type: 'Record<string, unknown>',
		default: "''",
		description: 'Extend'
	},
	{
		name: 'factory',
		type: 'Factory<AlertBond>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const alertContentProps: PropDefinition[] = [];

export const alertTitleProps: PropDefinition[] = [];

export const alertDescriptionProps: PropDefinition[] = [];

export const alertIconProps: PropDefinition[] = [];

export const alertActionsProps: PropDefinition[] = [];

export const alertCloseButtonProps: PropDefinition[] = [];
