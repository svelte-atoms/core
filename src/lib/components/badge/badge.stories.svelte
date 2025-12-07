<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge as BadgeModule } from '.';

	const { Story } = defineMeta({
		title: 'ATOMS/Badge'
	});
</script>

<Story name="Badge">
	<BadgeModule>Badge</BadgeModule>
</Story>
