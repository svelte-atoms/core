<script lang="ts">
	import { newLine } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />{newLine()}

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

### Stepper.Root

**Preset Key:** \`stepper\`

**Props:**

<PropsTable props={data.stepperRootProps} />

### Stepper.Header

**Preset Key:** \`stepper.header\`

**Props:**

<PropsTable props={data.stepperHeaderProps} />

### Stepper.Body

**Preset Key:** \`stepper.body\`

**Props:**

<PropsTable props={data.stepperBodyProps} />

### Stepper.Content

**Preset Key:** \`stepper.content\`

**Props:**

<PropsTable props={data.stepperContentProps} />

### Stepper.Footer

**Preset Key:** \`stepper.footer\`

**Props:**

<PropsTable props={data.stepperFooterProps} />

### Step.Root

**Preset Key:** \`step\`

**Props:**

<PropsTable props={data.stepRootProps} />

### Step.Header

**Preset Key:** \`step.header\`

**Props:**

<PropsTable props={data.stepHeaderProps} />

### Step.Indicator

**Preset Key:** \`step.indicator\`

**Props:**

<PropsTable props={data.stepIndicatorProps} />

### Step.Title

**Preset Key:** \`step.title\`

**Props:**

<PropsTable props={data.stepTitleProps} />

### Step.Description

**Preset Key:** \`step.description\`

**Props:**

<PropsTable props={data.stepDescriptionProps} />

### Step.Separator

**Preset Key:** \`step.separator\`

**Props:**

<PropsTable props={data.stepSeparatorProps} />

### Step.Body

**Preset Key:** \`step.body\`

**Props:**

<PropsTable props={data.stepBodyProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
