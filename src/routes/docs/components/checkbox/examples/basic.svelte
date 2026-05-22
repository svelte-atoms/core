<script lang="ts">
	import { Checkbox } from '$lib/components/checkbox';

	let checked = $state(false);
</script>

<div class="flex items-center gap-2">
	<Checkbox id="basic-demo" bind:checked />
	<label for="basic-demo">Accept terms and conditions</label>
</div>
