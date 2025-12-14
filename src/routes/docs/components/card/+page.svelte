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

	const basicCode = `<script>
  import { Card } from '@svelte-atoms/core';
<\/script>

<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>This is a card description.</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Main content goes here.</p>
  </Card.Content>
</Card.Root>`;

	const variantsCode = `<Card.Root variant="default">
  <Card.Header>
    <Card.Title>Default Card</Card.Title>
  </Card.Header>
</Card.Root>

<Card.Root variant="outlined">
  <Card.Header>
    <Card.Title>Outlined Card</Card.Title>
  </Card.Header>
</Card.Root>

<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Elevated Card</Card.Title>
  </Card.Header>
</Card.Root>`;

	const clickableCode = `<Card.Root clickable onclick={() => console.log('Clicked!')}>
  <Card.Header>
    <Card.Title>Clickable Card</Card.Title>
    <Card.Description>Click anywhere on this card.</Card.Description>
  </Card.Header>
</Card.Root>`;

	const actionsCode = `<Card.Root>
  <Card.Header>
    <Card.Title>Action Card</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Content with actions.</p>
  </Card.Content>
  <Card.Actions>
    <button>Primary Action</button>
    <button>Secondary</button>
  </Card.Actions>
</Card.Root>`;
</script>

<svelte:head>
	<title>Card - Svelte Atoms</title>
	<meta
		name="description"
		content="Flexible container component for displaying content in a structured way."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Card' }]} />

	<PageHeader
		title="Card"
		description="Flexible and modular card component for displaying content in a structured and visually appealing way. Built with atomic design principles."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Card &#125; from '@svelte-atoms/core/card';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the card appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Card components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
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
	</Section>

	<Section title="Examples" description="Explore different card variations and use cases">
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
				title="Card Variants"
				description="Different visual styles for cards"
				code={variantsCode}
			>
				<div class="grid gap-4 md:grid-cols-3">
					<Card.Root variant="default">
						<Card.Header>
							<Card.Title>Default</Card.Title>
						</Card.Header>
					</Card.Root>

					<Card.Root variant="outlined">
						<Card.Header>
							<Card.Title>Outlined</Card.Title>
						</Card.Header>
					</Card.Root>

					<Card.Root variant="elevated">
						<Card.Header>
							<Card.Title>Elevated</Card.Title>
						</Card.Header>
					</Card.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Clickable Card"
				description="Interactive card with click handler"
				code={clickableCode}
			>
				<Card.Root clickable onclick={() => alert('Card clicked!')}>
					<Card.Header>
						<Card.Title>Clickable Card</Card.Title>
						<Card.Description>Click anywhere on this card.</Card.Description>
					</Card.Header>
				</Card.Root>
			</DemoExample>

			<DemoExample
				title="Card with Actions"
				description="Card with action buttons"
				code={actionsCode}
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Card.Root Props</h3>
				<Props data={cardRootProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper semantic HTML structure',
				'Keyboard navigation for clickable cards',
				'ARIA attributes for interactive states',
				'Focus management and visible focus indicators',
				'Screen reader support for card content'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Button', href: '/docs/components/button' }}
		next={{ label: 'Checkbox', href: '/docs/components/checkbox' }}
	/>
</div>
