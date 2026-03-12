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
		Props,
		CodeBlock
	} from '$docs/components';
	import { badgeProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, variants: variantsCode, sizes: sizesCode } = metadata.examples;
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
			<Section.Subtitle>Customize the badge appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Badge components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
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
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different badge variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Badge" description="Simple badge component" code={basicCode}>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Badge Props</h3>
				<Props data={badgeProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Semantic HTML structure',
				'Sufficient color contrast',
				'Screen reader friendly text',
				'ARIA labels for icons or counts',
				'Keyboard accessible when interactive'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Avatar', href: '/docs/components/avatar' }}
		next={{ label: 'Breadcrumb', href: '/docs/components/breadcrumb' }}
	/>
</div>
