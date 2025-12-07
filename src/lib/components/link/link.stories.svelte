<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkComponent from './link.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Link'
	});
</script>

<script>
</script>

<Story name="Link">
	<LinkComponent>Hello World</LinkComponent>
</Story>
