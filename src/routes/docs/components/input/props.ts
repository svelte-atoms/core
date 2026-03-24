export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const inputRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | number | string[] | null | undefined',
		default: "''",
		description: 'The current value of the input. Bind this prop for two-way value binding.'
	},
	{
		name: 'checked',
		type: 'boolean | undefined',
		default: 'false',
		description: 'The checked state for checkbox or radio input types.'
	},
	{
		name: 'files',
		type: 'File[] | null | undefined',
		default: 'undefined',
		description: 'The list of selected files for file input types. Bind to read file selections.'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Slot for composing Input.Control, Input.Icon, and Input.Placeholder sub-components inside the input root.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

export const inputControlProps: PropDefinition[] = [
	{
		name: 'type',
		type: 'string | undefined',
		default: "'text'",
		description: 'HTML input type (text, email, password, number, search, url, tel, etc.).'
	},
	{
		name: 'placeholder',
		type: 'string | undefined',
		default: 'undefined',
		description: 'Native placeholder text shown when the input is empty (alternative to Input.Placeholder).'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disables the input control, preventing user interaction.'
	},
	{
		name: 'readonly',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Makes the input read-only, allowing focus but not editing.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML input element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];