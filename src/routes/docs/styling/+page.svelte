<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';
	import { Alert } from '$svelte-atoms/core/components/alert';

	const tailwindExample = `<!-- Layout & spacing -->
<Card.Root class="max-w-sm p-4">
  <Card.Header>
    <Card.Title class="text-lg font-semibold">Title</Card.Title>
  </Card.Header>
</Card.Root>

<!-- Interactive states -->
<button class="bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 active:bg-primary/100">
  Action
</button>

<!-- Responsive -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h2>

<!-- With opacity -->
<div class="bg-foreground/10">Subtle background</div>`;

	const classOrderExample = `<HtmlAtom
  class={[
    'base-layout-classes',    // flex, grid, etc.
    'sizing-classes',         // w-full, px-4, etc.
    'visual-classes',         // bg-primary, border, etc.
    isOpen && 'conditional',  // Conditional classes
    '$preset',                // Preset placeholder
    klass                     // User overrides (highest priority)
  ]}
/>`;

	const cnExample = `import { cn } from '@svelte-atoms/core/utils';

// Resolves conflicts automatically
cn('px-2 py-1', 'px-4'); 
// Result: 'py-1 px-4'

// Handles conditionals
cn('base', isActive && 'active', false && 'ignored');
// Result: 'base active'

// Merges arrays
cn(['text-sm', 'font-medium'], 'text-lg');
// Result: 'font-medium text-lg'`;

	const colorTokensExample = `<!-- Color tokens -->
<div class="bg-background text-foreground">Background color</div>
<Button class="bg-primary text-primary-foreground">Primary button</Button>

<!-- With opacity -->
<div class="bg-foreground/10 text-foreground/50">Subtle styling</div>

<!-- Borders and shadows -->
<Card.Root class="border-border border shadow-lg">Card</Card.Root>

<!-- All available colors -->
<div class="bg-secondary text-secondary-foreground">Secondary</div>
<div class="bg-muted text-muted-foreground">Muted</div>
<div class="bg-accent text-accent-foreground">Accent</div>
<div class="bg-destructive text-destructive-foreground">Destructive</div>`;

	const conditionalExample = `${'<'}script>
  let isOpen = $state(false);
  let isActive = $state(true);
${'<'}/script>

${'<'}!-- Array with conditions -->
${'<'}Collapsible.Body 
  class={[
    'pointer-events-none h-0 opacity-0', 
    isOpen && 'pointer-events-auto h-auto opacity-100'
  ]}
>
  Content
${'<'}/Collapsible.Body>

${'<'}!-- Ternary -->
${'<'}Tab.Root class={isActive ? 'opacity-100' : 'opacity-50'}>
  Tab content
${'<'}/Tab.Root>

${'<'}!-- Multiple conditions -->
${'<'}Button 
  class={[
    'base-button',
    isActive && 'bg-primary',
    isDisabled && 'opacity-50 pointer-events-none',
    size === 'large' && 'px-6 py-3'
  ]}
>
  Button
${'<'}/Button>`;

	const variantBasicExample = `${'<'}script lang="ts">
  import { defineVariants } from '@svelte-atoms/core/utils';
  import { HtmlAtom } from '@svelte-atoms/core';

  const buttonVariants = defineVariants({
    class: 'inline-flex items-center justify-center rounded-md font-medium',
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg'
      }
    },
    defaults: {
      variant: 'primary',
      size: 'md'
    }
  });

  let { variant, size, ...props } = $props();
${'<'}/script>

${'<'}HtmlAtom variants={buttonVariants} {variant} {size} {...props}>
  {@render children?.()}
${'<'}/HtmlAtom>`;

	const compoundVariantsExample = `const alertVariants = defineVariants({
  class: 'rounded-lg p-4 border',
  variants: {
    variant: {
      error: 'bg-destructive/10 border-destructive/50 text-destructive'
    },
    size: {
      lg: 'text-lg p-6'
    }
  },
  compounds: [
    {
      variant: 'error',
      size: 'lg',
      class: 'font-bold',
      role: 'alert',
      'aria-live': 'assertive'
    }
  ]
});`;

	const reactiveVariantsExample = `const accordionVariants = defineVariants((bond) => ({
  class: 'border rounded-md transition-all',
  variants: {
    state: {
      open: {
        class: bond?.state?.isOpen ? 'bg-primary/5 border-primary' : 'bg-card',
        'aria-expanded': bond?.state?.isOpen,
        'data-state': bond?.state?.isOpen ? 'open' : 'closed'
      }
    }
  }
}));`;

	const inlineStyleExample = `${'<'}script>
  let width = $state(240);
  let opacity = $state(1);
${'<'}/script>

${'<'}!-- ✅ Good: Dynamic values -->
${'<'}div style="width: {width}px; opacity: {opacity}">
  Dynamic sizing
${'<'}/div>

${'<'}!-- ✅ Good: Transform values -->
${'<'}div style="transform: translateX({offset}px) rotate({angle}deg)">
  Animated element
${'<'}/div>

${'<'}!-- ❌ Avoid: Static styling -->
${'<'}div style="padding: 16px; background: blue;">
  Use Tailwind instead
${'<'}/div>`;

	const presetPlaceholderExample = `<!-- In your component -->
<HtmlAtom
  preset="button"
  class={[
    'component-defaults',
    '$preset',  // Replaced with preset classes
    klass       // User classes override
  ]}
/>

<!-- Without $preset (preset at start) -->
<HtmlAtom
  preset="button"
  class={['component-classes', klass]}
/>

<!-- Result: preset-classes component-classes user-classes -->`;
</script>

