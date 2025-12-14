export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const toastRootProps: PropDefinition[] = [
	{
		name: 'dismissible',
		type: 'boolean',
		default: 'false',
		description: 'Dismissible'
	},
	{
		name: 'duration',
		type: 'number',
		default: '0',
		description: 'Duration'
	},
	{
		name: 'onclose',
		type: '() => void',
		default: 'undefined',
		description: 'Onclose'
	}
];

export const toastTitleProps: PropDefinition[] = [];

export const toastDescriptionProps: PropDefinition[] = [];
