<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as RadioModule } from './radio.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Radio'
	});
</script>

<script>
	let value = $state(undefined);
	let checked = $state(false);
</script>

<Story name="Radio">
	<div class="flex items-center gap-4">
		<RadioModule class="size-5" value="option1" bind:group={value} />
		<RadioModule class="size-5" value="option2" bind:group={value} />
		<RadioModule class="size-5" value="option3" bind:group={value} />
	</div>
	<p class="mt-4 text-sm">Selected: {value ?? 'none'}</p>
</Story>
