<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Atoms/Stack',
		parameters: {
			layout: 'centered'
		},
		args: {}
	});
</script>

<script lang="ts">
	import { Stack } from '.';
	import type { StackBond } from './bond.svelte';
	import { Button } from '$lib/components/button';

	const items = [
		{ id: 'red',    label: 'Red',    bg: 'bg-red-400',    offset: 'top-0 left-0' },
		{ id: 'blue',   label: 'Blue',   bg: 'bg-blue-400',   offset: 'top-8 left-8' },
		{ id: 'green',  label: 'Green',  bg: 'bg-green-400',  offset: 'top-16 left-16' },
		{ id: 'yellow', label: 'Yellow', bg: 'bg-yellow-400', offset: 'top-24 left-24' },
		{ id: 'purple', label: 'Purple', bg: 'bg-purple-400', offset: 'top-32 left-32' }
	];

	let selected = $state('red');
	let root: { getBond: () => StackBond } | undefined = $state();
	const bond = $derived(root?.getBond());

	function label(id: string) {
		return items.find((i) => i.id === id)?.label ?? id;
	}
</script>

<Story name="Stack">
	<!-- controls panel -->
	<div class="flex flex-col gap-6 p-6 w-160">
		<!-- item selector -->
		<div class="flex flex-wrap gap-2">
			{#each items as item (item.id)}
				<button
					class={[
						'px-3 py-1 rounded text-white text-sm font-medium transition-all',
						item.bg,
						selected === item.id ? 'ring-2 ring-offset-2 ring-black scale-105' : 'opacity-70'
					]}
					onclick={() => (selected = item.id)}
				>
					{item.label}
				</button>
			{/each}
		</div>

		<!-- action buttons -->
		<div class="flex flex-wrap gap-2">
			<Button variant="outline" size="sm" onclick={() => bond?.state.bringToFront(selected)}>
				Bring to Front
			</Button>
			<Button variant="outline" size="sm" onclick={() => bond?.state.bringForward(selected)}>
				Bring Forward
			</Button>
			<Button variant="outline" size="sm" onclick={() => bond?.state.sendBackward(selected)}>
				Send Backward
			</Button>
			<Button variant="outline" size="sm" onclick={() => bond?.state.sendToBack(selected)}>
				Send to Back
			</Button>
		</div>

		<!-- stack canvas -->
		<div class="relative border rounded-lg bg-muted overflow-hidden" style="height: 280px; width: 100%;">
			<Stack.Root bind:this={root} class="w-full h-full">
				{#each items as item (item.id)}
					<Stack.Item
						id={item.id}
						class="rounded-xl flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg transition-all {item.bg} {item.offset} {selected === item.id ? 'ring-4 ring-white ring-offset-2' : ''}"
						onclick={() => (selected = item.id)}
					>
						{item.label}
						<span class="absolute bottom-1 right-2 text-xs opacity-70">
							z: {bond?.state.getZIndex(item.id)}
						</span>
					</Stack.Item>
				{/each}
			</Stack.Root>
		</div>

		<!-- current order indicator -->
		<div class="flex items-center gap-2 text-sm text-muted-foreground">
			<span class="font-medium text-foreground">Back → Front:</span>
			{#each (bond?.state.items ?? []).map(item => label(item.id)) as name, i (i)}
				<span
					class={[
						'px-2 py-0.5 rounded text-xs font-medium',
						name.toLowerCase() === selected ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
					]}
				>
					{name}
				</span>
				{#if i < (bond?.state.items.length ?? 0) - 1}
					<span>›</span>
				{/if}
			{/each}
		</div>
	</div>
</Story>
