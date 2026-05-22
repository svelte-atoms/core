<script lang="ts">
	import { Radio } from '$lib/components/radio';

	let groupValue = $state<string>('option1');
</script>

<div class="space-y-3">
	<div class="flex items-center gap-2">
		<Radio id="opt1" name="plan" value="option1" bind:group={groupValue} />
		<label for="opt1">Option 1</label>
	</div>
	<div class="flex items-center gap-2">
		<Radio id="opt2" name="plan" value="option2" bind:group={groupValue} />
		<label for="opt2">Option 2</label>
	</div>
	<div class="flex items-center gap-2">
		<Radio id="opt3" name="plan" value="option3" bind:group={groupValue} />
		<label for="opt3">Option 3</label>
	</div>
	<p class="text-muted-foreground text-sm">Selected: {groupValue}</p>
</div>
