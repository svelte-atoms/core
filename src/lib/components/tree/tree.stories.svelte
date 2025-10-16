<script module>
	import { untrack } from 'svelte';
	import gsap from 'gsap';
	import { RenderScan } from 'svelte-render-scan';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { dev } from '$app/environment';
	import { Tree as Tree_ } from '.';
	import { tree } from './attachments.svelte';
	import { Root as TreeRoot } from './atoms';
	import { TreeBond } from './bond.svelte';
	import Root from '$svelte-atoms/core/components/root/root.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Tree',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let open = $state(true);
</script>

<Story name="Tree" args={{}}>
	<Root class="p-4">
		<Tree_.Root class="" bind:open>
			{#if dev}
				<RenderScan duration={300} />
			{/if}

			<Tree_.Header>Vehicles</Tree_.Header>

			<Tree_.Body
				class="border-l border-l-neutral-200"
				onmount={(node) => {
					const bond = TreeBond.get();
					const isOpen = untrack(() => bond?.state.props.open ?? false);
					gsap.set(node, { height: +isOpen ? 'auto' : 0, opacity: +isOpen });
				}}
				{@attach tree((node, bond) => {
					const isOpen = bond?.state.props.open ?? false;
					gsap.to(node, {
						height: +isOpen ? 'auto' : 0,
						opacity: +isOpen,
						pointerEvents: isOpen ? 'all' : 'none',
						duration: 0.1
					});
				})}
			>
				<Tree_.Root>
					<Tree_.Header>Cars</Tree_.Header>
					<Tree_.Body
						class="border-l border-l-neutral-200"
						onmount={(node) => {
							const bond = TreeBond.get();
							const isOpen = bond?.state.props.open ?? false;
							gsap.set(node, { height: +isOpen ? 'auto' : 0, opacity: +isOpen });
						}}
						animate={(node) => {
							const bond = TreeBond.get();
							const isOpen = bond?.state.props.open ?? false;
							gsap.to(node, {
								height: +isOpen ? 'auto' : 0,
								opacity: +isOpen,
								pointerEvents: isOpen ? 'all' : 'none',
								duration: 0.1
							});
						}}
					>
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</Tree_.Body>
				</Tree_.Root>

				<Tree_.Root>
					<Tree_.Header>Trucks</Tree_.Header>
					<Tree_.Body
						class="border-l border-l-neutral-200"
						onmount={(node) => {
							const bond = TreeBond.get();
							const isOpen = bond?.state.props.open ?? false;
							gsap.set(node, { height: +isOpen ? 'auto' : 0, opacity: +isOpen });
						}}
						{@attach tree((node, bond) => {
							const isOpen = bond?.state.props.open ?? false;
							gsap.to(node, {
								height: +isOpen ? 'auto' : 0,
								opacity: +isOpen,
								pointerEvents: isOpen ? 'all' : 'none',
								duration: 0.1
							});
						})}
					>
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</Tree_.Body>
				</Tree_.Root>

				<Tree_.Root>
					<Tree_.Header>Bikes</Tree_.Header>
					<Tree_.Body
						class="border-l border-l-neutral-200"
						onmount={(node) => {
							const bond = TreeBond.get();
							const isOpen = untrack(() => bond?.state.props.open ?? false);
							gsap.set(node, { height: +isOpen ? 'auto' : 0, opacity: +isOpen });
						}}
						{@attach tree((node, bond) => {
							const isOpen = bond?.state.props.open ?? false;
							gsap.to(node, {
								height: +isOpen ? 'auto' : 0,
								opacity: +isOpen,
								pointerEvents: isOpen ? 'all' : 'none',
								duration: 0.1
							});
						})}
					>
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</Tree_.Body>
				</Tree_.Root>
			</Tree_.Body>
		</Tree_.Root>
	</Root>
</Story>
