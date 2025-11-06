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
		Props
	} from '$docs/components';

	const accordionCode = `<Accordion>
  <AccordionItem.Root>
    <AccordionItem.Header>
      What is Atomic SV?
    </AccordionItem.Header>
    <AccordionItem.Body>
      Atomic SV is a modular, accessible, and extensible 
      Svelte UI component library built with Svelte 5.
    </AccordionItem.Body>
  </AccordionItem.Root>
  
  <AccordionItem.Root>
    <AccordionItem.Header>
      How do I install it?
    </AccordionItem.Header>
    <AccordionItem.Body>
      Simply run npm install atomic-sv
    </AccordionItem.Body>
  </AccordionItem.Root>
</Accordion>`;

	const multipleCode = `<Accordion multiple={true}>
  <AccordionItem.Root>
    <AccordionItem.Header>Section 1</AccordionItem.Header>
    <AccordionItem.Body>Content 1</AccordionItem.Body>
  </AccordionItem.Root>
  
  <AccordionItem.Root>
    <AccordionItem.Header>Section 2</AccordionItem.Header>
    <AccordionItem.Body>Content 2</AccordionItem.Body>
  </AccordionItem.Root>
</Accordion>`;
</script>

<svelte:head>
	<title>Accordion - Atomic SV</title>
	<meta name="description" content="Collapsible content sections for organizing information." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/components' }, { label: 'Accordion' }]} />

	<PageHeader
		title="Accordion"
		description="Collapsible content sections for organizing information. Perfect for FAQs, settings panels, and content organization."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Accordion, AccordionItem &#125; from '@svelte-atoms/core/accordion';"
		/>
	</Section>

	<Section title="Examples" description="Explore different accordion variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Accordion"
				description="Simple accordion with collapsible sections"
				code={accordionCode}
			>
				<Accordion class="border-border overflow-hidden rounded-lg border">
					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
						>
							<span class="text-foreground font-medium">What is Atomic SV?</span>
							<AccordionItem.Indicator>
								<svg
									class="text-muted-foreground h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</AccordionItem.Indicator>
						</AccordionItem.Header>
						<AccordionItem.Body class="text-muted-foreground px-4 pb-3 text-sm">
							Atomic SV is a modular, accessible, and extensible Svelte UI component library built
							with Svelte 5.
						</AccordionItem.Body>
					</AccordionItem.Root>

					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
						>
							<span class="text-foreground font-medium">How do I install it?</span>
							<AccordionItem.Indicator>
								<svg
									class="text-muted-foreground h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</AccordionItem.Indicator>
						</AccordionItem.Header>
						<AccordionItem.Body class="text-muted-foreground px-4 pb-3 text-sm">
							Simply run npm install @svelte-atoms/core to add it to your project. Import components
							as needed.
						</AccordionItem.Body>
					</AccordionItem.Root>

					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
						>
							<span class="text-foreground font-medium">Is it accessible?</span>
							<AccordionItem.Indicator>
								<svg
									class="text-muted-foreground h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</AccordionItem.Indicator>
						</AccordionItem.Header>
						<AccordionItem.Body class="text-muted-foreground px-4 pb-3 text-sm">
							Yes, all Atomic SV components are built with accessibility in mind. They include
							proper ARIA attributes, keyboard navigation, and screen reader support out of the box.
						</AccordionItem.Body>
					</AccordionItem.Root>
				</Accordion>
			</DemoExample>

			<DemoExample
				title="Multiple Mode"
				description="Allow multiple sections to be open at once"
				code={multipleCode}
			>
				<Accordion multiple={true} class="border-border overflow-hidden rounded-lg border">
					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
						>
							<span class="text-foreground font-medium">Section 1</span>
							<AccordionItem.Indicator>
								<svg
									class="text-muted-foreground h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</AccordionItem.Indicator>
						</AccordionItem.Header>
						<AccordionItem.Body class="text-muted-foreground px-4 pb-3 text-sm">
							Multiple sections can be open at the same time.
						</AccordionItem.Body>
					</AccordionItem.Root>

					<AccordionItem.Root class="border-border border-b last:border-b-0">
						<AccordionItem.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
						>
							<span class="text-foreground font-medium">Section 2</span>
							<AccordionItem.Indicator>
								<svg
									class="text-muted-foreground h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</AccordionItem.Indicator>
						</AccordionItem.Header>
						<AccordionItem.Body class="text-muted-foreground px-4 pb-3 text-sm">
							Opening this section won't close the others.
						</AccordionItem.Body>
					</AccordionItem.Root>
				</Accordion>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Accordion Props</h3>
				<Props
					data={[
						{
							name: 'multiple',
							type: 'boolean',
							default: 'false',
							description: 'Allow multiple panels to be open simultaneously'
						},
						{
							name: 'collapsible',
							type: 'boolean',
							default: 'true',
							description: 'Allow panels to be collapsed when in single mode'
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

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">AccordionItem.Header Props</h3>
				<Props
					data={[
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						},
						{
							name: 'children',
							type: 'Snippet',
							default: '-',
							description: 'Content to render in the header'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
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
	</Section>

	<PageNavigation
		prev={{ label: 'Back to Components', href: '/components' }}
		next={{ label: 'Next: Button', href: '/components/button' }}
	/>
</div>
