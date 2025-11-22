<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Atoms/Lazy'
	});
</script>

<script lang="ts">
	import Lazy from './lazy.svelte';
	import { Root } from '../root';
	import { delay } from 'es-toolkit';
</script>

<Story name="Lazy">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<Lazy
					promise={import('../button/button.svelte').then(async res=> {
                    await delay(1000 * 5);

                    return res.default;
                })}
				>
					Hello World

					{#snippet loading()}
						<span>Loading...</span>
					{/snippet}
				</Lazy>
			{/snippet}
		</Root>
	{/snippet}
</Story>
