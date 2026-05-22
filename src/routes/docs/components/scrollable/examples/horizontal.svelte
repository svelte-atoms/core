<script lang="ts">
	import { Scrollable } from '$lib/components/scrollable';
	const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
</script>

<Scrollable.Root class="w-64 rounded-lg border" orientation="horizontal">
	<Scrollable.Container>
		<Scrollable.Content class="flex w-max gap-4 p-4">
			{#each items as item (item)}
				<div class="border-border w-24 shrink-0 rounded border p-3 text-center text-sm">{item}</div>
			{/each}
		</Scrollable.Content>
	</Scrollable.Container>
	<Scrollable.Track orientation="horizontal">
		<Scrollable.Thumb orientation="horizontal" />
	</Scrollable.Track>
</Scrollable.Root>
