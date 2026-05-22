<script lang="ts">
	import { Slider } from '$lib/components/slider';

	let temperature = $state(22);
</script>

<div class="space-y-2">
	<Slider bind:value={temperature} min={-20} max={40} step={0.5} class="min-w-40" />
	<p class="text-muted-foreground text-sm">Temperature: {temperature}°C</p>
</div>
