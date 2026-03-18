<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: menu
title: Menu Component
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

The Menu module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Menu.List (Root)

**Preset Key:** \`menu\`

**Props:**

<PropsTable props={data.menuListProps} />

### Menu.Item

**Preset Key:** \`menu.item\`

**Props:**

<PropsTable props={data.menuItemProps} />

## Examples

### Basic Menu

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Interactive Menu

\`\`\`svelte
{metadata.examples.interactive}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Best Practices

1. **Clear Labels**: Use descriptive, action-oriented labels for menu items
2. **Grouping**: Group related menu items together
3. **Keyboard Support**: Ensure all menu items are keyboard accessible
4. **Visual Feedback**: Provide clear hover and focus states
5. **Disabled Items**: Clearly indicate disabled menu items

## Dependencies

- Built on top of Popover module for positioning
- Uses \`@floating-ui/dom\` for positioning calculations

## License

This module is licensed under the MIT License.
