export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const radioProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'T',
		default: 'undefined',
		description: 'The value of the radio button'
	},
	{
		name: 'group',
		type: 'T',
		default: 'undefined',
		description: 'The currently selected value (for standalone radios)'
	},
	{
		name: 'id',
		type: 'string',
		default: "''",
		description: 'The id attribute of the radio input'
	},
	{
		name: 'name',
		type: 'string',
		default: "''",
		description: 'The name attribute of the radio input'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Whether the radio button is disabled'
	},
	{
		name: 'required',
		type: 'boolean',
		default: 'false',
		description: 'Whether the radio button is required'
	},
	{
		name: 'readonly',
		type: 'boolean',
		default: 'false',
		description: 'Whether the radio button is readonly'
	},
	{
		name: 'checkedContent',
		type: 'Component | Snippet',
		default: 'undefined',
		description: 'Custom content to display when the radio is checked'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Child content (label text)'
	},
	{
		name: 'onchange',
		type: '(ev: Event, options?: { checked: boolean',
		default: 'false',
		description: 'Change event handler'
	},
	{
		name: 'bond',
		type: 'Bond',
		default: 'undefined',
		description: 'Bond object for component communication'
	},
	{
		name: 'base',
		type: 'Component | Snippet',
		default: 'undefined',
		description: 'Base component or snippet to render'
	},
	{
		name: 'preset',
		type: 'PresetModuleName | string',
		default: 'undefined',
		description: 'Preset module name for styling'
	},
	{
		name: 'variants',
		type: 'VariantDefinition | Function',
		default: 'undefined',
		description: 'Variant definition or function to resolve variants'
	},
	{
		name: 'class',
		type: 'ClassValue | ClassValue[]',
		default: 'undefined',
		description: 'CSS class(es) to apply to the element'
	},
	{
		name: 'as',
		type: 'string',
		default: 'undefined',
		description: 'HTML tag to render as'
	},
	{
		name: 'global',
		type: 'boolean',
		default: 'false',
		description: 'Whether to use global styles'
	},
	{
		name: 'initial',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called on initial render'
	},
	{
		name: 'enter',
		type: 'TransitionFunction',
		default: 'undefined',
		description: 'Transition function for entering'
	},
	{
		name: 'exit',
		type: 'TransitionFunction',
		default: 'undefined',
		description: 'Transition function for exiting'
	},
	{
		name: 'animate',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Animation function'
	},
	{
		name: 'onmount',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called when element is mounted'
	},
	{
		name: 'ondestroy',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called when element is destroyed'
	}
];

export const radioGroupProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'T',
		default: 'undefined',
		description: 'The currently selected value'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Whether all radio buttons in the group are disabled'
	},
	{
		name: 'required',
		type: 'boolean',
		default: 'false',
		description: 'Whether all radio buttons in the group are required'
	},
	{
		name: 'readonly',
		type: 'boolean',
		default: 'false',
		description: 'Whether all radio buttons in the group are readonly'
	},
	{
		name: 'name',
		type: 'string',
		default: "''",
		description: 'The name attribute shared by all radio buttons in the group'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Child content (radio buttons)'
	},
	{
		name: 'bond',
		type: 'Bond',
		default: 'undefined',
		description: 'Bond object for component communication'
	},
	{
		name: 'base',
		type: 'Component | Snippet',
		default: 'undefined',
		description: 'Base component or snippet to render'
	},
	{
		name: 'preset',
		type: 'PresetModuleName | string',
		default: 'undefined',
		description: 'Preset module name for styling'
	},
	{
		name: 'variants',
		type: 'VariantDefinition | Function',
		default: 'undefined',
		description: 'Variant definition or function to resolve variants'
	},
	{
		name: 'class',
		type: 'ClassValue | ClassValue[]',
		default: 'undefined',
		description: 'CSS class(es) to apply to the element'
	},
	{
		name: 'as',
		type: 'string',
		default: 'undefined',
		description: 'HTML tag to render as'
	},
	{
		name: 'global',
		type: 'boolean',
		default: 'false',
		description: 'Whether to use global styles'
	},
	{
		name: 'initial',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called on initial render'
	},
	{
		name: 'enter',
		type: 'TransitionFunction',
		default: 'undefined',
		description: 'Transition function for entering'
	},
	{
		name: 'exit',
		type: 'TransitionFunction',
		default: 'undefined',
		description: 'Transition function for exiting'
	},
	{
		name: 'animate',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Animation function'
	},
	{
		name: 'onmount',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called when element is mounted'
	},
	{
		name: 'ondestroy',
		type: 'NodeFunction',
		default: 'undefined',
		description: 'Function called when element is destroyed'
	}
];
