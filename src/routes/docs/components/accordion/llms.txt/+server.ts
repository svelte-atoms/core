import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	accordionRootProps,
	accordionItemRootProps,
	accordionItemHeaderProps,
	accordionItemBodyProps,
	accordionItemIndicatorProps
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
id: accordion
title: Accordion Component
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

The Accordion module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Accordion (Root)

**Preset Key:** \`accordion\`

**Props:**

${propsTable(accordionRootProps)}

### AccordionItem.Root

**Preset Key:** \`accordion.item\`

**Props:**

${propsTable(accordionItemRootProps)}

### AccordionItem.Header

**Preset Key:** \`accordion.item.header\`

**Props:**

${propsTable(accordionItemHeaderProps)}

### AccordionItem.Body

**Preset Key:** \`accordion.item.body\`

**Props:**

${propsTable(accordionItemBodyProps)}

### AccordionItem.Indicator

**Preset Key:** \`accordion.item.indicator\`

**Props:**

${propsTable(accordionItemIndicatorProps)}

## Examples

### Basic Accordion

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Collapsible Items

\`\`\`svelte
${metadata.examples.collapsible}
\`\`\`

### Multiple Open Items

\`\`\`svelte
${metadata.examples.multiple}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Best Practices

1. **Clear Headers**: Use descriptive header text that clearly indicates the content
2. **Consistent Styling**: Maintain visual consistency across accordion items
3. **Loading States**: Show loading indicators for dynamic content
4. **Default States**: Consider which items should be open by default
5. **Mobile Friendly**: Ensure touch targets are large enough on mobile devices

## License

This module is licensed under the MIT License.
`.trim();
}
