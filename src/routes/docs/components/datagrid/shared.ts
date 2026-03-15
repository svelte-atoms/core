const basicCode = `
<script lang="ts">
  import { DataGrid } from '@svelte-atoms/core';

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  const users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor' }
  ];
<\/script>

<DataGrid.Root>
  <DataGrid.Header>
    <DataGrid.Tr header>
      <DataGrid.Th>Name</DataGrid.Th>
      <DataGrid.Th>Email</DataGrid.Th>
      <DataGrid.Th>Role</DataGrid.Th>
    </DataGrid.Tr>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user (user.id)}
      <DataGrid.Tr value={user.id}>
        <DataGrid.Td>{user.name}</DataGrid.Td>
        <DataGrid.Td>{user.email}</DataGrid.Td>
        <DataGrid.Td>{user.role}</DataGrid.Td>
      </DataGrid.Tr>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const selectableCode = `
<script lang="ts">
  import { DataGrid } from '@svelte-atoms/core';

  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' }
  ];

  let selectedIds = $state<string[]>([]);
<\/script>

<DataGrid.Root bind:values={selectedIds}>
  <DataGrid.Header>
    <DataGrid.Tr header>
      <DataGrid.Th width="auto">
        <DataGrid.Checkbox />
      </DataGrid.Th>
      <DataGrid.Th>Name</DataGrid.Th>
      <DataGrid.Th>Email</DataGrid.Th>
    </DataGrid.Tr>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user (user.id)}
      <DataGrid.Tr value={user.id}>
        <DataGrid.Td>
          <DataGrid.Checkbox />
        </DataGrid.Td>
        <DataGrid.Td>{user.name}</DataGrid.Td>
        <DataGrid.Td>{user.email}</DataGrid.Td>
      </DataGrid.Tr>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const sortableCode = `
<script lang="ts">
  import { DataGrid } from '@svelte-atoms/core';

  let sortField = $state<string | undefined>(undefined);
  let sortDir = $state<'asc' | 'desc'>('asc');

  function handleSort(_: CustomEvent, { field, direction }: { field?: string; direction: 'asc' | 'desc' }) {
    sortField = field;
    sortDir = direction;
  }
<\/script>

<DataGrid.Root>
  <DataGrid.Header>
    <DataGrid.Tr header>
      <DataGrid.Th sortable="name" onsort={handleSort}>Name</DataGrid.Th>
      <DataGrid.Th sortable="email" onsort={handleSort}>Email</DataGrid.Th>
      <DataGrid.Th>Role</DataGrid.Th>
    </DataGrid.Tr>
  </DataGrid.Header>
  <DataGrid.Body>
    <!-- rows -->
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

setPreset({
  datagrid: () => ({
    class: 'w-full text-sm'
  }),
  'datagrid.header': () => ({
    class: 'border-b font-medium'
  }),
  'datagrid.tr': () => ({
    class: 'border-b transition-colors'
  }),
  'datagrid.th': () => ({
    class: 'h-12 px-4 text-left text-muted-foreground'
  }),
  'datagrid.td': () => ({
    class: 'px-4 py-2'
  }),
  'datagrid.checkbox': () => ({
    class: 'flex items-center justify-center'
  })
});`.trim();

const accessibilityFeatures = [
	'CSS subgrid layout keeps columns pixel-perfectly aligned across header and body rows',
	'Row selection state tracked via bond — no DOM scanning required',
	'hidden prop on Th automatically hides corresponding Td cells by DOM index',
	'Sort direction exposed as bindable prop for controlled external state management',
	'header prop on Tr prevents row from being registered in the selection map'
];

const useCases = [
	{
		title: 'Admin Data Tables',
		description: 'Display and manage records (users, orders, products) in admin dashboards with sortable columns and row selection.'
	},
	{
		title: 'Reporting and Analytics',
		description: 'Present structured data with sortable columns and column visibility controls for business reports and analytics views.'
	},
	{
		title: 'Selectable Row Lists',
		description: 'Allow users to select one or multiple rows with checkboxes for bulk operations like deletion, export, or status updates.'
	},
	{
		title: 'Inventory Management',
		description: 'Manage product or asset inventories with rich row data, custom cell rendering via base prop, and action buttons per row.'
	},
	{
		title: 'Log Viewers',
		description: 'Display time-series or event logs in a structured grid with sortable timestamps and filterable columns.'
	},
	{
		title: 'Comparison Tables',
		description: 'Show feature comparisons or side-by-side data with fixed header rows and responsive column visibility via hidden prop.'
	}
];

const componentsSummary = [
	{
		name: 'DataGrid.Root',
		description: 'Root grid container. Owns the DataGridBond context, manages column template (auto-computed from Th widths) and selection state via bind:values.'
	},
	{
		name: 'DataGrid.Header',
		description: 'Header section. Sets the header context — all Tr rows inside are treated as header rows and excluded from selection.'
	},
	{
		name: 'DataGrid.Body',
		description: 'Body section. Contains the data rows rendered with DataGrid.Tr.'
	},
	{
		name: 'DataGrid.Footer',
		description: 'Optional footer section. Useful for summary rows, pagination controls, or totals.'
	},
	{
		name: 'DataGrid.Tr',
		description: 'Row element using CSS subgrid (grid-column: 1 / -1). Mounts into the selection map unless header=true. Accepts a value prop for selection tracking and a data prop for typed row context.'
	},
	{
		name: 'DataGrid.Th',
		description: 'Column header cell. Defines column width for auto template computation, supports sortable for click-to-sort with bindable direction, and hidden to exclude the column from the layout.'
	},
	{
		name: 'DataGrid.Td',
		description: 'Data cell. Finds its matching Th by DOM index for visibility. Accepts a base prop to render a component (e.g. a dropdown) instead of a plain div.'
	},
	{
		name: 'DataGrid.Checkbox',
		description: 'Selection checkbox. In header rows: select-all / deselect-all. In body rows: toggles that row. State is automatically derived from the datagrid bond — no manual wiring needed.'
	}
];

export const metadata = {
	title: 'DataGrid - Svelte Atoms',
	description: 'Flexible CSS subgrid-based data grid for displaying tabular data with sorting, selection, and custom cell rendering.',
	componentTitle: 'DataGrid',
	componentDescription:
		'A compound grid component for displaying and managing structured data. Uses CSS subgrid for pixel-perfect column alignment. Supports sortable columns, row selection via bind:values, custom cell rendering with the base prop, and responsive column visibility. Built on Bond-based reactive state management.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { DataGrid } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'DataGrid' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		selectable: selectableCode,
		sortable: sortableCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
