export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const popoverRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Open'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'placements',
		type: 'Placement[] | undefined',
		default: 'undefined',
		description: 'Placements'
	},
	{
		name: 'placement',
		type: 'Placement | undefined',
		default: 'undefined',
		description: 'Placement'
	},
	{
		name: 'offset',
		type: 'number | undefined',
		default: '0',
		description: 'Offset'
	},
	{
		name: 'portal',
		type: 'string | PortalBond | undefined',
		default: "''",
		description: 'Portal'
	},
	{
		name: 'extend',
		type: 'Record<string, unknown> | undefined',
		default: "''",
		description: 'Extend'
	},
	{
		name: 'factory',
		type: 'Factory<PopoverBond<PopoverStateProps, PopoverState<PopoverStateProps>, PopoverDomElements>> | undefined',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'children',
		type: 'Snippet<[{ popover: PopoverBond<PopoverStateProps, PopoverState<PopoverStateProps>, PopoverDomElements>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const popoverContentProps: PropDefinition[] = [
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
	}
];

export const popoverIndicatorProps: PropDefinition[] = [
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
	}
];

export const popoverArrowProps: PropDefinition[] = [
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
	}
];

export const popoverTriggerProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ popover?: PopoverBond<PopoverStateProps, PopoverState<PopoverStateProps>, PopoverDomElements>; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet'
	}
];
