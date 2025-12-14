export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const cardRootProps: PropDefinition[] = [
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'factory',
		type: 'Factory<CardBond>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const cardHeaderProps: PropDefinition[] = [];

export const cardBodyProps: PropDefinition[] = [];

export const cardFooterProps: PropDefinition[] = [];

export const cardTitleProps: PropDefinition[] = [];

export const cardSubtitleProps: PropDefinition[] = [];

export const cardDescriptionProps: PropDefinition[] = [];

export const cardMediaProps: PropDefinition[] = [];
