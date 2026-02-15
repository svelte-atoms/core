import { content, list } from '$docs/md/utils';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return content(`---
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

Svelte Atoms is designed with accessibility as a core principle, not an afterthought. Every component is built to be accessible by default, following WCAG 2.1 guidelines and WAI-ARIA best practices. This ensures your applications are usable by everyone, regardless of their abilities or the assistive technologies they use.

## Key Features

${list(metadata.keyFeatures)}

## Accessibility Features

${metadata.sections.map((section) => `### ${section.title}\n\n${section.description}`).join('\n\n')}

## Keyboard Navigation

All interactive components in Svelte Atoms support comprehensive keyboard navigation:

${list([
	'**Buttons**: Activated with Enter or Space keys',
	'**Menus**: Navigate with Arrow keys, activate with Enter, close with Escape',
	'**Tabs**: Switch tabs with Arrow keys, Home/End for first/last tab',
	'**Dialogs**: Close with Escape, focus trapped within dialog',
	'**Accordions**: Expand/collapse with Enter or Space, navigate with Arrow keys',
	'**Dropdowns**: Open with Enter/Space/Arrow Down, navigate with Arrow keys',
	'**Combobox**: Type to filter, Arrow keys to navigate, Enter to select'
])}

## ARIA Attributes

Components automatically apply appropriate ARIA attributes based on their state:

${list([
	'**aria-expanded**: For collapsible elements (accordions, dropdowns)',
	'**aria-selected**: For selectable items (tabs, menu items)',
	'**aria-checked**: For checkboxes and radio buttons (including mixed state)',
	'**aria-disabled**: For disabled elements',
	'**aria-haspopup**: For elements that trigger popups',
	'**aria-controls**: Links triggers to their controlled elements',
	'**aria-labelledby / aria-describedby**: Associates labels and descriptions',
	'**role**: Proper ARIA roles for semantic meaning'
])}

## Focus Management

Focus is carefully managed to ensure a logical and predictable user experience:

${list([
	'**Focus Trapping**: Dialogs and modals trap focus within their boundaries',
	'**Focus Return**: Focus returns to the trigger element when dialogs close',
	'**Initial Focus**: First focusable element in dialogs receives focus automatically',
	'**Focus Indicators**: All interactive elements have visible focus indicators',
	'**Skip Links**: Use with Link component for keyboard-only navigation'
])}

## Semantic HTML

Components use semantic HTML elements by default and support customization:

${list([
	'Cards use proper heading hierarchy',
	'Lists render as \\`<ul>\\` or \\`<ol>\\` elements',
	'Buttons use \\`<button>\\` elements',
	'Links use \\`<a>\\` elements',
	'Form fields use proper \\`<label>\\` associations',
	'Use the \\`as\\` prop to override the default element while preserving behavior'
])}

## Screen Reader Support

All components are optimized for screen readers:

${list([
	'Proper ARIA roles and attributes',
	'Meaningful labels and descriptions',
	'Alert announcements for important changes',
	'Focus management announcements',
	'State change announcements',
	'Hidden decorative elements (aria-hidden)'
])}

## Color Contrast

The default theme meets WCAG AA requirements:

${list([
	'**Normal text**: 4.5:1 contrast ratio minimum',
	'**Large text**: 3:1 contrast ratio minimum',
	'**Interactive elements**: Clear visual distinction',
	'**Focus indicators**: High contrast borders/outlines',
	'**Disabled states**: Visually distinct but still readable'
])}

## Reduced Motion

Components respect the \`prefers-reduced-motion\` media query:

${list([
	'Animations are disabled or simplified when motion is reduced',
	'Transitions are instant or minimal',
	'No parallax or auto-playing animations',
	'Smooth scroll behavior is disabled'
])}

## Testing for Accessibility

When building with Svelte Atoms, follow these testing practices:

${list([
	'**Keyboard Testing**: Navigate your entire app using only the keyboard',
	'**Screen Reader Testing**: Use NVDA (Windows), JAWS (Windows), or VoiceOver (Mac)',
	'**Contrast Testing**: Use browser DevTools or online tools to verify contrast ratios',
	'**Automated Testing**: Use tools like axe DevTools or Lighthouse',
	'**Manual Testing**: Test with actual assistive technologies',
	'**User Testing**: Include users with disabilities in your testing process'
], true)}

## Best Practices

${list([
	'Always provide text alternatives for images and icons',
	'Use semantic HTML elements appropriately',
	'Maintain logical heading hierarchy',
	'Provide clear focus indicators',
	'Test with keyboard navigation',
	'Test with screen readers',
	'Ensure sufficient color contrast',
	'Support reduced motion preferences',
	'Never disable focus outlines without replacement',
	'Use ARIA attributes correctly (prefer semantic HTML when possible)'
])}

## Resources

${list([
	'[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)',
	'[WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)',
	'[WebAIM](https://webaim.org/)',
	'[a11y Project](https://www.a11yproject.com/)'
])}
`);
}
