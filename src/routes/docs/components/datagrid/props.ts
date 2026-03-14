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
		description: 'Additional CSS classes to apply to the table element.'
	},
	{
		name: 'template',
		type: 'string | undefined',
		default: "''",
		description: 'CSS grid-template-columns value used to size table columns.'
	},
	{
		name: 'fallbackTemplate',
		type: 'string | undefined',
		default: "''",
		description: 'Fallback column template used when the primary template cannot be applied.'
	},
	{
		name: 'values',
		type: 'string[] | undefined',
		default: 'undefined',
		description: 'Array of selected row values for controlled row selection.'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Slot for the table header, body, and footer sections. Receives the datagrid context.'
	},
];

export const datagridHeaderProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <thead> element.'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Header row content. Receives the datagrid context.'
	},
];

export const datagridBodyProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <tbody> element.'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Body row content. Receives the datagrid context.'
	},
];

export const datagridFooterProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <tfoot> element.'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Footer row content. Receives the datagrid context.'
	},
];

export const datagridThProps: PropDefinition[] = [
	{
		name: 'id',
		type: 'string | undefined',
		default: "''",
		description: 'Unique identifier for the column. Used to associate header with body cells.'
	},
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <th> element.'
	},
	{
		name: 'width',
		type: 'string | undefined',
		default: "''",
		description: 'Column width value (e.g. "200px", "1fr"). Applied to the grid template.'
	},
	{
		name: 'direction',
		type: 'Direction | undefined',
		default: 'undefined',
		description: 'Current sort direction for the column ("asc" | "desc" | undefined).'
	},
	{
		name: 'screen',
		type: 'string | undefined',
		default: "''",
		description: 'Responsive breakpoint at which this column becomes visible (e.g. "md").'
	},
	{
		name: 'sortable',
		type: 'boolean | SortableType | undefined',
		default: 'false',
		description: 'When true or a SortableType value, makes the column header clickable for sorting.'
	},
	{
		name: 'hidden',
		type: 'boolean | undefined',
		default: 'false',
		description: 'Hides the column from the table layout when set to true.'
	},
	{
		name: 'factory',
		type: '(() => DataGridThBond<T>) | undefined',
		default: 'undefined',
		description: 'Custom factory function to create a DataGridThBond instance for this column.'
	},
];

export const datagridTdProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <td> element.'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<T>; }]> | undefined',
		default: 'undefined',
		description: 'Cell content. Receives the datagrid context with row data.'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { context?: DatagridContext<T>; }) => void) | undefined',
		default: 'undefined',
		description: 'Click event handler for the cell. Receives the event and datagrid context.'
	},
];

export const datagridCheckboxProps: PropDefinition[] = [
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Bindable reference to the underlying DOM element.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ context: DatagridContext<unknown>; }]> | undefined',
		default: 'undefined',
		description: 'Custom checkbox content. Receives the datagrid context.'
	},
];

export const datagridTrProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Additional CSS classes for the <tr> element.'
	},
	{
		name: 'value',
		type: 'string | undefined',
		default: "''",
		description: 'The selection value for this row. Used when tracking selected rows.'
	},
	{
		name: 'rows',
		type: 'string | undefined',
		default: "''",
		description: 'Number of rows this row spans (for subgrid layouts).'
	},
	{
		name: 'data',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The data object associated with this row, passed into the datagrid context.'
	},
	{
		name: 'factory',
		type: 'Factory<DataGridTrBond<T, ...>> | undefined',
		default: 'undefined',
		description: 'Custom factory function to create a DataGridTrBond instance for this row.'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { tr?: DatagridContext<T>; }) => void) | undefined',
		default: 'undefined',
		description: 'Click event handler for the row. Receives the event and row context.'
	},
];
