export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const alertRootProps: PropDefinition[] = [
	{
		name: 'dismissible',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Dismissible'
	},
	{
		name: 'dismissed',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Dismissed'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'extend',
		type: 'Record<string, unknown> | undefined',
		default: "''",
		description: 'Extend'
	},
	{
		name: 'factory',
		type: 'Factory<AlertBond<AlertBondState<AlertBondProps>>> | undefined',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'children',
		type: 'Snippet<[{ alert: AlertBond<AlertBondState<AlertBondProps>>; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet'
	}
];

export const alertContentProps: PropDefinition[] = [
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

export const alertTitleProps: PropDefinition[] = [
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

export const alertDescriptionProps: PropDefinition[] = [
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

export const alertIconProps: PropDefinition[] = [
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

export const alertActionsProps: PropDefinition[] = [
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

export const alertCloseButtonProps: PropDefinition[] = [
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
