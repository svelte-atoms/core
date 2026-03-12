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
	import { metadata } from './shared';

	const { basic: basicCode } = metadata.examples;

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

</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the datagrid appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for DataGrid components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different datagrid variations and use cases</Section.Subtitle>
		</Section.Header>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo features={metadata.accessibility} />
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Context Menu', href: '/docs/components/contextmenu' }}
		next={{ label: 'Dialog', href: '/docs/components/dialog' }}
	/>
</div>
