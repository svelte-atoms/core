export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const textareaRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'placeholder',
		type: 'string',
		default: "''",
		description: 'Placeholder'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'readonly',
		type: 'boolean',
		default: 'false',
		description: 'Readonly'
	},
	{
		name: 'rows',
		type: 'number',
		default: '0',
		description: 'Rows'
	},
	{
		name: 'cols',
		type: 'number',
		default: '0',
		description: 'Cols'
	},
	{
		name: 'maxlength',
		type: 'number',
		default: '0',
		description: 'Maxlength'
	},
	{
		name: 'minlength',
		type: 'number',
		default: '0',
		description: 'Minlength'
	},
	{
		name: 'required',
		type: 'boolean',
		default: 'false',
		description: 'Required'
	},
	{
		name: 'autofocus',
		type: 'boolean',
		default: 'false',
		description: 'Autofocus'
	},
	{
		name: 'autocomplete',
		type: 'string',
		default: "''",
		description: 'Autocomplete'
	},
	{
		name: 'spellcheck',
		type: 'boolean',
		default: 'false',
		description: 'Spellcheck'
	},
	{
		name: 'wrap',
		type: "'soft' | 'hard' | 'off'",
		default: 'undefined',
		description: 'Wrap'
	}
];

export const textareaInputProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'placeholder',
		type: 'string',
		default: "''",
		description: 'Placeholder'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'readonly',
		type: 'boolean',
		default: 'false',
		description: 'Readonly'
	},
	{
		name: 'rows',
		type: 'number',
		default: '0',
		description: 'Rows'
	},
	{
		name: 'cols',
		type: 'number',
		default: '0',
		description: 'Cols'
	},
	{
		name: 'maxlength',
		type: 'number',
		default: '0',
		description: 'Maxlength'
	},
	{
		name: 'minlength',
		type: 'number',
		default: '0',
		description: 'Minlength'
	},
	{
		name: 'required',
		type: 'boolean',
		default: 'false',
		description: 'Required'
	},
	{
		name: 'autofocus',
		type: 'boolean',
		default: 'false',
		description: 'Autofocus'
	},
	{
		name: 'autocomplete',
		type: 'string',
		default: "''",
		description: 'Autocomplete'
	},
	{
		name: 'spellcheck',
		type: 'boolean',
		default: 'false',
		description: 'Spellcheck'
	},
	{
		name: 'wrap',
		type: "'soft' | 'hard' | 'off'",
		default: 'undefined',
		description: 'Wrap'
	}
];
