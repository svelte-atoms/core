<script lang="ts">
	import '$lib/components/root/root.css';
	import '../app.css';
	import { Root } from '$lib/components/root';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Header from './header.svelte';
	import Logo from './logo.svelte';
	import { Scrollable } from '$lib/components/scrollable';
	import { ScrollableBond } from '$lib/components/scrollable/bond.svelte';
	import { on } from '$lib/attachments/event.svelte';
	import { animate as motion } from 'motion';

	let { children } = $props();
	let darkMode = $state(false);

	onMount(() => {
		if (browser) {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = (e: MediaQueryListEvent) => {
				darkMode = e.matches;
			};

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	});
</script>

<Root class="bg-background dark block min-h-screen">
	<Scrollable.Root
		class="box-border flex min-h-full w-full  shadow-inner"
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
		<Scrollable.Container class="max-h-[100svh]">
			<Scrollable.Content>
				<Header />

				<main class="flex-1 pt-20">
					{@render children?.()}
				</main>

				<footer class="mt-16">
					<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						<div class="flex flex-col items-center justify-between md:flex-row">
							<div class="mb-4 flex items-center space-x-3 md:mb-0">
								<div class="flex items-center justify-center rounded-lg bg-gradient-to-r">
									<Logo class="size-8 text-white" />
								</div>
								<div>
									<p class="text-sm font-medium">Atomic SV</p>
									<p class="text-xs text-gray-500">Built with ❤️ using Svelte 5</p>
								</div>
							</div>
							<div class="text-sm text-gray-500">
								© 2025 Atomic SV. Open source under MIT License.
							</div>
						</div>
					</div>
				</footer>
			</Scrollable.Content>
		</Scrollable.Container>

		<!-- New unified vertical scrollbar -->
		<Scrollable.Track
			orientation="vertical"
			class="inset-y-0 right-0 w-[2px] rounded-md bg-palette-solar/30 transition-colors  hover:bg-palette-solar/50"
			initial={(node: HTMLElement) => {
				node.style.opacity = '0';
			}}
			enter={(node: HTMLElement) => {
				motion(node, { opacity: [0, 1] as any }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] });

				return {
					duration: 300
				};
			}}
			exit={(node: HTMLElement) => {
				motion(node, { opacity: [1, 0] as any }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] });

				return {
					duration: 300
				};
			}}
		>
			<Scrollable.Thumb
				orientation="vertical"
				class="left-[50%] w-2 origin-center translate-x-[-50%] rounded-none bg-palette-energy/50 transition-colors hover:bg-palette-energy/70"
			/>
		</Scrollable.Track>
	</Scrollable.Root>
</Root>
