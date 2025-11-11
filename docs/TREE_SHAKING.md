# Tree-Shaking Guide for @svelte-atoms/core

## Overview

This library is optimized for tree-shaking to ensure users only bundle the components they actually use. This guide explains how tree-shaking works in this library and best practices for consuming it.

## Package Structure

The library provides multiple entry points via package.json `exports`:

### Main Entry Point

```javascript
// Imports everything - not recommended for production
import * as Core from '@svelte-atoms/core';
```

### Subpath Imports (Recommended)

```javascript
// Import specific components - recommended for optimal tree-shaking
import { Button } from '@svelte-atoms/core/button';
import { Card } from '@svelte-atoms/core/card';
import { Accordion, AccordionItem } from '@svelte-atoms/core/accordion';
```

### Atoms/Sub-component Imports

```javascript
// Import component atoms directly
import * as Card from '@svelte-atoms/core/card/atoms';
```

### Utility Imports

```javascript
// Import utilities
import { cn, defineVariants } from '@svelte-atoms/core/utils';
```

## Available Export Paths

All components are available as subpath exports:

- Components: `./accordion`, `./alert`, `./atom`, `./avatar`, `./badge`, `./breadcrumb`, `./button`, `./card`, `./checkbox`, `./collapsible`, `./combobox`, `./container`, `./contextmenu`, `./datagrid`, `./dialog`, `./divider`, `./drawer`, `./dropdown`, `./element`, `./form`, `./icon`, `./image`, `./input`, `./label`, `./layer`, `./link`, `./list`, `./menu`, `./popover`, `./portal`, `./radio`, `./root`, `./scrollable`, `./sidebar`, `./stack`, `./tabs`, `./textarea`, `./toast`, `./tooltip`, `./tree`, `./virtual`

- Atoms: Components with atoms also export `./[component]/atoms` (e.g., `./card/atoms`, `./accordion/atoms`)

- Sub-components: Some components have sub-components (e.g., `./accordion/item`, `./tabs/tab`, `./form/field`, `./datagrid/td`)

- Utilities: `./utils`, `./shared`, `./context`, `./runes`, `./attachments`, `./types`

## Tree-Shaking Configuration

### sideEffects

The package.json includes:

```json
{
	"sideEffects": ["**/*.css"]
}
```

This tells bundlers that only CSS files have side effects, allowing aggressive tree-shaking of all JavaScript code.

### ES Module Format

The library is distributed as ES modules, which is required for tree-shaking.

## Best Practices

### ✅ DO: Use Subpath Imports

```javascript
// Good - only bundles Button component
import { Button } from '@svelte-atoms/core/button';
```

### ❌ DON'T: Import from Main Entry Point in Production

```javascript
// Bad - may bundle more than needed
import { Button } from '@svelte-atoms/core';
```

### ✅ DO: Import Multiple Components from Same Subpath

```javascript
// Good - efficient when using multiple components
import { Card } from '@svelte-atoms/core/card';
import { Button } from '@svelte-atoms/core/button';
import { Input } from '@svelte-atoms/core/input';
```

### ✅ DO: Use Namespace Imports for Atoms

```javascript
// Good - clear and organized
import * as Card from '@svelte-atoms/core/card/atoms';

// Usage
<Card.Root>
	<Card.Header>
		<Card.Title>Title</Card.Title>
	</Card.Header>
</Card.Root>;
```

## Bundler Configuration

Most modern bundlers (Vite, Rollup, webpack 5+) handle tree-shaking automatically when:

1. Your project uses ES modules (`"type": "module"` in package.json)
2. The library provides ES module exports
3. The library specifies `sideEffects`
4. You're building for production mode

### Vite Example

```javascript
// vite.config.js
export default {
	build: {
		rollupOptions: {
			// No special configuration needed
			// Tree-shaking works automatically
		}
	}
};
```

### SvelteKit Example

```javascript
// No configuration needed
// SvelteKit uses Vite which handles tree-shaking automatically
```

## Verifying Tree-Shaking

To verify tree-shaking is working:

1. Build your application for production
2. Check the bundle size
3. Use a bundle analyzer:
   - Vite: `vite-plugin-bundle-analyzer`
   - Rollup: `rollup-plugin-visualizer`
   - Webpack: `webpack-bundle-analyzer`

## Example: Before and After

### Before (Not Optimized)

```javascript
// Importing from main entry
import { Button, Card, Input } from '@svelte-atoms/core';
// Bundle size: ~150KB (hypothetical)
```

### After (Optimized)

```javascript
// Using subpath imports
import { Button } from '@svelte-atoms/core/button';
import { Card } from '@svelte-atoms/core/card';
import { Input } from '@svelte-atoms/core/input';
// Bundle size: ~45KB (hypothetical - only what you use)
```

## Conclusion

By following these best practices and using subpath imports, you can ensure your application only bundles the code it actually uses, resulting in smaller bundle sizes and faster load times.
