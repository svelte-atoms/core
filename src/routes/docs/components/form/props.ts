export type PropDefinition = {
	name: string;
	type: string;
	default: string;
	description: string;
};

export const formRootProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes to apply'
	},
	{
		name: 'onsubmit',
		type: 'function',
		default: '-',
		description: 'Form submission handler'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: '-',
		description: 'Form content'
	}
];

export const fieldRootProps: PropDefinition[] = [
	{
		name: 'name',
		type: 'string',
		default: '-',
		description: 'Field name for form data'
	},
	{
		name: 'value',
		type: 'any',
		default: "''",
		description: 'Field value'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];

export const fieldLabelProps: PropDefinition[] = [
	{
		name: 'for',
		type: 'string',
		default: '-',
		description: 'ID of the associated form control'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: '-',
		description: 'Label content'
	}
];

export const fieldControlProps: PropDefinition[] = [
	{
		name: 'base',
		type: 'Component',
		default: '-',
		description: 'Base component to wrap (e.g., Input.Root)'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'children',
		type: 'Snippet',
		default: '-',
		description: 'Control content (Input.Control, Textarea.Control, etc.)'
	}
];

export const fieldErrorsProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];

export default [
	{ name: 'Form', description: 'The root form component.', props: formRootProps },
	{
		name: 'Field.Root',
		description: 'Container for a form field including label, control, and errors.',
		props: fieldRootProps
	},
	{ name: 'Field.Label', description: 'Label element for the form field.', props: fieldLabelProps },
	{
		name: 'Field.Control',
		description: 'Wrapper for the input control element.',
		props: fieldControlProps
	},
	{
		name: 'Field.Errors',
		description: 'Component to display field error messages.',
		props: fieldErrorsProps
	}
];
