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

The Dialog module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Dialog.Root

**Preset Key:** {inlineCode('dialog')}

**Props:**

<PropsTable props={data.dialogProps} />

### Dialog.Content

**Preset Key:** {inlineCode('dialog.content')}

**Props:**

<PropsTable props={data.dialogContentProps} />

### Dialog.Header

**Preset Key:** {inlineCode('dialog.header')}

**Props:**

<PropsTable props={data.dialogHeaderProps} />

### Dialog.Body

**Preset Key:** {inlineCode('dialog.body')}

**Props:**

<PropsTable props={data.dialogBodyProps} />

### Dialog.Footer

**Preset Key:** {inlineCode('dialog.footer')}

**Props:**

<PropsTable props={data.dialogFooterProps} />

### Dialog.Title

**Preset Key:** {inlineCode('dialog.title')}

**Props:**

<PropsTable props={data.dialogTitleProps} />

### Dialog.Description

**Preset Key:** {inlineCode('dialog.description')}

**Props:**

<PropsTable props={data.dialogDescriptionProps} />

### Dialog.CloseButton

**Preset Key:** {inlineCode('dialog.closeButton')}

**Props:**

<PropsTable props={data.dialogCloseButtonProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Alert Dialog

{codeBlock(metadata.examples.alert, 'svelte')}

### Controlled Dialog

{codeBlock(metadata.examples.controlled, 'svelte')}

### Animated Dialog

{codeBlock(metadata.examples.animated, 'svelte')}

### Preset Configuration

You can customize the default styles for Dialog components by defining presets in your configuration:

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

The module ensures accessibility by providing ARIA attributes and keyboard navigation:

{list(metadata.accessibility)}

## Best Practices

1. **Keep dialogs focused**: Dialogs should be used for important interactions that require user attention
2. **Provide clear actions**: Always include clear action buttons (confirm/cancel)
3. **Use proper headings**: Include a Dialog.Title for screen reader accessibility
4. **Handle escape key**: Users expect ESC key to close dialogs
5. **Return focus**: Focus should return to the trigger element after closing
6. **Avoid nested dialogs**: Multiple stacked dialogs create poor user experience

## Dependencies

- {inlineCode('motion')} (for animations)
- {inlineCode('es-toolkit')} (for utilities)

## License

This module is licensed under the MIT License.
