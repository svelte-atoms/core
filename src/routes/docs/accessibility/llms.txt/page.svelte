<script lang="ts">
	import { FrontMatter, List } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.pageTitle}

{metadata.pageDescription}

## Overview

{metadata.overview}

## Key Features

<List items={metadata.keyFeatures} />

## Accessibility Features

{#each metadata.sections as section (section.title)}
### {section.title}

{section.description}

{/each}

## Keyboard Navigation

All interactive components in Svelte Atoms support comprehensive keyboard navigation:

<List items={metadata.keyboardNavigation} />

## ARIA Attributes

Components automatically apply appropriate ARIA attributes based on their state:

<List items={metadata.ariaAttributes} />

## Focus Management

Focus is carefully managed to ensure a logical and predictable user experience:

<List items={metadata.focusManagement} />

## Semantic HTML

Components use semantic HTML elements by default and support customization:

<List items={metadata.semanticHTML} />

## Screen Reader Support

All components are optimized for screen readers:

<List items={metadata.screenReaderSupport} />

## Color Contrast

The default theme meets WCAG AA requirements:

<List items={metadata.colorContrast} />

## Reduced Motion

Components respect the `prefers-reduced-motion` media query:

<List items={metadata.reducedMotion} />

## Testing for Accessibility

When building with Svelte Atoms, follow these testing practices:

<List ordered items={metadata.testingPractices} />

## Best Practices

<List items={metadata.bestPractices} />

## Resources

<List items={metadata.resources} />
