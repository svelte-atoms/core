<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Breadcrumb as BreadcrumbModule } from '.';

	const { Story } = defineMeta({
		title: 'ATOMS/Breadcrumb'
	});
</script>

<Story name="Breadcrumb">
	<BreadcrumbModule.Root>
		<BreadcrumbModule.Item href="/">Home</BreadcrumbModule.Item>
		<BreadcrumbModule.Separator>/</BreadcrumbModule.Separator>
		<BreadcrumbModule.Item href="/vehicles">Vehicles</BreadcrumbModule.Item>
	</BreadcrumbModule.Root>
</Story>
