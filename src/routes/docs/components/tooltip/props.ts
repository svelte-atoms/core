export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const tooltipTriggerProps: PropDefinition[] = [
	{
		name: 'content',
		type: 'string | Snippet<[]> | undefined',
		default: 'undefined',
		description: 'The tooltip content to display. Can be a plain string or a Snippet for rich content.'
	},
	{
		name: 'placement',
		type: '"top" | "bottom" | "left" | "right" | undefined',
		default: '"top"',
		description: 'Where the tooltip appears relative to the trigger element.'
	},
	{
		name: 'delay',
		type: 'number | undefined',
		default: '0',
		description: 'Delay in milliseconds before the tooltip appears after hover.'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'The trigger element that the tooltip is attached to.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];
