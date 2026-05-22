<script lang="ts">
	import { ProgressLinear } from '$lib/components/progress';

	let progressVal = $state(0);

	$effect(() => {
		const t = setTimeout(() => {
			progressVal = 72;
		}, 600);
		return () => clearTimeout(t);
	});
</script>

<div class="w-52 flex flex-col gap-2">
	<div class="flex justify-between text-xs text-muted-foreground">
		<span>Uploading files</span>
		<span class="font-medium">{progressVal}%</span>
	</div>
	<ProgressLinear value={progressVal} max={100} class="transition-all duration-[1200ms] ease-out" />
	<p class="text-xs text-muted-foreground">3 of 4 files processed</p>
</div>
