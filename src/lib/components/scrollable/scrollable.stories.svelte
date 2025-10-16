<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Scrollable as Scrollable_ } from '.';
	import { Root as ScrollableRoot } from './atoms';
	import gsap from 'gsap';
	import { ScrollableBond } from './bond.svelte';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { on } from '$svelte-atoms/core/attachments/event.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Scrollable'
	});
</script>

<Story name="Scrollable">
	<Root class="p-0">
		{#snippet children({ args })}
			<div class="h-full w-full flex-1">
				<Scrollable_.Root
					class="border-border box-border flex min-h-full w-full rounded-lg border shadow-inner"
					open={false}
					{@attach (node) => {
						const scrollable = ScrollableBond.get();
						if (!scrollable) return;

						const c1 = on('pointerenter', () => {
							scrollable.state.props.open = true;
						})(node);

						const c2 = on('pointerleave', () => {
							scrollable.state.props.open = false;
						})(node);

						return () => {
							c1();
							c2();
						};
					}}
				>
					{#snippet children({ scrollable })}
						<Scrollable_.Container class="max-h-[100svh]">
							<Scrollable_.Content>
								<div class="mx-auto w-[600px] p-4">
									<h3 class="mb-4 text-lg font-semibold">Scrollable Content (New API)</h3>
									<div class="grid grid-cols-3 gap-4">
										{#each Array(99) as _, i}
											<div class="rounded border p-4 shadow">
												<h4 class="font-medium">Card {i + 1}</h4>
												<p class="mt-2 text-sm">
													This is some sample content in card {i + 1}. You can scroll horizontally
													and vertically to see more content.
												</p>
											</div>
										{/each}
									</div>

									<div class="bg-foreground/10 mt-6 rounded p-4">
										<p class="text-sm">
											This content area is larger than the container, so you can scroll both
											horizontally and vertically using the custom scrollbars or mouse wheel.
										</p>
									</div>

									<div class="mt-4 flex gap-2">
										<button
											class="rounded bg-blue-500 px-3 py-2 hover:bg-blue-600"
											onclick={() => scrollable.scrollTo(0, 0)}
										>
											Scroll to Top
										</button>
										<button
											class="rounded bg-green-500 px-3 py-2 hover:bg-green-600"
											onclick={() => scrollable.scrollBy(50, 50)}
										>
											Scroll +50px
										</button>
									</div>
								</div>
							</Scrollable_.Content>
						</Scrollable_.Container>

						<!-- New unified vertical scrollbar -->
						<Scrollable_.Track
							orientation="vertical"
							class="inset-y-0 right-0 w-[2px] rounded-md"
							initial={(node) => gsap.set(node, { opacity: 0, right: 0, top: 0, bottom: 0 })}
							enter={(node) => {
								const tween = gsap.to(node, {
									opacity: 1,
									duration: 0.3,
									right: 8,
									top: 8,
									bottom: 8,
									ease: 'power2.out'
								});

								return {
									duration: tween.duration() * 1000
								};
							}}
							exit={(node) => {
								const tween = gsap.to(node, {
									opacity: 0,
									right: 0,
									top: 0,
									bottom: 0,
									duration: 0.3,
									ease: 'power2.out'
								});

								return {
									duration: tween.duration() * 1000
								};
							}}
						>
							<Scrollable_.Thumb
								orientation="vertical"
								class="left-[50%] w-2 origin-center translate-x-[-50%] rounded-none transition-colors"
							/>
						</Scrollable_.Track>
					{/snippet}
				</Scrollable_.Root>
			</div>
		{/snippet}
	</Root>
</Story>
