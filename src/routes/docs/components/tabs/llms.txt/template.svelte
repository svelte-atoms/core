<script lang="ts">
	import { newLine, inlineCode, codeBlock } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

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

**Preset Key:** {inlineCode('tabs')}

**Props:**

<PropsTable props={data.tabsRootProps} />

### Tabs.Header

**Preset Key:** {inlineCode('tabs.header')}

**Props:**

<PropsTable props={data.tabsHeaderProps} />

### Tabs.Body

**Preset Key:** {inlineCode('tabs.body')}

**Props:**

<PropsTable props={data.tabsBodyProps} />

### Tabs.Content

**Preset Key:** {inlineCode('tabs.content')}

**Props:**

<PropsTable props={data.tabsContentProps} />

### Tab.Header

**Preset Key:** {inlineCode('tab.header')}

**Props:**

<PropsTable props={data.tabHeaderProps} />

### Tab.Body

**Preset Key:** {inlineCode('tab.body')}

**Props:**

<PropsTable props={data.tabBodyProps} />

### Tab.Description

**Preset Key:** {inlineCode('tab.description')}

**Props:**

<PropsTable props={data.tabDescriptionProps} />

## Examples

### Basic Usage

{codeBlock(metadata.examples.basic, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

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
