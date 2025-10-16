<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { Breadcrumb as BreadcrumbModule } from '.';

	const { Story } = defineMeta({
		title: 'ATOMS/Breadcrumb'
	});
</script>

<Story name="Breadcrumb">
	<Root>
		{#snippet children({ args })}
			<BreadcrumbModule.Root>
				<BreadcrumbModule.Item href="/">Home</BreadcrumbModule.Item>
				<BreadcrumbModule.Separator>/</BreadcrumbModule.Separator>
				<BreadcrumbModule.Item href="/vehicles">Vehicles</BreadcrumbModule.Item>
			</BreadcrumbModule.Root>
		{/snippet}
	</Root>
</Story>
