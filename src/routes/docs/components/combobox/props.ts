export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const comboboxRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'value',
		type: 'unknown',
		default: 'undefined',
		description: 'Value'
	},
	{
		name: 'values',
		type: 'unknown[]',
		default: 'undefined',
		description: 'Values'
	},
	{
		name: 'text',
		type: 'string',
		default: '\'\'',
		description: 'Text'
	},
	{
		name: 'texts',
		type: 'string[]',
		default: '\'\'',
		description: 'Texts'
	},
	{
		name: 'multiple',
		type: 'boolean',
		default: 'false',
		description: 'Multiple'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'placements',
		type: 'string[]',
		default: '\'\'',
		description: 'Placements'
	},
	{
		name: 'placement',
		type: 'string',
		default: '\'\'',
		description: 'Placement'
	},
	{
		name: 'offset',
		type: 'number',
		default: '0',
		description: 'Offset'
	},
	{
		name: 'factory',
		type: 'Factory<ComboboxBond>',
		default: 'undefined',
		description: 'Factory'
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
	},
	{
		name: 'children',
		type: 'Snippet',
		default: 'undefined',
		description: 'Children content snippet'
	},
];

export const comboboxSelectionsProps: PropDefinition[] = [
];

export const comboboxSelectionProps: PropDefinition[] = [
];

export const comboboxControlProps: PropDefinition[] = [
];

