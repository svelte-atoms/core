<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: breadcrumb
title: Breadcrumb Component
category: components
subcategory: navigation
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

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Breadcrumb.Root

**Preset Key:** \`breadcrumb\`

**Props:**

<PropsTable props={data.breadcrumbProps.root} />

### Breadcrumb.Item

**Preset Key:** \`breadcrumb.item\`

**Props:**

<PropsTable props={data.breadcrumbProps.item} />

### Breadcrumb.Separator

**Preset Key:** \`breadcrumb.separator\`

**Props:**

<PropsTable props={data.breadcrumbProps.separator} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
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
