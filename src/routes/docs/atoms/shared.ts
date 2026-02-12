// Private: Code examples
const anatomyCode = `<script lang="ts">
  import { HtmlAtom as Atom, defineVariants } from '@svelte-atoms/core';
  

  let { ...restProps } = $props();

  // Define component local variants
  const variants = defineVariants({
	variants: {
	  variant: {
		'primary': {
			class: '',
			// Primary variant configuration goes here
		},
		'secondary': {
			class: '',
			// Secondary variant configuration goes here
		}
	 }
	},
	compounds: [],
	defaults: {
		variant: 'primary'
	}
  });
</script>

<Atom
  preset="custom-preset"
  as="button"
  base={undefined}
  {variants}
  class="px-4 py-2 rounded bg-blue-500 text-white"
  onclick={() => console.log('clicked')}
>
  Click me
</Atom>

<!-- Renders as: -->
<button class="px-4 py-2 rounded bg-blue-500 text-white">
  Click me
</button>
<!-- plus configuration defined in the preset, so the output may look different -->`.trim();

const customButtonCode = `<script lang="ts">
  import { HtmlAtom, defineVariants } from '@svelte-atoms/core';
  
  let { 
    variant = 'primary',
    size = 'md',
    ...props 
  } = $props();
  
  const variants = defineVariants({
    variants: {
      variant: {
        primary: { class: 'bg-blue-600 text-white hover:bg-blue-700' },
        secondary: { class: 'bg-gray-200 text-gray-900 hover:bg-gray-300' },
        ghost: { class: 'bg-transparent hover:bg-gray-100' }
      },
      size: {
        sm: { class: 'px-3 py-1.5 text-sm' },
        md: { class: 'px-4 py-2 text-base' },
        lg: { class: 'px-6 py-3 text-lg' }
      }
    },
    defaults: { variant: 'primary', size: 'md' }
  });
</script>

<HtmlAtom
  as="button"
  {variants}
  {variant}
  {size}
  class="rounded-md font-medium transition-colors"
  {...props}
/>`.trim();

const customCardCode = `<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  
  let { children, ...props } = $props();
</script>

<HtmlAtom
  as="article"
  class="rounded-lg border bg-card text-card-foreground shadow-sm"
  {...props}
>
  {@render children?.()}
</HtmlAtom>`.trim();

const presetUsageCode = `<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { setPreset } from '@svelte-atoms/core/context';
  
  // Define global preset
  setPreset({
    button: () => ({
      class: 'rounded-md font-semibold transition-colors',
      'data-component': 'button'
    })
  });
</script>

<!-- Button automatically uses preset -->
<HtmlAtom
  preset="button"
  as="button"
  class="px-4 py-2 bg-primary text-primary-foreground"
>
  Preset Button
</HtmlAtom>`.trim();

// Private: What are atoms content
const whatAreAtomsContent = [
	'In chemistry, atoms are the basic units that combine to form molecules. In Svelte Atoms, the same principle applies: atoms are the fundamental components that combine to create more complex UI patterns.',
	'Unlike traditional component libraries that provide fully-featured components, atoms give you the raw building blocks. They handle the hard parts (accessibility, keyboard navigation, state management) while giving you complete control over structure and styling.'
];

// Private: Key features
const keyFeatures = [
	{
		label: 'Polymorphic',
		description: 'The `as` prop lets you render any HTML element'
	},
	{
		label: 'Type-safe',
		description: 'Full TypeScript support with proper types for the rendered element'
	},
	{
		label: 'Flexible',
		description: 'Accepts all standard HTML attributes for the element type'
	}
];

// Public: Metadata export
export const metadata = {
	title: 'Atoms - Svelte Atoms',
	description: 'Understanding the fundamental building blocks of Svelte Atoms.',
	pageTitle: 'Atoms',
	pageDescription:
		'The fundamental building blocks of Svelte Atoms - primitive components that power everything.',
	breadcrumbs: [{ label: 'Docs', href: '/docs' }, { label: 'Atoms' }],
	whatAreAtoms: whatAreAtomsContent,
	concepts: [
		{
			title: 'Primitive Components',
			icon: 'circle',
			description:
				'Atoms are unstyled by default. They provide behavior, accessibility, and state management without imposing design decisions. You add the styling.'
		},
		{
			title: 'Render Props Pattern',
			icon: 'grid',
			description:
				'Many atoms use render props (snippet slots in Svelte 5) to give you full control over rendering. The atom handles logic, you handle markup.'
		},
		{
			title: 'Composition Over Configuration',
			icon: 'layers',
			description:
				'Instead of dozens of props for every possible use case, atoms compose together. Build what you need from simple pieces.'
		}
	],
	anatomyExample: {
		code: anatomyCode,
		features: keyFeatures
	},
	whenToUse: [
		{
			category: 'Building Custom Components',
			icon: 'check',
			description:
				'Use atoms as the foundation for your own component library. Atoms provide powerful features that make building custom components easier:',
			features: [
				'**Preset configuration** for consistent styling across your app',
				'**Animation lifecycles** for smooth transitions and effects',
				'**Base/as props** for polymorphic rendering and flexible composition'
			],
			examples: [
				'Custom design systems',
				'Unique UI patterns',
				'Brand-specific components',
				'Non-standard layouts'
			]
		},
		{
			category: 'Need Full Control',
			icon: 'check',
			description:
				'When pre-built components are too opinionated, atoms give you the power to build exactly what you need.',
			examples: [
				'Multi-step forms',
				'Advanced dashboards',
				'Data visualizations',
				'Custom navigation menus'
			]
		},
		{
			category: 'Prototyping Rapidly',
			icon: 'check',
			description:
				'Quickly compose interfaces without fighting with pre-built component constraints.',
			examples: [
				'Educational projects',
				'Understanding component patterns',
				'Building custom solutions',
				'Framework comparisons'
			]
		}
	],
	atomsVsComponents: {
		atoms: {
			title: 'Atoms',
			features: [
				{ positive: true, text: 'Maximum flexibility' },
				{ positive: true, text: 'Preset configuration system' },
				{ positive: true, text: 'Animation lifecycles built-in' },
				{ positive: true, text: 'Polymorphic (base/as props)' },
				{ positive: true, text: 'Minimal bundle size' },
				{ positive: true, text: 'No styling constraints' },
				{ positive: false, text: 'More setup required' }
			]
		},
		components: {
			title: 'Full Components',
			features: [
				{ positive: true, text: 'Ready to use' },
				{ positive: true, text: 'Pre-styled' },
				{ positive: true, text: 'Common patterns built-in' },
				{ positive: false, text: 'Less flexible' },
				{ positive: false, text: 'Larger bundle' },
				{ positive: false, text: 'Fixed styling approach' }
			]
		}
	},
	availableAtoms: [
		{ name: 'HtmlAtom', description: 'Base component for HTML elements with variants and presets' },
		{ name: 'Atom', description: 'Generic atom for building custom components' },
		{ name: 'HtmlElement', description: 'Low-level HTML element wrapper' }
	],
	examples: {
		anatomy: anatomyCode,
		customButton: customButtonCode,
		customCard: customCardCode,
		presetUsage: presetUsageCode
	},
	gettingStartedLinks: [
		{
			title: 'Browse Atoms',
			description: 'Explore all available atoms with examples and documentation.',
			href: '/docs',
			linkText: 'View all atoms',
			icon: 'grid'
		},
		{
			title: 'Learn More',
			description: 'Understand the philosophy and architecture behind atoms.',
			href: '/docs/philosophy',
			linkText: 'Read philosophy',
			icon: 'book'
		}
	]
};
