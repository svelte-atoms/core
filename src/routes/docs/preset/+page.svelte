<script lang="ts">
	import { PageHeader } from '$docs';
	import { Breadcrumb } from '$docs/components';
	import { Section } from '$docs';

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

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Documentation', href: '/docs' }, { label: 'Preset System' }]} />

	<PageHeader
		title="Preset System"
		description="A powerful theming and styling system for global component configuration with hierarchical composition and reactive state support."
		status="stable"
	/>

	<!-- Overview -->
	<Section title="Overview">
		<div class="prose prose-slate max-w-none dark:prose-invert">
			<p class="text-muted-foreground">
				The Preset System is a sophisticated theming mechanism that allows you to define default
				styles, variants, and behaviors for your components at different levels of your application
				hierarchy. It uses Svelte's context system combined with deep merging to enable powerful
				composition and extension patterns.
			</p>

			<h3 class="text-foreground mt-8 text-lg font-semibold">Key Features</h3>
			<ul class="text-muted-foreground">
				<li>
					<strong>Hierarchical Composition:</strong> Define base themes at app root, override at route
					level, customize at component level
				</li>
				<li>
					<strong>Deep Merging:</strong> Presets merge across context layers, allowing progressive enhancement
				</li>
				<li>
					<strong>Variant Support:</strong> Define variant systems with defaults that work globally
				</li>
				<li>
					<strong>Reactive State:</strong> Access component bond state for dynamic styling
				</li>
				<li>
					<strong>Compound Components:</strong> Configure nested components using dot notation
				</li>
				<li>
					<strong>Performance Optimized:</strong> Memoized resolution with early exit optimizations
				</li>
			</ul>
		</div>
	</Section>

	<!-- Global Preset -->
	<Section title="Global Preset Configuration" description="Define base theme at application root">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Set up your base theme in the root layout to apply consistent styling across your entire
				application:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{globalPresetCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Route-Level Override -->
	<Section
		title="Route-Level Overrides"
		description="Extend or override presets for specific routes"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Create route-specific themes that extend the global preset while adding new variants or
				overriding specific styles:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{routePresetCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Component-Level -->
	<Section
		title="Component-Level Customization"
		description="Scope presets to specific component trees"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Apply presets at the component level to customize specific parts of your UI without
				affecting the global theme:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{componentPresetCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Compound Components -->
	<Section
		title="Compound Component Presets"
		description="Configure nested components using dot notation"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Use dot notation to style compound components and their children. This is especially
				powerful for components like Alert, Card, Dialog, and Accordion:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{compoundPresetCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Reactive State -->
	<Section
		title="Reactive State-Based Styling"
		description="Access component state for dynamic presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Preset functions receive the component's bond as a parameter, allowing you to create
				reactive styles based on component state:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{dynamicPresetCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- The $preset Placeholder -->
	<Section title="The $preset Placeholder" description="Control preset insertion order">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Use the <code class="bg-muted px-1.5 py-0.5 rounded">$preset</code> placeholder in class arrays
				to control exactly where preset classes are inserted:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{placeholderCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Additional Attributes -->
	<Section
		title="Setting HTML Attributes"
		description="Presets can define any HTML attributes, not just classes"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Beyond styling with classes, presets can set any HTML attributes including <code class="bg-muted px-1.5 py-0.5 rounded">data-*</code>,
				<code class="bg-muted px-1.5 py-0.5 rounded">aria-*</code>, <code class="bg-muted px-1.5 py-0.5 rounded">role</code>, and more:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{attributesCode}</code></pre>
			</div>
			<div class="prose prose-sm prose-slate max-w-none dark:prose-invert">
				<h4 class="text-foreground">Common Use Cases:</h4>
				<ul class="text-muted-foreground">
					<li>
						<strong>Accessibility:</strong> Set <code>aria-*</code> attributes, <code>role</code>, <code>tabindex</code> for consistent a11y
					</li>
					<li>
						<strong>Testing:</strong> Add <code>data-testid</code> or <code>data-component</code> attributes for automated tests
					</li>
					<li>
						<strong>Analytics:</strong> Include <code>data-analytics</code> or <code>data-tracking</code> attributes
					</li>
					<li>
						<strong>State Indicators:</strong> Use <code>data-state</code> or <code>data-variant</code> for CSS selectors
					</li>
				</ul>
			</div>
		</div>
	</Section>

	<!-- Extending Presets -->
	<Section
		title="Extending & Composing Presets"
		description="Build upon existing preset definitions"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				The preset system uses deep merging to combine configurations. This allows you to extend
				base presets with new variants, sizes, or completely new preset keys:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{extendingCode}</code></pre>
			</div>
		</div>
	</Section>

	<!-- Performance -->
	<Section title="Performance Optimizations" description="Built-in memoization and caching">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				The preset system includes several performance optimizations to ensure minimal overhead:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{performanceCode}</code></pre>
			</div>
			<div class="prose prose-sm prose-slate max-w-none dark:prose-invert">
				<h4 class="text-foreground">Performance Benefits:</h4>
				<ul class="text-muted-foreground">
					<li>
						<strong>Memoized Resolution:</strong> Preset resolution only recomputes when preset key or
						bond changes
					</li>
					<li>
						<strong>Cached Class Strings:</strong> Preset class strings are computed once and reused
					</li>
					<li>
						<strong>Early Exit:</strong> Components without
						<code>$preset</code> placeholder skip string replacement entirely
					</li>
					<li>
						<strong>Optimized for Lists:</strong> Repeated variant combinations benefit from Svelte's
						reactive memoization
					</li>
				</ul>
			</div>
		</div>
	</Section>

	<!-- Best Practices -->
	<Section title="Best Practices">
		<div class="space-y-4">
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{bestPracticesCode}</code></pre>
			</div>

			<div class="prose prose-sm prose-slate max-w-none dark:prose-invert">
				<h4 class="text-foreground">Guidelines:</h4>
				<ol class="text-muted-foreground">
					<li>
						<strong>Set global presets at app root</strong> - Define your base theme in
						<code>+layout.svelte</code>
					</li>
					<li>
						<strong>Override at route level</strong> - Use route layouts to customize sections of your
						app
					</li>
					<li>
						<strong>Use component-level sparingly</strong> - Only when specific component trees need
						unique styling
					</li>
					<li>
						<strong>Leverage dot notation</strong> -
						<code>'card.title'</code> is more specific than <code>'card'</code>
					</li>
					<li>
						<strong>Access bond state for reactivity</strong> - Use the bond parameter for dynamic styles
					</li>
					<li>
						<strong>Merge, don't replace</strong> - Presets merge across contexts, build up configurations
						gradually
					</li>
					<li>
						<strong>Keep presets simple</strong> - Presets are for common patterns; use props for one-off
						customizations
					</li>
				</ol>
			</div>
		</div>
	</Section>

	<!-- Use Cases -->
	<Section title="Common Use Cases">
		<div class="prose prose-slate max-w-none dark:prose-invert">
			<h4 class="text-foreground">1. Multi-Tenant Applications</h4>
			<p class="text-muted-foreground text-sm">
				Different organizations can have their own branded themes by setting presets based on
				tenant configuration.
			</p>

			<h4 class="text-foreground mt-6">2. Dark Mode Implementation</h4>
			<p class="text-muted-foreground text-sm">
				Toggle between light and dark presets at the root level to implement theme switching.
			</p>

			<h4 class="text-foreground mt-6">3. Dashboard vs Marketing Site</h4>
			<p class="text-muted-foreground text-sm">
				Use route-level presets to give your dashboard a compact, data-dense style while keeping
				your marketing pages spacious and bold.
			</p>

			<h4 class="text-foreground mt-6">4. Component Library Theming</h4>
			<p class="text-muted-foreground text-sm">
				Provide default presets with your component library that consumers can easily override or
				extend.
			</p>

			<h4 class="text-foreground mt-6">5. A/B Testing Styles</h4>
			<p class="text-muted-foreground text-sm">
				Conditionally apply different presets based on user segments or feature flags.
			</p>
		</div>
	</Section>

	<!-- API Reference -->
	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h4 class="text-foreground mb-2 text-sm font-semibold">setPreset(preset)</h4>
				<p class="text-muted-foreground text-sm mb-2">
					Sets or merges preset configuration in the current context.
				</p>
				<div class="bg-muted rounded-lg p-3">
					<code class="text-xs">setPreset(preset: Partial&lt;Preset&gt;): void</code>
				</div>
			</div>

			<div>
				<h4 class="text-foreground mb-2 text-sm font-semibold">getPreset(key?)</h4>
				<p class="text-muted-foreground text-sm mb-2">
					Retrieves preset configuration. If key is provided, returns specific preset entry;
					otherwise returns all presets.
				</p>
				<div class="bg-muted rounded-lg p-3">
					<code class="text-xs"
						>getPreset&lt;K&gt;(key?: K): PresetEntry | Partial&lt;Preset&gt;</code
					>
				</div>
			</div>

			<div>
				<h4 class="text-foreground mb-2 text-sm font-semibold">Preset Entry Function</h4>
				<p class="text-muted-foreground text-sm mb-2">
					Preset entries are functions that receive the component bond and return configuration
					objects.
				</p>
				<div class="bg-muted rounded-lg p-3">
					<code class="text-xs"
						>type PresetEntry = (bond: Bond | null) =&gt; PresetEntryRecord</code
					>
				</div>
			</div>

			<div>
				<h4 class="text-foreground mb-2 text-sm font-semibold">PresetEntryRecord</h4>
				<p class="text-muted-foreground text-sm mb-2">
					The object returned by preset functions. Supports any HTML attributes including class, data-*, aria-*, role, etc.
				</p>
				<div class="bg-muted rounded-lg p-3">
					<pre class="text-xs overflow-x-auto"><code>{`{
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
}`}</code></pre>
				</div>
			</div>
		</div>
	</Section>
</div>
