import { propsTable } from '$docs/md/page';
import { collapsibleRootProps } from '../props';
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
id: collapsible
title: Collapsible Component
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

The Collapsible module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Collapsible.Root

**Preset Key:** \`collapsible\`

**Props:**

${propsTable(collapsibleRootProps)}

## Examples

### Basic Collapsible

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Controlled State

\`\`\`svelte
${metadata.examples.controlled}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Best Practices

1. **Clear Triggers**: Make it obvious that the element can be expanded/collapsed
2. **Visual Feedback**: Provide visual indicators of the current state (open/closed)
3. **Smooth Transitions**: Use transitions to make state changes feel natural
4. **Keyboard Support**: Ensure the trigger is keyboard accessible
5. **Initial State**: Consider the appropriate default state for your use case

## License

This module is licensed under the MIT License.
`.trim();
}
