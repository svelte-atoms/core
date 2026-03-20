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

### Stepper.Root

**Preset Key:** {inlineCode('stepper')}

**Props:**

<PropsTable props={data.stepperRootProps} />

### Stepper.Header

**Preset Key:** {inlineCode('stepper.header')}

**Props:**

<PropsTable props={data.stepperHeaderProps} />

### Stepper.Body

**Preset Key:** {inlineCode('stepper.body')}

**Props:**

<PropsTable props={data.stepperBodyProps} />

### Stepper.Content

**Preset Key:** {inlineCode('stepper.content')}

**Props:**

<PropsTable props={data.stepperContentProps} />

### Stepper.Footer

**Preset Key:** {inlineCode('stepper.footer')}

**Props:**

<PropsTable props={data.stepperFooterProps} />

### Step.Root

**Preset Key:** {inlineCode('step')}

**Props:**

<PropsTable props={data.stepRootProps} />

### Step.Header

**Preset Key:** {inlineCode('step.header')}

**Props:**

<PropsTable props={data.stepHeaderProps} />

### Step.Indicator

**Preset Key:** {inlineCode('step.indicator')}

**Props:**

<PropsTable props={data.stepIndicatorProps} />

### Step.Title

**Preset Key:** {inlineCode('step.title')}

**Props:**

<PropsTable props={data.stepTitleProps} />

### Step.Description

**Preset Key:** {inlineCode('step.description')}

**Props:**

<PropsTable props={data.stepDescriptionProps} />

### Step.Separator

**Preset Key:** {inlineCode('step.separator')}

**Props:**

<PropsTable props={data.stepSeparatorProps} />

### Step.Body

**Preset Key:** {inlineCode('step.body')}

**Props:**

<PropsTable props={data.stepBodyProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
