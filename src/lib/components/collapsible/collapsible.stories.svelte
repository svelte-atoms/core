<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Collapsible as ACollapsible } from '.';
	import { Root as CoolapsibleRoot } from './atoms';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import gsap from 'gsap';
	import { linear } from 'svelte/easing';
	import { toTransitionConfig } from '$svelte-atoms/core/utils/gsap';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Collapsible',
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

<Story name="Collapsible" args={{}}>
	<Root class="gap-2 p-4">
		<ACollapsible.Root>
			{#snippet children({ collapsible })}
				{@const isOpen = collapsible.state.props.open}

				<ACollapsible.Header class="">
					<div>Hello Atoms UI 1</div>
					<ACollapsible.Indicator />
				</ACollapsible.Header>

				<ACollapsible.Body
					initial={(node) => {
						gsap.set(node, {
							opacity: 0,
							height: 0,
							pointerEvents: isOpen ? 'all' : 'none'
						});
					}}
					enter={(node) => {
						const tween = gsap.to(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							duration: 0.2,
							ease: linear
						});
						return toTransitionConfig(tween);
					}}
					exit={(node) => {
						const tween = gsap.to(node, { opacity: 0, height: 0, duration: 0.2, ease: linear });
						return toTransitionConfig(tween);
					}}
					animate={(node) => {
						gsap.to(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							pointerEvents: isOpen ? 'all' : 'none',
							duration: 0.1
						});
					}}
				>
					<div class="py-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</ACollapsible.Body>
			{/snippet}
		</ACollapsible.Root>

		<ACollapsible.Root>
			{#snippet children({ collapsible })}
				{@const isOpen = collapsible.state.isOpen}

				<ACollapsible.Header class="">
					<div>Hello Atoms UI 2</div>
					<ACollapsible.Indicator />
				</ACollapsible.Header>

				<ACollapsible.Body
					initial={(node) => {
						gsap.set(node, {
							opacity: 0,
							height: 0,
							pointerEvents: isOpen ? 'all' : 'none'
						});
					}}
					enter={(node) => {
						const tween = gsap.to(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							duration: 0.2,
							ease: linear
						});

						return toTransitionConfig(tween);
					}}
					exit={(node) => {
						const tween = gsap.to(node, { opacity: 0, height: 0, duration: 0.2, ease: linear });

						return toTransitionConfig(tween);
					}}
					animate={(node) => {
						gsap.to(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							pointerEvents: isOpen ? 'all' : 'none',
							duration: 0.1
						});
					}}
				>
					<div class="py-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</ACollapsible.Body>
			{/snippet}
		</ACollapsible.Root>

		<ACollapsible.Root>
			{#snippet children({ collapsible })}
				{@const isOpen = collapsible.state.isOpen}

				<ACollapsible.Header class="">
					<div>Hello Atoms UI 3</div>
					<ACollapsible.Indicator />
				</ACollapsible.Header>

				<ACollapsible.Body
					initial={(node) => {
						gsap.set(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							pointerEvents: isOpen ? 'all' : 'none'
						});
					}}
					enter={(node) => {
						const tween = gsap.to(node, {
							opacity: +isOpen,
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
					animate={(node) => {
						gsap.to(node, {
							opacity: +isOpen,
							height: isOpen ? 'auto' : 0,
							pointerEvents: isOpen ? 'all' : 'none',
							duration: 0.1
						});
					}}
				>
					<div class="py-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</ACollapsible.Body>
			{/snippet}
		</ACollapsible.Root>
	</Root>
</Story>
