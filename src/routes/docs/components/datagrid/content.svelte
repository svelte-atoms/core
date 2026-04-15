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

	const inventoryRows = [
		{ id: 'sku-001', code: 'AMX-100', store: 'Downtown', name: 'Amoxicillin 500mg', category: 'Antibiotics' },
		{ id: 'sku-002', code: 'ATR-220', store: 'Central', name: 'Atorvastatin 20mg', category: 'Cardio' },
		{ id: 'sku-003', code: 'MET-500', store: 'Westside', name: 'Metformin 500mg', category: 'Diabetes' },
		{ id: 'sku-004', code: 'IBP-200', store: 'North', name: 'Ibuprofen 200mg', category: 'Pain Relief' },
		{ id: 'sku-005', code: 'OMZ-040', store: 'East', name: 'Omeprazole 40mg', category: 'Gastro' },
		{ id: 'sku-006', code: 'AZI-500', store: 'South', name: 'Azithromycin 500mg', category: 'Antibiotics' }
	];

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const presentLetters = $derived(
		new Set(inventoryRows.map((item) => item.name.charAt(0).toUpperCase()))
	);

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

		<DocExample
			title="Row-Spanning Side Column"
			description="Create a vertical side rail that spans all body rows while preserving subgrid alignment"
			code={metadata.examples.rowSpanningColumn}
		>
			<DataGrid.Root
				class="h-96 gap-0"
				{@attach (node: HTMLElement) => {
					node.style.gridTemplateRows = 'auto 1fr auto';
				}}
			>
				<DataGrid.Header class="h-min border-x-0 border-t-0">
					<DataGrid.Tr class="h-min" header>
						<DataGrid.Th width="44px" />
						<DataGrid.Th width="auto" class="pl-4">SKU Code</DataGrid.Th>
						<DataGrid.Th width="auto">Store</DataGrid.Th>
						<DataGrid.Th width="1fr">Product Name</DataGrid.Th>
						<DataGrid.Th width="auto">Category</DataGrid.Th>
					</DataGrid.Tr>
				</DataGrid.Header>

				<DataGrid.Body class="col-span-full grid grid-cols-subgrid">
					<div
						class="row-span-full flex flex-col items-center gap-0.5 overflow-y-auto border-r border-border py-2"
					>
						{#each alphabet as letter (letter)}
							{@const active = presentLetters.has(letter)}
							<span
								class="flex size-7 items-center justify-center rounded text-xs font-medium {active
									? 'text-primary'
									: 'text-muted-foreground/30'}"
							>
								{letter}
							</span>
						{/each}
					</div>

					<div class="col-[2/-1] grid h-min grid-cols-subgrid gap-x-2">
						{#each inventoryRows as item (item.id)}
							<DataGrid.Tr value={item.id}>
								<DataGrid.Td class="font-mono text-xs font-semibold text-primary">
									{item.code}
								</DataGrid.Td>
								<DataGrid.Td>{item.store}</DataGrid.Td>
								<DataGrid.Td class="font-medium">{item.name}</DataGrid.Td>
								<DataGrid.Td>
									<span
										class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
									>
										{item.category}
									</span>
								</DataGrid.Td>
							</DataGrid.Tr>
						{/each}
					</div>
				</DataGrid.Body>

				<DataGrid.Footer class="col-span-full border-t border-border px-3 py-2 text-xs text-muted-foreground">
					Use row-span-full on the side rail and col-[2/-1] on row wrappers to keep all body rows aligned
				</DataGrid.Footer>
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
