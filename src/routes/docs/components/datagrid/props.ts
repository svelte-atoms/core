export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const datagridRootProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	},
	{
		name: 'template',
		type: 'string',
		default: "''",
		description: 'Template'
	},
	{
		name: 'fallbackTemplate',
		type: 'string',
		default: "''",
		description: 'Fallback Template'
	},
	{
		name: 'values',
		type: 'string[]',
		default: "''",
		description: 'Values'
	}
];

export const datagridHeaderProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	}
];

export const datagridBodyProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	}
];

export const datagridFooterProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	}
];

export const datagridThProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ th: DatagridContext<T> }]>',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'id',
		type: 'string',
		default: "''",
		description: 'Id'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	},
	{
		name: 'width',
		type: 'string',
		default: "''",
		description: 'Width'
	},
	{
		name: 'direction',
		type: 'Direction',
		default: 'undefined',
		description: 'Direction'
	},
	{
		name: 'screen',
		type: 'string',
		default: "''",
		description: 'Screen'
	},
	{
		name: 'sortable',
		type: 'boolean | SortableType',
		default: 'false',
		description: 'Sortable'
	},
	{
		name: 'hidden',
		type: 'boolean',
		default: 'false',
		description: 'Hidden'
	},
	{
		name: 'factory',
		type: '() => DataGridThBond<T>',
		default: 'undefined',
		description: 'Factory'
	}
];

export const datagridTdProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	}
];

export const datagridCheckboxProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext }]>',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridTrProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ tr: DatagridContext<T> }]>',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	},
	{
		name: 'value',
		type: 'string',
		default: "''",
		description: 'Value'
	},
	{
		name: 'rows',
		type: 'string',
		default: "''",
		description: 'Rows'
	},
	{
		name: 'data',
		type: 'T',
		default: 'undefined',
		description: 'Data'
	},
	{
		name: 'factory',
		type: 'Factory<DataGridTrBond<T>>',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'onclick',
		type: '(ev: Event, options: { tr?: DatagridContext<T> }) => void',
		default: 'undefined',
		description: 'Onclick'
	}
];
