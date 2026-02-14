export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const contextmenuRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Controls the open state of the context menu'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Whether the context menu is disabled'
	},
	{
		name: 'placements',
		type: 'Placement[] | undefined',
		default: 'undefined',
		description: 'Array of preferred placements for positioning'
	},
	{
		name: 'placement',
		type: 'Placement | undefined',
		default: 'undefined',
		description: 'Preferred placement for the context menu'
	},
	{
		name: 'offset',
		type: 'number | undefined',
		default: '0',
		description: 'Offset distance from the trigger element'
	},
	{
		name: 'portal',
		type: 'string | PortalBond | undefined',
		default: "''",
		description: 'Portal target for rendering the context menu'
	},
	{
		name: 'extend',
		type: 'Record<string, unknown> | undefined',
		default: "''",
		description: 'Extended configuration options'
	},
	{
		name: 'factory',
		type: 'Factory<MenuBond> | undefined',
		default: 'undefined',
		description: 'Factory function for creating the menu bond'
	},
	{
		name: 'children',
		type: 'Snippet<[{ menu: MenuBond; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet with menu bond access'
	}
];

export const contextmenuTriggerProps: PropDefinition[] = [
	{
		name: 'preset',
		type: 'string',
		default: "'contextmenu.trigger'",
		description: 'Preset key for styling the trigger element'
	},
	{
		name: 'oncontextmenu',
		type: '((event: MouseEvent) => void) | undefined',
		default: 'undefined',
		description:
			'Custom context menu event handler. The default behavior opens the menu at cursor position.'
	},
	{
		name: 'onclick',
		type: '((event: MouseEvent) => void) | undefined',
		default: 'null',
		description: 'Regular click event handler'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description:
			'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];

export const contextmenuContentProps: PropDefinition[] = [
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
		default: "'contextmenu.content'",
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

export const contextmenuItemProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue',
		default: 'undefined',
		description: 'Custom CSS class(es) to apply to the menu item'
	},
	{
		name: 'preset',
		type: 'string | undefined',
		default: "'contextmenu.item'",
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
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description:
			'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	}
];
