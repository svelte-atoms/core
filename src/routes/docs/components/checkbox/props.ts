export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const checkboxProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'group',
		type: 'string[]',
		default: "''",
		description: 'Group'
	},
	{
		name: 'checked',
		type: 'boolean',
		default: 'false',
		description: 'Checked'
	},
	{
		name: 'indeterminate',
		type: 'boolean',
		default: 'false',
		description: 'Indeterminate'
	},
	{
		name: 'checkedContent',
		type: 'Component | Snippet',
		default: 'undefined',
		description: 'Checked Content'
	},
	{
		name: 'indeterminateContent',
		type: 'Component | Snippet',
		default: 'undefined',
		description: 'Indeterminate Content'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onclick',
		type: '(ev?: Event) => void',
		default: 'undefined',
		description: 'Onclick'
	}
];
