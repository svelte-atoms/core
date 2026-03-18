<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: stack
title: Stack Component
category: components
subcategory: layout
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

**Type**: Compound Component

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Stack.Root

**Preset Key:** \`stack.root\`

**Props:**

<PropsTable props={data.stackRootProps} />

### Stack.Item

**Preset Key:** \`stack.item\`

**Props:**

<PropsTable props={data.stackItemProps} />

### StackState methods (via bond.state)

| Method | Description |
|--------|-------------|
| bringToFront(id) | Move item to the highest z-index |
| sendToBack(id) | Move item to the lowest z-index |
| bringForward(id) | Increase z-index by one step |
| sendBackward(id) | Decrease z-index by one step |
| raise(id) | Alias for bringToFront |

## Examples

### Image with Overlay

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### App Shell Navigation

\`\`\`svelte
{metadata.examples.zOrder}
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
