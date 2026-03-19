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

The Dropdown module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Dropdown.Root

**Preset Key:** {inlineCode('dropdown')}

**Props:**

<PropsTable props={data.dropdownRootProps} />

### Dropdown.Trigger

**Preset Key:** {inlineCode('dropdown.trigger')}

**Props:**

<PropsTable props={data.dropdownTriggerProps} />

### Dropdown.Item

**Preset Key:** {inlineCode('dropdown.item')}

**Props:**

<PropsTable props={data.dropdownItemProps} />

### Dropdown.Query

**Preset Key:** {inlineCode('dropdown.query')}

**Props:**

<PropsTable props={data.dropdownQueryProps} />

### Dropdown.Selections

**Preset Key:** {inlineCode('dropdown.selections')}

**Props:**

<PropsTable props={data.dropdownSelectionsProps} />

### Dropdown.Selection

**Preset Key:** {inlineCode('dropdown.selection')}

**Props:**

<PropsTable props={data.dropdownSelectionProps} />

## Examples

### Basic Dropdown

{codeBlock(metadata.examples.basic, 'svelte')}

### Multiple Selection with Search

{codeBlock(metadata.examples.multiple, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Utilities

### {inlineCode('filterDropdownData')}

Helper function for filtering dropdown items based on a query string.

{codeBlock(`const filteredItems = filterDropdownData(
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
