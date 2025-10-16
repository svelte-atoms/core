<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { Badge as BadgeModule } from '.';

	const { Story } = defineMeta({
		title: 'ATOMS/Badge'
	});
</script>

<Story name="Badge">
	<Root>
		{#snippet children({ args })}
			<BadgeModule>Badge</BadgeModule>
		{/snippet}
	</Root>
</Story>
