<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DataGrid as DataGridCmp } from '.';
	import { Select } from '$svelte-atoms/core/components/select';
	import MoreVerticalIcon from '$svelte-atoms/core/icons/icon-more-vert.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { container } from '$svelte-atoms/core/runes/container.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/DataGrid'
	});
</script>

<script lang="ts">
	let values = $state<string[]>([]);

	const teamMembers = [
		{ id: '1', name: 'Alice Chen',   email: 'alice@acme.io',  role: 'Product Designer',    department: 'Design',         initials: 'AC', color: 'bg-violet-500', status: 'active' as const },
		{ id: '2', name: 'Bob Martinez', email: 'bob@acme.io',    role: 'Frontend Engineer',   department: 'Engineering',    initials: 'BM', color: 'bg-blue-500',   status: 'active' as const },
		{ id: '3', name: 'Carol Kim',    email: 'carol@acme.io',  role: 'Engineering Manager', department: 'Engineering',    initials: 'CK', color: 'bg-emerald-500',status: 'busy'   as const },
		{ id: '4', name: 'David Ross',   email: 'david@acme.io',  role: 'Backend Engineer',    department: 'Engineering',    initials: 'DR', color: 'bg-rose-500',   status: 'active' as const },
		{ id: '5', name: 'Eva Wright',   email: 'eva@acme.io',    role: 'UX Researcher',       department: 'Design',         initials: 'EW', color: 'bg-amber-500',  status: 'away'   as const },
		{ id: '6', name: 'Frank Garcia', email: 'frank@acme.io',  role: 'DevOps Engineer',     department: 'Infrastructure', initials: 'FG', color: 'bg-cyan-500',   status: 'active' as const },
		{ id: '7', name: 'Grace Lee',    email: 'grace@acme.io',  role: 'Product Manager',     department: 'Product',        initials: 'GL', color: 'bg-pink-500',   status: 'busy'   as const }
	];

	const statusConfig = {
		active: { label: 'Active', dot: 'bg-green-500' },
		busy:   { label: 'Busy',   dot: 'bg-amber-500' },
		away:   { label: 'Away',   dot: 'bg-muted-foreground/40' }
	};

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

	const datagridContainer = container();
</script>

<Story name="DataGrid">
	{#snippet template()}
		<DataGridCmp.Root class="" {@attach datagridContainer.attach}>
			<DataGridCmp.Header>
				<DataGridCmp.Tr header>
					<DataGridCmp.Th width="auto">
						<DataGridCmp.Checkbox />
					</DataGridCmp.Td>

					<DataGridCmp.Td>
						<div class="flex items-center gap-3">
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white {member.color}"
							>
								{member.initials}
							</div>
							<div class="min-w-0">
								<div class="truncate text-sm font-medium text-foreground">{member.name}</div>
								<div class="truncate text-xs text-muted-foreground">{member.email}</div>
							</div>
						</div>
					</DataGridCmp.Td>

					<DataGridCmp.Td>
						<div class="flex flex-col gap-0.5">
							<span class="text-sm text-foreground">{member.role}</span>
							<span class="text-xs text-muted-foreground">{member.department}</span>
						</div>
					</DataGridCmp.Td>

					<DataGridCmp.Td>
						{@const cfg = statusConfig[member.status]}
						<span class="inline-flex items-center gap-1.5 text-sm">
							<span class="size-2 rounded-full {cfg.dot}"></span>
							{cfg.label}
						</span>
					</DataGridCmp.Td>

					<DataGridCmp.Td base={Select.Root} placement="bottom-end" offset={0}>
						<Select.Trigger class="flex aspect-square items-center justify-center p-0">
							<Icon src={MoreVerticalIcon} />
						</Select.Trigger>
						<Select.List>
							<Select.Item value="view">View Profile</Select.Item>
							<Select.Item value="edit">Edit</Select.Item>
							<Select.Item value="remove">Remove</Select.Item>
						</Select.List>
					</DataGridCmp.Td>
				</DataGridCmp.Tr>
			{/each}
		</DataGridCmp.Body>

		<DataGridCmp.Footer>
			<span class="text-xs text-muted-foreground">
				{values.length > 0
					? `${values.length} of ${teamMembers.length} selected`
					: `${teamMembers.length} members`}
			</span>
		</DataGridCmp.Footer>
	</DataGridCmp.Root>
</Story>

<Story name="Row-Spanning Side Column">
	<DataGridCmp.Root
		class="h-112 gap-0"
		{@attach (node: HTMLElement) => {
			node.style.gridTemplateRows = 'auto 1fr auto';
		}}
	>
		<DataGridCmp.Header class="h-min border-x-0 border-t-0">
			<DataGridCmp.Tr class="h-min" header>
				<DataGridCmp.Th width="44px" />
				<DataGridCmp.Th width="auto" class="pl-4">SKU Code</DataGridCmp.Th>
				<DataGridCmp.Th width="auto">Store</DataGridCmp.Th>
				<DataGridCmp.Th width="1fr">Product Name</DataGridCmp.Th>
				<DataGridCmp.Th width="auto">Category</DataGridCmp.Th>
			</DataGridCmp.Tr>
		</DataGridCmp.Header>

		<DataGridCmp.Body class="col-span-full grid grid-cols-subgrid">
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
					<DataGridCmp.Tr>
						<DataGridCmp.Td class="font-mono text-xs font-semibold text-primary">
							{item.code}
						</DataGridCmp.Td>
						<DataGridCmp.Td>{item.store}</DataGridCmp.Td>
						<DataGridCmp.Td class="font-medium">{item.name}</DataGridCmp.Td>
						<DataGridCmp.Td>
							<span
								class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
							>
								{item.category}
							</span>
						</DataGridCmp.Td>
					</DataGridCmp.Tr>
				{/each}
			</div>
		</DataGridCmp.Body>

		<DataGridCmp.Footer class="col-span-full border-t border-border px-3 py-2 text-xs text-muted-foreground">
			Row-spanning first column (A-Z rail) + subgrid-aligned content rows
		</DataGridCmp.Footer>
	</DataGridCmp.Root>
</Story>
