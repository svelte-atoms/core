export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dropdownItemProps: PropDefinition[] = [
	{
		name: 'preset',
		type: 'string',
		default: '\'dropdown.item\'',
		description: 'Preset key for styling'
	},
	{
		name: 'value',
		type: 'string',
		default: 'nanoid()',
		description: 'The value of the dropdown item'
	},
	{
		name: 'data',
		type: 'T',
		default: 'undefined',
		description: 'Custom data associated with the item'
	},
	{
		name: 'factory',
		type: '() => DropdownItemController<T>',
		default: 'undefined',
		description: 'Factory function to create a custom DropdownItemController instance'
	},
];

export const dropdownRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'value',
		type: 'T',
		default: 'undefined',
		description: 'Value'
	},
	{
		name: 'values',
		type: 'T[]',
		default: 'undefined',
		description: 'Values'
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
		name: 'keys',
		type: 'string[]',
		default: '\'\'',
		description: 'Keys'
	},
	{
		name: 'factory',
		type: 'Factory<DropdownBond>',
		default: 'undefined',
		description: 'Factory'
	},
];

export const dropdownTriggerProps: PropDefinition[] = [
];

export const dropdownSelectionsProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue',
		default: 'undefined',
		description: 'Class'
	},
	{
		name: 'Selection',
		type: 'Component | undefined',
		default: 'undefined',
		description: 'Selection'
	},
	{
		name: 'selections',
		type: 'DropdownSelection[]',
		default: '-',
		description: 'Selections'
	},
	{
		name: 'selection',
		type: 'DropdownSelection | undefined',
		default: 'undefined',
		description: 'Selection'
	},
];

export const dropdownSelectionProps: PropDefinition[] = [
	{
		name: 'selection',
		type: 'DropdownSelection',
		default: '-',
		description: 'Selection'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onclose',
		type: '(event: Event) => void',
		default: 'undefined',
		description: 'Onclose'
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
];

export const dropdownQueryProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: '\'\'',
		description: 'Value'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: 'undefined',
		description: 'Children'
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
];

