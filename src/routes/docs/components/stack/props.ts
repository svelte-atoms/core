export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const stackRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | undefined',
		default: 'undefined',
		description: 'The id of the topmost (front) item. Bindable — updates reactively as items are reordered.'
	},
	{
		name: 'factory',
		type: 'Factory<StackBond> | undefined',
		default: 'undefined',
		description: 'Custom bond factory for advanced use cases such as injecting a pre-configured StackBond.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];

export const stackItemProps: PropDefinition[] = [
	{
		name: 'id',
		type: 'string',
		default: 'auto-generated',
		description: 'Unique identifier for this item within the stack. Used to reference it when calling bringToFront, sendToBack, etc. Auto-generated via $props.id() if omitted.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];
