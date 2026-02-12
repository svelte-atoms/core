import { propsTable } from '$docs/md/page';
import {
	dropdownRootProps,
	dropdownTriggerProps,
	dropdownItemProps,
	dropdownQueryProps,
	dropdownSelectionsProps,
	dropdownSelectionProps
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
# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

The Dropdown module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Dropdown.Root

**Preset Key:** \`dropdown\`

**Props:**

${propsTable(dropdownRootProps)}

### Dropdown.Trigger

**Preset Key:** \`dropdown.trigger\`

**Props:**

${propsTable(dropdownTriggerProps)}

### Dropdown.Item

**Preset Key:** \`dropdown.item\`

**Props:**

${propsTable(dropdownItemProps)}

### Dropdown.Query

**Preset Key:** \`dropdown.query\`

**Props:**

${propsTable(dropdownQueryProps)}

### Dropdown.Selections

**Preset Key:** \`dropdown.selections\`

**Props:**

${propsTable(dropdownSelectionsProps)}

### Dropdown.Selection

**Preset Key:** \`dropdown.selection\`

**Props:**

${propsTable(dropdownSelectionProps)}

## Examples

### Basic Dropdown

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Multiple Selection with Search

\`\`\`svelte
${metadata.examples.multiple}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Utilities

### \`filterDropdownData\`

Helper function for filtering dropdown items based on a query string.

\`\`\`typescript
const filteredItems = filterDropdownData(
  () => items,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Dependencies

- \`@floating-ui/dom\` (for positioning)
- \`motion\` (for animations)

## License

This module is licensed under the MIT License.
`.trim();
}
