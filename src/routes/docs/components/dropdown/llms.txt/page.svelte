<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: dropdown
title: Dropdown Component
category: components
subcategory: overlay
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

The Dropdown module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Dropdown.Root

**Preset Key:** \`dropdown\`

**Props:**

<PropsTable props={data.dropdownRootProps} />

### Dropdown.Trigger

**Preset Key:** \`dropdown.trigger\`

**Props:**

<PropsTable props={data.dropdownTriggerProps} />

### Dropdown.Item

**Preset Key:** \`dropdown.item\`

**Props:**

<PropsTable props={data.dropdownItemProps} />

### Dropdown.Query

**Preset Key:** \`dropdown.query\`

**Props:**

<PropsTable props={data.dropdownQueryProps} />

### Dropdown.Selections

**Preset Key:** \`dropdown.selections\`

**Props:**

<PropsTable props={data.dropdownSelectionsProps} />

### Dropdown.Selection

**Preset Key:** \`dropdown.selection\`

**Props:**

<PropsTable props={data.dropdownSelectionProps} />

## Examples

### Basic Dropdown

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Multiple Selection with Search

\`\`\`svelte
{metadata.examples.multiple}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Utilities

### \`filterDropdownData\`

Helper function for filtering dropdown items based on a query string.

\`\`\`typescript
const filteredItems = filterDropdownData(
  () => items,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Dependencies

- \`@floating-ui/dom\` (for positioning)
- \`motion\` (for animations)

## License

This module is licensed under the MIT License.
