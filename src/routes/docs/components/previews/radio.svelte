<script lang="ts">
	import { Radio } from '$lib/components/radio';

	let radioGroup = $state('opt-a');
</script>

<div class="flex flex-col gap-2.5">
	{#each [['opt-a', 'Starter'], ['opt-b', 'Pro'], ['opt-c', 'Enterprise']] as [value, label] (value)}
		<div class="flex items-center gap-2">
			<Radio id="prev-r-{value}" name="prev-plan" {value} bind:group={radioGroup} />
			<label for="prev-r-{value}" class="text-sm cursor-pointer select-none">{label}</label>
		</div>
	{/each}
</div>
