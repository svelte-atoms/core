<script lang="ts">
	import { HtmlAtom } from '$lib/components/atom';
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
	import { htmlAtomProps } from './props';

	const basicCode = `<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
<\/script>

<HtmlAtom>Default div element</HtmlAtom>

<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Click me
</HtmlAtom>`;

	const compositionCode = `<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { Button } from '@svelte-atoms/core/button';
<\/script>

<!-- Use Button as base, add custom styles -->
<HtmlAtom base={Button} class="custom-additional-styles">
  Composed Button
</HtmlAtom>`;

	const animationCode = `<script lang="ts">
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
{/if}`;

	const variantsCode = `<script lang="ts">
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
</HtmlAtom>`;

	const customComponentCode = `<script lang="ts">
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
</HtmlAtom>`;
</script>

<svelte:head>
	<title>Atom (HtmlAtom) - Svelte Atoms</title>
	<meta
		name="description"
		content="Foundational building block for all HTML-based components with base styling system, preset integration, and component composition."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/components' }, { label: 'Atom' }]} />

	<PageHeader
		title="Atom (HtmlAtom)"
		description="The foundational building block for all HTML-based components. Provides base styling system, preset integration, and powerful component composition capabilities."
		githubUrl="https://github.com/svelte-atoms/core/tree/main/src/lib/components/atom"
	/>

	<PageNavigation
		sections={[
			{ id: 'installation', title: 'Installation' },
			{ id: 'basic-usage', title: 'Basic Usage' },
			{ id: 'composition', title: 'Component Composition' },
			{ id: 'animation', title: 'Animation & Transitions' },
			{ id: 'variants', title: 'Variants System' },
			{ id: 'custom-component', title: 'Custom Components' },
			{ id: 'props', title: 'Props' },
			{ id: 'accessibility', title: 'Accessibility' }
		]}
	/>

	<Installation packageName="@svelte-atoms/core" id="installation" />

	<Section id="basic-usage" title="Basic Usage">
		<p class="text-muted-foreground mb-4">
			HtmlAtom can render any HTML element using the <code>as</code> prop. By default, it renders a
			<code>div</code>.
		</p>

		<DemoExample code={basicCode}>
			<div class="flex flex-col gap-4">
				<HtmlAtom class="rounded-lg border p-4">Default div element</HtmlAtom>

				<HtmlAtom
					as="button"
					class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Click me
				</HtmlAtom>

				<HtmlAtom as="section" class="rounded-lg border p-4">
					<HtmlAtom as="h3" class="mb-2 font-semibold">Section Title</HtmlAtom>
					<HtmlAtom as="p" class="text-muted-foreground">Section content with semantic HTML</HtmlAtom
					>
				</HtmlAtom>
			</div>
		</DemoExample>
	</Section>

	<Section id="composition" title="Component Composition">
		<p class="text-muted-foreground mb-4">
			The <code>base</code> prop enables powerful component composition. You can use any component
			as a base and add additional styling or behavior.
		</p>

		<CodeBlock code={compositionCode} language="svelte" />
	</Section>

	<Section id="animation" title="Animation & Transitions">
		<p class="text-muted-foreground mb-4">
			HtmlAtom provides lifecycle hooks for animations and transitions: <code>enter</code>,
			<code>exit</code>, <code>animate</code>, and <code>initial</code>.
		</p>

		<CodeBlock code={animationCode} language="svelte" />
	</Section>

	<Section id="variants" title="Variants System">
		<p class="text-muted-foreground mb-4">
			Use the variants system to define reusable style combinations with type-safe props.
		</p>

		<DemoExample code={variantsCode}>
			<div class="flex flex-wrap gap-3">
				<HtmlAtom as="button" class="rounded bg-blue-500 px-2 py-1 text-sm text-white">
					Small Primary
				</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white">
					Medium Primary
				</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-blue-500 px-6 py-3 text-lg text-white">
					Large Primary
				</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-gray-500 px-4 py-2 text-white">
					Secondary
				</HtmlAtom>
			</div>
		</DemoExample>
	</Section>

	<Section id="custom-component" title="Building Custom Components">
		<p class="text-muted-foreground mb-4">
			HtmlAtom is perfect for building custom components with full TypeScript support and element-specific
			props.
		</p>

		<CodeBlock code={customComponentCode} language="svelte" />
	</Section>

	<Props data={htmlAtomProps} id="props" />

	<AccessibilityInfo
		id="accessibility"
		items={[
			{
				title: 'Semantic HTML',
				description:
					'Use appropriate element types via the `as` prop to ensure proper semantic structure and accessibility.'
			},
			{
				title: 'Element-Specific Attributes',
				description:
					'HtmlAtom supports all standard HTML attributes for the specified element type, including ARIA attributes.'
			},
			{
				title: 'Keyboard Navigation',
				description:
					'Interactive elements (buttons, links, etc.) maintain native keyboard behavior when using the appropriate `as` value.'
			},
			{
				title: 'Type Safety',
				description:
					'TypeScript generics ensure you can only use props valid for the specified element type.'
			}
		]}
		ariaPatterns={[
			{
				pattern: 'All standard HTML & ARIA attributes',
				usage: 'Supported based on the element type specified in the `as` prop'
			}
		]}
	/>
</div>
