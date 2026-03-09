<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Table'
	});
</script>

<script lang="ts">
	import { Table } from '.';
	import { Badge } from '../badge';

	type Invoice = { id: string; status: 'paid' | 'pending' | 'failed'; method: string; amount: number };

	const invoices: Invoice[] = [
		{ id: 'INV001', status: 'paid',    method: 'Credit Card',  amount: 250   },
		{ id: 'INV002', status: 'pending', method: 'PayPal',       amount: 150   },
		{ id: 'INV003', status: 'failed',  method: 'Bank Transfer',amount: 350   },
		{ id: 'INV004', status: 'paid',    method: 'Credit Card',  amount: 450   },
		{ id: 'INV005', status: 'pending', method: 'PayPal',       amount: 550   },
	];

	const total = $derived(invoices.reduce((s, i) => s + i.amount, 0));

	// Sorting demo
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
			<Table.Head>
				<Table.Row>
					<Table.Header>Invoice</Table.Header>
					<Table.Header>Status</Table.Header>
					<Table.Header>Method</Table.Header>
					<Table.Header class="text-right">Amount</Table.Header>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{#each invoices as inv}
					<Table.Row>
						<Table.Cell class="font-medium">{inv.id}</Table.Cell>
						<Table.Cell>
							<span class={['rounded-full px-2 py-0.5 text-xs font-medium capitalize', statusColors[inv.status]].join(' ')}>
								{inv.status}
							</span>
						</Table.Cell>
						<Table.Cell>{inv.method}</Table.Cell>
						<Table.Cell class="text-right">${inv.amount.toFixed(2)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
			<Table.Foot>
				<Table.Row>
					<Table.Cell colspan={3} class="font-medium">Total</Table.Cell>
					<Table.Cell class="text-right font-medium">${total.toFixed(2)}</Table.Cell>
				</Table.Row>
			</Table.Foot>
		</Table.Root>
	{/snippet}
</Story>

<Story name="Sortable">
	{#snippet template()}
		<Table.Root class="max-w-2xl">
			<Table.Head>
				<Table.Row>
					<Table.Header sort={sortState('id')} onclick={() => toggleSort('id')}>Invoice</Table.Header>
					<Table.Header>Status</Table.Header>
					<Table.Header sort={sortState('method')} onclick={() => toggleSort('method')}>Method</Table.Header>
					<Table.Header sort={sortState('amount')} onclick={() => toggleSort('amount')} class="text-right">Amount</Table.Header>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{#each sorted as inv}
					<Table.Row>
						<Table.Cell class="font-medium">{inv.id}</Table.Cell>
						<Table.Cell>
							<span class={['rounded-full px-2 py-0.5 text-xs font-medium capitalize', statusColors[inv.status]].join(' ')}>
								{inv.status}
							</span>
						</Table.Cell>
						<Table.Cell>{inv.method}</Table.Cell>
						<Table.Cell class="text-right">${inv.amount.toFixed(2)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/snippet}
</Story>
