<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
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
	import {
		accordionRootProps,
		accordionItemRootProps,
		accordionItemHeaderProps,
		accordionItemBodyProps,
		accordionItemIndicatorProps
	} from './props';
	import { metadata } from './shared';
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
			<Section.Subtitle>Customize the accordion appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Accordion components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different accordion variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Accordion"
				description="Simple accordion with collapsible sections"
				code={metadata.examples.basic}
			>
				<div class="flex h-96 w-full items-center justify-center">
					<Accordion class="border-border overflow-hidden rounded-lg border">
						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">What is Atomic SV?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Atomic SV is a modular, accessible, and extensible Svelte UI component library built
								with Svelte 5.
							</AccordionItem.Body>
						</AccordionItem.Root>

						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">How do I install it?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Simply run npm install @svelte-atoms/core to add it to your project. Import
								components as needed.
							</AccordionItem.Body>
						</AccordionItem.Root>

						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">Is it accessible?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Yes, all Atomic SV components are built with accessibility in mind. They include
								proper ARIA attributes, keyboard navigation, and screen reader support out of the
								box.
							</AccordionItem.Body>
						</AccordionItem.Root>
					</Accordion>
				</div>
			</DemoExample>

			<DemoExample
				title="Collapsible Accordion"
				description="Simple accordion with collapsible sections"
				code={metadata.examples.collapsible}
			>
				<div class="flex h-96 w-full items-center justify-center">
					<Accordion class="border-border overflow-hidden rounded-lg border" collapsible>
						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">What is Atomic SV?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Atomic SV is a modular, accessible, and extensible Svelte UI component library built
								with Svelte 5.
							</AccordionItem.Body>
						</AccordionItem.Root>

						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">How do I install it?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Simply run npm install @svelte-atoms/core to add it to your project. Import
								components as needed.
							</AccordionItem.Body>
						</AccordionItem.Root>

						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">Is it accessible?</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>
								Yes, all Atomic SV components are built with accessibility in mind. They include
								proper ARIA attributes, keyboard navigation, and screen reader support out of the
								box.
							</AccordionItem.Body>
						</AccordionItem.Root>
					</Accordion>
				</div>
			</DemoExample>

			<DemoExample
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
							<AccordionItem.Body
								>Multiple sections can be open at the same time.</AccordionItem.Body
							>
						</AccordionItem.Root>

						<AccordionItem.Root>
							<AccordionItem.Header>
								<span class="text-foreground font-medium">Section 2</span>
								<AccordionItem.Indicator class="ml-auto" />
							</AccordionItem.Header>
							<AccordionItem.Body>Opening this section won't close the others.</AccordionItem.Body>
						</AccordionItem.Root>
					</Accordion>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="bg-muted/50 border-border mb-6 rounded-lg border p-4">
			<div class="flex items-start gap-3">
				<svg
					class="text-primary mt-0.5 h-5 w-5 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div class="flex-1">
					<h4 class="text-foreground mb-1 font-semibold">Shared Atom Props</h4>
					<p class="text-muted-foreground text-sm">
						All accordion components share common animation and lifecycle hooks: <code
							class="bg-muted rounded px-1.5 py-0.5 text-xs">initial</code
						>,
						<code class="bg-muted rounded px-1.5 py-0.5 text-xs">animate</code>,
						<code class="bg-muted rounded px-1.5 py-0.5 text-xs">enter</code>,
						<code class="bg-muted rounded px-1.5 py-0.5 text-xs">exit</code>,
						<code class="bg-muted rounded px-1.5 py-0.5 text-xs">onmount</code>, and
						<code class="bg-muted rounded px-1.5 py-0.5 text-xs">ondestroy</code>. These are
						referred to as <strong>atomProps</strong> in the tables below.
					</p>
				</div>
			</div>
		</div>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Accordion Props</h3>
				<Props data={accordionRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">AccordionItem.Root Props</h3>
				<Props data={accordionItemRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">AccordionItem.Header Props</h3>
				<Props data={accordionItemHeaderProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">AccordionItem.Body Props</h3>
				<Props data={accordionItemBodyProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">AccordionItem.Indicator Props</h3>
				<Props data={accordionItemIndicatorProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Proper ARIA attributes (aria-expanded, aria-controls, etc.)',
				'Keyboard navigation (Enter, Space, Arrow keys)',
				'Focus management with visible indicators',
				'Screen reader announcements for state changes',
				'Semantic HTML structure',
				'Respects prefers-reduced-motion setting'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Back to Components', href: '/components' }}
		next={{ label: 'Next: Button', href: '/components/button' }}
	/>
</div>
