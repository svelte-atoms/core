export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const menuItemProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue',
		default: 'undefined',
		description: 'Custom CSS class(es) to apply to the menu item'
	},
	{
		name: 'preset',
		type: 'string | undefined',
		default: "'menu.item'",
		description: 'Preset key for styling'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether the menu item is disabled'
	},
	{
		name: 'onclick',
		type: '((event: MouseEvent) => void) | undefined',
		default: 'undefined',
		description: 'Click event handler'
	},
	{
		name: 'onmount',
		type: '((this: MenuItemController) => void) | undefined',
		default: 'undefined',
		description: 'Function called when element is mounted'
	},
	{
		name: 'ondestroy',
		type: '((this: MenuItemController) => void) | undefined',
		default: 'undefined',
		description: 'Function called when element is destroyed'
	},
	{
		name: 'animate',
		type: '((this: MenuItemController) => any) | undefined',
		default: 'undefined',
		description: 'Animation configuration'
	},
	{
		name: 'enter',
		type: '((this: MenuItemController) => any) | undefined',
		default: 'undefined',
		description: 'Transition function for entering'
	},
	{
		name: 'exit',
		type: '((this: MenuItemController) => any) | undefined',
		default: 'undefined',
		description: 'Transition function for exiting'
	},
	{
		name: 'initial',
		type: '((this: MenuItemController) => any) | undefined',
		default: 'undefined',
		description: 'Initial state configuration'
	},
	{
		name: 'factory',
		type: '(() => MenuItemController) | undefined',
		default: 'undefined',
		description: 'Factory function to create a custom MenuItemController instance'
	},
	{
		name: 'children',
		type: 'Snippet<[{ menuItem: MenuItemController; }]> | undefined',
		default: 'undefined',
		description: 'Render prop for children'
	}
];

export const menuListProps: PropDefinition[] = [
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
