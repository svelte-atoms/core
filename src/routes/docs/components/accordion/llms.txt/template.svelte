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

The Accordion module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Accordion (Root)

**Preset Key:** \`accordion\`

**Props:**

<PropsTable props={data.accordionRootProps} />

### AccordionItem.Root

**Preset Key:** \`accordion.item\`

**Props:**

<PropsTable props={data.accordionItemRootProps} />

### AccordionItem.Header

**Preset Key:** \`accordion.item.header\`

**Props:**

<PropsTable props={data.accordionItemHeaderProps} />

### AccordionItem.Body

**Preset Key:** \`accordion.item.body\`

**Props:**

<PropsTable props={data.accordionItemBodyProps} />

### AccordionItem.Indicator

**Preset Key:** \`accordion.item.indicator\`

**Props:**

<PropsTable props={data.accordionItemIndicatorProps} />

## Examples

### Basic Accordion

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Collapsible Items

\`\`\`svelte
{metadata.examples.collapsible}
\`\`\`

### Multiple Open Items

\`\`\`svelte
{metadata.examples.multiple}
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

1. **Clear Headers**: Use descriptive header text that clearly indicates the content
2. **Consistent Styling**: Maintain visual consistency across accordion items
3. **Loading States**: Show loading indicators for dynamic content
4. **Default States**: Consider which items should be open by default
5. **Mobile Friendly**: Ensure touch targets are large enough on mobile devices

## License

This module is licensed under the MIT License.
