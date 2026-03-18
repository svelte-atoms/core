<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: alert
title: Alert Component
category: components
subcategory: interactive
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

The Alert module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Alert.Root

**Preset Key:** \`alert\`

<PropsTable props={data.alertRootProps} />

### Sub-Components (Content, Title, Description, Icon, Actions, CloseButton)

<PropsTable props={data.alertSubPartProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Variants

\`\`\`svelte
{metadata.examples.variants}
\`\`\`

### Dismissible Alert

\`\`\`svelte
{metadata.examples.dismissible}
\`\`\`

### Alert with Actions

\`\`\`svelte
{metadata.examples.actions}
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
