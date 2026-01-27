<script lang="ts">
	import { DataGrid } from '$lib/components/datagrid';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';
	import {
		datagridRootProps,
		datagridHeaderProps,
		datagridBodyProps,
		datagridFooterProps,
		datagridThProps,
		datagridTdProps,
		datagridCheckboxProps,
		datagridTrProps
	} from './props';

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

	const basicCode = `<script lang="ts">
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
</DataGrid.Root>`;

	const selectableCode = `<DataGrid.Root multiple bind:selection>
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
</DataGrid.Root>`;
</script>

<svelte:head>
	<title>DataGrid - Svelte Atoms</title>
	<meta
		name="description"
		content="Flexible and powerful data grid component for displaying tabular data."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'DataGrid' }]} />

	<PageHeader
		title="DataGrid"
		description="Flexible and powerful implementation for managing and displaying tabular data. Built with reactive state management using Bond and BondState."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; DataGrid &#125; from '@svelte-atoms/core/datagrid';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the datagrid appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for DataGrid components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  datagrid: () => ({
    class: 'w-full border-collapse text-sm'
  }),
  'datagrid.header': () => ({
    class: 'border-b'
  }),
  'datagrid.tr': () => ({
    class: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
  }),
  'datagrid.th': () => ({
    class: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0'
  }),
  'datagrid.td': () => ({
    class: 'p-4 align-middle [&:has([role=checkbox])]:pr-0'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different datagrid variations and use cases">
		<div class="space-y-8">
			<DemoExample title="Basic DataGrid" description="Simple data table display" code={basicCode}>
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
				</DataGrid.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Root Props</h3>
				<Props data={datagridRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Th Props</h3>
				<Props data={datagridThProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper table semantics with ARIA attributes',
				'Keyboard navigation support',
				'Screen reader announcements for sorting',
				'Focus management for interactive cells',
				'Row selection with keyboard'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Context Menu', href: '/docs/components/contextmenu' }}
		next={{ label: 'Dialog', href: '/docs/components/dialog' }}
	/>
</div>
