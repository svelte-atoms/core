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
		Props
	} from '$docs/components';

	const basicCode = `<Link href="/about">About Us</Link>`;

	const externalCode = `<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example
</Link>`;

	const variantsCode = `<Link variant="default">Default Link<\/Link>
<Link variant="muted">Muted Link<\/Link>
<Link variant="underline">Underlined Link<\/Link>`;
</script>

<svelte:head>
	<title>Link - Svelte Atoms</title>
	<meta name="description" content="Accessible navigation links." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Link' }]} />

	<PageHeader
		title="Link"
		description="Accessible navigation links for internal and external destinations."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Link &#125; from '@svelte-atoms/core/link';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the link appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Link components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  link: () => ({
    class: 'text-primary underline-offset-4 hover:underline transition-colors',
    variants: {
      variant: {
        default: { class: 'text-primary' },
        muted: { class: 'text-muted-foreground' },
        destructive: { class: 'text-destructive' }
      }
    },
    defaults: {
      variant: 'default'
    }
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different link variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Link"
				description="Simple internal link"
				code={basicCode}
			>
				<Link href="/docs">Documentation</Link>
			</DemoExample>

			<DemoExample
				title="External Link"
				description="Link to external website"
				code={externalCode}
			>
				<Link href="https://github.com" target="_blank" rel="noopener noreferrer">
					Visit GitHub →
				</Link>
			</DemoExample>

			<DemoExample
				title="Link Variants"
				description="Different link styles"
				code={variantsCode}
			>
				<div class="space-x-4">
					<Link variant="default" href="/docs">Default Link</Link>
					<Link variant="muted" href="/docs">Muted Link</Link>
					<Link variant="underline" href="/docs">Underlined Link</Link>
				</div>
			</DemoExample>

			<DemoExample
				title="Link Sizes"
				description="Different link sizes"
				code={`<Link size="sm">Small Link</Link>
<Link size="md">Medium Link</Link>
<Link size="lg">Large Link</Link>`}
			>
				<div class="space-x-4 flex items-center">
					<Link size="sm" href="/docs">Small</Link>
					<Link size="md" href="/docs">Medium</Link>
					<Link size="lg" href="/docs">Large</Link>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Link Props</h3>
				<Props
					data={[
						{
							name: 'href',
							type: 'string',
							default: "'#'",
							description: 'Link destination'
						},
						{
							name: 'variant',
							type: "'default' | 'muted' | 'underline'",
							default: "'default'",
							description: 'Link style'
						},
						{
							name: 'size',
							type: "'sm' | 'md' | 'lg'",
							default: "'md'",
							description: 'Link size'
						},
						{
							name: 'target',
							type: 'string',
							default: '-',
							description: 'Link target (_blank, etc.)'
						},
						{
							name: 'rel',
							type: 'string',
							default: '-',
							description: 'Link relationship'
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
				'Use meaningful link text',
				'Add rel="noopener noreferrer" for external links',
				'Ensure sufficient color contrast',
				'Make focused links clearly visible',
				'Screen reader friendly navigation'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Label', href: '/docs/components/label' }}
		next={{ label: 'List', href: '/docs/components/list' }}
	/>
</div>
