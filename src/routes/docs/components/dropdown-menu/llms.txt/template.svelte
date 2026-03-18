<script lang="ts">
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

The Dropdown Menu module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### DropdownMenu.List (Root)

**Preset Key:** \`dropdown-menu\`

**Props:**

<PropsTable props={data.dropdownMenuListProps} />

### DropdownMenu.Item

**Preset Key:** \`dropdown-menu.item\`

**Props:**

<PropsTable props={data.dropdownMenuItemProps} />

## Examples

### Basic Dropdown Menu

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Interactive Dropdown Menu

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
