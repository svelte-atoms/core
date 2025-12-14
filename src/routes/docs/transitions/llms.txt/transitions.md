# Transitions & Animations

Most components in `@svelte-atoms/core` support custom transitions and animations through lifecycle hooks. This allows you to create smooth enter/exit animations using Motion, Svelte transitions, or custom animation libraries.

## Animation Hooks

Components that support transitions typically provide these props:

- `initial` - Set the initial state before the element is mounted
- `enter` - Define the enter animation when element appears
- `exit` - Define the exit animation when element disappears
- `animate` - Define animations that run when the element's state changes

## Using Motion (Recommended)

The recommended approach is to use the `motion` library with the `toTransitionConfig` helper:

```svelte
<script>
	import { Component, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';
</script>

<Component
	initial={(node) => {
		node.style.opacity = '0';
		node.style.height = '0';
	}}
	enter={(node) => {
		const animation = animate(
			node,
			{ opacity: 1, height: 'auto' },
			{ duration: 0.2, easing: 'linear' }
		);
		return toTransitionConfig(animation);
	}}
	exit={(node) => {
		const animation = animate(node, { opacity: 0, height: 0 }, { duration: 0.2, easing: 'linear' });
		return toTransitionConfig(animation);
	}}
>
	<!-- Content -->
</Component>
```

## Using Svelte Transitions

You can also use Svelte's built-in transitions:

```svelte
<script>
	import { Component } from '@svelte-atoms/core';
	import { slide, fade } from 'svelte/transition';
</script>

<Component
	enter={(node) => slide(node, { duration: 300 })}
	exit={(node) => fade(node, { duration: 200 })}
>
	<!-- Content -->
</Component>
```

## Using the Animate Hook

The `animate` hook is used for state-driven animations that respond to prop or state changes, rather than mount/unmount transitions:

```svelte
<script>
	import { Accordion, AccordionItem, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';
</script>

<Accordion>
	{#snippet children({ accordion })}
		<AccordionItem.Root value="item-1">
			<AccordionItem.Header>
				<div>Item Header</div>
				<AccordionItem.Indicator
					animate={(node, isOpen) => {
						const animation = animate(node, { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });
						return { duration: 0.2 * 1000, delay: 0 };
					}}
				/>
			</AccordionItem.Header>
			<AccordionItem.Body>
				<div>Item Content</div>
			</AccordionItem.Body>
		</AccordionItem.Root>
	{/snippet}
</Accordion>
```

The `animate` function receives the node and current state, allowing you to create reactive animations.

## Custom Animation Libraries

Any animation library that returns a transition config object can be used:

```svelte
<script>
	import { Component } from '@svelte-atoms/core';

	function customEnter(node) {
		// Your custom animation logic
		return {
			duration: 300,
			css: (t) => `opacity: ${t}; transform: scale(${t});`
		};
	}
</script>

<Component enter={customEnter}>
	<!-- Content -->
</Component>
```

## Common Animation Patterns

### Fade In/Out

```svelte
initial={(node) => {
	node.style.opacity = '0';
}}
enter={(node) => {
	const animation = animate(node, { opacity: 1 }, { duration: 0.2 });
	return toTransitionConfig(animation);
}}
exit={(node) => {
	const animation = animate(node, { opacity: 0 }, { duration: 0.2 });
	return toTransitionConfig(animation);
}}
```

### Slide Down/Up

```svelte
initial={(node) => {
	node.style.height = '0';
	node.style.overflow = 'hidden';
}}
enter={(node) => {
	const animation = animate(node, { height: 'auto' }, { duration: 0.3 });
	return toTransitionConfig(animation);
}}
exit={(node) => {
	const animation = animate(node, { height: 0 }, { duration: 0.3 });
	return toTransitionConfig(animation);
}}
```

### Scale & Fade

```svelte
initial={(node) => {
	node.style.opacity = '0';
	node.style.transform = 'scale(0.95)';
}}
enter={(node) => {
	const animation = animate(
		node,
		{ opacity: 1, transform: 'scale(1)' },
		{ duration: 0.2, easing: 'ease-out' }
	);
	return toTransitionConfig(animation);
}}
exit={(node) => {
	const animation = animate(
		node,
		{ opacity: 0, transform: 'scale(0.95)' },
		{ duration: 0.15, easing: 'ease-in' }
	);
	return toTransitionConfig(animation);
}}
```

## Components with Transition Support

All `@svelte-atoms/core` components support transition hooks through their underlying architecture.

### Universal Support

All components inherit transition capabilities through the preset system and can use:

- Custom `initial`, `enter`, `exit`, and `animate` functions
- TailwindCSS transition classes
- CSS animations and transitions

Refer to each component's documentation for specific usage examples and recommended patterns.
