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

	const { basic: basicCode, selectable: selectableCode, sortable: sortableCode, preset: presetCode } = metadata.examples;

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

	let selectedIds = $state<string[]>([]);
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
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
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different datagrid variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic DataGrid" description="Simple data grid with header and body rows." code={basicCode}>
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
				</DataGrid.Root>
			</DemoExample>

			<DemoExample
				title="Row Selection"
				description="Multi-row selection via bind:values and DataGrid.Checkbox."
				code={selectableCode}
				
			>
				<div class="flex flex-col">
					<DataGrid.Root bind:values={selectedIds}>
						<DataGrid.Header>
							<DataGrid.Tr header>
								<DataGrid.Th width="auto">
									<DataGrid.Checkbox />
								</DataGrid.Th>
								<DataGrid.Th>Name</DataGrid.Th>
								<DataGrid.Th>Email</DataGrid.Th>
								<DataGrid.Th>Role</DataGrid.Th>
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
									<DataGrid.Td>{user.role}</DataGrid.Td>
								</DataGrid.Tr>
							{/each}
						</DataGrid.Body>
					</DataGrid.Root>
					<p class="text-muted-foreground mb-3 text-sm">
						Selected: {selectedIds.length ? selectedIds.join(', ') : 'none'}
					</p>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize datagrid appearance via presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				All datagrid slots accept preset keys. Define them once in your layout's <code>setPreset()</code> call:
			</p>
			<CodeBlock lang="typescript" code={presetCode} />
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Root</h3>
				<Props data={datagridRootProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Header</h3>
				<Props data={datagridHeaderProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Body</h3>
				<Props data={datagridBodyProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Footer</h3>
				<Props data={datagridFooterProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Tr</h3>
				<Props data={datagridTrProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Th</h3>
				<Props data={datagridThProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Td</h3>
				<Props data={datagridTdProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DataGrid.Checkbox</h3>
				<Props data={datagridCheckboxProps} />
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
