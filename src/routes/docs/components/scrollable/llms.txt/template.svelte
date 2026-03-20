<script lang="ts">
	import {  codeBlock ,  inlineCode, list} from '$docs/md/template';
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

### Scrollable.Root

**Preset Key:** {inlineCode('scrollable')}

**Props:**

<PropsTable props={data.scrollableRootProps} />

### Scrollable.Container

**Preset Key:** {inlineCode('scrollable.container')}

**Props:**

<PropsTable props={data.scrollableContainerProps} />

### Scrollable.Content

**Preset Key:** {inlineCode('scrollable.content')}

**Props:**

<PropsTable props={data.scrollableContentProps} />

### Scrollable.Track

**Preset Key:** {inlineCode('scrollable.track')}

**Props:**

<PropsTable props={data.scrollableTrackProps} />

### Scrollable.Thumb

**Preset Key:** {inlineCode('scrollable.thumb')}

**Props:**

<PropsTable props={data.scrollableThumbProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
