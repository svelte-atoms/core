import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	stepperRootProps,
	stepperHeaderProps,
	stepperBodyProps,
	stepperContentProps,
	stepperFooterProps,
	stepRootProps,
	stepHeaderProps,
	stepIndicatorProps,
	stepTitleProps,
	stepDescriptionProps,
	stepSeparatorProps,
	stepBodyProps
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
id: stepper
title: Stepper Component
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

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Stepper.Root

**Preset Key:** \`stepper\`

**Props:**

${propsTable(stepperRootProps)}

### Stepper.Header

**Preset Key:** \`stepper.header\`

**Props:**

${propsTable(stepperHeaderProps)}

### Stepper.Body

**Preset Key:** \`stepper.body\`

**Props:**

${propsTable(stepperBodyProps)}

### Stepper.Content

**Preset Key:** \`stepper.content\`

**Props:**

${propsTable(stepperContentProps)}

### Stepper.Footer

**Preset Key:** \`stepper.footer\`

**Props:**

${propsTable(stepperFooterProps)}

### Step.Root

**Preset Key:** \`step\`

**Props:**

${propsTable(stepRootProps)}

### Step.Header

**Preset Key:** \`step.header\`

**Props:**

${propsTable(stepHeaderProps)}

### Step.Indicator

**Preset Key:** \`step.indicator\`

**Props:**

${propsTable(stepIndicatorProps)}

### Step.Title

**Preset Key:** \`step.title\`

**Props:**

${propsTable(stepTitleProps)}

### Step.Description

**Preset Key:** \`step.description\`

**Props:**

${propsTable(stepDescriptionProps)}

### Step.Separator

**Preset Key:** \`step.separator\`

**Props:**

${propsTable(stepSeparatorProps)}

### Step.Body

**Preset Key:** \`step.body\`

**Props:**

${propsTable(stepBodyProps)}

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
