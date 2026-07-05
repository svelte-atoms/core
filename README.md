# @svelte-atoms/core

Accessible Svelte 5 infrastructure for reusable component systems.

[![npm version](https://img.shields.io/npm/v/@svelte-atoms/core.svg)](https://www.npmjs.com/package/@svelte-atoms/core)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/svelte-atoms/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What It Provides

- Accessible component behavior for overlays, forms, navigation, display, and layout.
- Compound components coordinated by Bonds instead of prop drilling.
- Runtime Atoms for per-part attrs, handlers, lifecycle, and relationship wiring.
- Presets, variants, and `base` composition for design-system integration.
- Svelte 5 runes, snippets, `$bindable`, and TypeScript.

## Example

```svelte
<script lang="ts">
	import { Button, Popover } from '@svelte-atoms/core';
</script>

<Popover.Root>
	<Popover.Trigger base={Button} preset="button" variant="outline">Settings</Popover.Trigger>
	<Popover.Content class="p-4">Account preferences</Popover.Content>
</Popover.Root>
```

## Install

```bash
npm install @svelte-atoms/core
# or
bun add @svelte-atoms/core
```

## Links

- [Documentation](https://sacore.netlify.app/)
- [Storybook](https://statuesque-boba-0fb888.netlify.app/)
- [GitHub](https://github.com/svelte-atoms/core)

## Development

```bash
bun install
bun run storybook:dev
bun run build
bun run check
```

MIT © [Svelte Atoms](https://github.com/svelte-atoms)
