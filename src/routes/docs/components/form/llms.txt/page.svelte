<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: form
title: Form Component
category: components
subcategory: form
depth: beginner
prerequisites:
  - atoms
  - styling
related:
  - variants
  - preset
---

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

### Form.Root

**Preset Key:** \`form\`

**Props:**

<PropsTable props={data.formRootProps} />

### Field.Root

**Preset Key:** \`field\`

**Props:**

<PropsTable props={data.fieldRootProps} />

### Field.Label

**Preset Key:** \`field.label\`

**Props:**

<PropsTable props={data.fieldLabelProps} />

### Field.Control

**Preset Key:** \`field.control\`

**Props:**

<PropsTable props={data.fieldControlProps} />

### Field.Errors

**Preset Key:** \`field.errors\`

**Props:**

<PropsTable props={data.fieldErrorsProps} />

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
