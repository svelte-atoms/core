<script lang="ts">
	import {  codeBlock ,  inlineCode, list, newLine } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{list(metadata.useCases.map((uc) => `**${uc.title}**: ${uc.description}`))}

## Components

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

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

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
