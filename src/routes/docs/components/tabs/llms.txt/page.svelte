<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: tabs
title: Tabs Component
category: components
subcategory: navigation
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

The Tabs module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Tabs.Root

**Preset Key:** \`tabs\`

**Props:**

<PropsTable props={data.tabsRootProps} />

### Tabs.Header

**Preset Key:** \`tabs.header\`

**Props:**

<PropsTable props={data.tabsHeaderProps} />

### Tabs.Body

**Preset Key:** \`tabs.body\`

**Props:**

<PropsTable props={data.tabsBodyProps} />

### Tabs.Content

**Preset Key:** \`tabs.content\`

**Props:**

<PropsTable props={data.tabsContentProps} />

### Tab.Header

**Preset Key:** \`tab.header\`

**Props:**

<PropsTable props={data.tabHeaderProps} />

### Tab.Body

**Preset Key:** \`tab.body\`

**Props:**

<PropsTable props={data.tabBodyProps} />

### Tab.Description

**Preset Key:** \`tab.description\`

**Props:**

<PropsTable props={data.tabDescriptionProps} />

## Examples

### Basic Usage

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

## Best Practices

1. **Unique Tab Values**: Ensure each tab has a unique value for proper identification
2. **Meaningful Labels**: Use clear, descriptive labels for tab headers
3. **Content Organization**: Group related content logically within tabs
4. **Default Tab**: Always specify a default active tab
5. **Loading States**: Handle loading states for tab content that requires data fetching

## License

This module is licensed under the MIT License.
