const basicCode = `
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
<\/script>

<HtmlAtom>Default div element</HtmlAtom>

<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Click me
</HtmlAtom>`.trim();

const compositionCode = `
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { Button } from '@svelte-atoms/core/button';
<\/script>

<!-- Use Button as base, add custom styles -->
<HtmlAtom base={Button} class="custom-additional-styles">
  Composed Button
</HtmlAtom>`.trim();

const animationCode = `
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { fade, slide } from 'svelte/transition';
  
  let show = $state(true);
<\/script>

{#if show}
  <HtmlAtom 
    enter={(node) => fade(node, { duration: 200 })}
    exit={(node) => slide(node, { duration: 200 })}
  >
    Animated content
  </HtmlAtom>
{/if}`.trim();

const variantsCode = `
<script lang="ts">
  import { HtmlAtom, defineVariants } from '@svelte-atoms/core';
  
  const variants = defineVariants({
    variants: {
      variant: {
        primary: { class: 'bg-blue-500 text-white' },
        secondary: { class: 'bg-gray-500 text-white' }
      },
      size: {
        sm: { class: 'px-2 py-1 text-sm' },
        md: { class: 'px-4 py-2' },
        lg: { class: 'px-6 py-3 text-lg' }
      }
    }
  });
<\/script>

<HtmlAtom 
  as="button" 
  variants={variants}
  variant="primary"
  size="md"
>
  Styled Button
</HtmlAtom>`.trim();

const customComponentCode = `
<script lang="ts">
  import { HtmlAtom, type HtmlAtomProps } from '@svelte-atoms/core';
  
  type Props = HtmlAtomProps<'button'> & {
    variant?: 'primary' | 'secondary' | 'danger';
  };
  
  let { 
    variant = 'primary', 
    class: klass = '', 
    children, 
    ...restProps 
  }: Props = $props();
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
<\/script>

<HtmlAtom 
  as="button" 
  class="{variantClasses[variant]} rounded px-4 py-2 {klass}" 
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</HtmlAtom>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  atom: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'ARIA attributes',
	'Keyboard navigation',
	'Focus management',
	'Screen reader support'
];

const useCases = [
	{
		title: 'Custom Elements',
		description:
			'Render any HTML element type via the `as` prop while retaining all atom capabilities.'
	},
	{
		title: 'Animation Hooks',
		description:
			'Attach enter/exit/animate functions directly to elements without wrapper components.'
	},
	{
		title: 'Preset Styling',
		description: 'Apply named preset styles that are overridable at the theme level.'
	},
	{
		title: 'Bond Integration',
		description: 'Connect elements to Bond state machines for reactive ARIA attribute management.'
	},
	{
		title: 'Polymorphic Components',
		description:
			'Build higher-level components that delegate the underlying element type to consumers.'
	}
];

export const metadata = {
	title: 'Atom - Svelte Atoms',
	description: 'The foundational building block for all svelte-atoms components.',
	componentTitle: 'Atom',
	componentDescription:
		'The foundational building block for all svelte-atoms components. HtmlAtom provides a polymorphic HTML element with preset styling, Bond integration, and animation lifecycle hooks.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { BondAtom } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Atom' }],
	useCases,
	examples: {
		basic: basicCode,
		composition: compositionCode,
		animation: animationCode,
		variants: variantsCode,
		customComponent: customComponentCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
