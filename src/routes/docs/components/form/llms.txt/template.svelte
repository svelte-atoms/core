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

### Form.Root

**Preset Key:** {inlineCode('form')}

**Props:**

<PropsTable props={data.formRootProps} />

### Field.Root

**Preset Key:** {inlineCode('field')}

**Props:**

<PropsTable props={data.fieldRootProps} />

### Field.Label

**Preset Key:** {inlineCode('field.label')}

**Props:**

<PropsTable props={data.fieldLabelProps} />

### Field.Control

**Preset Key:** {inlineCode('field.control')}

**Props:**

<PropsTable props={data.fieldControlProps} />

### Field.Errors

**Preset Key:** {inlineCode('field.errors')}

**Props:**

<PropsTable props={data.fieldErrorsProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
