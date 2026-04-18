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
    <DataGrid.Row>
      <DataGrid.Column>Name</DataGrid.Column>
      <DataGrid.Column>Email</DataGrid.Column>
      <DataGrid.Column>Role</DataGrid.Column>
    </DataGrid.Row>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user}
      <DataGrid.Row>
        <DataGrid.Cell>{user.name}</DataGrid.Cell>
        <DataGrid.Cell>{user.email}</DataGrid.Cell>
        <DataGrid.Cell>{user.role}</DataGrid.Cell>
      </DataGrid.Row>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const selectableCode = `
<script lang="ts">
  import { DataGrid } from '@svelte-atoms/core';

  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol White', email: 'carol@example.com' }
  ];

  let selectedIds = $state<string[]>([]);
<\/script>

<DataGrid.Root bind:values={selectedIds}>
  <DataGrid.Header>
    <DataGrid.Row>
      <DataGrid.Column>
        <input type="checkbox" />
      </DataGrid.Column>
      <DataGrid.Column>Name</DataGrid.Column>
      <DataGrid.Column>Email</DataGrid.Column>
    </DataGrid.Row>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each users as user}
      <DataGrid.Row>
        <DataGrid.Cell>
          <input type="checkbox" />
        </DataGrid.Cell>
        <DataGrid.Cell>{user.name}</DataGrid.Cell>
        <DataGrid.Cell>{user.email}</DataGrid.Cell>
      </DataGrid.Row>
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
    <DataGrid.Row header>
      <DataGrid.Column sortable="name" onsort={handleSort}>Name</DataGrid.Column>
      <DataGrid.Column sortable="email" onsort={handleSort}>Email</DataGrid.Column>
      <DataGrid.Column>Role</DataGrid.Column>
    </DataGrid.Row>
  </DataGrid.Header>
  <DataGrid.Body>
    <!-- rows -->
  </DataGrid.Body>
</DataGrid.Root>`.trim();

