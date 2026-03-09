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

<Story name="Number Control">
	{#snippet children()}
		<div class="flex flex-col gap-4 p-4">
			<div class="flex flex-col gap-1">
				<Label>Quantity</Label>
				<AInput.Root>
					<AInput.NumberControl number={1} min={0} max={99} />
				</AInput.Root>
			</div>

			<div class="flex flex-col gap-1">
				<Label>Step 5</Label>
				<AInput.Root>
					<AInput.NumberControl number={0} min={0} max={100} step={5} />
				</AInput.Root>
			</div>

			<div class="flex flex-col gap-1">
				<Label>Disabled</Label>
				<AInput.Root>
					<AInput.NumberControl number={3} disabled />
				</AInput.Root>
			</div>

			<div class="flex flex-col gap-1">
				<Label>Custom buttons</Label>
				<AInput.Root>
					<AInput.NumberControl number={0}>
						{#snippet decrementContent({ decrement, disabled })}
							<button
								onclick={decrement}
								{disabled}
								class="px-3 text-lg font-bold disabled:opacity-30"
							>−</button>
						{/snippet}
						{#snippet incrementContent({ increment, disabled })}
							<button
								onclick={increment}
								{disabled}
								class="px-3 text-lg font-bold disabled:opacity-30"
							>+</button>
						{/snippet}
					</AInput.NumberControl>
				</AInput.Root>
			</div>
		</div>
	{/snippet}
</Story>
