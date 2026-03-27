<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
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
	import {
		accordionRootProps,
		accordionItemRootProps,
		accordionItemHeaderProps,
		accordionItemBodyProps,
		accordionItemIndicatorProps
	} from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'accordion',
		title: 'Accordion',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Back to Components', href: '/docs/components' }}
	next={{ label: 'Alert', href: '/docs/components/alert' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		{#each metadata.componentsSummary as comp, i (i)}
		- **{comp.name}**: {comp.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the accordion appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different accordion variations and use cases">
		<DocExample
			title="Basic Accordion"
			description="Simple accordion with collapsible sections"
			code={metadata.examples.basic}
		>
			<div class="flex h-96 w-full items-center justify-center">
				<Accordion class="border-border overflow-hidden rounded-lg border">
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">What is Svelte Atoms?</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>
							Svelte Atoms is a modular, accessible, and extensible Svelte 5 UI component library built
							with TailwindCSS.
						</AccordionItem.Body>
					</AccordionItem.Root>
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">How do I install it?</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>
							Simply run npm install @svelte-atoms/core to add it to your project.
						</AccordionItem.Body>
					</AccordionItem.Root>
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">Is it accessible?</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>
							Yes — all components include ARIA attributes, keyboard navigation, and screen reader support.
						</AccordionItem.Body>
					</AccordionItem.Root>
				</Accordion>
			</div>
		</DocExample>

		<DocExample
			title="Collapsible Accordion"
			description="All items can be collapsed simultaneously"
			code={metadata.examples.collapsible}
		>
			<div class="flex h-96 w-full items-center justify-center">
				<Accordion class="border-border overflow-hidden rounded-lg border" collapsible>
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">What is Svelte Atoms?</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>A modular UI component library for Svelte 5.</AccordionItem.Body>
					</AccordionItem.Root>
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">How do I install it?</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>Run: npm install @svelte-atoms/core</AccordionItem.Body>
					</AccordionItem.Root>
				</Accordion>
			</div>
		</DocExample>

		<DocExample
			title="Multiple Mode"
			description="Allow multiple sections to be open at once"
			code={metadata.examples.multiple}
		>
			<div class="flex h-96 w-full items-center justify-center">
				<Accordion multiple={true} class="border-border overflow-hidden rounded-lg border">
					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header>
							<span class="text-foreground font-medium">Section 1</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>Multiple sections can be open at the same time.</AccordionItem.Body>
					</AccordionItem.Root>
					<AccordionItem.Root>
						<AccordionItem.Header>
							<span class="text-foreground font-medium">Section 2</span>
							<AccordionItem.Indicator class="ml-auto" />
						</AccordionItem.Header>
						<AccordionItem.Body>Opening this won't close the others.</AccordionItem.Body>
					</AccordionItem.Root>
				</Accordion>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="html">
			<div class="bg-muted/50 border-border mb-6 rounded-lg border p-4">
				<p class="text-muted-foreground text-sm">
					All accordion components share common atom props: <code class="bg-muted rounded px-1.5 py-0.5 text-xs">initial</code>,
					<code class="bg-muted rounded px-1.5 py-0.5 text-xs">animate</code>,
					<code class="bg-muted rounded px-1.5 py-0.5 text-xs">enter</code>,
					<code class="bg-muted rounded px-1.5 py-0.5 text-xs">exit</code>,
					<code class="bg-muted rounded px-1.5 py-0.5 text-xs">onmount</code>, and
					<code class="bg-muted rounded px-1.5 py-0.5 text-xs">ondestroy</code>.
				</p>
			</div>
		</DocOnly>

		<DocOnly for="markdown">
{newLine(2)}### Accordion (Root)

**Preset Key:** `accordion`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Accordion (Root)

**Preset Key:** `accordion`</h3></DocOnly>
		<DocProps data={accordionRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### AccordionItem.Root

**Preset Key:** `accordion.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">AccordionItem.Root</h3></DocOnly>
		<DocProps data={accordionItemRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### AccordionItem.Header

**Preset Key:** `accordion.item.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">AccordionItem.Header</h3></DocOnly>
		<DocProps data={accordionItemHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### AccordionItem.Body

**Preset Key:** `accordion.item.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">AccordionItem.Body</h3></DocOnly>
		<DocProps data={accordionItemBodyProps} />

		<DocOnly for="markdown">
{newLine(2)}### AccordionItem.Indicator

**Preset Key:** `accordion.item.indicator`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">AccordionItem.Indicator</h3></DocOnly>
		<DocProps data={accordionItemIndicatorProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## Best Practices
1. **Clear Headers**: Use descriptive header text that clearly indicates the content
2. **Consistent Styling**: Maintain visual consistency across accordion items
3. **Default States**: Consider which items should be open by default
4. **Mobile Friendly**: Ensure touch targets are large enough on mobile devices

## License

MIT License
	</DocOnly>
</DocPage>
