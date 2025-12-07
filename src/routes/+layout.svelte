<script lang="ts">
	import { Root, setPreset } from '$lib';
	import { Theme } from './theme.svelte';
	import Header from './header.svelte';
	import Logo from './logo.svelte';
	import { preset } from './preset';

	import '$lib/components/root/root.css';
	import '../app.css';

	let { children } = $props();

	setPreset(preset);

	const theme = new Theme().share();
</script>

<Root
	class={[
		'bg-background relative min-h-screen w-full justify-normal p-0 font-sans antialiased',
		theme.colorScheme === 'dark' ? 'dark' : 'light'
	]}
>
	<div class="flex w-full flex-col">
		<Header />

		<main class="flex-1">
			{@render children?.()}
		</main>

		<footer class="border-border border-t py-8">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
					<div class="flex flex-col items-center gap-3 sm:items-start">
						<a href="/" class="flex items-center gap-2">
							<Logo class="h-6 w-6" />
							<span class="text-lg font-bold">Svelte Atoms</span>
						</a>
						<p class="text-muted-foreground text-center text-sm sm:text-left">
							A flexible component library for building Svelte applications.
						</p>
					</div>
					<div class="flex gap-4">
						<a
							href="https://github.com/svelte-atoms/core"
							class="text-muted-foreground hover:text-foreground transition-colors"
						>
							<span class="sr-only">GitHub</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
								/>
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
						</a>
						<a
							href="https://twitter.com"
							class="text-muted-foreground hover:text-foreground transition-colors"
						>
							<span class="sr-only">Twitter</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
								/>
							</svg>
						</a>
						<a
							href="https://discord.gg"
							class="text-muted-foreground hover:text-foreground transition-colors"
						>
							<span class="sr-only">Discord</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<circle cx="12" cy="12" r="2" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</Root>
