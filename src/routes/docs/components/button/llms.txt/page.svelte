<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: button
title: Button Component
category: components
subcategory: form
depth: beginner
prerequisites:
  - atoms
  - styling
related:
  - variants
  - preset
---

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Props

**Preset Key:** \`button\`

<PropsTable props={data.buttonProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.button}
\`\`\`

### Variants

\`\`\`svelte
{metadata.examples.variants}
\`\`\`

### Sizes

\`\`\`svelte
{metadata.examples.sizes}
\`\`\`

### States

\`\`\`svelte
{metadata.examples.states}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
