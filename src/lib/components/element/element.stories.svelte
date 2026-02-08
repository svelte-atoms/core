<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HtmlElement from './html-element.svelte';
	import { Button } from '../button';
	import { fade } from 'svelte/transition';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Element',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let showElement = $state(true);
</script>

<Story name="Element" args={{}}>
	<!-- Multi-select dropdown with search functionality -->
	<div class="flex flex-col gap-4">
		{#if showElement}
			<HtmlElement enter={node=> ()=> fade(node, { duration: 500 })} exit={node => fade(node, { duration: 500 })} class="p-4 bg-blue-100 rounded" as="section">
				Hello, I am an HtmlElement component! I can be used to render any HTML element with custom props and transitions.
			</HtmlElement>
		{/if}
		
		<Button onclick={() => showElement = !showElement}>
			{showElement ? 'Hide' : 'Show'} HtmlElement
		</Button>
	</div>
</Story>
