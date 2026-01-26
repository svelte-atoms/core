export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const inputRootProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string | number | string[] | null | undefined',
		default: "''",
		description: 'Value'
	},
	{
		name: 'checked',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Checked'
	},
	{
		name: 'files',
		type: 'File[] | null | undefined',
		default: 'undefined',
		description: 'Files'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const inputControlProps: PropDefinition[] = [];
