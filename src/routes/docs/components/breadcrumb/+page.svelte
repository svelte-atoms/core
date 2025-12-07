<script lang="ts">
	import { Breadcrumb as BreadcrumbComponent } from '$lib/components/breadcrumb';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props
	} from '$docs/components';

	const basicCode = `<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' }
  ]} 
/>`;

	const customSeparatorCode = `<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components' }
  ]}
  separator=">"
/>`;
</script>

<svelte:head>
	<title>Breadcrumb - Svelte Atoms</title>
	<meta name="description" content="Navigation component showing page hierarchy." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'Breadcrumb' }]}
	/>

	<PageHeader
		title="Breadcrumb"
		description="Navigation component that displays the user's location within the app hierarchy."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Breadcrumb &#125; from '@svelte-atoms/core/breadcrumb';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the breadcrumb appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Breadcrumb components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  breadcrumb: () => ({
    class: 'flex items-center space-x-1 text-sm text-muted-foreground'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different breadcrumb variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Breadcrumb"
				description="Simple breadcrumb navigation"
				code={basicCode}
			>
				<BreadcrumbComponent
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Components', href: '/docs/components' },
						{ label: 'Breadcrumb' }
					]}
				/>
			</DemoExample>

			<DemoExample
				title="Custom Separator"
				description="Use custom separator between items"
				code={customSeparatorCode}
			>
				<BreadcrumbComponent
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Docs', href: '/docs' },
						{ label: 'Components' }
					]}
					separator=">"
				/>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb Props</h3>
				<Props
					data={[
						{
							name: 'items',
							type: 'Array<{ label: string, href?: string }>',
							default: '[]',
							description: 'Breadcrumb items to display'
						},
						{
							name: 'separator',
							type: 'string',
							default: "'/'",
							description: 'Separator between items'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Uses nav element with aria-label',
				'Semantic ordered list structure',
				'Current page indicated with aria-current',
				'Keyboard navigable links',
				'Screen reader friendly structure'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Badge', href: '/docs/components/badge' }}
		next={{ label: 'Button', href: '/docs/components/button' }}
	/>
</div>
