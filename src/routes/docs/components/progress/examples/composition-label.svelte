<script lang="ts">
	import { ProgressLinear } from '$lib/components/progress';
</script>

<div class="flex w-72 flex-col gap-1">
	<ProgressLinear value={80} />
	<span class="text-primary text-xs font-bold">80 / 100 MB</span>
</div>
