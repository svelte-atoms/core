<script>
	let { data = [] } = $props();
</script>

<div class="overflow-x-auto">
	<table class="w-full text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Prop</th>
				<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Type</th>
				<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Default</th>
				<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each data as item, i (i)}
				<tr class="border-border/50 border-b">
					<td class="text-foreground px-4 py-3 font-mono text-sm">{item.name}</td>
					<td class="text-muted-foreground px-4 py-3 font-mono text-xs">{item.type}</td>
					<td class="text-muted-foreground px-4 py-3 font-mono text-xs">{item.default}</td>
					<td class="text-foreground/80 px-4 py-3 text-sm">{item.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
