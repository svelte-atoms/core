import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	alertRootProps,
	alertContentProps,
	alertTitleProps,
	alertDescriptionProps,
	alertIconProps,
	alertActionsProps,
	alertCloseButtonProps
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

# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

The Alert module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Alert.Root

**Preset Key:** \`alert\`

${propsTable(alertRootProps)}

### Alert.Content

**Preset Key:** \`alert.content\`

${propsTable(alertContentProps)}

### Alert.Title

**Preset Key:** \`alert.title\`

${propsTable(alertTitleProps)}

### Alert.Description

**Preset Key:** \`alert.description\`

${propsTable(alertDescriptionProps)}

### Alert.Icon

**Preset Key:** \`alert.icon\`

${propsTable(alertIconProps)}

### Alert.Actions

**Preset Key:** \`alert.actions\`

${propsTable(alertActionsProps)}

### Alert.CloseButton

**Preset Key:** \`alert.closebutton\`

${propsTable(alertCloseButtonProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Variants

\`\`\`svelte
${metadata.examples.variants}
\`\`\`

### Dismissible Alert

\`\`\`svelte
${metadata.examples.dismissible}
\`\`\`

### Alert with Actions

\`\`\`svelte
${metadata.examples.actions}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## License

This module is licensed under the MIT License.
`.trim();
}
