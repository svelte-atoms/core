<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as SpinnerCmp } from './spinner.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Spinner'
	});
</script>

<Story name="Variants">
	{#snippet children()}
		<div class="flex items-center gap-8">
			<SpinnerCmp variant="ring" />
			<SpinnerCmp variant="dots" />
			<SpinnerCmp variant="bars" />
			<SpinnerCmp variant="pulse" />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet children()}
		<div class="flex items-center gap-6">
			<SpinnerCmp size="xs" />
			<SpinnerCmp size="sm" />
			<SpinnerCmp size="md" />
			<SpinnerCmp size="lg" />
			<SpinnerCmp size="xl" />
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet children()}
		<div class="flex flex-col gap-4">
			<SpinnerCmp variant="ring" size="md">Loading data…</SpinnerCmp>
			<SpinnerCmp variant="dots" size="sm">Please wait</SpinnerCmp>
		</div>
	{/snippet}
</Story>

<Story name="Custom Indicator">
	{#snippet children()}
		<SpinnerCmp>
			{#snippet indicatorContent()}
				<!-- Custom CSS border spinner -->
				<span
					class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-current border-t-transparent"
				></span>
			{/snippet}
			Custom spinner
		</SpinnerCmp>
	{/snippet}
</Story>
