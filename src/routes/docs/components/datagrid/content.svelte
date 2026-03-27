<script lang="ts">
	import { DataGrid } from '$lib/components/datagrid';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import {
		datagridRootProps,
		datagridHeaderProps,
		datagridBodyProps,
		datagridFooterProps,
		datagridTrProps,
		datagridThProps,
		datagridTdProps,
		datagridCheckboxProps
	} from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'datagrid',
		title: 'DataGrid',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	const users = [
		{ id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
		{ id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
		{ id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor' }
	];

	let selectedIds = $state<string[]>([]);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Combobox', href: '/docs/components/combobox' }}
	next={{ label: 'Dialog', href: '/docs/components/dialog' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		{#each metadata.componentsSummary as comp, i (i)}
		- **{comp.name}**: {comp.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the datagrid appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different datagrid variations and use cases">
		<DocExample title="Basic DataGrid" description="Simple data grid with header and rows" code={metadata.examples.basic}>
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
		</DocExample>

		<DocExample title="Selectable Rows" description="DataGrid with row selection via checkboxes" code={metadata.examples.selectable}>
			<div class="space-y-2">
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
				</DataGrid.Root>
				<p class="text-muted-foreground text-sm">Selected: {selectedIds.join(', ') || 'none'}</p>
			</div>
		</DocExample>

		<DocExample title="Sortable Columns" description="DataGrid with click-to-sort column headers" code={metadata.examples.sortable}>
			<DataGrid.Root>
				<DataGrid.Header>
					<DataGrid.Tr header>
						<DataGrid.Th sortable="name">Name</DataGrid.Th>
						<DataGrid.Th sortable="email">Email</DataGrid.Th>
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
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Root

**Preset Key:** `datagrid`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Root

**Preset Key:** `datagrid`</h3></DocOnly>
		<DocProps data={datagridRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Header

**Preset Key:** `datagrid.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Header</h3></DocOnly>
		<DocProps data={datagridHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Body

**Preset Key:** `datagrid.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Body</h3></DocOnly>
		<DocProps data={datagridBodyProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Footer

**Preset Key:** `datagrid.footer`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Footer</h3></DocOnly>
		<DocProps data={datagridFooterProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Tr (Row)

**Preset Key:** `datagrid.tr`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Tr (Row)</h3></DocOnly>
		<DocProps data={datagridTrProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Th (Column Header)

**Preset Key:** `datagrid.th`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Th (Column Header)</h3></DocOnly>
		<DocProps data={datagridThProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Td (Cell)

**Preset Key:** `datagrid.td`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Td (Cell)</h3></DocOnly>
		<DocProps data={datagridTdProps} />

		<DocOnly for="markdown">
{newLine(2)}### DataGrid.Checkbox

**Preset Key:** `datagrid.checkbox`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DataGrid.Checkbox</h3></DocOnly>
		<DocProps data={datagridCheckboxProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
