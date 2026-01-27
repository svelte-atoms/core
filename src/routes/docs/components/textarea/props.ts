export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const textareaRootProps: PropDefinition[] = [
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

export const textareaInputProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Value'
	},
	{
		name: 'placeholder',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Placeholder'
	},
	{
		name: 'disabled',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'readonly',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Readonly'
	},
	{
		name: 'rows',
		type: 'number | undefined',
		default: '0',
		description: 'Rows'
	},
	{
		name: 'cols',
		type: 'number | undefined',
		default: '0',
		description: 'Cols'
	},
	{
		name: 'maxlength',
		type: 'number | undefined',
		default: '0',
		description: 'Maxlength'
	},
	{
		name: 'minlength',
		type: 'number | undefined',
		default: '0',
		description: 'Minlength'
	},
	{
		name: 'required',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Required'
	},
	{
		name: 'autofocus',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Autofocus'
	},
	{
		name: 'autocomplete',
		type: 'string | undefined',
		default: '\'\'',
		description: 'Autocomplete'
	},
	{
		name: 'spellcheck',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Spellcheck'
	},
	{
		name: 'wrap',
		type: '"soft" | "hard" | "off" | undefined',
		default: 'undefined',
		description: 'Wrap'
	},
];

