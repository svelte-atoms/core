const basicCode = `
<script>
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
</Card.Root>`.trim();

const variantsCode = `
<Card.Root variant="default">
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
</Card.Root>`.trim();

const clickableCode = `
<Card.Root clickable onclick={() => console.log('Clicked!')}>
  <Card.Header>
    <Card.Title>Clickable Card</Card.Title>
    <Card.Description>Click anywhere on this card.</Card.Description>
  </Card.Header>
</Card.Root>`.trim();

const actionsCode = `
<Card.Root>
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
</Card.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  card: () => ({
    class: 'rounded-lg border bg-card text-card-foreground shadow-sm'
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
  'card.actions': () => ({
    class: 'flex items-center p-6 pt-0'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper semantic HTML structure',
	'Keyboard navigation for clickable cards',
	'ARIA attributes for interactive states',
	'Focus management and visible focus indicators',
	'Screen reader support for card content'
];

const useCases = [
	{
		title: 'Content Previews',
		description:
			'Display article summaries, blog post previews, or product overviews with title, description, and actions.'
	},
	{
		title: 'Dashboard Widgets',
		description:
			'Organize dashboard metrics, charts, and data visualizations into distinct, scannable cards.'
	},
	{
		title: 'Feature Highlights',
		description:
			'Showcase key features, benefits, or services in marketing pages with icons and call-to-action buttons.'
	},
	{
		title: 'User Profiles',
		description:
			'Present user information, avatars, bio, and action buttons in profile cards.'
	},
	{
		title: 'Product Catalog',
		description:
			'Display products with images, prices, descriptions, and purchase actions in e-commerce grids.'
	},
	{
		title: 'Settings Panels',
		description:
			'Group related configuration options into cards for better organization in settings interfaces.'
	}
];

const componentsSummary = [
	{
		name: 'Card.Root',
		description:
			'Container component that provides the card structure, variants, and clickable behavior.'
	},
	{
		name: 'Card.Header',
		description:
			'Header section containing title and optional description, typically at the top of the card.'
	},
	{
		name: 'Card.Title',
		description:
			'Main heading element for the card, usually displayed prominently in the header.'
	},
	{
		name: 'Card.Description',
		description:
			'Subtitle or supporting text that provides additional context below the title.'
	},
	{
		name: 'Card.Content',
		description:
			'Main content area for the card body, containing the primary information or interactive elements.'
	},
	{
		name: 'Card.Actions',
		description:
			'Footer section for action buttons or links, typically aligned to the bottom of the card.'
	}
];

export const metadata = {
	title: 'Card - Svelte Atoms',
	description: 'Flexible container component for grouped content and actions.',
	componentTitle: 'Card',
	componentDescription:
		'A versatile card component for displaying content in a contained, elevated format with headers, content, and actions.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Card } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Card' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		variants: variantsCode,
		clickable: clickableCode,
		actions: actionsCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
