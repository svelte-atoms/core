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
	import { metadata } from './shared';

	const { basic: basicCode, customSeparator: customSeparatorCode, preset: presetCode } = metadata.examples;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
	<Breadcrumb
		items={metadata.breadcrumbs}
	/>

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the breadcrumb appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Breadcrumb components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={presetCode}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different breadcrumb variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Breadcrumb"
				description="Simple breadcrumb navigation"
				code={basicCode}
			>
				<BreadcrumbComponent.Root>
					<BreadcrumbComponent.Item href="/">Home</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator />
					<BreadcrumbComponent.Item href="/docs/components">Components</BreadcrumbComponent.Item>
					<BreadcrumbComponent.Separator />
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for breadcrumb navigation.</p>
				<Props data={breadcrumbProps.root} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">Individual breadcrumb link or text item.</p>
				<Props data={breadcrumbProps.item} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Breadcrumb.Separator</h3>
				<p class="text-muted-foreground mb-4 text-sm">Visual separator between breadcrumb items.</p>
				<Props data={breadcrumbProps.separator} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Uses nav element with aria-label',
				'Semantic ordered list structure',
				'Current page indicated with aria-current',
				'Keyboard navigable links',
				'Screen reader friendly structure'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Badge', href: '/docs/components/badge' }}
		next={{ label: 'Button', href: '/docs/components/button' }}
	/>
</div>
