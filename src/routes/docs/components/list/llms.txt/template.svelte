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

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### List.Root

**Preset Key:** {inlineCode('list')}

**Props:**

<PropsTable props={data.listRootProps} />

### List.Group

**Preset Key:** {inlineCode('list.group')}

**Props:**

<PropsTable props={data.listGroupProps} />

### List.Item

**Preset Key:** {inlineCode('list.item')}

**Props:**

<PropsTable props={data.listItemProps} />

### List.Title

**Preset Key:** {inlineCode('list.title')}

**Props:**

<PropsTable props={data.listTitleProps} />

### List.Divider

**Preset Key:** {inlineCode('list.divider')}

**Props:**

<PropsTable props={data.listDividerProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
