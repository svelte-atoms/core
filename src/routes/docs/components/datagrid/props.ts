import type { DataGridBond } from '$lib/components/datagrid/bond.svelte';
import type { DataGridTrBond } from '$lib/components/datagrid/tr/bond.svelte';
import type { DataGridThBond } from '$lib/components/datagrid/th/bond.svelte';
import type { Factory } from '$svelte-atoms/core/types';

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
		description: 'Additional CSS classes applied to the root grid element.'
	},
	{
		name: 'template',
		type: 'string | undefined',
		default: 'undefined',
		description: 'Explicit CSS grid-template-columns value. When omitted, auto-computed from Th widths.'
	},
	{
		name: 'fallbackTemplate',
		type: 'string',
		default: "'auto'",
		description: 'Fallback column template used when no template and no Th columns are mounted yet.'
	},
	{
		name: 'values',
		type: 'string[]',
		default: '[]',
		description: 'Bindable array of selected row values (row IDs). Use bind:values for two-way binding.'
	},
	{
		name: 'factory',
		type: 'Factory<DataGridBond<T>> | undefined',
		default: 'undefined',
		description: 'Custom factory to create the DataGridBond instance. Useful for extending or pre-configuring the bond.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ datagrid: DataGridBond<T> | undefined }]> | undefined',
		default: 'undefined',
		description: 'Slot for Header, Body, and Footer sections. Receives the datagrid bond.'
	}
];

export const datagridHeaderProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the header container.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ datagrid: DataGridBond<T> | undefined }]> | undefined',
		default: 'undefined',
		description: 'Header row content. Receives the datagrid bond.'
	}
];

export const datagridBodyProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the body container.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ datagrid: DataGridBond<T> | undefined }]> | undefined',
		default: 'undefined',
		description: 'Data row content. Receives the datagrid bond.'
	}
];

export const datagridFooterProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the footer container.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ datagrid: DataGridBond<T> | undefined }]> | undefined',
		default: 'undefined',
		description: 'Footer content. Receives the datagrid bond.'
	}
];

export const datagridTrProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the row element.'
	},
	{
		name: 'value',
		type: 'string',
		default: 'nanoid()',
		description: 'Row identifier. Used for selection tracking. Auto-generated if omitted.'
	},
	{
		name: 'rows',
		type: 'string',
		default: "'auto'",
		description: 'CSS grid-template-rows value for subgrid row height control.'
	},
	{
		name: 'header',
		type: 'boolean',
		default: 'false',
		description: 'Marks this row as a header row. Header rows are not mounted into the selection map and receive header styling.'
	},
	{
		name: 'data',
		type: 'T | undefined',
		default: 'undefined',
		description: 'The data object associated with this row, available via the bond.'
	},
	{
		name: 'factory',
		type: 'Factory<DataGridTrBond<T>> | undefined',
		default: 'undefined',
		description: 'Custom factory to create the DataGridTrBond instance for this row.'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { tr?: DataGridTrBond<T> }) => void) | undefined',
		default: 'undefined',
		description: 'Click handler for the row. Receives the event and the row bond.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ tr: DataGridTrBond<T> }]> | undefined',
		default: 'undefined',
		description: 'Row cell content. Receives the row bond.'
	}
];

export const datagridThProps: PropDefinition[] = [
	{
		name: 'id',
		type: 'string',
		default: 'nanoid()',
		description: 'Unique column identifier. Auto-generated if omitted. Used to associate Td cells with their column.'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the column header element.'
	},
	{
		name: 'width',
		type: 'string',
		default: "'1fr'",
		description: 'Column width token used in the auto-computed grid-template-columns (e.g. "200px", "auto", "1fr").'
	},
	{
		name: 'direction',
		type: "'asc' | 'desc'",
		default: "'asc'",
		description: 'Bindable current sort direction. Toggles on click when sortable is set.'
	},
	{
		name: 'screen',
		type: 'string | undefined',
		default: 'undefined',
		description: 'Reserved for responsive breakpoint control.'
	},
	{
		name: 'sortable',
		type: 'boolean | SortableType | undefined',
		default: 'undefined',
		description: 'Enables click-to-sort on this column. Pass a string SortableType to identify the sort field.'
	},
	{
		name: 'hidden',
		type: 'boolean',
		default: 'false',
		description: 'Hides this column (and its corresponding Td cells) from the grid layout.'
	},
	{
		name: 'factory',
		type: '(() => DataGridThBond<T>) | undefined',
		default: 'undefined',
		description: 'Custom factory to create the DataGridThBond instance for this column.'
	},
	{
		name: 'onsort',
		type: '((event: CustomEvent, options: { field?: SortableType; direction: Direction }) => void) | undefined',
		default: 'undefined',
		description: 'Callback fired after sort direction changes. Receives the new direction and field identifier.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ th: DataGridThBond<T> }]> | undefined',
		default: 'undefined',
		description: 'Column header content. Receives the column bond.'
	}
];

export const datagridTdProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the cell element.'
	},
	{
		name: 'onclick',
		type: '((ev: Event, options: { td?: DataGridBond<T> }) => void) | undefined',
		default: 'undefined',
		description: 'Click handler for the cell. Receives the event and the datagrid bond.'
	},
	{
		name: 'children',
		type: 'Snippet<[{ td: DataGridBond<T> | undefined }]> | undefined',
		default: 'undefined',
		description: 'Cell content. Receives the datagrid bond. Also accepts a component via the base prop.'
	}
];

export const datagridCheckboxProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the checkbox element.'
	},
	{
		name: 'value',
		type: 'string | undefined',
		default: 'undefined',
		description: 'Value attribute forwarded to the underlying Checkbox.'
	},
	{
		name: 'checked',
		type: 'boolean',
		default: 'false',
		description: 'Bindable checked state. Automatically derived from selection state unless overridden.'
	},
	{
		name: 'onchange',
		type: '((ev: Event, options: { checked?: boolean }) => void) | undefined',
		default: 'undefined',
		description: 'Change handler. In header rows, triggers select/deselect all. In body rows, toggles the row.'
	}
];
