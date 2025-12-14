export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const inputRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | number | string[] | null',
		default: "''",
		description: 'Value'
	},
	{
		name: 'checked',
		type: 'boolean',
		default: 'false',
		description: 'Checked'
	},
	{
		name: 'files',
		type: 'File[] | null',
		default: 'undefined',
		description: 'Files'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Children'
	}
];

export const inputControlProps: PropDefinition[] = [];
