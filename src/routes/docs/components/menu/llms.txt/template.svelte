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

The Menu module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Menu.List (Root)

**Preset Key:** {inlineCode('menu')}

**Props:**

<PropsTable props={data.menuListProps} />

### Menu.Item

**Preset Key:** {inlineCode('menu.item')}

**Props:**

<PropsTable props={data.menuItemProps} />

## Examples

### Basic Menu

{codeBlock(metadata.examples.basic, 'svelte')}

### Interactive Menu

{codeBlock(metadata.examples.interactive, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## Best Practices

1. **Clear Labels**: Use descriptive, action-oriented labels for menu items
2. **Grouping**: Group related menu items together
3. **Keyboard Support**: Ensure all menu items are keyboard accessible
4. **Visual Feedback**: Provide clear hover and focus states
5. **Disabled Items**: Clearly indicate disabled menu items

## Dependencies

- Built on top of Popover module for positioning
- Uses {inlineCode('@floating-ui/dom')} for positioning calculations

## License

This module is licensed under the MIT License.
