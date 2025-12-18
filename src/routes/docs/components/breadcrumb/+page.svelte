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
		Props,
		CodeBlock
	} from '$docs/components';
	import breadcrumbProps from './props';

	const basicCode = `<Breadcrumb.Root>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
</Breadcrumb.Root>`;

	const customSeparatorCode = `<Breadcrumb.Root>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Separator>></Breadcrumb.Separator>
  <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
  <Breadcrumb.Separator>></Breadcrumb.Separator>
  <Breadcrumb.Item>Components</Breadcrumb.Item>
</Breadcrumb.Root>`;
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
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'breadcrumb': () => ({
    class: 'flex items-center gap-1 text-sm'
  }),
  'breadcrumb.item': () => ({
    class: 'hover:text-primary rounded-lg px-2 py-1 hover:bg-primary/5'
  }),
  'breadcrumb.separator': () => ({
    class: 'text-muted-foreground px-0'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different breadcrumb variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Breadcrumb"
				description="Simple breadcrumb navigation"
				code={basicCode}
			>
				<BreadcrumbComponent.Root>
					<BreadcrumbComponent.Item href="/">Home</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator>/</BreadcrumbComponent.Separator>
					<BreadcrumbComponent.Item href="/docs/components">Components</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator>/</BreadcrumbComponent.Separator>
					<BreadcrumbComponent.Item>Breadcrumb</BreadcrumbComponent.Item>
				</BreadcrumbComponent.Root>
			</DemoExample>

			<DemoExample
				title="Custom Separator"
				description="Use custom separator between items"
				code={customSeparatorCode}
			>
				<BreadcrumbComponent.Root>
					<BreadcrumbComponent.Item href="/">Home</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator>></BreadcrumbComponent.Separator>
					<BreadcrumbComponent.Item href="/docs">Docs</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator>></BreadcrumbComponent.Separator>
					<BreadcrumbComponent.Item>Components</BreadcrumbComponent.Item>
				</BreadcrumbComponent.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container for breadcrumb navigation.
				</p>
				<Props data={breadcrumbProps.root} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Individual breadcrumb link or text item.
				</p>
				<Props data={breadcrumbProps.item} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Separator</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Visual separator between breadcrumb items.
				</p>
				<Props data={breadcrumbProps.separator} />
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