const rowSpanningColumnCode = `
<script lang="ts">
  import { DataGrid } from '@svelte-atoms/core';

  const inventory = [
    { id: 'sku-001', code: 'AMX-100', store: 'Downtown', name: 'Amoxicillin 500mg', category: 'Antibiotics' },
    { id: 'sku-002', code: 'ATR-220', store: 'Central', name: 'Atorvastatin 20mg', category: 'Cardio' },
    { id: 'sku-003', code: 'MET-500', store: 'Westside', name: 'Metformin 500mg', category: 'Diabetes' },
    { id: 'sku-004', code: 'IBP-200', store: 'North', name: 'Ibuprofen 200mg', category: 'Pain Relief' }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const presentLetters = new Set(inventory.map((item) => item.name.charAt(0).toUpperCase()));
<\/script>

<DataGrid.Root
  class="h-[24rem] gap-0"
  {@attach (node: HTMLElement) => {
    node.style.gridTemplateRows = 'auto 1fr auto';
  }}
>
  <DataGrid.Header class="h-min border-x-0 border-t-0">
    <DataGrid.Row class="h-min" header>
      <DataGrid.Column width="44px" />
      <DataGrid.Column width="auto" class="pl-4">SKU Code</DataGrid.Column>
      <DataGrid.Column width="auto">Store</DataGrid.Column>
      <DataGrid.Column width="1fr">Product Name</DataGrid.Column>
      <DataGrid.Column width="auto">Category</DataGrid.Column>
    </DataGrid.Row>
  </DataGrid.Header>

  <DataGrid.Body class="col-span-full grid grid-cols-subgrid">
    <div class="row-span-full flex flex-col items-center gap-0.5 overflow-y-auto border-r border-border py-2">
      {#each alphabet as letter (letter)}
        {@const active = presentLetters.has(letter)}
        <span class="flex size-7 items-center justify-center rounded text-xs font-medium {active ? 'text-primary' : 'text-muted-foreground/30'}">
          {letter}
        </span>
      {/each}
    </div>

    <div class="col-[2/-1] grid h-min grid-cols-subgrid gap-x-2">
      {#each inventory as item (item.id)}
        <DataGrid.Row value={item.id}>
          <DataGrid.Cell class="font-mono text-xs font-semibold text-primary">{item.code}</DataGrid.Cell>
          <DataGrid.Cell>{item.store}</DataGrid.Cell>
          <DataGrid.Cell class="font-medium">{item.name}</DataGrid.Cell>
          <DataGrid.Cell>
            <span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {item.category}
            </span>
          </DataGrid.Cell>
        </DataGrid.Row>
      {/each}
    </div>
  </DataGrid.Body>

  <DataGrid.Footer class="col-span-full border-t border-border px-3 py-2 text-xs text-muted-foreground">
    Row-spanning first column (A-Z rail) + subgrid-aligned content rows
  </DataGrid.Footer>
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
  'datagrid.row': () => ({
    class: 'border-b transition-colors'
  }),
  'datagrid.column': () => ({
    class: 'h-12 px-4 text-left text-muted-foreground'
  }),
  'datagrid.cell': () => ({
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
		description:
			'Display and manage records (users, orders, products) in admin dashboards with sortable columns and row selection.'
	},
	{
		title: 'Reporting and Analytics',
		description:
			'Present structured data with sortable columns and column visibility controls for business reports and analytics views.'
	},
	{
		title: 'Selectable Row Lists',
		description:
			'Allow users to select one or multiple rows with checkboxes for bulk operations like deletion, export, or status updates.'
	},
	{
		title: 'Inventory Management',
		description:
			'Manage product or asset inventories with rich row data, custom cell rendering via base prop, and action buttons per row.'
	},
	{
		title: 'Log Viewers',
		description:
			'Display time-series or event logs in a structured grid with sortable timestamps and filterable columns.'
	},
	{
		title: 'Comparison Tables',
		description:
			'Show feature comparisons or side-by-side data with fixed header rows and responsive column visibility via hidden prop.'
	},
	{
		title: 'Cross-Row Side Rails',
		description:
			'Create side columns that span all data rows (alphabet index, timeline, status rail) by combining row-span-full containers with subgrid-aligned row content.'
	}
];

const componentsSummary = [
	{
		name: 'DataGrid.Root',
		description:
			'Root grid container. Owns the DataGridBond context, manages column template (auto-computed from Th widths) and selection state via bind:values.'
	},
	{
		name: 'DataGrid.Header',
		description:
			'Header section. Sets the header context — all Tr rows inside are treated as header rows and excluded from selection.'
	},
	{
		name: 'DataGrid.Body',
		description: 'Body section. Contains the data rows rendered with DataGrid.Row.'
	},
	{
		name: 'DataGrid.Footer',
		description: 'Optional footer section. Useful for summary rows, pagination controls, or totals.'
	},
	{
		name: 'DataGrid.Row',
		description:
			'Row element using CSS subgrid (grid-column: 1 / -1). Mounts into the selection map unless header=true. Accepts a value prop for selection tracking and a data prop for typed row context.'
	},
	{
		name: 'DataGrid.Column',
		description:
			'Column header cell. Defines column width for auto template computation, supports sortable for click-to-sort with bindable direction, and hidden to exclude the column from the layout.'
	},
	{
		name: 'DataGrid.Cell',
		description:
			'Data cell. Finds its matching Th by DOM index for visibility. Accepts a base prop to render a component (e.g. a dropdown) instead of a plain div.'
	},
	{
		name: 'DataGrid.Checkbox',
		description:
			'Selection checkbox. In header rows: select-all / deselect-all. In body rows: toggles that row. State is automatically derived from the datagrid bond — no manual wiring needed.'
	}
];

export const metadata = {
	title: 'DataGrid - Svelte Atoms',
	description:
		'Flexible CSS subgrid-based data grid for displaying tabular data with sorting, selection, and custom cell rendering.',
	componentTitle: 'DataGrid',
	componentDescription:
		'Grid component for structured data with sortable columns, row selection, custom cell rendering, and responsive columns.',
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
		rowSpanningColumn: rowSpanningColumnCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
