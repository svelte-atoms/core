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

The Drawer module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Drawer.Root

**Preset Key:** {inlineCode('drawer')}

**Props:**

<PropsTable props={data.slideoverRootProps} />

### Drawer.Content

**Preset Key:** {inlineCode('drawer.content')}

**Props:**

<PropsTable props={data.slideoverContentProps} />

### Drawer.Header

**Preset Key:** {inlineCode('drawer.header')}

**Props:**

<PropsTable props={data.slideoverHeaderProps} />

### Drawer.Body

**Preset Key:** {inlineCode('drawer.body')}

**Props:**

<PropsTable props={data.drawerBodyProps} />

### Drawer.Footer

**Preset Key:** {inlineCode('drawer.footer')}

**Props:**

<PropsTable props={data.slideoverFooterProps} />

### Drawer.Title

**Preset Key:** {inlineCode('drawer.title')}

**Props:**

<PropsTable props={data.slideoverTitleProps} />

### Drawer.Description

**Preset Key:** {inlineCode('drawer.description')}

**Props:**

<PropsTable props={data.slideoverDescriptionProps} />

### Drawer.Backdrop

**Preset Key:** {inlineCode('drawer.backdrop')}

**Props:**

<PropsTable props={data.slideoverBackdropProps} />

## Examples

### Basic Drawer

{codeBlock(metadata.examples.basic, 'svelte')}

### Drawer Sides

{codeBlock(metadata.examples.sides, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Best Practices

1. **Use Appropriate Sides**: Right/left for navigation, forms; top/bottom for notifications
2. **Provide Close Options**: Always include an easy way to close (X button, backdrop click, ESC key)
3. **Focus Management**: Return focus to trigger element after closing
4. **Mobile Considerations**: Consider full-screen drawers on small screens
5. **Content Organization**: Keep drawer content focused and relevant

## License

This module is licensed under the MIT License.
