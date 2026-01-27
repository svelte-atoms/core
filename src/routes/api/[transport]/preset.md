---
id: preset
title: Preset System
category: styling
depth: intermediate
prerequisites:
  - variants
related:
  - styling
---

# Global Component Configuration with Presets

## Overview

Presets in @svelte-atoms/core allow you to configure component styling, props, and behavior **globally** across your application. Instead of repeating the same classes or props on every component, define them once at the top level and have all components inherit those configurations automatically.

Presets can be:

- Declared at the **app root** for global configuration
- Overridden at the **route level** for section-specific styling
- Overridden at the **component level** for local customization

## How Presets Work

Each component has a `preset` prop that references a key in the preset configuration:

```svelte
<HtmlAtom preset="button" class={['default-button-classes', '$preset', klass]} />
```

The `$preset` placeholder gets replaced with classes/props from the preset configuration at that context level.

## Setting Up Presets

### 1. Global Preset (App Root)

Set presets at the app root to apply them everywhere:

```svelte
<!-- +layout.svelte or App.svelte -->
<script lang="ts">
	import { setPreset, type Preset } from '@svelte-atoms/core/context';
	import { Root } from '@svelte-atoms/core/components/root';

	const globalPreset: Partial<Preset> = {
		button: () => ({
			class: 'rounded-lg px-4 py-2 font-semibold transition-colors'
		}),
		card: () => ({
			class: 'rounded-xl border border-gray-200 shadow-sm'
		}),
		'card.title': () => ({
			class: 'text-xl font-bold text-gray-900'
		}),
		dialog: () => ({
			class: 'max-w-2xl rounded-2xl'
		})
	};

	setPreset(globalPreset);
</script>

<Root>
	<slot />
</Root>
```

Now all `Button`, `Card`, and `Dialog` components automatically inherit these styles.

### 2. Route-Level Override

Override presets for specific routes:

```svelte
<!-- routes/dashboard/+layout.svelte -->
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';

	const dashboardPreset = {
		button: () => ({
			class: 'rounded-md px-3 py-1.5 text-sm' // Smaller buttons for dashboard
		}),
		card: () => ({
			class: 'bg-slate-50 border-slate-200' // Different card style
		})
	};

	setPreset(dashboardPreset);
</script>

<div>
	<slot />
</div>
```

Components in `/dashboard/*` routes now use the dashboard preset, **merging** with the global preset.

### 3. Component-Level Override

Override presets in a parent component for its children:

```svelte
<!-- components/SettingsPanel.svelte -->
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';
	import { Card } from '@svelte-atoms/core/components/card';

	const settingsPreset = {
		'card.title': () => ({
			class: 'text-lg text-purple-600' // Purple titles in settings
		})
	};

	setPreset(settingsPreset);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Settings</Card.Title>
		<!-- Purple text -->
	</Card.Header>
	<Card.Content>
		<!-- Content here -->
	</Card.Content>
</Card.Root>
```

## Preset Structure

### Basic Preset Entry

Return an object with `class`, `as`, or other props:

```typescript
const preset: Partial<Preset> = {
	button: () => ({
		class: 'px-4 py-2 rounded-lg',
		type: 'button'
	}),

	accordion: () => ({
		as: 'ul', // Change element type
		class: 'space-y-2'
	})
};
```

### Dynamic Preset with Bond State

Access component state via bond to create reactive presets:

```typescript
const preset: Partial<Preset> = {
	'accordion.item.header': (bond) => {
		// Access bond.state to make preset reactive
		return {
			class: bond?.state?.isActive ? 'text-foreground bg-accent' : 'text-muted-foreground'
		};
	}
};
```

### Using defineState for Reactive Props

For more complex reactive logic, use `defineState` and `defineProperty`:

```typescript
import { defineState, defineProperty } from '@svelte-atoms/core/utils';

const preset: Partial<Preset> = {
	'collapsible.header': (bond) => {
		return defineState([
			defineProperty('class', () => [
				'px-4 py-2 cursor-pointer transition-colors',
				bond?.state?.isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'
			]),
			defineProperty('aria-expanded', () => bond?.state?.isOpen)
		]);
	}
};
```

### Accessing Root Rest Props

When components are wrapped in a `Root` component, you can access the root's rest props through `bond.state.props.rest`:

```typescript
const preset: Partial<Preset> = {
	button: (bond) => {
		// Access rest props passed to the Root component
		const rootProps = bond?.state?.props?.rest;
		
		return {
			class: 'px-4 py-2 rounded-lg',
			// Use root props for conditional styling or behavior
			'data-theme': rootProps?.theme
		};
	}
};
```

This allows you to pass global configuration through the `Root` component and access it in your presets for consistent theming across all components.

This pattern is particularly useful for adding functionalities in child components based on root props. For example, you can control whether popover content should close on click outside:

```typescript
const preset: Partial<Preset> = {
	'popover.content': (bond) => {
		const rootProps = bond?.state?.props?.rest;
		
		return {
			class: 'rounded-lg shadow-lg p-4',
			// Enable close on click outside based on root configuration
			[createAttachmentKey()]: (node)=> {
				if(rootProps?.closePopoversOnClickOutside){
					// run close logic
				}
			}
		};
	}
};
```

