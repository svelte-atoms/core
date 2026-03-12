const buttonCode = `
<script lang="ts">
  import { Button } from '@svelte-atoms/core';
<\/script>

<Button>Click me</Button>`.trim();

const variantsCode = `
<Button class="bg-primary text-white hover:bg-primary/90">
  Primary Button
</Button>

<Button class="bg-secondary text-white hover:bg-secondary/90">
  Secondary Button
</Button>

<Button class="border border-border hover:bg-muted">
  Outline Button
</Button>`.trim();

const sizesCode = `
<Button class="px-3 py-1.5 text-sm">Small</Button>
<Button class="px-4 py-2">Medium</Button>
<Button class="px-6 py-3 text-lg">Large</Button>`.trim();

const statesCode = `
<Button disabled>Disabled Button</Button>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  button: () => ({
    class: 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper semantic button element with role',
	'Keyboard navigation support (Enter and Space keys)',
	'Focus management with visible focus indicators',
	'Screen reader compatible with proper ARIA attributes',
	'Disabled state handling with aria-disabled',
	'Clear visual feedback for all interactive states'
];

const useCases = [
	{
		title: 'Form Submissions',
		description:
			'Primary actions in forms like submit, save, or confirm operations that trigger data processing.'
	},
	{
		title: 'Navigation Actions',
		description:
			'Trigger navigation to different pages or sections, such as "Learn More" or "Get Started" buttons.'
	},
	{
		title: 'Dialog Controls',
		description:
			'Control dialog flows with action buttons like Cancel, Confirm, Delete, or Save in modal interfaces.'
	},
	{
		title: 'Data Operations',
		description:
			'Execute operations on data such as export, download, refresh, or filter in dashboards and tables.'
	},
	{
		title: 'Interactive Features',
		description:
			'Enable user interactions like like, share, bookmark, or follow in social and content platforms.'
	},
	{
		title: 'Call-to-Action',
		description:
			'Highlight primary conversion points in marketing pages such as sign-up, purchase, or trial buttons.'
	}
];

export const metadata = {
	title: 'Button - Svelte Atoms',
	description: 'Interactive button component for triggering actions and events.',
	componentTitle: 'Button',
	componentDescription:
		'A versatile button component built on a native `<button>` element with full HTML attribute support. Style it through presets with any variant, size, or color scheme. Supports disabled states, loading indicators, and icon content out of the box.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Button } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Button' }],
	useCases,
	examples: {
		button: buttonCode,
		variants: variantsCode,
		sizes: sizesCode,
		states: statesCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
