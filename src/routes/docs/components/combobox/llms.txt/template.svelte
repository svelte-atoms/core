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

### Combobox.Root

**Preset Key:** {inlineCode('combobox')}

**Props:**

<PropsTable props={data.comboboxRootProps} />

### Combobox.Selections

**Preset Key:** {inlineCode('combobox.selections')}

**Props:**

<PropsTable props={data.comboboxSelectionsProps} />

### Combobox.Selection

**Preset Key:** {inlineCode('combobox.selection')}

**Props:**

<PropsTable props={data.comboboxSelectionProps} />

### Combobox.Control

**Preset Key:** {inlineCode('combobox.control')}

**Props:**

<PropsTable props={data.comboboxControlProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
