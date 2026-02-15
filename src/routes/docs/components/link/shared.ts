const basicCode = `
<Link href="/about">About Us</Link>`.trim();

const externalCode = `
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example
</Link>`.trim();

const variantsCode = `
<Link variant="default">Default Link<\/Link>
<Link variant="muted">Muted Link<\/Link>
<Link variant="underline">Underlined Link<\/Link>`.trim();

const sizesCode = `
<Link size="sm">Small Link</Link>
<Link size="md">Medium Link</Link>
<Link size="lg">Large Link</Link>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  link: () => ({
    class: 'text-primary underline-offset-4 hover:underline transition-colors',
    variants: {
      variant: {
        default: { class: 'text-primary' },
        muted: { class: 'text-muted-foreground' },
        destructive: { class: 'text-destructive' }
      }
    },
    defaults: {
      variant: 'default'
    }
  })
});
`.trim();

const accessibilityFeatures = [
	'Use meaningful link text',
	'Add rel=\'noopener noreferrer\' for external links',
	'Ensure sufficient color contrast',
	'Make focused links clearly visible',
	'Screen reader friendly navigation'
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
		name: 'Link.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Link - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Link',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Link } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Link' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		external: externalCode,
		variants: variantsCode,
		sizes: sizesCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
