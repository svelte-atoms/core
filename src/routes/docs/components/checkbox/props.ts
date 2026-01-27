export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const checkboxProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Value'
	},
	{
		name: 'group',
		type: 'string[] | undefined',
		default: '\'\'',
		description: 'Group'
	},
	{
		name: 'checked',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Checked'
	},
	{
		name: 'indeterminate',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Indeterminate'
	},
	{
		name: 'checkedContent',
		type: 'Component<{}, {}, string> | Snippet<[]> | undefined',
		default: '\'\'',
		description: 'Checked Content'
	},
	{
		name: 'indeterminateContent',
		type: 'Component<{}, {}, string> | Snippet<[]> | undefined',
		default: '\'\'',
		description: 'Indeterminate Content'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onclick',
		type: '((ev?: Event | undefined) => void) | undefined',
		default: 'undefined',
		description: 'Onclick'
	},
	{
		name: 'onchange',
		type: '((ev?: Event | undefined, options?: { checked: boolean; } | undefined) => void) | undefined',
		default: 'false',
		description: 'Onchange'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

