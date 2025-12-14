export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dialogProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'portal',
		type: 'string | PortalBond',
		default: "''",
		description: 'Portal'
	},
	{
		name: 'factory',
		type: '(props: DialogBondProps) => DialogBond',
		default: 'undefined',
		description: 'Factory'
	}
];

export const dialogContentProps: PropDefinition[] = [];

export const dialogHeaderProps: PropDefinition[] = [];

export const dialogBodyProps: PropDefinition[] = [];

export const dialogFooterProps: PropDefinition[] = [];

export const dialogTitleProps: PropDefinition[] = [];

export const dialogDescriptionProps: PropDefinition[] = [];

export const dialogCloseButtonProps: PropDefinition[] = [];
