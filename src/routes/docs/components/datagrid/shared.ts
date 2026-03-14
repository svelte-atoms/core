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
    { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' }
  ];
<\/script>

<DataGrid.Root>
  <DataGrid.Header>
    <DataGrid.Tr>
      <DataGrid.Th>Name</DataGrid.Th>
      <DataGrid.Th>Email</DataGrid.Th>
      <DataGrid.Th>Role</DataGrid.Th>
    </DataGrid.Tr>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user}
      <DataGrid.Tr>
        <DataGrid.Td>{user.name}</DataGrid.Td>
        <DataGrid.Td>{user.email}</DataGrid.Td>
        <DataGrid.Td>{user.role}</DataGrid.Td>
      </DataGrid.Tr>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const selectableCode = `
<DataGrid.Root multiple bind:selection>
  <DataGrid.Header>
    <DataGrid.Tr>
      <DataGrid.Th>
        <input type="checkbox" />
      </DataGrid.Th>
      <DataGrid.Th>Name</DataGrid.Th>
      <DataGrid.Th>Email</DataGrid.Th>
    </DataGrid.Tr>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user}
      <DataGrid.Tr>
        <DataGrid.Td>
          <input type="checkbox" />
        </DataGrid.Td>
        <DataGrid.Td>{user.name}</DataGrid.Td>
        <DataGrid.Td>{user.email}</DataGrid.Td>
      </DataGrid.Tr>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  datagrid: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper table semantics with ARIA attributes',
	'Keyboard navigation support',
	'Screen reader announcements for sorting',
	'Focus management for interactive cells',
	'Row selection with keyboard'
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
		description: 'Manage product or asset inventories with rich row data, custom cell rendering, and action buttons per row.'
	},
	{
		title: 'Log Viewers',
		description: 'Display time-series or event logs in a structured table with sortable timestamps and filterable severity columns.'
	},
	{
		title: 'Comparison Tables',
		description: 'Show feature comparisons or side-by-side data with fixed header rows and responsive column layouts.'
	}
];

const componentsSummary = [
	{
		name: 'DataGrid.Root',
		description: 'Root table container that sets up the datagrid context, manages column templates and selection state. Renders as a <table> element.'
	},
	{
		name: 'DataGrid.Header',
		description: 'Table header section (<thead>). Contains one or more DataGrid.Tr rows with DataGrid.Th column headers.'
	},
	{
		name: 'DataGrid.Body',
		description: 'Table body section (<tbody>). Contains the data rows rendered with DataGrid.Tr.'
	},
	{
		name: 'DataGrid.Footer',
		description: 'Optional table footer section (<tfoot>). Useful for summary rows, pagination, or totals.'
	},
	{
		name: 'DataGrid.Tr',
		description: 'Table row element. In the body, accepts a data prop for row-level data context and supports row selection via value prop.'
	},
	{
		name: 'DataGrid.Th',
		description: 'Table header cell. Supports sortable prop for clickable sort headers with direction indicators, and width/hidden for column control.'
	},
	{
		name: 'DataGrid.Td',
		description: 'Table data cell. Renders cell content and can access the datagrid context via the children snippet.'
	},
	{
		name: 'DataGrid.Checkbox',
		description: 'Convenience checkbox cell for row selection. Handles checked state based on the datagrid selection context.'
	}
];

export const metadata = {
	title: 'DataGrid - Svelte Atoms',
	description: 'Flexible and powerful data grid component for displaying tabular data with sorting, selection, and custom cell rendering.',
	componentTitle: 'DataGrid',
	componentDescription:
		'A compound table component for displaying and managing structured data. Supports sortable columns, row selection (single and multiple), custom cell rendering, and responsive layouts. Built with Bond-based reactive state management for predictable data flow.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { DataGrid } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'DataGrid' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		selectable: selectableCode
	},
	accessibility: accessibilityFeatures
};
