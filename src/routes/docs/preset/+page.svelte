<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';

	const globalPresetCode = `// +layout.svelte (App Root)
import { setPreset } from '@svelte-atoms/core/context';
import { Root } from '@svelte-atoms/core/components/root';

const theme = {
  button: () => ({
    class: 'rounded-lg px-4 py-2 font-semibold transition-colors',
    variants: {
      variant: {
        primary: { class: 'bg-primary text-primary-foreground hover:bg-primary/90' },
        secondary: { class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
        destructive: { class: 'bg-destructive text-destructive-foreground hover:bg-destructive/90' }
      },
      size: {
        sm: { class: 'h-8 px-3 text-sm' },
        md: { class: 'h-10 px-4' },
        lg: { class: 'h-12 px-6 text-lg' }
      }
    },
    defaults: {
      variant: 'primary',
      size: 'md'
    }
  }),
  
  card: () => ({
    class: 'rounded-xl border border-border bg-card shadow-sm'
  }),
  
  'card.title': () => ({
    class: 'text-xl font-bold text-card-foreground'
  })
};

setPreset(theme);`;

	const routePresetCode = `// routes/dashboard/+layout.svelte
import { setPreset } from '@svelte-atoms/core/context';

// Extends and overrides the global preset
setPreset({
  button: () => ({
    class: 'text-sm', // Merges with global button classes
    variants: {
      variant: {
        // Adds new variant, keeps primary, secondary, destructive
        info: { class: 'bg-blue-500 text-white hover:bg-blue-600' }
      }
    }
  }),
  
  card: () => ({
    class: 'bg-slate-50 border-slate-200' // Overrides global card styling
  })
});

// All buttons in /dashboard/* now have the extended variants`;

	const componentPresetCode = `// components/Settings.svelte
import { setPreset } from '@svelte-atoms/core/context';
import { Card } from '@svelte-atoms/core/card';

// Component-level preset for this subtree
setPreset({
  'card.title': () => ({
    class: 'text-purple-600' // Purple titles in settings only
  })
});

<Card.Root>
  <Card.Header>
    <Card.Title>Settings</Card.Title> <!-- Purple! -->
  </Card.Header>
</Card.Root>`;

	const dynamicPresetCode = `import { setPreset } from '@svelte-atoms/core/context';
import { defineState, defineProperty } from '@svelte-atoms/core/utils';

setPreset({
  'accordion.item.header': (bond) => {
    return defineState([
      defineProperty('class', () => [
        'px-4 py-3 cursor-pointer transition-colors',
        // Access component state for reactive styling
        bond?.state?.isOpen
          ? 'bg-primary/10 text-primary font-semibold'
          : 'hover:bg-muted text-muted-foreground'
      ]),
      defineProperty('aria-expanded', () => bond?.state?.isOpen)
    ]);
  },
  
  'collapsible.trigger': (bond) => ({
    class: bond?.state?.isOpen 
      ? 'rotate-180 transition-transform' 
      : 'transition-transform'
  })
});`;

	const compoundPresetCode = `setPreset({
  // Parent component
  alert: () => ({
    class: 'relative rounded-lg border p-4',
    variants: {
      variant: {
        default: { class: 'bg-background text-foreground' },
        destructive: { class: 'bg-destructive/10 text-destructive border-destructive/50' },
        success: { class: 'bg-green-50 text-green-900 border-green-200' }
      }
    },
    defaults: {
      variant: 'default'
    }
  }),
  
  // Child components (dot notation)
  'alert.icon': () => ({
    class: 'h-4 w-4'
  }),
  
  'alert.title': () => ({
    class: 'mb-1 font-semibold leading-tight'
  }),
  
  'alert.description': () => ({
    class: 'text-sm leading-relaxed opacity-90'
  }),
  
  'alert.actions': () => ({
    class: 'mt-3 flex items-center gap-2'
  })
});`;

	const placeholderCode = `// In your component
import { HtmlAtom } from '@svelte-atoms/core';

let { class: klass = '' } = $props();

<HtmlAtom
  preset="button"
  class={[
    'my-custom-class',
    '$preset',  // Replaced with preset classes
    klass       // User classes override everything
  ]}
/>

// Result: 'my-custom-class rounded-lg px-4 py-2 font-semibold user-class'`;

	const attributesCode = `// Presets can set any HTML attributes, not just classes
setPreset({
  button: () => ({
    class: 'rounded-lg px-4 py-2',
    'data-component': 'button',
    'data-version': '1.0',
    role: 'button',
    tabindex: 0
  }),
  
  'card.title': () => ({
    class: 'text-xl font-bold',
    'data-heading': 'true',
    'aria-level': 2
  }),
  
  // Variant-specific attributes
  alert: () => ({
    variants: {
      variant: {
        destructive: {
          class: 'bg-destructive/10 text-destructive',
          'data-variant': 'destructive',
          'aria-live': 'assertive',
          role: 'alert'
        },
        info: {
          class: 'bg-blue-50 text-blue-900',
          'data-variant': 'info',
          'aria-live': 'polite'
        }
      }
    }
  })
});

// Components will receive these attributes automatically
<Button>Click me</Button>
// Renders: <button class="rounded-lg px-4 py-2" data-component="button" data-version="1.0" role="button" tabindex="0">`;

	const extendingCode = `// Base theme (global)
setPreset({
  button: () => ({
    class: 'rounded-md font-medium transition-colors',
    variants: {
      variant: {
        primary: { class: 'bg-blue-500 text-white' },
        secondary: { class: 'bg-gray-200 text-gray-900' }
      },
      size: {
        sm: { class: 'px-3 py-1 text-sm' },
        md: { class: 'px-4 py-2' }
      }
    }
  })
});

// Extended theme (route or component level)
setPreset({
  button: () => ({
    // Add new variants (merges with existing)
    variants: {
      variant: {
        gradient: { class: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
        outline: { class: 'border-2 border-primary bg-transparent text-primary' }
      },
      size: {
        xl: { class: 'px-8 py-4 text-xl' } // Add new size
      }
    }
  })
});

// Result: All variants available (primary, secondary, gradient, outline)
// All sizes available (sm, md, xl)`;

	const performanceCode = `// ✅ Optimized: Preset resolution is memoized
// - Only recomputes when preset key or bond changes
// - Class string interpolation is cached
// - Early exit for components without $preset placeholder

const preset = $derived.by(() => {
  if (!presetKey) return undefined;
  return getPreset(presetKey)?.apply?.(bond, [bond]);
});

const presetClassString = $derived(cn(preset?.class));

const _klass = $derived.by(() => {
  const merged = cn(klass, mergedVariants?.class ?? '');
  // Early exit if no $preset placeholder
  if (!merged.includes('$preset')) return merged;
  return merged.replaceAll('$preset', presetClassString);
});`;

	const bestPracticesCode = `// ✅ DO: Set global presets at app root
// +layout.svelte
setPreset({ /* base theme */ });

// ✅ DO: Override at route level for sections
// routes/admin/+layout.svelte
setPreset({ /* admin theme */ });

// ✅ DO: Use dot notation for specificity
setPreset({
  'card.title': () => ({ class: 'text-xl font-bold' })
});

// ✅ DO: Access bond state for reactivity
setPreset({
  'accordion.item.header': (bond) => ({
    class: bond?.state?.isOpen ? 'bg-accent' : 'bg-background'
  })
});

// ❌ DON'T: Override presets for one-off styling
// Use component props instead
<Button class="custom-one-off-style">Click</Button>

// ❌ DON'T: Create overly complex preset functions
// Keep preset logic simple and focused`;
</script>

