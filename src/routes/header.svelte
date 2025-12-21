<script lang="ts">
	import Logo from './logo.svelte';
	import { Theme } from './theme.svelte';

	const theme = Theme.get();

	const isDarkModePreferred = $derived(theme.colorScheme === 'dark');

	function handleToggleDarkMode() {
		theme.toggle();
	}
</script>

<div
	class="bg-background/80 border-border sticky top-0 z-10 flex flex-col border-b backdrop-blur-sm"
>
	<!-- Top Bar -->
	<div class="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between gap-4">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<Logo class="h-8 w-8" />
				<span class="text-xl font-bold">Core UI</span>
			</a>

			<!-- Search -->
			<div class="flex max-w-md flex-1 items-center">
				<!-- <button
					class="border-input bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
				>
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-search"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
						<span>Search...</span>
					</div>
					<kbd
						class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
					>
						<span class="text-xs">Ctrl K</span>
					</kbd>
				</button> -->
			</div>

			<!-- Right Actions -->
			<div class="flex items-center gap-4">
				<button
					onclick={handleToggleDarkMode}
					class="hover:bg-muted rounded-md p-2"
					aria-label="Toggle dark mode"
				>
					{#if isDarkModePreferred}
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
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2" />
							<path d="M12 20v2" />
							<path d="m4.93 4.93 1.41 1.41" />
							<path d="m17.66 17.66 1.41 1.41" />
							<path d="M2 12h2" />
							<path d="M20 12h2" />
							<path d="m6.34 17.66-1.41 1.41" />
							<path d="m19.07 4.93-1.41 1.41" />
						</svg>
					{:else}
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
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
