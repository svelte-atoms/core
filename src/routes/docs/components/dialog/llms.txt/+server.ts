import { propsTable } from '$docs/md/page';
import {
	dialogProps,
	dialogContentProps,
	dialogHeaderProps,
	dialogBodyProps,
	dialogFooterProps,
	dialogTitleProps,
	dialogDescriptionProps,
	dialogCloseButtonProps
} from '../props';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return `
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

# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

The Dialog module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Dialog.Root

**Preset Key:** \`dialog\`

**Props:**

${propsTable(dialogProps)}

### Dialog.Content

**Preset Key:** \`dialog.content\`

**Props:**

${propsTable(dialogContentProps)}

### Dialog.Header

**Preset Key:** \`dialog.header\`

**Props:**

${propsTable(dialogHeaderProps)}

### Dialog.Body

**Preset Key:** \`dialog.body\`

**Props:**

${propsTable(dialogBodyProps)}

### Dialog.Footer

**Preset Key:** \`dialog.footer\`

**Props:**

${propsTable(dialogFooterProps)}

### Dialog.Title

**Preset Key:** \`dialog.title\`

**Props:**

${propsTable(dialogTitleProps)}

### Dialog.Description

**Preset Key:** \`dialog.description\`

**Props:**

${propsTable(dialogDescriptionProps)}

### Dialog.CloseButton

**Preset Key:** \`dialog.closeButton\`

**Props:**

${propsTable(dialogCloseButtonProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Alert Dialog

\`\`\`svelte
${metadata.examples.alert}
\`\`\`

### Controlled Dialog

\`\`\`svelte
${metadata.examples.controlled}
\`\`\`

### Animated Dialog

\`\`\`svelte
${metadata.examples.animated}
\`\`\`

### Preset Configuration

You can customize the default styles for Dialog components by defining presets in your configuration:

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

The module ensures accessibility by providing ARIA attributes and keyboard navigation:

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

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
`.trim();
}
