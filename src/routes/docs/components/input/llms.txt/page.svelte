<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: input
title: Input Component
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

## Components

The Input module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Input.Root

**Preset Key:** \`input\`

<PropsTable props={data.inputRootProps} />

### Input.Control

**Preset Key:** \`input.control\`

<PropsTable props={data.inputControlProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Input Types

\`\`\`svelte
{metadata.examples.types}
\`\`\`

### With Icon

\`\`\`svelte
{metadata.examples.withIcon}
\`\`\`

### With Placeholder

\`\`\`svelte
{metadata.examples.withPlaceholder}
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
