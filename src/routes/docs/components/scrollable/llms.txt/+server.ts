import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	scrollableRootProps,
	scrollableContainerProps,
	scrollableContentProps,
	scrollableTrackProps,
	scrollableThumbProps
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
id: scrollable
title: Scrollable Component
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

## Components

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Scrollable.Root

**Preset Key:** \`scrollable\`

**Props:**

${propsTable(scrollableRootProps)}

### Scrollable.Container

**Preset Key:** \`scrollable.container\`

**Props:**

${propsTable(scrollableContainerProps)}

### Scrollable.Content

**Preset Key:** \`scrollable.content\`

**Props:**

${propsTable(scrollableContentProps)}

### Scrollable.Track

**Preset Key:** \`scrollable.track\`

**Props:**

${propsTable(scrollableTrackProps)}

### Scrollable.Thumb

**Preset Key:** \`scrollable.thumb\`

**Props:**

${propsTable(scrollableThumbProps)}

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
