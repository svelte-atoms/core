<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as LabelCmp } from './label.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Label'
	});
</script>

<script>
</script>

<Story name="Label">
	<LabelCmp>Hello World</LabelCmp>
</Story>
