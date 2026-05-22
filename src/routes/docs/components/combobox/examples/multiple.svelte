<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import { Input } from '$lib/components/input';

	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	let multiValues = $state<string[]>([]);
	let multiLabels = $state<string[]>([]);
</script>

<div class="w-64">
	<Combobox.Root bind:values={multiValues} bind:labels={multiLabels} multiple>
		<Combobox.Trigger base={Input.Root} class="flex h-auto min-h-10 flex-col items-start gap-2">
			<Combobox.Control placeholder="Select multiple options..." />
			<Combobox.Selections />
		</Combobox.Trigger>
		<Combobox.Content>
			{#each options as option, i (i)}
				<Combobox.Item value={option.value}>{option.label}</Combobox.Item>
			{/each}
		</Combobox.Content>
	</Combobox.Root>
</div>
