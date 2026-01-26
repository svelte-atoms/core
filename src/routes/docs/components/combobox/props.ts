export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const comboboxRootProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean | undefined',
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
		type: 'unknown[] | undefined',
		default: 'undefined',
		description: 'Values'
	},
	{
		name: 'label',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Label'
	},
	{
		name: 'labels',
		type: 'string[] | undefined',
		default: '\'\'',
		description: 'Labels'
	},
	{
		name: 'multiple',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Multiple'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'placements',
		type: 'string[] | undefined',
		default: '\'\'',
		description: 'Placements'
	},
	{
		name: 'placement',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Placement'
	},
	{
		name: 'offset',
		type: 'number | undefined',
		default: '0',
		description: 'Offset'
	},
	{
		name: 'factory',
		type: 'Factory<ComboboxBond> | undefined',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'children',
		type: 'Snippet<[{ combobox: ComboboxBond; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

export const comboboxSelectionsProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'ClassValue | undefined',
		default: 'undefined',
		description: 'CSS class for the selections container'
	},
	{
		name: 'Selection',
		type: 'Component<{}, {}, string> | undefined',
		default: '\'\'',
		description: 'Selection'
	},
	{
		name: 'children',
		type: 'Snippet<[{ selections: DropdownSelection[]; selection?: DropdownSelection | undefined; }]> | undefined',
		default: 'undefined',
		description: 'Children content snippet'
	},
	{
		name: 'getSelections',
		type: '(<T extends DropdownBond>(bond: T) => DropdownSelection[]) | undefined',
		default: 'undefined',
		description: 'Custom function to retrieve selections from the bond'
	},
];

export const comboboxSelectionProps: PropDefinition[] = [
	{
		name: 'selection',
		type: 'DropdownSelection',
		default: '-',
		description: 'Selection object containing id, value, label, and unselect function (required)'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children content snippet'
	},
	{
		name: 'onclose',
		type: '((event: Event) => void) | undefined',
		default: 'undefined',
		description: 'Callback fired when the selection is closed/removed'
	},
	{
		name: '...atomProps',
		type: 'HtmlAtomProps',
		default: '-',
		description: 'All HTML element props are supported. See [Atom Props](/docs/components/atom#props) for the complete list of inherited properties.'
	},
];

export const comboboxControlProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'any',
		default: 'undefined',
		description: 'The input value'
	},
	{
		name: 'files',
		type: 'File[]',
		default: 'undefined',
		description: 'File list for file inputs'
	},
	{
		name: 'date',
		type: 'Date | null',
		default: 'null',
		description: 'Date value for date inputs'
	},
	{
		name: 'number',
		type: 'number',
		default: 'undefined',
		description: 'Number value for number inputs'
	},
	{
		name: 'checked',
		type: 'boolean',
		default: 'undefined',
		description: 'Checked state for checkbox/radio inputs'
	},
	{
		name: 'type',
		type: 'HTMLInputTypeAttribute | null',
		default: '\'text\'',
		description: 'HTML input type attribute'
	},
	{
		name: 'placeholder',
		type: 'string',
		default: 'undefined',
		description: 'Placeholder text for the input'
	},
	{
		name: 'class',
		type: 'string',
		default: 'undefined',
		description: 'CSS class for the input control'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: 'undefined',
		description: 'Children content snippet'
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
		default: '\'input.control\'',
		description: 'Preset module name for styling'
	},
	{
		name: 'variants',
		type: 'VariantDefinition | Function',
		default: 'undefined',
		description: 'Variant definition or function to resolve variants'
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

