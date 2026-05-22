<script lang="ts">
	import { Checkbox } from '$lib/components/checkbox';

	let group = $state<string[]>([]);
</script>

<div class="space-y-3">
	<div class="flex items-center gap-2">
		<Checkbox id="opt1" value="newsletter" bind:group />
		<label for="opt1">Newsletter updates</label>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="opt2" value="marketing" bind:group />
		<label for="opt2">Marketing emails</label>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="opt3" value="products" bind:group />
		<label for="opt3">Product announcements</label>
	</div>
	<p class="text-muted-foreground text-sm">Selected: {group.join(', ') || 'none'}</p>
</div>
