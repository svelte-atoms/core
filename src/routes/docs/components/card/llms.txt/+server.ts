import { propsTable } from '$docs/md/page';
import {
	cardRootProps,
	cardHeaderProps,
	cardBodyProps,
	cardFooterProps,
	cardTitleProps,
	cardSubtitleProps,
	cardDescriptionProps,
	cardMediaProps
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
id: card
title: Card Component
category: components
subcategory: display
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

The Card module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Card.Root

**Preset Key:** \`card\`

${propsTable(cardRootProps)}

### Card.Header

**Preset Key:** \`card.header\`

${propsTable(cardHeaderProps)}

### Card.Title

**Preset Key:** \`card.title\`

${propsTable(cardTitleProps)}

### Card.Subtitle

**Preset Key:** \`card.subtitle\`

${propsTable(cardSubtitleProps)}

### Card.Description

**Preset Key:** \`card.description\`

${propsTable(cardDescriptionProps)}

### Card.Content (Card.Body)

**Preset Key:** \`card.body\`

${propsTable(cardBodyProps)}

### Card.Actions (Card.Footer)

**Preset Key:** \`card.footer\`

${propsTable(cardFooterProps)}

### Card.Media

**Preset Key:** \`card.media\`

${propsTable(cardMediaProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Variants

\`\`\`svelte
${metadata.examples.variants}
\`\`\`

### Clickable Card

\`\`\`svelte
${metadata.examples.clickable}
\`\`\`

### Card with Actions

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
