<script lang="ts">
	import { Slider } from '$lib/components/slider';

	let sliderVal = $state(55);
</script>

<div class="w-52 flex flex-col gap-2">
	<Slider bind:value={sliderVal} min={0} max={100} step={1} />
	<div class="flex justify-between text-xs text-muted-foreground">
		<span>Volume</span>
		<span class="font-medium">{sliderVal}%</span>
	</div>
</div>
