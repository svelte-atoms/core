<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Atoms/Lazy'
	});
</script>

<script lang="ts">
	import Lazy from './lazy.svelte';
	import { delay } from 'es-toolkit';
</script>

<Story name="Lazy">
	<Lazy
		promise={import('../button/button.svelte').then(async res=> {
                    await delay(1000 * 2);

                    return res.default;
                })}
	>
		Hello World

		{#snippet loading()}
			<span>Loading...</span>
		{/snippet}
	</Lazy>
</Story>
