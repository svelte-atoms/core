export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const slideoverRootProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ drawer: DrawerBond }]>',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'initial',
		type: '(node: HTMLElement, bond: DrawerBond) => void',
		default: 'undefined',
		description: 'Initial'
	},
	{
		name: 'enter',
		type: "(node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>",
		default: 'undefined',
		description: 'Enter'
	},
	{
		name: 'exit',
		type: "(node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>",
		default: 'undefined',
		description: 'Exit'
	},
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
		name: 'onclose',
		type: '(event: Event, bond: DrawerBond) => void',
		default: 'undefined',
		description: 'Onclose'
	},
	{
		name: 'factory',
		type: 'Factory<DrawerBond>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const slideoverContentProps: PropDefinition[] = [];

export const slideoverHeaderProps: PropDefinition[] = [];

export const drawerBodyProps: PropDefinition[] = [];

export const slideoverFooterProps: PropDefinition[] = [];

export const slideoverTitleProps: PropDefinition[] = [];

export const slideoverDescriptionProps: PropDefinition[] = [];

export const slideoverBackdropProps: PropDefinition[] = [];
