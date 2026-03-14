export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const dropdownItemProps: PropDefinition[] = [
	{
		name: 'preset',
		type: 'string | undefined',
		default: "'dropdown.item'",
		description: 'Preset key for styling the dropdown item.'
	},
	{
		name: 'value',
		type: 'string | undefined',
		default: 'nanoid()',
		description: 'The unique value for this dropdown item. Auto-generated if not provided.'
	},
	{
		name: 'data',
		type: 'T | undefined',
		default: 'undefined',
		description: 'Custom data payload associated with this item, accessible in selection callbacks.'
	},
	{
		name: 'factory',
		type: '(() => DropdownItemController<T>) | undefined',
		default: 'undefined',
		description: 'Factory function to create a custom DropdownItemController instance.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ dropdownItem: DropdownItemController<T>; }]> | undefined',
		default: 'undefined',
		description: 'Item content. Receives the DropdownItemController for custom rendering.'
	},
];

export const dropdownRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Controls whether the dropdown is open. Can be bound for controlled usage.'
	},
	{
		name: 'value',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The currently selected value in single-select mode.'
	},
	{
		name: 'values',
		type: 'T[] | undefined',
		default: 'undefined',
		description: 'Array of selected values in multi-select mode.'
	},
	{
		name: 'label',
		type: 'string | undefined',
		default: "''",
		description: 'Display label for the currently selected item in single-select mode.'
	},
	{
		name: 'labels',
		type: 'string[] | undefined',
		default: "''",
		description: 'Array of display labels for selected items in multi-select mode.'
	},
	{
		name: 'multiple',
		type: 'boolean | undefined',
		default: 'false',
		description: 'When true, enables multiple item selection mode.'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disables the entire dropdown, preventing user interaction.'
	},
	{
		name: 'placements',
		type: 'string[] | undefined',
		default: "['bottom-start', 'top-start']",
		description: 'Ordered list of preferred placement positions for the dropdown content (floating-ui placement values).'
	},
	{
		name: 'placement',
		type: 'string | undefined',
		default: "'bottom-start'",
		description: 'Preferred placement position for the dropdown content.'
	},
	{
		name: 'offset',
		type: 'number | undefined',
		default: '0',
		description: 'Distance in pixels between the trigger and the dropdown content.'
	},
	{
		name: 'keys',
		type: 'string[] | undefined',
		default: 'undefined',
		description: 'Keyboard shortcut keys that can open/close the dropdown.'
	},
	{
		name: 'factory',
		type: 'Factory<DropdownBond<...>> | undefined',
		default: 'undefined',
		description: 'Custom factory function to create a DropdownBond instance.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ dropdown: DropdownBond<...>; }]> | undefined',
		default: 'undefined',
		description: 'Dropdown content. Receives the DropdownBond instance for custom composition.'
	},
	{
		name: 'onquerychange',
		type: '((query: string) => void) | undefined',
		default: 'undefined',
		description: 'Callback fired when the search query changes. Use with filterDropdownData for custom filtering.'
	},
];

export const dropdownTriggerProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue | undefined',
		default: 'undefined',
		description: 'CSS class(es) for the trigger element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ selections: DropdownSelection[]; selection?: DropdownSelection | undefined; }]> | undefined',
		default: 'undefined',
		description: 'Trigger content. Receives current selections for custom rendering.'
	},
	{
		name: 'getSelections',
		type: '(<T extends DropdownBond>(bond: T) => DropdownSelection[]) | undefined',
		default: 'undefined',
		description: 'Custom function to retrieve selections from the bond (overrides default selection logic).'
	},
];

export const dropdownSelectionsProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue | undefined',
		default: 'undefined',
		description: 'CSS class(es) for the selections container.'
	},
	{
		name: 'Selection',
		type: 'Component<{}, {}, string> | undefined',
		default: 'undefined',
		description: 'Custom component to render each individual selection badge.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ selections: DropdownSelection[]; selection?: DropdownSelection | undefined; }]> | undefined',
		default: 'undefined',
		description: 'Custom slot for rendering selections. Receives all current selections.'
	},
	{
		name: 'getSelections',
		type: '(<T extends DropdownBond>(bond: T) => DropdownSelection[]) | undefined',
		default: 'undefined',
		description: 'Custom function to retrieve selections from the bond.'
	},
];

export const dropdownSelectionProps: PropDefinition[] = [
	{
		name: 'selection',
		type: 'DropdownSelection',
		default: '-',
		description: 'Selection object containing id, value, label, and unselect function (required).'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Custom content for the selection badge.'
	},
	{
		name: 'onclose',
		type: '((event: Event) => void) | undefined',
		default: 'undefined',
		description: 'Callback fired when the selection remove button is clicked.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

export const dropdownQueryProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | undefined',
		default: "''",
		description: 'The current search query value. Bind this to control filtering.'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Custom content for the query input.'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];
