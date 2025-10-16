<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Accordion as AAccordion, AccordionItem } from '.';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import gsap from 'gsap';
	import { linear } from 'svelte/easing';
	import { toTransitionConfig } from '$svelte-atoms/core/utils/gsap';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Accordion',
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

<Story name="Accordion" args={{ collapsible: false, multiple: false, disabled: false }}>
	{#snippet children(args)}
		<Root class="flex items-center justify-center p-4">
			<AAccordion class="backdrop-blur-sm" {...args}>
				<AccordionItem.Root>
					<AccordionItem.Header>
						<div>Hello Atomic UI 1</div>
						<AccordionItem.Indicator />
					</AccordionItem.Header>

					<AccordionItem.Body
						initial={(node) => {
							gsap.set(node, { opacity: 0, height: 0 });
						}}
						enter={function (node) {
							console.log(this);
							const tween = gsap.to(node, {
								opacity: 1,
								height: 'auto',
								duration: 0.2,
								ease: linear
							});

							return toTransitionConfig(tween);
						}}
						exit={(node) => {
							const tween = gsap.to(node, { opacity: 0, height: 0, duration: 0.2, ease: linear });

							return toTransitionConfig(tween);
						}}
					>
						<div class="p-2">
							Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
							tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
							dolor diam nascetur.
						</div>
					</AccordionItem.Body>
				</AccordionItem.Root>

				<AccordionItem.Root>
					<AccordionItem.Header>
						<div>Hello Atomic UI 2</div>
						<AccordionItem.Indicator />
					</AccordionItem.Header>

					<AccordionItem.Body
						initial={(node) => {
							gsap.set(node, { opacity: 0, height: 0 });
						}}
						enter={(node) => {
							const tween = gsap.to(node, {
								opacity: 1,
								height: 'auto',
								duration: 0.2,
								ease: linear
							});

							return toTransitionConfig(tween);
						}}
						exit={(node) => {
							const tween = gsap.to(node, { opacity: 0, height: 0, duration: 0.2, ease: linear });

							return toTransitionConfig(tween);
						}}
					>
						<div class="p-2">
							Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
							tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
							dolor diam nascetur.
						</div>
					</AccordionItem.Body>
				</AccordionItem.Root>

				<AccordionItem.Root>
					<AccordionItem.Header>
						<div>Hello Atomic UI 3</div>
						<AccordionItem.Indicator />
					</AccordionItem.Header>

					<AccordionItem.Body
						initial={(node) => {
							gsap.set(node, { opacity: 0, height: 0 });
						}}
						enter={(node) => {
							const tween = gsap.to(node, {
								opacity: 1,
								height: 'auto',
								duration: 0.2,
								ease: linear
							});

							return toTransitionConfig(tween);
						}}
						exit={(node) => {
							const tween = gsap.to(node, { opacity: 0, height: 0, duration: 0.2, ease: linear });

							return toTransitionConfig(tween);
						}}
					>
						<div class="p-2">
							Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
							tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
							dolor diam nascetur.
						</div>
					</AccordionItem.Body>
				</AccordionItem.Root>
			</AAccordion>
		</Root>
	{/snippet}
</Story>
