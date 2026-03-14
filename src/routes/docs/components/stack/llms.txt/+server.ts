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

## How It Works

Stack uses \`CSS Grid\` with \`grid-template-areas: 'stack'\`. Every \`Stack.Item\` is assigned to the same named grid area, so they all occupy the same visual space. The parent container sizes itself to the largest child — no manual height or absolute positioning required.

z-index values start at 1 and are re-assigned as consecutive integers on every reorder operation.

## API

### Stack.Root

**Preset Key:** \`stack.root\`

${propsTable(stackRootProps)}

### Stack.Item

**Preset Key:** \`stack.item\`

${propsTable(stackItemProps)}

### StackBond methods (via root.getBond())

| Method | Description |
|--------|-------------|
| bringToFront(id) | Move item to the highest z-index |
| sendToBack(id) | Move item to the lowest z-index |
| bringForward(id) | Increase z-index by one step |
| sendBackward(id) | Decrease z-index by one step |

## Examples

### Image with Overlay

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Button with Badge

\`\`\`svelte
${metadata.examples.badge}
\`\`\`

### Loading Overlay

\`\`\`svelte
${metadata.examples.loading}
\`\`\`

### Programmatic Z-Order

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

MIT
`.trim();
}
