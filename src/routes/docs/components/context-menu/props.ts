export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const contextMenuRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Controls the open state of the context menu'
	},
	{
		name: 'value',
		type: 'unknown',
		default: 'undefined',
		description: 'Selected value when using single selection'
	},
	{
		name: 'values',
		type: 'unknown[] | undefined',
		default: 'undefined',
		description: 'Selected values when using multiple selection'
	},
	{
		name: 'label',
		type: 'string | undefined',
		default: 'undefined',
		description: 'Derived label for the selected item'
	},
	{
		name: 'labels',
		type: 'string[] | undefined',
		default: 'undefined',
		description: 'Derived labels for selected items'
	},
	{
		name: 'multiple',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Enables multi-select behavior for menu items'
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
		default: '1',
		description: 'Offset distance from the trigger element'
	},
	{
		name: 'keys',
		type: 'string[] | undefined',
		default: '[]',
		description: 'Optional keyboard search keys used by the dropdown bond'
	},
	{
		name: 'factory',
		type: 'Factory<DropdownBond> | undefined',
		default: 'undefined',
		description: 'Factory function for creating the dropdown bond'
	},
	{
		name: 'onquerychange',
		type: '((query: string) => void) | undefined',
		default: 'undefined',
		description: 'Callback for query updates inherited from Dropdown.Root'
	},
	{
		name: 'children',
		type: 'Snippet<[{ dropdown: DropdownBond; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet with dropdown bond access'
	}
];

export const contextMenuTriggerProps: PropDefinition[] = [
	{
		name: 'preset',
		type: 'string',
		default: "'context-menu.trigger'",
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

export const contextMenuContentProps: PropDefinition[] = [
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
		default: "'menu.content'",
		description:
			'Default inherited preset. Pass `preset="context-menu.content"` if you want a namespaced context menu preset.'
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

export const contextMenuItemProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue',
		default: 'undefined',
		description: 'Custom CSS class(es) to apply to the menu item'
	},
	{
		name: 'preset',
		type: 'string | undefined',
		default: "'dropdown.item'",
		description:
			'Default inherited preset. Pass `preset="context-menu.item"` if you want a namespaced context menu preset.'
	},
	{
		name: 'value',
		type: 'string | undefined',
		default: 'nanoid()',
		description: 'Unique value used for selection state'
	},
	{
		name: 'data',
		type: 'unknown',
		default: 'undefined',
		description: 'Custom data attached to the item controller'
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
		type: '((this: DropdownItemController) => void) | undefined',
		default: 'undefined',
		description: 'Function called when element is mounted'
	},
	{
		name: 'ondestroy',
		type: '((this: DropdownItemController) => void) | undefined',
		default: 'undefined',
		description: 'Function called when element is destroyed'
	},
	{
		name: 'animate',
		type: '((this: DropdownItemController) => any) | undefined',
		default: 'undefined',
		description: 'Animation configuration'
	},
	{
		name: 'enter',
		type: '((this: DropdownItemController) => any) | undefined',
		default: 'undefined',
		description: 'Transition function for entering'
	},
	{
		name: 'exit',
		type: '((this: DropdownItemController) => any) | undefined',
		default: 'undefined',
		description: 'Transition function for exiting'
	},
	{
		name: 'initial',
		type: '((this: DropdownItemController) => any) | undefined',
		default: 'undefined',
		description: 'Initial state configuration'
	},
	{
		name: 'factory',
		type: '(() => DropdownItemController) | undefined',
		default: 'undefined',
		description: 'Factory function to create a custom DropdownItemController instance'
	},
	{
		name: 'children',
		type: 'Snippet<[{ dropdownItem: DropdownItemController; }]> | undefined',
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
