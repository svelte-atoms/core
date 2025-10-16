<script lang="ts">
	import { page } from '$app/state';
	import Logo from './logo.svelte';

	const links = [
		{
			url: '/',
			label: 'Home'
		},
		{
			url: '/components',
			label: 'Components'
		},
		{
			url: '/getting-started',
			label: 'Getting Started'
		}
	];

	let darkMode = $state(false);
</script>

<div class="sticky top-0 h-0">
	<nav class="sticky top-0 z-50 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-20 items-center justify-between">
				<div class="flex items-center gap-8">
					<a href="/" class="group flex items-center space-x-3">
						<div
							class=" flex h-10 w-10 transform items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
						>
							<Logo class="text-palette-proton" />
						</div>
						<div>
							<h1 class="bg-gradient-to-r text-xl font-bold text-palette-ion">Atomic SV</h1>
							<p class="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
						</div>
					</a>

					<!-- Theme toggle button -->
					<button
						onclick={() => {}}
						class="top-4 right-4 z-50 rounded-full bg-palette-solar/10 p-3 transition-all duration-300 dark:text-palette-solar dark:hover:bg-gray-700"
						aria-label="Toggle dark mode"
					>
						{#if darkMode}
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
									clip-rule="evenodd"
								></path>
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
							</svg>
						{/if}
					</button>
				</div>

				<div class="flex items-center space-x-6">
					{#each links as link (link.url)}
						{@const isActive = page.url.pathname === link.url}

						<a
							href={link.url}
							class="text-palette-concrete transition-colors duration-200 hover:text-palette-photon {isActive
								? 'font-medium text-palette-solar dark:text-palette-energy'
								: ''}"
						>
							{link.label}
						</a>
					{/each}

					<a
						href="https://github.com/ryu-man/atomic-sv"
						class="inline-flex items-center rounded-lg bg-gradient-to-r px-4 py-2 text-palette-ion transition-all duration-200 hover:bg-palette-ion/5 active:bg-palette-ion/10"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						GitHub
					</a>
				</div>
			</div>
		</div>
	</nav>
</div>
