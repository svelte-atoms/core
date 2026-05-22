<script lang="ts">
	import { Checkbox } from '$lib/components/checkbox';

	let cb1 = $state(true);
	let cb2 = $state(false);
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center gap-2">
		<Checkbox id="prev-cb1" bind:checked={cb1} />
		<label for="prev-cb1" class="text-sm cursor-pointer select-none">Dark mode</label>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="prev-cb2" bind:checked={cb2} />
		<label for="prev-cb2" class="text-sm cursor-pointer select-none">Notifications</label>
	</div>
</div>
