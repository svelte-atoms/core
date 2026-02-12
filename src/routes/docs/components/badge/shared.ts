const basicCode = `
<Badge>Default</Badge>`.trim();

const variantsCode = `
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`.trim();

const sizesCode = `
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`.trim();

const notificationCode = `
<div class="relative inline-block">
  <button class="p-2">
    <Icon name="bell" />
  </button>
  <Badge class="absolute -top-1 -right-1">3</Badge>
</div>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  badge: () => ({
    class: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors'
  })
});
`.trim();

const accessibilityFeatures = [
	'Semantic HTML structure',
	'Sufficient color contrast',
	'Screen reader friendly text',
	'ARIA labels for icons or counts',
	'Keyboard accessible when interactive'
];

const useCases = [
	{
		title: 'Status Indicators',
		description:
			'Display the current state of items like "Active", "Pending", "Completed" in task lists or order tracking.'
	},
	{
		title: 'Notification Counts',
		description:
			'Show unread message counts, notification badges, or pending item numbers on icons and buttons.'
	},
	{
		title: 'Category Tags',
		description:
			'Label content with categories, topics, or tags in blog posts, products, or file systems.'
	},
	{
		title: 'User Roles',
		description:
			'Identify user permissions or roles like "Admin", "Moderator", "VIP" in profiles and listings.'
	},
	{
		title: 'Version Labels',
		description:
			'Mark features or content with version tags like "New", "Beta", "Deprecated", or "v2.0".'
	},
	{
		title: 'Priority Markers',
		description:
			'Highlight item priority levels such as "High", "Medium", "Low" in task managers and issue trackers.'
	}
];

export const metadata = {
	title: 'Badge - Svelte Atoms',
	description: 'Small count and labeling component for status and notifications.',
	componentTitle: 'Badge',
	componentDescription:
		'A compact inline element for displaying counts, labels, and status indicators.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Badge } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Badge' }],
	useCases,
	examples: {
		basic: basicCode,
		variants: variantsCode,
		sizes: sizesCode,
		notification: notificationCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
