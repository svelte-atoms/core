<script lang="ts">
	import { newLine, inlineCode, codeBlock } from '$docs/md/template';
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

**Preset Key:** {inlineCode('select')}

**Props:**

<PropsTable props={data.selectRootProps} />

### Select.Trigger

**Preset Key:** {inlineCode('select.trigger')}

**Props:**

<PropsTable props={data.selectTriggerProps} />

### Select.Item

**Preset Key:** {inlineCode('select.item')}

**Props:**

<PropsTable props={data.selectItemProps} />

### Select.Query

**Preset Key:** {inlineCode('select.query')}

**Props:**

<PropsTable props={data.selectQueryProps} />

### Select.Selections

**Preset Key:** {inlineCode('select.selections')}

**Props:**

<PropsTable props={data.selectSelectionsProps} />

### Select.Selection

**Preset Key:** {inlineCode('select.selection')}

**Props:**

<PropsTable props={data.selectSelectionProps} />

## Examples

### Basic Select

{codeBlock(metadata.examples.basic, 'svelte')}

### Multiple Selection with Search

{codeBlock(metadata.examples.multiple, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Utilities

### {inlineCode('filterSelectData')}

Helper function for filtering select items based on a query string.

{codeBlock(`const filteredItems = filterSelectData(
  () => items,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);`, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Dependencies

- {inlineCode('@floating-ui/dom')} (for positioning)
- {inlineCode('motion')} (for animations)

## License

This module is licensed under the MIT License.