<svelte:head>
	<title>Preset System - Svelte Atoms</title>
	<meta
		name="description"
		content="Learn about the powerful preset system for global component styling and theming in Svelte Atoms."
	/>
</svelte:head>

{#snippet SectionCard(title: string, code: string, description?: string, badge?: string)}
	<div class="flex flex-col">
		<div class="border-border py-2.5">
			<h3 class="font-semibold">{title}</h3>
		</div>
		{#if description}
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				{@html description}
			</p>
		{/if}
		<div class="bg-muted rounded-lg p-4">
			<pre class="text-xs leading-relaxed"><code class="text-foreground">{code}</code></pre>
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Preset System</h1>
		<p class="text-muted-foreground text-lg">
			A powerful theming and styling system for global component configuration with hierarchical
			composition and reactive state support.
		</p>
	</div>

	<!-- Overview -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Overview</h2>
			<p class="text-muted-foreground text-sm">
				Define default styles, variants, and behaviors at any level of your application hierarchy.
			</p>
		</div>

		<p class="text-muted-foreground leading-relaxed">
			The Preset System is a sophisticated theming mechanism that uses Svelte's context system
			combined with deep merging to enable powerful composition and extension patterns. Set base
			themes at app root, override at route level, or customize at component level with full type
			safety and reactive state support.
		</p>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Key Features</h3>
			<div class="grid gap-4 sm:grid-cols-2">
				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Hierarchical Composition</h4>
						<p class="text-muted-foreground text-sm">
							Define base themes at app root, override at route level, customize at component level
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Deep Merging</h4>
						<p class="text-muted-foreground text-sm">
							Presets merge across context layers, allowing progressive enhancement
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Variant Support</h4>
						<p class="text-muted-foreground text-sm">
							Define variant systems with defaults that work globally
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Reactive State</h4>
						<p class="text-muted-foreground text-sm">
							Access component bond state for dynamic styling
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Compound Components</h4>
						<p class="text-muted-foreground text-sm">
							Configure nested components using dot notation
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Performance Optimized</h4>
						<p class="text-muted-foreground text-sm">
							Memoized resolution with early exit optimizations
						</p>
					</Card.Body>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- Global Preset -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Global Preset Configuration</h2>
			<p class="text-muted-foreground text-sm">
				Define base theme at application root for consistent styling.
			</p>
		</div>

		{@render SectionCard('App Root Configuration', globalPresetCode)}
	</section>

	<!-- Route-Level Override -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Route-Level Overrides</h2>
			<p class="text-muted-foreground text-sm">
				Extend or override presets for specific routes and sections.
			</p>
		</div>

		{@render SectionCard('Route Layout Override', routePresetCode)}
	</section>

	<!-- Component-Level -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Component-Level Customization</h2>
			<p class="text-muted-foreground text-sm">
				Scope presets to specific component trees without affecting global theme.
			</p>
		</div>

		{@render SectionCard('Component Scoped Preset', componentPresetCode)}
	</section>

	<!-- Compound Components -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Compound Component Presets</h2>
			<p class="text-muted-foreground text-sm">
				Configure nested components using dot notation for precise control.
			</p>
		</div>

		<p class="text-muted-foreground text-sm leading-relaxed">
			Use dot notation to style compound components and their children. This is especially powerful
			for components like Alert, Card, Dialog, and Accordion. The pattern is <code
				class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">'parent.child'</code
			> for precise styling control.
		</p>

		{@render SectionCard(
			'Dot Notation Example',
			compoundPresetCode,
			"Use dot notation to style compound components and their children. This is especially powerful for components like Alert, Card, Dialog, and Accordion. The pattern is <code class='bg-muted text-foreground rounded px-1.5 py-0.5 text-xs'>'parent.child'</code> for precise styling control."
		)}
	</section>

	<!-- Reactive State -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Reactive State-Based Styling</h2>
			<p class="text-muted-foreground text-sm">
				Access component state for dynamic, reactive preset styling.
			</p>
		</div>

		<p class="text-muted-foreground text-sm leading-relaxed">
			Preset functions receive the component's bond as a parameter, giving you access to the
			component's reactive state. Use this to create dynamic styles that update automatically
			when component state changes. The function returns another function that returns the
			preset object, allowing for reactive class computation based on bond state.
		</p>

		{@render SectionCard(
			'Accordion Active State Example',
			`'accordion.item.header': (bond) => {
  return () => ({
    class: ['', bond?.state?.isActive ? 'text-foreground/100' : 'text-foreground/50']
  });
}`,
			"Preset functions receive the component's bond as a parameter, giving you access to the component's reactive state. Use this to create dynamic styles that update automatically when component state changes. The function returns another function that returns the preset object, allowing for reactive class computation based on bond state."
		)}
	</section>

	<!-- The $preset Placeholder -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">The $preset Placeholder</h2>
			<p class="text-muted-foreground text-sm">
				Control exactly where preset classes are inserted in your class arrays.
			</p>
		</div>

		{@render SectionCard('Placeholder Usage', placeholderCode)}
	</section>

	<!-- Additional Attributes -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Setting HTML Attributes</h2>
			<p class="text-muted-foreground text-sm">Presets can define any HTML attributes, not just classes.</p>
		</div>

		<Card.Root class="mb-4">
			<Card.Body class="p-6">
				<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
					Beyond styling with classes, presets can set any HTML attributes including <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">data-*</code
					>,
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">aria-*</code>,
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">role</code>, and
					more.
				</p>
				<div>
					<h4 class="mb-3 text-sm font-semibold">Common Use Cases:</h4>
					<div class="space-y-2">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<span class="text-sm font-semibold">Accessibility:</span>
								<span class="text-muted-foreground text-sm">
									Set <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>aria-*</code
									>,
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">role</code>,
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">tabindex</code>
									for consistent a11y
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<span class="text-sm font-semibold">Testing:</span>
								<span class="text-muted-foreground text-sm">
									Add <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>data-testid</code
									>
									or
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>data-component</code
									> attributes
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<span class="text-sm font-semibold">Analytics:</span>
								<span class="text-muted-foreground text-sm">
									Include <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>data-analytics</code
									> or tracking attributes
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<span class="text-sm font-semibold">State Indicators:</span>
								<span class="text-muted-foreground text-sm">
									Use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>data-state</code
									>
									or
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>data-variant</code
									> for CSS selectors
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card.Root>

		{@render SectionCard('Attribute Configuration', attributesCode)}
	</section>

	<!-- Extending Presets -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Extending & Composing Presets</h2>
			<p class="text-muted-foreground text-sm">
				Build upon existing preset definitions with deep merging.
			</p>
		</div>

		<p class="text-muted-foreground leading-relaxed">
			The preset system uses deep merging to combine configurations across context layers. This
			allows you to extend base presets with new variants, sizes, or completely new preset keys
			without losing existing definitions.
		</p>

		{@render SectionCard(
			'Deep Merge Example',
			extendingCode,
			'The preset system uses deep merging to combine configurations across context layers. This allows you to extend base presets with new variants, sizes, or completely new preset keys without losing existing definitions.'
		)}
	</section>

	<!-- Best Practices -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Best Practices</h2>
			<p class="text-muted-foreground text-sm">Guidelines for effective preset usage and patterns.</p>
		</div>

		<div class="mb-6">
			{@render SectionCard("Best Practices - Do's and Don'ts", bestPracticesCode)}
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">1.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Set global presets at app root</p>
							<p class="text-muted-foreground text-sm">
								Define your base theme in <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">+layout.svelte</code
								> for consistent styling
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">2.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Override at route level (future)</p>
							<p class="text-muted-foreground text-sm">
								Use route layouts to customize sections of your app without affecting global theme
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">3.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Use component-level sparingly</p>
							<p class="text-muted-foreground text-sm">
								Only when specific component trees need unique styling that can't be achieved at
								route level
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">4.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Leverage dot notation for specificity</p>
							<p class="text-muted-foreground text-sm">
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>'card.title'</code
								>
								is more specific than
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">'card'</code>
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">5.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Access bond state for reactivity</p>
							<p class="text-muted-foreground text-sm">
								Use the bond parameter in preset functions for dynamic, state-driven styles
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">6.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Merge, don't replace</p>
							<p class="text-muted-foreground text-sm">
								Presets merge across contexts - build up configurations gradually instead of
								replacing
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 font-bold">7.</div>
						<div>
							<p class="mb-1 text-sm font-semibold">Keep presets simple</p>
							<p class="text-muted-foreground text-sm">
								Presets are for common patterns; use component props for one-off customizations
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Use Cases -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">Common Use Cases</h2>
			<p class="text-muted-foreground text-sm">Real-world scenarios where presets excel.</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">Multi-Tenant Applications</h4>
					<p class="text-muted-foreground text-sm">
						Different organizations can have their own branded themes by setting presets based on
						tenant configuration.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">Dark Mode Implementation</h4>
					<p class="text-muted-foreground text-sm">
						Toggle between light and dark presets at the root level to implement theme switching.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">Dashboard vs Marketing Site</h4>
					<p class="text-muted-foreground text-sm">
						Use route-level presets for compact dashboard styles and spacious marketing page
						layouts.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">Component Library Theming</h4>
					<p class="text-muted-foreground text-sm">
						Provide default presets with your library that consumers can easily override or extend.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">A/B Testing Styles</h4>
					<p class="text-muted-foreground text-sm">
						Conditionally apply different presets based on user segments or feature flags.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 font-semibold">Responsive Styling</h4>
					<p class="text-muted-foreground text-sm">
						Adjust component variants based on viewport size or device capabilities.
					</p>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- API Reference -->
	<section class="flex flex-col gap-4">
		<div class="">
			<h2 class="mb-2 text-3xl font-bold">API Reference</h2>
			<p class="text-muted-foreground text-sm">Core functions and types for the preset system.</p>
		</div>

		<div class="space-y-4">
			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 text-sm font-semibold">setPreset(preset)</h4>
					<p class="text-muted-foreground mb-3 text-sm">
						Sets or merges preset configuration in the current context.
					</p>
					<div class="bg-muted rounded-lg p-3">
						<code class="text-xs">setPreset(preset: Partial&lt;Preset&gt;): void</code>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 text-sm font-semibold">getPreset(key?)</h4>
					<p class="text-muted-foreground mb-3 text-sm">
						Retrieves preset configuration. If key is provided, returns specific preset entry;
						otherwise returns all presets.
					</p>
					<div class="bg-muted rounded-lg p-3">
						<code class="text-xs"
							>getPreset&lt;K&gt;(key?: K): PresetEntry | Partial&lt;Preset&gt;</code
						>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 text-sm font-semibold">Preset Entry Function</h4>
					<p class="text-muted-foreground mb-3 text-sm">
						Preset entries are functions that receive the component bond and return configuration
						objects.
					</p>
					<div class="bg-muted rounded-lg p-3">
						<code class="text-xs"
							>type PresetEntry = (bond: Bond | null) =&gt; PresetEntryRecord</code
						>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
				<Card.Body class="p-5">
					<h4 class="mb-2 text-sm font-semibold">PresetEntryRecord</h4>
					<p class="text-muted-foreground mb-3 text-sm">
						The object returned by preset functions. Supports any HTML attributes including class,
						data-*, aria-*, role, etc.
					</p>
					<div class="bg-muted rounded-lg p-3">
						<pre class="overflow-x-auto text-xs"><code class="text-foreground"
								>{`{
  class?: ClassValue;
  as?: string;
  base?: Base;
  variants?: {
    [variantName: string]: {
      [variantValue: string]: any; // Can include class, data-*, aria-*, etc.
    };
  };
  compounds?: Array<Record<string, any>>;
  defaults?: Record<string, any>;
  // Any additional HTML attributes:
  // 'data-*'?: string;
  // 'aria-*'?: string;
  // role?: string;
  // tabindex?: number;
  // etc.
}`}</code
							></pre>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
