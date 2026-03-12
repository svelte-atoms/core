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
		title: 'Internal Navigation',
		description: 'Link to pages within your application with consistent, styled anchor elements that match your design system.'
	},
	{
		title: 'External Links',
		description: 'Link to external websites with target="_blank" and rel="noopener noreferrer" for security and UX best practices.'
	},
	{
		title: 'Inline Text Links',
		description: 'Embed contextual links within paragraphs or body text with underline styling to signal clickability.'
	},
	{
		title: 'Navigation Menus',
		description: 'Build navigation bars, sidebars, and breadcrumbs using consistently styled link components.'
	},
	{
		title: 'Call to Action',
		description: 'Use styled link variants to create muted or destructive contextual links for secondary or dangerous actions.'
	}
];

export const metadata = {
	title: 'Link - Svelte Atoms',
	description: 'Accessible anchor component for internal and external navigation links.',
	componentTitle: 'Link',
	componentDescription:
		'A styled anchor element built on top of HtmlAtom that provides consistent link styling with hover and active states. Supports preset-based customization for variants like muted, underline, and destructive.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Link } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Link' }],
	useCases,
	examples: {
		basic: basicCode,
		external: externalCode,
		variants: variantsCode,
		sizes: sizesCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
