export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const radioProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The value of the radio button'
	},
	{
		name: 'group',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The currently selected value (for standalone radios)'
	},
	{
		name: 'id',
		type: 'string | undefined',
		default: "''",
		description: 'The id attribute of the radio input'
	},
	{
		name: 'name',
		type: 'string | undefined',
		default: "''",
		description: 'The name attribute of the radio input'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether the radio button is disabled'
	},
	{
		name: 'required',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether the radio button is required'
	},
	{
		name: 'readonly',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether the radio button is readonly'
	},
	{
		name: 'checkedContent',
		type: 'Component<{}, {}, string> | Snippet<[]> | undefined',
		default: "''",
		description: 'Custom content to display when the radio is checked'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Child content (label text)'
	},
	{
		name: 'onchange',
		type: '((ev: Event, options?: { checked: boolean; value: boolean; type: "boolean"; } | undefined) => void) | undefined',
		default: 'false',
		description: 'Change event handler'
	},
	{
		name: 'oninput',
		type: '((ev: Event, options?: { checked: boolean; value: boolean; type: "boolean"; } | undefined) => void) | undefined',
		default: 'false',
		description: 'Input event handler'
	}
];

export const radioGroupProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The currently selected value'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether all radio buttons in the group are disabled'
	},
	{
		name: 'required',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether all radio buttons in the group are required'
	},
	{
		name: 'readonly',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether all radio buttons in the group are readonly'
	},
	{
		name: 'name',
		type: 'string | undefined',
		default: "''",
		description: 'The name attribute shared by all radio buttons in the group'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Child content (radio buttons)'
	},
	{
		name: 'oninput',
		type: '((ev: CustomEvent<any>, options?: { value: T; } | undefined) => void) | undefined',
		default: 'undefined',
		description: 'Input event handler triggered when the selected value changes'
	}
];
