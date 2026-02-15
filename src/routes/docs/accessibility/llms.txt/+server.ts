import { list } from '$docs/md/utils';
import { md } from '$docs/md/template';
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
id: accessibility
title: Accessibility Features
category: fundamentals
depth: intermediate
prerequisites:
  - philosophy
  - atoms
related:
  - crafting
  - components
---

# ${metadata.pageTitle}

${metadata.pageDescription}

## Overview

${metadata.overview}

## Key Features

${list(metadata.keyFeatures)}

## Accessibility Features

${metadata.sections.map((section) => `### ${section.title}\n\n${section.description}`).join('\n\n')}

## Keyboard Navigation

All interactive components in Svelte Atoms support comprehensive keyboard navigation:

${list(metadata.keyboardNavigation)}

## ARIA Attributes

Components automatically apply appropriate ARIA attributes based on their state:

${list(metadata.ariaAttributes)}

## Focus Management

Focus is carefully managed to ensure a logical and predictable user experience:

${list(metadata.focusManagement)}

## Semantic HTML

Components use semantic HTML elements by default and support customization:

${list(metadata.semanticHTML)}

## Screen Reader Support

All components are optimized for screen readers:

${list(metadata.screenReaderSupport)}

## Color Contrast

The default theme meets WCAG AA requirements:

${list(metadata.colorContrast)}

## Reduced Motion

Components respect the \`prefers-reduced-motion\` media query:

${list(metadata.reducedMotion)}

## Testing for Accessibility

When building with Svelte Atoms, follow these testing practices:

${list(metadata.testingPractices, true)}

## Best Practices

${list(metadata.bestPractices)}

## Resources

${list(metadata.resources)}
`;
}
