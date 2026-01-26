export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const datagridRootProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'template',
		type: 'string | undefined',
		default: "''",
		description: 'Template'
	},
	{
		name: 'fallbackTemplate',
		type: 'string | undefined',
		default: "''",
		description: 'Fallback Template'
	},
	{
		name: 'values',
		type: 'string[] | undefined',
		default: "''",
		description: 'Values'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridHeaderProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridBodyProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridFooterProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridThProps: PropDefinition[] = [
	{
		name: 'id',
		type: 'string | undefined',
		default: "''",
		description: 'Id'
	},
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'width',
		type: 'string | undefined',
		default: "''",
		description: 'Width'
	},
	{
		name: 'direction',
		type: 'Direction | undefined',
		default: 'undefined',
		description: 'Direction'
	},
	{
		name: 'screen',
		type: 'string | undefined',
		default: "''",
		description: 'Screen'
	},
	{
		name: 'sortable',
		type: 'boolean | SortableType | undefined',
		default: 'false',
		description: 'Sortable'
	},
	{
		name: 'hidden',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Hidden'
	},
	{
		name: 'factory',
		type: '(() => DataGridThBond<T>) | undefined',
		default: 'undefined',
		description: 'Factory'
	}
];

export const datagridTdProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { context?: DatagridContext<T>; }) => void) | undefined',
		default: 'undefined',
		description: 'Onclick'
	}
];

export const datagridCheckboxProps: PropDefinition[] = [
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];

export const datagridTrProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'value',
		type: 'string | undefined',
		default: "''",
		description: 'Value'
	},
	{
		name: 'rows',
		type: 'string | undefined',
		default: "''",
		description: 'Rows'
	},
	{
		name: 'data',
		type: 'T | undefined',
		default: 'undefined',
		description: 'Data'
	},
	{
		name: 'factory',
		type: 'Factory<DataGridTrBond<T, DataGridTrBondProps<T>, DataGridTrBondState<T, DataGridTrBondProps<T>>, DataGridTrBondElements>> | undefined',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { tr?: DatagridContext<T>; }) => void) | undefined',
		default: 'undefined',
		description: 'Onclick'
	}
];