{#snippet SectionCard(title: string, code: string, description?: string)}
	<Card.Root class="">
		<Card.Header class="border-border py-2.5">
			<h3 class="font-semibold">{title}</h3>
		</Card.Header>
		<Card.Body class="p-0">
			{#if description}
				<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
					{@html description}
				</p>
			{/if}
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground">{code}</code></pre>
			</div>
		</Card.Body>
	</Card.Root>
{/snippet}

<div class="mx-auto grid max-w-4xl gap-16 px-4 py-12">
	<!-- Header -->
	<div>
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Styling System</h1>
		<p class="text-muted-foreground text-lg">
			A comprehensive guide to styling components with TailwindCSS, variants, presets, and the cn()
			utility.
		</p>
	</div>

	<!-- Overview -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Overview</h2>
			<p class="text-muted-foreground text-sm">
				The styling system combines utility-first CSS with powerful variant definitions and global
				theming.
			</p>
		</div>

		<p class="text-muted-foreground leading-relaxed">
			All components accept a <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
				>class</code
			>
			prop that supports strings, arrays with conditionals, and objects. The styling system is built
			on TailwindCSS utility classes, enhanced with the
			<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">cn()</code> utility for intelligent
			class merging, and integrated with the preset system for global theming.
		</p>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Class Prop Formats</h3>
			<div class="grid gap-4 sm:grid-cols-2">
				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">String</h4>
						<code class="text-muted-foreground block text-xs">class="bg-primary text-white"</code>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Array</h4>
						<code class="text-muted-foreground block text-xs"
							>class={`{['base', isActive && 'active']}`}</code
						>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Object</h4>
						<code class="text-muted-foreground block text-xs"
							>class={`{{ 'active': isActive }}`}</code
						>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Mixed</h4>
						<code class="text-muted-foreground block text-xs"
							>class={`{['base', condition && 'class', klass]}`}</code
						>
					</Card.Body>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- TailwindCSS -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">TailwindCSS Utilities</h2>
			<p class="text-muted-foreground text-sm">
				Use Tailwind utility classes for 90% of your styling needs with full responsive support.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Common Patterns</h3>
			</div>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground">{tailwindExample}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- cn() Utility -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">The cn() Utility</h2>
			<p class="text-muted-foreground text-sm">
				Intelligent class merging with automatic conflict resolution using clsx and tailwind-merge.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Usage Examples</h3>
			</div>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				The <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">cn()</code> utility
				combines <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">clsx</code>
				for conditional class handling with
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">tailwind-merge</code> for
				intelligent Tailwind class conflict resolution. When conflicting utility classes are provided,
				the last one wins.
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground">{cnExample}</code></pre>
			</div>
		</div>
	</section>

	<!-- Color Tokens -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">CSS Custom Properties</h2>
			<p class="text-muted-foreground text-sm">
				Use theme color tokens for consistent, theme-aware styling across your application. The
				library uses a token system following <a
					href="https://ui.shadcn.com/docs/theming"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline">shadcn/ui</a
				> conventions for maximum compatibility and familiarity.
			</p>
		</div>

		<Card.Root class="mb-6 ">
			<Card.Body class="">
				<div class="mb-4">
					<h4 class="mb-3 text-sm font-semibold">Available Color Tokens</h4>
					<div class="grid gap-2 sm:grid-cols-2">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>background</code
								>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">primary</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>primary-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">secondary</code
								>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>secondary-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">muted</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>muted-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">accent</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>accent-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>destructive</code
								>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>destructive-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">card</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>card-foreground</code
								>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">border</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">input</code>
								<span class="text-muted-foreground text-sm"> / </span>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">ring</code>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card.Root>

		{@render SectionCard('Color Token Usage', colorTokensExample)}
	</section>

	<!-- Conditional Classes -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Conditional Styling</h2>
			<p class="text-muted-foreground text-sm">
				Apply classes conditionally based on component state or props using arrays and ternary
				operators.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Usage Examples</h3>
			</div>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground"
						>{conditionalExample}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Variant System -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Variant System</h2>
			<p class="text-muted-foreground text-sm">
				Define reusable component variants with full TypeScript support and bond state access.
			</p>
		</div>

		<Alert.Root variant="info">
			<Alert.Title>Local vs Global Variants</Alert.Title>
			<Alert.Description>
				<p class="text-muted-foreground mb-3 text-sm leading-relaxed">
					Variants can be defined in two ways:
				</p>
				<div class="grid gap-3">
					<div class="flex gap-3">
						<div class="text-primary mt-0.5">•</div>
						<div>
							<span class="text-sm font-semibold">Local Variants (Component-Level):</span>
							<span class="text-muted-foreground text-sm">
								Define variants directly in your component using <code
									class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>defineVariants()</code
								>. This approach is described below and is ideal for component-specific styling that
								doesn't need to be shared across your application.
							</span>
						</div>
					</div>
					<div class="flex gap-3">
						<div class="text-primary mt-0.5">•</div>
						<div>
							<span class="text-sm font-semibold">Global Variants (Preset System):</span>
							<span class="text-muted-foreground text-sm">
								Define variants globally using the preset system in your <code
									class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>+layout.svelte</code
								>
								file. This allows you to set consistent styling for all components of a specific type
								throughout your application. See the
								<a href="/docs/preset" class="text-primary font-medium hover:underline"
									>Preset Documentation</a
								> for details on global variant configuration.
							</span>
						</div>
					</div>
				</div>
			</Alert.Description>
		</Alert.Root>

		<p class="mb-4 text-sm leading-relaxed">
			The <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
				>defineVariants()</code
			>
			utility provides a powerful way to create component styling variations at the component level.
			Variants can define multiple styling dimensions (size, variant, state), support compound variants
			for conditional styling when multiple conditions match, and access component bond state for reactive
			styling.
		</p>
		<p class="text-sm">
			This example shows how to define variants at the component level. For global variants that
			apply across your entire application, use the preset system instead.
		</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Basic Variant Definition</h3>
			</div>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground"
						>{variantBasicExample}</code
					></pre>
			</div>
		</div>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Key Features</h3>
			<div class="grid gap-4 sm:grid-cols-2">
				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Base Classes</h4>
						<p class="text-muted-foreground text-sm">
							Define base styling that applies to all variants
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Multiple Dimensions</h4>
						<p class="text-muted-foreground text-sm">
							Combine variant, size, state, and custom dimensions
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Default Values</h4>
						<p class="text-muted-foreground text-sm">
							Set sensible defaults for all variant dimensions
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Type Safety</h4>
						<p class="text-muted-foreground text-sm">
							Automatic TypeScript inference for all variant options
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Compound Variants</h4>
						<p class="text-muted-foreground text-sm">
							Apply styling when multiple conditions match
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Attribute Support</h4>
						<p class="text-muted-foreground text-sm">
							Return aria-*, data-*, and other HTML attributes
						</p>
					</Card.Body>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- Compound Variants -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Compound Variants</h2>
			<p class="text-muted-foreground text-sm">
				Apply additional styling when multiple variant conditions match simultaneously.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Usage Example</h3>
			</div>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				Compound variants allow you to define styling that only applies when specific combinations
				of variant values are active. This is useful for edge cases or special styling requirements
				that go beyond single-dimension variants. Compounds can also set HTML attributes like
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">role</code> and
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">aria-*</code> attributes.
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground"
						>{compoundVariantsExample}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Reactive Variants -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Reactive Variants</h2>
			<p class="text-muted-foreground text-sm">
				Access component bond state for dynamic, reactive variant styling.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Usage Example</h3>
			</div>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				When you need variants to respond to component state, pass a function to <code
					class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">defineVariants()</code
				>
				that receives the component's bond. This enables reactive styling based on internal state like
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">isOpen</code>,
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">isActive</code>, or
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">isDisabled</code>.
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground"
						>{reactiveVariantsExample}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Preset Placeholder -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">The $preset Placeholder</h2>
			<p class="text-muted-foreground text-sm">
				Control exactly where preset classes are inserted in your class arrays.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Usage Example</h3>
			</div>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				When using presets, the special <code
					class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">'$preset'</code
				>
				string in your class array will be replaced with preset classes at that exact position. If no
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">'$preset'</code>
				placeholder is present, preset classes are automatically prepended to your class array.
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-xs leading-relaxed"><code class="text-foreground"
						>{presetPlaceholderExample}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Inline Styles -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Inline Styles</h2>
			<p class="text-muted-foreground text-sm">
				Use inline styles sparingly, only for truly dynamic values that cannot be expressed with
				classes.
			</p>
		</div>

		<p class="text-sm leading-relaxed">
			Inline styles should be reserved for values that change frequently or cannot be predetermined,
			such as dynamic widths, transforms, or opacity values driven by user interaction or animation.
			For static styling, always prefer Tailwind utility classes.
		</p>
		<div>
			<h4 class="mb-3 text-sm font-semibold">When to Use Inline Styles:</h4>
			<div class="space-y-2">
				<div class="flex gap-2">
					<div class="text-primary mt-0.5">✅</div>
					<div>
						<span class="text-muted-foreground text-sm"
							>Dynamic dimensions (width, height) based on state</span
						>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="text-primary mt-0.5">✅</div>
					<div>
						<span class="text-muted-foreground text-sm"
							>Transform values for animations (translate, rotate, scale)</span
						>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="text-primary mt-0.5">✅</div>
					<div>
						<span class="text-muted-foreground text-sm"
							>Opacity transitions not covered by Tailwind</span
						>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="text-primary mt-0.5">❌</div>
					<div>
						<span class="text-muted-foreground text-sm"
							>Static colors, padding, margins (use Tailwind)</span
						>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="text-primary mt-0.5">❌</div>
					<div>
						<span class="text-muted-foreground text-sm"
							>Fixed dimensions or spacing (use Tailwind)</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Best Practices -->
	<section class="grid gap-6">
		<div class="grid gap-1">
			<h2 class="text-3xl font-bold">Best Practices</h2>
			<p class="text-muted-foreground text-sm">
				Guidelines for effective styling that leads to maintainable, performant applications.
			</p>
		</div>

		<div class="grid gap-3 md:grid-cols-2">
			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">1.</div>
						<div>
							<h4 class="mb-1 font-semibold">Prefer Tailwind Utilities</h4>
							<p class="text-muted-foreground text-sm">
								Use TailwindCSS classes for 90% of styling needs. They're optimized, purged in
								production, and provide consistent design tokens.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">2.</div>
						<div>
							<h4 class="mb-1 font-semibold">User Classes Override Last</h4>
							<p class="text-muted-foreground text-sm">
								Always place user-provided classes (like the class prop) last in your class array to
								ensure they can override component defaults and preset styles.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">3.</div>
						<div>
							<h4 class="mb-1 font-semibold">Use Presets for Consistency</h4>
							<p class="text-muted-foreground text-sm">
								Define component defaults once in presets rather than repeating classes across your
								application. This makes theme changes easier.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">4.</div>
						<div>
							<h4 class="mb-1 font-semibold">Leverage cn() for Merging</h4>
							<p class="text-muted-foreground text-sm">
								Always use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>cn()</code
								> when merging classes. It handles conflicts intelligently and works with conditionals.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">5.</div>
						<div>
							<h4 class="mb-1 font-semibold">Avoid Inline Styles</h4>
							<p class="text-muted-foreground text-sm">
								Reserve inline styles for truly dynamic values only. Static styling should always
								use utility classes for better performance and maintainability.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">6.</div>
						<div>
							<h4 class="mb-1 font-semibold">Keep Specificity Low</h4>
							<p class="text-muted-foreground text-sm">
								Avoid <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>!important</code
								>
								and overly specific selectors. Let the cascade and class order handle overrides naturally.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">7.</div>
						<div>
							<h4 class="mb-1 font-semibold">Use Semantic Color Tokens</h4>
							<p class="text-muted-foreground text-sm">
								Prefer semantic tokens like <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">bg-primary</code
								>
								over specific colors like
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">bg-blue-500</code
								>. This ensures theme compatibility.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">8.</div>
						<div>
							<h4 class="mb-1 font-semibold">Extract Reusable Variants</h4>
							<p class="text-muted-foreground text-sm">
								When you find yourself repeating the same variant combinations, extract them into a <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>defineVariants()</code
								> definition.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
