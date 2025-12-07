<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input as AInput } from '.';
	import { Label } from '../label';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Input',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
</script>

<Story name="Input" args={{}}>
	<div class="flex flex-col">
		<Label for="price-input">Price</Label>
		<AInput.Root>
			<AInput.Icon class="text-foreground box-content px-0">$</AInput.Icon>
			<AInput.Control id="price-input" class="border-border box-content border-x px-2 py-2">
				<!--  -->
			</AInput.Control>
			<AInput.Icon class="text-foreground box-content px-2">.00</AInput.Icon>

			<AInput.Placeholder class="text-foreground/20 pl-2">Hello World</AInput.Placeholder>
		</AInput.Root>
	</div>
</Story>
