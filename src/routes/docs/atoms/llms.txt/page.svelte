<script lang="ts">
	import { CodeBlock, List } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: atoms
title: Atoms Concept
category: fundamentals
depth: beginner
prerequisites:
  - philosophy
related:
  - bonds
  - crafting
---


# {metadata.pageTitle}

{metadata.pageDescription}

## What Are Atoms?

In chemistry, atoms are the basic units that combine to form molecules. In Svelte Atoms, the same principle applies: atoms are the fundamental components that combine to create more complex UI patterns.

Unlike traditional component libraries that provide fully-featured components, atoms give you the raw building blocks. They handle the hard parts (accessibility, keyboard navigation, state management) while giving you complete control over structure and styling.

## Core Concepts

{#each metadata.concepts as concept (concept.title)}
### {concept.title}

{concept.description}

{/each}

### Key Features

<List items={metadata.anatomyExample.features.map((f) => `**${f.label}**: ${f.description}`)} />

## Anatomy of an Atom

Here's how an atom works with a simple example:

<CodeBlock lang="svelte">{metadata.examples.anatomy}</CodeBlock>

## When to Use Atoms

{#each metadata.whenToUse as use (use.category)}
### {use.category}

{use.description}

**Examples:**
<List items={use.examples} />

{/each}

## Atoms vs Full Components

### Atoms

<List items={metadata.atomsVsComponents.atoms.features.map((f) => `**${f.positive}**: ${f.text}`)} />

**Use atoms when:**
- You need maximum flexibility
- Your design system is unique
- You want complete control over markup
- You're building custom component patterns
- You want to understand how things work

### Full Components

<List items={metadata.atomsVsComponents.components.features.map((f) => `**${f.positive}**: ${f.text}`)} />

**Use full components when:**
- You want to move quickly
- You're okay with opinionated defaults
- You need common patterns out of the box
- You prefer convention over configuration

## Available Atoms

{#each metadata.availableAtoms as atom (atom.name)}
### {atom.name}

{atom.description}

{/each}

## Getting Started with Atoms

### 1. Import an Atom

```typescript
import { HtmlAtom } from '@svelte-atoms/core';
```

### 2. Define Variants (Optional)

<CodeBlock lang="typescript">
{`
import { defineVariants } from '@svelte-atoms/core/utils';

const buttonVariants = defineVariants({
  variants: {
    variant: {
      primary: { class: 'bg-primary text-primary-foreground' },
      secondary: { class: 'bg-secondary text-secondary-foreground' }
    },
    size: {
      sm: { class: 'px-3 py-1 text-sm' },
      md: { class: 'px-4 py-2 text-base' },
      lg: { class: 'px-6 py-3 text-lg' }
    }
  },
  defaults: {
    variant: 'primary',
    size: 'md'
  }
});
`}
</CodeBlock>

### 3. Use the Atom

<CodeBlock lang="svelte">
{`
<HtmlAtom
  as="button"
  variants={buttonVariants}
  variant="primary"
  size="lg"
  class="rounded-md font-semibold"
>
  Click me
</HtmlAtom>
`}
</CodeBlock>

## Examples

### Custom Button Component

<CodeBlock lang="svelte">{metadata.examples.customButton}</CodeBlock>

### Custom Card Component

<CodeBlock lang="svelte">{metadata.examples.customCard}</CodeBlock>

### Using with Presets

<CodeBlock lang="svelte">{metadata.examples.presetUsage}</CodeBlock>
