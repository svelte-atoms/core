<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as SpinnerCmp } from './spinner.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Spinner'
	});
</script>

<Story name="Default">
	{#snippet children()}
		<SpinnerCmp />
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet children()}
		<SpinnerCmp>Loading data…</SpinnerCmp>
	{/snippet}
</Story>

<Story name="Custom Indicator">
	{#snippet children()}
		<SpinnerCmp>
			{#snippet indicatorContent()}
				<span
					class="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent"
				></span>
			{/snippet}
			Custom spinner
		</SpinnerCmp>
	{/snippet}
</Story>
