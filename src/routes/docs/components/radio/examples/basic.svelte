<script lang="ts">
	import { Radio } from '$lib/components/radio';

	let singleValue = $state<string>('');
</script>

<div class="flex items-center gap-2">
	<Radio id="basic-radio" name="basic" value="yes" bind:group={singleValue} />
	<label for="basic-radio">Yes</label>
</div>
