<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: list
title: List Component
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

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### List.Root

**Preset Key:** \`list\`

**Props:**

<PropsTable props={data.listRootProps} />

### List.Group

**Preset Key:** \`list.group\`

**Props:**

<PropsTable props={data.listGroupProps} />

### List.Item

**Preset Key:** \`list.item\`

**Props:**

<PropsTable props={data.listItemProps} />

### List.Title

**Preset Key:** \`list.title\`

**Props:**

<PropsTable props={data.listTitleProps} />

### List.Divider

**Preset Key:** \`list.divider\`

**Props:**

<PropsTable props={data.listDividerProps} />

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
