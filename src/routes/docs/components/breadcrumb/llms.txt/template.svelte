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

### Breadcrumb.Root

**Preset Key:** {inlineCode('breadcrumb')}

**Props:**

<PropsTable props={data.breadcrumbProps.root} />

### Breadcrumb.Item

**Preset Key:** {inlineCode('breadcrumb.item')}

**Props:**

<PropsTable props={data.breadcrumbProps.item} />

### Breadcrumb.Separator

**Preset Key:** {inlineCode('breadcrumb.separator')}

**Props:**

<PropsTable props={data.breadcrumbProps.separator} />

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
