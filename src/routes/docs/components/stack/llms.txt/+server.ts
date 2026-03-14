import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import { stackRootProps, stackItemProps } from '../props';
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
id: stack
title: Stack Component
category: components
subcategory: layout
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

**Type**: Compound Component

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Stack.Root

**Preset Key:** \`stack.root\`

**Props:**

${propsTable(stackRootProps)}

### Stack.Item

**Preset Key:** \`stack.item\`

**Props:**

${propsTable(stackItemProps)}

### StackState methods (via bond.state)

| Method | Description |
|--------|-------------|
| bringToFront(id) | Move item to the highest z-index |
| sendToBack(id) | Move item to the lowest z-index |
| bringForward(id) | Increase z-index by one step |
| sendBackward(id) | Decrease z-index by one step |
| raise(id) | Alias for bringToFront |

## Examples

### Image with Overlay

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### App Shell Navigation

\`\`\`svelte
${metadata.examples.zOrder}
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
