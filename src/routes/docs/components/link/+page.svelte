<script lang="ts">
	import { Link } from '$lib/components/link';
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
	import { linkProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, external: externalCode, variants: variantsCode, sizes: sizesCode, preset: presetCode } = metadata.examples;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
	<Breadcrumb items={metadata.breadcrumbs} />

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
			<Section.Subtitle>Customize the link appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Link components by defining presets in your
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
			<Section.Subtitle>Explore different link variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Link" description="Simple internal link" code={basicCode}>
				<Link href="/docs">Documentation</Link>
			</DemoExample>

			<DemoExample title="External Link" description="Link to external website" code={externalCode}>
				<Link href="https://github.com" target="_blank" rel="noopener noreferrer">
					Visit GitHub →
				</Link>
			</DemoExample>

			<DemoExample title="Link Variants" description="Different link styles" code={variantsCode}>
				<div class="space-x-4">
					<Link variant="default" href="/docs">Default Link</Link>
					<Link variant="muted" href="/docs">Muted Link</Link>
					<Link variant="underline" href="/docs">Underlined Link</Link>
				</div>
			</DemoExample>

			<DemoExample
				title="Link Sizes"
				description="Different link sizes"
				code={sizesCode}
			>
				<div class="flex items-center space-x-4">
					<Link size="sm" href="/docs">Small</Link>
					<Link size="md" href="/docs">Medium</Link>
					<Link size="lg" href="/docs">Large</Link>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Link Props</h3>
				<Props data={linkProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Label', href: '/docs/components/label' }}
		next={{ label: 'List', href: '/docs/components/list' }}
	/>
</div>
