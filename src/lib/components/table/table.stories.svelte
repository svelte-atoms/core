<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Table'
	});
</script>

<script lang="ts">
	import { Table } from '.';

	type Invoice = { id: string; status: 'paid' | 'pending' | 'failed'; method: string; amount: number };

	const invoices: Invoice[] = [
		{ id: 'INV001', status: 'paid',    method: 'Credit Card',   amount: 250 },
		{ id: 'INV002', status: 'pending', method: 'PayPal',        amount: 150 },
		{ id: 'INV003', status: 'failed',  method: 'Bank Transfer', amount: 350 },
		{ id: 'INV004', status: 'paid',    method: 'Credit Card',   amount: 450 },
		{ id: 'INV005', status: 'pending', method: 'PayPal',        amount: 550 },
	];

	const total = $derived(invoices.reduce((s, i) => s + i.amount, 0));

	type SortKey = 'id' | 'method' | 'amount';
	let sortKey = $state<SortKey>('id');
	let sortDir = $state<'asc' | 'desc'>('asc');

	function toggleSort(key: SortKey) {
		if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		else { sortKey = key; sortDir = 'asc'; }
	}

	const sorted = $derived([...invoices].sort((a, b) => {
		const mul = sortDir === 'asc' ? 1 : -1;
		if (a[sortKey] < b[sortKey]) return -1 * mul;
		if (a[sortKey] > b[sortKey]) return  1 * mul;
		return 0;
	}));

	function sortState(key: SortKey): 'asc' | 'desc' | 'none' {
		return sortKey === key ? sortDir : 'none';
	}

	const statusColors: Record<Invoice['status'], string> = {
		paid:    'bg-emerald-100 text-emerald-800',
		pending: 'bg-amber-100 text-amber-800',
		failed:  'bg-red-100 text-red-800',
	};
</script>

<Story name="Basic">
	{#snippet template()}
		<Table.Root class="max-w-2xl">
			<Table.Caption>Recent invoices</Table.Caption>
			<Table.Header>
				<Table.Tr>
					<Table.Th>Invoice</Table.Th>
					<Table.Th>Status</Table.Th>
					<Table.Th>Method</Table.Th>
					<Table.Th class="text-right">Amount</Table.Th>
				</Table.Tr>
			</Table.Header>
			<Table.Body>
				{#each invoices as inv}
					<Table.Tr>
						<Table.Td class="font-medium">{inv.id}</Table.Td>
						<Table.Td>
							<span class={['rounded-full px-2 py-0.5 text-xs font-medium capitalize', statusColors[inv.status]].join(' ')}>
								{inv.status}
							</span>
						</Table.Td>
						<Table.Td>{inv.method}</Table.Td>
						<Table.Td class="text-right">${inv.amount.toFixed(2)}</Table.Td>
					</Table.Tr>
				{/each}
			</Table.Body>
			<Table.Footer>
				<Table.Tr>
					<Table.Td colspan={3} class="font-medium">Total</Table.Td>
					<Table.Td class="text-right font-medium">${total.toFixed(2)}</Table.Td>
				</Table.Tr>
			</Table.Footer>
		</Table.Root>
	{/snippet}
</Story>

<Story name="Sortable">
	{#snippet template()}
		<Table.Root class="max-w-2xl">
			<Table.Header>
				<Table.Tr>
					<Table.Th sort={sortState('id')} onclick={() => toggleSort('id')}>Invoice</Table.Th>
					<Table.Th>Status</Table.Th>
					<Table.Th sort={sortState('method')} onclick={() => toggleSort('method')}>Method</Table.Th>
					<Table.Th sort={sortState('amount')} onclick={() => toggleSort('amount')} class="text-right">Amount</Table.Th>
				</Table.Tr>
			</Table.Header>
			<Table.Body>
				{#each sorted as inv}
					<Table.Tr>
						<Table.Td class="font-medium">{inv.id}</Table.Td>
						<Table.Td>
							<span class={['rounded-full px-2 py-0.5 text-xs font-medium capitalize', statusColors[inv.status]].join(' ')}>
								{inv.status}
							</span>
						</Table.Td>
						<Table.Td>{inv.method}</Table.Td>
						<Table.Td class="text-right">${inv.amount.toFixed(2)}</Table.Td>
					</Table.Tr>
				{/each}
			</Table.Body>
		</Table.Root>
	{/snippet}
</Story>
