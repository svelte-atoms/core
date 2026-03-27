<script lang="ts">
	import Logo from './logo.svelte';
	import { Theme } from './theme.svelte';

	const theme = Theme.get();
	const isDark = $derived(theme.colorScheme === 'dark');

	const navLinks = [
		{ label: 'Docs', href: '/docs' },
		{ label: 'Components', href: '/docs/components' },
		{ label: 'Quick Start', href: '/docs/quick-start' }
	];
</script>

<header class="bg-background/80 border-border sticky top-0 z-5 border-b backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6 lg:px-8">

		<!-- Logo / Brand -->
		<a href="/" class="flex shrink-0 items-center gap-2">
			<Logo class="h-7 w-7" />
			<span class="text-base font-bold tracking-tight">Svelte Atoms</span>
		</a>

		<!-- Nav -->
		<nav class="hidden items-center gap-1 sm:flex">
			{#each navLinks as link, i (i)}
				<a
					href={link.href}
					class="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Right side -->
		<div class="ml-auto flex items-center gap-2">
			<!-- GitHub -->
			<a
				href="https://github.com/svelte-atoms/core"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
				aria-label="GitHub"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
					<path d="M9 18c-4.51 2-5-2-7-2"/>
				</svg>
			</a>

			<!-- Dark mode toggle -->
			<button
				onclick={() => theme.toggle()}
				class="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
				aria-label="Toggle dark mode"
			>
				{#if isDark}
					<!-- Sun -->
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="4"/>
						<path d="M12 2v2M12 20v2m-8-8H2m20 0h-2m-2.05-5.95-1.41 1.41M6.46 17.54l-1.41 1.41M17.54 17.54l1.41 1.41M7.87 6.46 6.46 4.93"/>
					</svg>
				{:else}
					<!-- Moon -->
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
					</svg>
				{/if}
			</button>
		</div>

	</div>
</header>
