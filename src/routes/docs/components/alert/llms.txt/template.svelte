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

The Alert module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Alert.Root

**Preset Key:** {inlineCode('alert')}

<PropsTable props={data.alertRootProps} />

### Sub-Components (Content, Title, Description, Icon, Actions, CloseButton)

<PropsTable props={data.alertSubPartProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Variants

{codeBlock(metadata.examples.variants, 'svelte')}

### Dismissible Alert

{codeBlock(metadata.examples.dismissible, 'svelte')}

### Alert with Actions

{codeBlock(metadata.examples.actions, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
