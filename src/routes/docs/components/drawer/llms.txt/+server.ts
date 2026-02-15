import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	slideoverRootProps,
	slideoverContentProps,
	slideoverHeaderProps,
	drawerBodyProps,
	slideoverFooterProps,
	slideoverTitleProps,
	slideoverDescriptionProps,
	slideoverBackdropProps
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
	return md`
---
id: drawer
title: Drawer Component
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

The Drawer module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Drawer.Root

**Preset Key:** \`drawer\`

**Props:**

${propsTable(slideoverRootProps)}

### Drawer.Content

**Preset Key:** \`drawer.content\`

**Props:**

${propsTable(slideoverContentProps)}

### Drawer.Header

**Preset Key:** \`drawer.header\`

**Props:**

${propsTable(slideoverHeaderProps)}

### Drawer.Body

**Preset Key:** \`drawer.body\`

**Props:**

${propsTable(drawerBodyProps)}

### Drawer.Footer

**Preset Key:** \`drawer.footer\`

**Props:**

${propsTable(slideoverFooterProps)}

### Drawer.Title

**Preset Key:** \`drawer.title\`

**Props:**

${propsTable(slideoverTitleProps)}

### Drawer.Description

**Preset Key:** \`drawer.description\`

**Props:**

${propsTable(slideoverDescriptionProps)}

### Drawer.Backdrop

**Preset Key:** \`drawer.backdrop\`

**Props:**

${propsTable(slideoverBackdropProps)}

## Examples

### Basic Drawer

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Drawer Sides

\`\`\`svelte
${metadata.examples.sides}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Best Practices

1. **Use Appropriate Sides**: Right/left for navigation, forms; top/bottom for notifications
2. **Provide Close Options**: Always include an easy way to close (X button, backdrop click, ESC key)
3. **Focus Management**: Return focus to trigger element after closing
4. **Mobile Considerations**: Consider full-screen drawers on small screens
5. **Content Organization**: Keep drawer content focused and relevant

## License

This module is licensed under the MIT License.
`.trim();
}
