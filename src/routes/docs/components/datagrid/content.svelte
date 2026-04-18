<script lang="ts">
	import { DataGrid } from '$lib/components/datagrid';
	import { Tabs as ATabs, Tab } from '$lib/components/tabs';
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

	const apiTabs = [
		{
			value: 'datagrid-root',
			label: 'DataGrid.Root',
			presetKey: 'datagrid',
			props: datagridRootProps
		},
		{
			value: 'datagrid-header',
			label: 'DataGrid.Header',
			presetKey: 'datagrid.header',
			props: datagridHeaderProps
		},
		{
			value: 'datagrid-body',
			label: 'DataGrid.Body',
			presetKey: 'datagrid.body',
			props: datagridBodyProps
		},
		{
			value: 'datagrid-footer',
			label: 'DataGrid.Footer',
			presetKey: 'datagrid.footer',
			props: datagridFooterProps
		},
		{
			value: 'datagrid-row',
			label: 'DataGrid.Row',
			presetKey: 'datagrid.row',
			props: datagridTrProps
		},
		{
			value: 'datagrid-column',
			label: 'DataGrid.Column',
			presetKey: 'datagrid.column',
			props: datagridThProps
		},
		{
			value: 'datagrid-cell',
			label: 'DataGrid.Td',
			presetKey: 'datagrid.cell',
			props: datagridTdProps
		},
		{
			value: 'datagrid-checkbox',
			label: 'DataGrid.Checkbox',
			presetKey: 'datagrid.checkbox',
			props: datagridCheckboxProps
		}
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
					<DataGrid.Row header>
						<DataGrid.Column>Name</DataGrid.Column>
						<DataGrid.Column>Email</DataGrid.Column>
						<DataGrid.Column>Role</DataGrid.Column>
					</DataGrid.Row>
				</DataGrid.Header>
				<DataGrid.Body>
					{#each users as user (user.id)}
						<DataGrid.Row value={user.id}>
							<DataGrid.Td>{user.name}</DataGrid.Td>
							<DataGrid.Td>{user.email}</DataGrid.Td>
							<DataGrid.Td>{user.role}</DataGrid.Td>
						</DataGrid.Row>
					{/each}
				</DataGrid.Body>
			</DataGrid.Root>
		</DocExample>

		<DocExample title="Selectable Rows" description="DataGrid with row selection via checkboxes" code={metadata.examples.selectable}>
			<div class="space-y-2">
				<DataGrid.Root bind:values={selectedIds}>
					<DataGrid.Header>
						<DataGrid.Row header>
							<DataGrid.Column width="auto">
								<DataGrid.Checkbox />
							</DataGrid.Column>
							<DataGrid.Column>Name</DataGrid.Column>
							<DataGrid.Column>Email</DataGrid.Column>
						</DataGrid.Row>
					</DataGrid.Header>
					<DataGrid.Body>
						{#each users as user (user.id)}
							<DataGrid.Row value={user.id}>
								<DataGrid.Td>
									<DataGrid.Checkbox />
								</DataGrid.Td>
								<DataGrid.Td>{user.name}</DataGrid.Td>
								<DataGrid.Td>{user.email}</DataGrid.Td>
							</DataGrid.Row>
						{/each}
					</DataGrid.Body>
				</DataGrid.Root>
				<p class="text-muted-foreground text-sm">Selected: {selectedIds.join(', ') || 'none'}</p>
			</div>
		</DocExample>

		<DocExample title="Sortable Columns" description="DataGrid with click-to-sort column headers" code={metadata.examples.sortable}>
			<DataGrid.Root>
				<DataGrid.Header>
					<DataGrid.Row header>
						<DataGrid.Column sortable="name">Name</DataGrid.Column>
						<DataGrid.Column sortable="email">Email</DataGrid.Column>
						<DataGrid.Column>Role</DataGrid.Column>
					</DataGrid.Row>
				</DataGrid.Header>
				<DataGrid.Body>
					{#each users as user (user.id)}
						<DataGrid.Row value={user.id}>
							<DataGrid.Td>{user.name}</DataGrid.Td>
							<DataGrid.Td>{user.email}</DataGrid.Td>
							<DataGrid.Td>{user.role}</DataGrid.Td>
						</DataGrid.Row>
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
				class="h-96 gap-0 overflow-hidden"
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
							<DataGrid.Row value={item.id}>
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
							</DataGrid.Row>
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
		<DocOnly for="html">
			<ATabs.Root value={apiTabs[0]?.value ?? 'datagrid-root'} class="mt-2">
				<ATabs.Header class="border-b overflow-x-auto scrollbar-none">
					{#each apiTabs as tab, i (i)}
						<Tab.Root value={tab.value}>
							<Tab.Header class="px-3 py-2 text-xs">{tab.label}</Tab.Header>
							<Tab.Body>
								<p class="text-muted-foreground mb-3 text-xs">Preset Key: {tab.presetKey}</p>
								<DocProps data={tab.props} />
							</Tab.Body>
						</Tab.Root>
					{/each}
				</ATabs.Header>
				<ATabs.Body class="max-w-full overflow-hidden">
					<ATabs.Content class="pt-4 max-w-full overflow-hidden" />
				</ATabs.Body>
			</ATabs.Root>
		</DocOnly>

		{#each apiTabs as tab, i (i)}
			<DocOnly for="markdown">
{newLine(2)}### {tab.label}

**Preset Key:** `{tab.presetKey}`

</DocOnly>
			<DocOnly for="markdown"><DocProps data={tab.props} /></DocOnly>
		{/each}
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
