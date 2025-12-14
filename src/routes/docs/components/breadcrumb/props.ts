export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const breadcrumbProps: PropDefinition[] = [
	{
		name: 'items',
		type: 'Array<{ label: string, href?: string }>',
		default: '[]',
		description: 'Breadcrumb items to display'
	},
	{
		name: 'separator',
		type: 'string',
		default: "'/'",
		description: 'Separator between items'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];
