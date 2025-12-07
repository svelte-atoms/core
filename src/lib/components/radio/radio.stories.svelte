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
	<RadioModule class="size-5" />
</Story>
