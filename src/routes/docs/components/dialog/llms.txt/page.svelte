<script lang="ts">
	import { PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: dialog
title: Dialog Component
category: components
subcategory: overlay
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

The Dialog module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Dialog.Root

**Preset Key:** \`dialog\`

**Props:**

<PropsTable props={data.dialogProps} />

### Dialog.Content

**Preset Key:** \`dialog.content\`

**Props:**

<PropsTable props={data.dialogContentProps} />

### Dialog.Header

**Preset Key:** \`dialog.header\`

**Props:**

<PropsTable props={data.dialogHeaderProps} />

### Dialog.Body

**Preset Key:** \`dialog.body\`

**Props:**

<PropsTable props={data.dialogBodyProps} />

### Dialog.Footer

**Preset Key:** \`dialog.footer\`

**Props:**

<PropsTable props={data.dialogFooterProps} />

### Dialog.Title

**Preset Key:** \`dialog.title\`

**Props:**

<PropsTable props={data.dialogTitleProps} />

### Dialog.Description

**Preset Key:** \`dialog.description\`

**Props:**

<PropsTable props={data.dialogDescriptionProps} />

### Dialog.CloseButton

**Preset Key:** \`dialog.closeButton\`

**Props:**

<PropsTable props={data.dialogCloseButtonProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Alert Dialog

\`\`\`svelte
{metadata.examples.alert}
\`\`\`

### Controlled Dialog

\`\`\`svelte
{metadata.examples.controlled}
\`\`\`

### Animated Dialog

\`\`\`svelte
{metadata.examples.animated}
\`\`\`

### Preset Configuration

You can customize the default styles for Dialog components by defining presets in your configuration:

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

The module ensures accessibility by providing ARIA attributes and keyboard navigation:

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Best Practices

1. **Keep dialogs focused**: Dialogs should be used for important interactions that require user attention
2. **Provide clear actions**: Always include clear action buttons (confirm/cancel)
3. **Use proper headings**: Include a Dialog.Title for screen reader accessibility
4. **Handle escape key**: Users expect ESC key to close dialogs
5. **Return focus**: Focus should return to the trigger element after closing
6. **Avoid nested dialogs**: Multiple stacked dialogs create poor user experience

## Dependencies

- \`motion\` (for animations)
- \`es-toolkit\` (for utilities)

## License

This module is licensed under the MIT License.
