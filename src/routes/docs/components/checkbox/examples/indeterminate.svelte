<script lang="ts">
	import { Checkbox } from '$lib/components/checkbox';

	let checked = $state(false);
	let indeterminate = $state(true);
</script>

<div class="flex items-center gap-2">
	<Checkbox bind:checked bind:indeterminate />
	<span>Partially selected</span>
</div>
