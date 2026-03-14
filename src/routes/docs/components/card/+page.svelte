<script lang="ts">
	import { Card } from '$lib/components/card';
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
	import { cardRootProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, withMedia: withMediaCode, clickable: clickableCode, preset: presetCode } = metadata.examples;
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
			<Section.Subtitle>Customize the card appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Card components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  card: () => ({
    class: 'rounded-lg border border-border bg-background text-foreground shadow-sm',
    variants: {
      variant: {
        default: { class: '' },
        elevated: { class: 'shadow-md' },
        outlined: { class: 'border-2' }
      }
    },
    defaults: {
      variant: 'default'
    }
  }),
  'card.header': () => ({
    class: 'flex flex-col space-y-1.5 p-6'
  }),
  'card.title': () => ({
    class: 'text-2xl font-semibold leading-none tracking-tight'
  }),
  'card.description': () => ({
    class: 'text-sm text-muted-foreground'
  }),
  'card.content': () => ({
    class: 'p-6 pt-0'
  }),
  'card.footer': () => ({
    class: 'flex items-center p-6 pt-0'
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different card variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Card"
				description="Simple card with header and content"
				code={basicCode}
			>
				<Card.Root>
					<Card.Header>
						<Card.Title>Card Title</Card.Title>
						<Card.Description>This is a card description.</Card.Description>
					</Card.Header>
					<Card.Body>
						<p>Main content goes here.</p>
					</Card.Body>
				</Card.Root>
			</DemoExample>

			<DemoExample
				title="Card with Media"
				description="Card with an image or media section"
				code={withMediaCode}
			>
				<div class="grid gap-4 md:grid-cols-3">
					<Card.Root>
						<Card.Header>
							<Card.Title>Default</Card.Title>
						</Card.Header>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title>Card Two</Card.Title>
						</Card.Header>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title>Card Three</Card.Title>
						</Card.Header>
					</Card.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Clickable Card"
				description="Interactive card with click handler"
				code={clickableCode}
			>
				<Card.Root onclick={() => alert('Card clicked!')}>
					<Card.Header>
						<Card.Title>Clickable Card</Card.Title>
						<Card.Description>Click anywhere on this card.</Card.Description>
					</Card.Header>
				</Card.Root>
			</DemoExample>

			<DemoExample
				title="Card with Footer Actions"
				description="Card with action buttons in the footer"
				code={presetCode}
			>
				<Card.Root>
					<Card.Header>
						<Card.Title>Action Card</Card.Title>
					</Card.Header>
					<Card.Body>
						<p>Content with actions.</p>
					</Card.Body>
					<Card.Footer>
						<button class="bg-primary text-primary-foreground rounded px-4 py-2">
							Primary Action
						</button>
						<button class="border-border rounded border px-4 py-2">Secondary</button>
					</Card.Footer>
				</Card.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Card.Root Props</h3>
				<Props data={cardRootProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Proper semantic HTML structure',
				'Keyboard navigation for clickable cards',
				'ARIA attributes for interactive states',
				'Focus management and visible focus indicators',
				'Screen reader support for card content'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Button', href: '/docs/components/button' }}
		next={{ label: 'Checkbox', href: '/docs/components/checkbox' }}
	/>
</div>
