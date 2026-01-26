export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const tabsRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'D | undefined',
		default: 'undefined',
		description: 'Active tab value'
	},
	{
		name: 'factory',
		type: 'Factory<TabsBond<unknown>> | undefined',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'children',
		type: 'Snippet<[{ tabs: TabsBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onchange',
		type: '((value: D) => void) | undefined',
		default: 'undefined',
		description: 'Onchange'
	}
];

export const tabHeaderProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tab?: TabBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onpointerdown',
		type: '((ev: PointerEvent, context: { tab?: TabBond<unknown>; }) => void) | undefined',
		default: 'undefined',
		description: 'Onpointerdown'
	}
];

export const tabBodyProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tab?: TabBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const tabDescriptionProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tab?: TabBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const tabsHeaderProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tabs?: TabsBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const tabsBodyProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tabs?: TabsBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const tabsContentProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tabs?: TabsBond<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];
