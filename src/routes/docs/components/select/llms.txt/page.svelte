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

The Select module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Select.Root

**Preset Key:** \`select\`

**Props:**

<PropsTable props={data.selectRootProps} />

### Select.Trigger

**Preset Key:** \`select.trigger\`

**Props:**

<PropsTable props={data.selectTriggerProps} />

### Select.Item

**Preset Key:** \`select.item\`

**Props:**

<PropsTable props={data.selectItemProps} />

### Select.Query

**Preset Key:** \`select.query\`

**Props:**

<PropsTable props={data.selectQueryProps} />

### Select.Selections

**Preset Key:** \`select.selections\`

**Props:**

<PropsTable props={data.selectSelectionsProps} />

### Select.Selection

**Preset Key:** \`select.selection\`

**Props:**

<PropsTable props={data.selectSelectionProps} />

## Examples

### Basic Select

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

### \`filterSelectData\`

Helper function for filtering select items based on a query string.

\`\`\`typescript
const filteredItems = filterSelectData(
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
