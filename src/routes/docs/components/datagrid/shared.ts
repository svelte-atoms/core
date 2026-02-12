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
		title: 'Use Case 1',
		description: 'TODO: Describe when and why to use this component in this scenario.'
	},
	{
		title: 'Use Case 2',
		description: 'TODO: Describe another practical application.'
	}
	// TODO: Add 4-6 use cases total
];

// TODO: Remove if simple component, or fill in for compound component
const componentsSummary = [
	{
		name: 'Datagrid.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Datagrid - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Datagrid',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Datagrid } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Datagrid' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		selectable: selectableCode
	},
	accessibility: accessibilityFeatures
};
