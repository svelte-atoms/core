import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
// TODO: Import all props from props.ts
// import { dividerProps } from '../props';
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
id: divider
title: Divider Component
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

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

${'componentsSummary' in metadata && metadata.componentsSummary ? `
## Components

The Divider module consists of the following components:

${(metadata as typeof metadata & { componentsSummary: { name: string; description: string }[] }).componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}
` : ''}

### Divider.Root

**Preset Key:** \`divider\`

**Props:**

TODO: Add propsTable(dividerProps)

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
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
