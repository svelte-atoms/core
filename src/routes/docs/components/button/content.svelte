<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { buttonProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';

	let {
		contentType = 'html',
	}: {
		contentType?: DocMode;
	} = $props();

	const frontmatter: Frontmatter = {
		id: 'button',
		title: 'Button Component',
		category: 'components',
		depth: 'beginner',
		prerequisites: ['atoms', 'styling'],
		related: ['variants', 'preset'],
	};

	const { button: buttonCode, variants: variantsCode, sizes: sizesCode, states: statesCode } = metadata.examples;

	const presetCode = `import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  button: () => ({
    class: 'px-3 py-2 h-12 disabled:opacity-50 disabled:pointer-events-none items-center transition-colors duration-100',
    variants: {
      variant: {
        primary:     { class: 'bg-primary text-primary-foreground hover:bg-primary/80' },
        secondary:   { class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
        destructive: { class: 'bg-destructive text-destructive-foreground hover:bg-destructive/80' },
        outline:     { class: 'bg-foreground/0 border border-border hover:border-foreground/25' },
        ghost:       { class: 'bg-transparent hover:bg-accent/90 text-accent-foreground' },
      },
    },
    defaults: { variant: 'primary' },
  }),
});`;
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Back to Components', href: '/docs/components' }}
	next={{ label: 'Checkbox', href: '/docs/components/checkbox' }}
	{frontmatter}
>
	<!-- Type + Use Cases (markdown only) -->
	<DocOnly for="markdown">

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{metadata.useCases.map((uc: { title: string; description: string }) => `- **${uc.title}**: ${uc.description}`).join('\n')}

	</DocOnly>

	<!-- Installation -->
	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<!-- Preset Configuration -->
	<DocSection title="Preset Configuration" subtitle="Customize the button appearance using presets">
		<DocOnly for="html">
			<p class="text-muted-foreground mb-4 text-sm">
				Customize the default styles by defining presets in your configuration:
			</p>
		</DocOnly>
		<DocCode lang="typescript" code={presetCode} />
	</DocSection>

	<!-- Examples -->
	<DocSection title="Examples" subtitle="Explore different button variations and use cases">
		<div class="space-y-8">
			<DocExample
				title="Basic Button"
				description="Simple button with default styling."
				code={buttonCode}
			>
				<Button class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white transition-colors">
					Click me
				</Button>
			</DocExample>

			<DocExample
				title="Button Variants"
				description="Different visual styles for various contexts."
				code={variantsCode}
			>
				<div class="flex flex-wrap gap-3">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
				</div>
			</DocExample>

			<DocExample
				title="Button Sizes"
				description="Different sizes for various use cases."
				code={sizesCode}
			>
				<div class="flex flex-wrap items-center gap-3">
					<Button class="bg-primary hover:bg-primary/90 rounded-lg px-3 py-1.5 text-sm text-white transition-colors">Small</Button>
					<Button class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white transition-colors">Medium</Button>
					<Button class="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-lg text-white transition-colors">Large</Button>
				</div>
			</DocExample>

			<DocExample
				title="Disabled State"
				description="Disabled buttons are non-interactive."
				code={statesCode}
			>
				<Button disabled class="bg-primary cursor-not-allowed rounded-lg px-4 py-2 text-white opacity-50">
					Disabled Button
				</Button>
			</DocExample>
		</div>
	</DocSection>

	<!-- API Reference -->
	<DocSection title="API Reference">
		<DocOnly for="html">
			<p class="text-muted-foreground mb-4 text-sm">
				Accepts all standard HTML button attributes plus the props listed below.
			</p>
		</DocOnly>
		<DocOnly for="markdown">

**Preset Key:** `button`

		</DocOnly>
		<DocProps data={buttonProps} />
	</DocSection>

	<!-- Accessibility -->
	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<!-- License (markdown only) -->
	<DocOnly for="markdown">

---

This module is licensed under the MIT License.
	</DocOnly>
</DocPage>
