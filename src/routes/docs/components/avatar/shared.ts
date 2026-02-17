const basicCode = `
<Avatar src="/avatar.jpg" alt="User name" />`.trim();

const sizesCode = `
<Avatar size="sm" src="/avatar.jpg" alt="Small" />
<Avatar size="md" src="/avatar.jpg" alt="Medium" />
<Avatar size="lg" src="/avatar.jpg" alt="Large" />
<Avatar size="xl" src="/avatar.jpg" alt="Extra Large" />`.trim();

const fallbackCode = `
<Avatar alt="John Doe" />
<Avatar alt="Jane Smith" />`.trim();

const groupCode = `
<div class="flex -space-x-2">
  <Avatar src="/avatar1.jpg" alt="User 1" />
  <Avatar src="/avatar2.jpg" alt="User 2" />
  <Avatar src="/avatar3.jpg" alt="User 3" />
  <Avatar>+5</Avatar>
</div>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  avatar: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper alt text for images',
	'Meaningful fallback initials',
	'Adequate color contrast for initials',
	'Semantic img element usage',
	'ARIA labels when needed'
];

const useCases = [
	{
		title: 'Use Case 1',
		description: 'TODO: Describe when and why to use this component in this scenario.'
	},
	{
		title: 'Use Case 2',
		description: 'TODO: Describe another practical application.'
	}
	// TODO: Add 4-6 use cases total
];

// TODO: Remove if simple component, or fill in for compound component
const componentsSummary = [
	{
		name: 'Avatar.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Avatar - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Avatar',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Avatar } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Avatar' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		sizes: sizesCode,
		fallback: fallbackCode,
		group: groupCode
	},
	accessibility: accessibilityFeatures
};
