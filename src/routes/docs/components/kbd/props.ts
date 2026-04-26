export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const kbdProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'The key label to render inside the kbd element.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description:
			'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];

export const shortcutProps: PropDefinition[] = [
	{
		name: 'keys',
		type: 'string[]',
		default: '[]',
		description: "Array of keys to render in sequence, e.g. ['⌘', 'K'] or ['Ctrl', 'Shift', 'P']."
	},
	{
		name: 'separator',
		type: 'string',
		default: "'+'",
		description: 'Visual separator rendered between keys.'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Custom content — when provided, keys and separator are ignored.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description:
			'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];
