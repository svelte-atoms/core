<script lang="ts">
	import { Slider } from '$lib/components/slider';

	let value = $state(42);
</script>

<div class="space-y-2">
	<Slider bind:value min={0} max={100} step={1} class="min-w-40" />
	<p class="text-muted-foreground text-sm">Value: {value}</p>
</div>
