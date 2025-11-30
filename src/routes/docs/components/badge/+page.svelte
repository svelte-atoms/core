<script lang="ts">
	import { Badge } from '$lib/components/badge';
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

	const basicCode = `<Badge>Default</Badge>`;

	const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`;

	const sizesCode = `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`;

	const notificationCode = `<div class="relative inline-block">
  <button class="p-2">
    <Icon name="bell" />
  </button>
  <Badge class="absolute -top-1 -right-1">3</Badge>
</div>`;
</script>

<svelte:head>
	<title>Badge - Svelte Atoms</title>
	<meta name="description" content="Small labels for highlighting status or counts." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Badge' }]} />

	<PageHeader
		title="Badge"
		description="Small labels for highlighting status, counts, or categories. Perfect for notifications and tags."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Badge &#125; from '@svelte-atoms/core/badge';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the badge appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Badge components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  badge: () => ({
    class: 'transition-colors duration-100',
    variants: {
      variant: {
        primary: {
          class: 'bg-primary text-primary-foreground hover:bg-primary/80'
        },
        secondary: {
          class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        },
        destructive: {
          class: 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
        },
        outline: {
          class: 'bg-foreground/0 border border-border hover:border-foreground/25'
        },
        ghost: {
          class: 'bg-transparent hover:bg-accent/90 text-accent-foreground'
        }
      }
    },
    defaults: {
      variant: 'primary'
    }
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different badge variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Badge"
				description="Simple badge component"
				code={basicCode}
			>
				<Badge>Default</Badge>
			</DemoExample>

			<DemoExample
				title="Badge Variants"
				description="Different styles for various contexts"
				code={variantsCode}
			>
				<div class="flex flex-wrap items-center gap-2">
					<Badge variant="default">Default</Badge>
					<Badge variant="primary">Primary</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="error">Error</Badge>
				</div>
			</DemoExample>

			<DemoExample
				title="Badge Sizes"
				description="Different sizes for various use cases"
				code={sizesCode}
			>
				<div class="flex items-center gap-2">
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
					<Badge size="lg">Large</Badge>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Badge Props</h3>
				<Props
					data={[
						{
							name: 'variant',
							type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
							default: "'default'",
							description: 'Badge style variant'
						},
						{
							name: 'size',
							type: "'sm' | 'md' | 'lg'",
							default: "'md'",
							description: 'Badge size'
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
				'Semantic HTML structure',
				'Sufficient color contrast',
				'Screen reader friendly text',
				'ARIA labels for icons or counts',
				'Keyboard accessible when interactive'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Avatar', href: '/docs/components/avatar' }}
		next={{ label: 'Breadcrumb', href: '/docs/components/breadcrumb' }}
	/>
</div>