## Preset Merging

Presets **merge** across context levels using deep merge:

```svelte
<!-- App root -->
<script>
  setPreset({
    button: () => ({
      class: 'px-4 py-2 rounded-lg font-semibold'
    })
  });
</script>

<!-- Route level -->
<script>
  setPreset({
    button: () => ({
      class: 'text-sm' // Merges with root
    })
  });
</script>

<!-- Result: Button has both classes -->
<!-- class="px-4 py-2 rounded-lg font-semibold text-sm" -->
```

## Available Preset Keys

Components use dot notation for sub-components:

```typescript
type PresetModuleName =
	| 'button'
	| 'card'
	| 'card.title'
	| 'card.content'
	| 'card.header'
	| 'card.footer'
	| 'accordion'
	| 'accordion.item'
	| 'accordion.item.header'
	| 'accordion.item.body'
	| 'dialog'
	| 'dialog.content'
	| 'dialog.title'
	| 'popover.content'
	| 'popover.trigger'
	| 'datagrid'
	| 'datagrid.th'
	| 'datagrid.td';
// ... and many more
```

Check `src/lib/context/preset.svelte.ts` for the complete list.

## Real-World Examples

### Example 1: Global Theme Setup

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';

	const theme = {
		// Base components
		button: () => ({
			class: 'rounded-lg px-4 py-2 font-medium transition-all duration-200'
		}),
		input: () => ({
			class: 'rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500'
		}),

		// Card system
		card: () => ({
			class: 'rounded-xl border border-gray-200 bg-white shadow-sm'
		}),
		'card.title': () => ({
			class: 'text-lg font-semibold text-gray-900'
		}),
		'card.content': () => ({
			class: 'p-6'
		}),

		// Dialog system
		dialog: () => ({
			class: 'max-w-lg rounded-2xl'
		}),
		'dialog.content': () => ({
			class: 'p-6'
		}),
		'dialog.title': () => ({
			class: 'text-xl font-bold'
		})
	};

	setPreset(theme);
</script>
```

### Example 2: Dashboard Route Override

```svelte
<!-- routes/dashboard/+layout.svelte -->
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';

	// Override for compact dashboard UI
	const dashboardTheme = {
		button: () => ({
			class: 'rounded-md px-3 py-1.5 text-sm'
		}),
		card: () => ({
			class: 'rounded-lg bg-slate-50'
		}),
		'datagrid.th': () => ({
			class: 'text-xs uppercase text-slate-500'
		})
	};

	setPreset(dashboardTheme);
</script>
```

### Example 3: Component-Specific Styling

```svelte
<!-- components/PricingCards.svelte -->
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';
	import { Card } from '@svelte-atoms/core/components/card';

	// Custom styling just for pricing cards
	setPreset({
		card: () => ({
			class: 'rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all'
		}),
		'card.title': () => ({
			class: 'text-2xl font-bold text-purple-900'
		})
	});
</script>

<div class="grid grid-cols-3 gap-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Basic</Card.Title>
		</Card.Header>
		<Card.Content>$9/month</Card.Content>
	</Card.Root>

	<!-- More pricing cards... -->
</div>
```

### Example 4: Reactive State-Based Styling

```svelte
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';
	import { defineState, defineProperty } from '@svelte-atoms/core/utils';

	setPreset({
		'accordion.item.header': (bond) => {
			return defineState([
				defineProperty('class', () => [
					'px-4 py-3 cursor-pointer transition-all duration-200',
					bond?.state?.isOpen
						? 'bg-blue-50 text-blue-900 font-semibold'
						: 'hover:bg-gray-50 text-gray-700'
				])
			]);
		},

		'collapsible.indicator': (bond) => ({
			class: bond?.state?.isOpen
				? 'rotate-180 transition-transform duration-200'
				: 'transition-transform duration-200'
		})
	});
</script>
```

## Best Practices

1. **Set global presets at app root** - Define your base theme in `+layout.svelte` or `App.svelte`

2. **Override at route level** - Use route layouts (`+layout.svelte`) to customize sections

3. **Use component-level overrides sparingly** - Only when a specific component tree needs unique styling

4. **Use dot notation for specificity** - `'card.title'` is more specific than `'card'`

5. **Access bond state for reactivity** - Use bond parameter in preset functions to create dynamic styles

6. **Merge, don't replace** - Presets merge across contexts, so you can build up configurations gradually

7. **Keep presets simple** - Presets are for common patterns; use component props for one-off customizations

## Summary

Presets provide a powerful way to configure components globally:

- **Global**: Set at app root for consistent styling across your app
- **Route-level**: Override in route layouts for section-specific themes
- **Component-level**: Override in parent components for localized styling
- **Reactive**: Access bond state to create dynamic, state-based configurations
- **Merging**: Presets deep-merge across contexts, allowing gradual customization

Instead of repeating classes on every component, define them once in presets and let components inherit the configuration automatically.
