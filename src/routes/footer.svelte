<script lang="ts">
	import Logo from './logo.svelte';

	const footerLinks = {
		'Getting Started': [
			{ label: 'Quick Start', href: '/docs/quick-start' },
			{ label: 'Installation', href: '/docs/setup' },
			{ label: 'Overview', href: '/docs/overview' }
		],
		Components: [
			{ label: 'Browse all', href: '/docs/components' },
			{ label: 'Button', href: '/docs/components/button' },
			{ label: 'Dialog', href: '/docs/components/dialog' },
			{ label: 'Select', href: '/docs/components/select' }
		],
		Architecture: [
			{ label: 'Atoms', href: '/docs/atoms' },
			{ label: 'Bond', href: '/docs/philosophy' },
			{ label: 'Preset system', href: '/docs/styling' },
			{ label: 'Accessibility', href: '/docs/accessibility' }
		]
	};

	const year = new Date().getFullYear();
</script>

<footer class="border-border border-t">
	<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

		<!-- Top row: brand + nav columns -->
		<div class="flex flex-col gap-10 lg:flex-row lg:gap-16">

			<!-- Brand column -->
			<div class="shrink-0 lg:w-56">
				<a href="/" class="mb-3 flex items-center gap-2">
					<Logo class="h-6 w-6" />
					<span class="text-base font-bold">Svelte Atoms</span>
				</a>
				<p class="text-muted-foreground mb-4 max-w-xs text-sm leading-relaxed">
					A headless, composable UI library for Svelte 5. Build your design system your way.
				</p>
				<!-- GitHub link -->
				<a
					href="https://github.com/svelte-atoms/core"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
						<path d="M9 18c-4.51 2-5-2-7-2"/>
					</svg>
					svelte-atoms/core
				</a>
			</div>

			<!-- Nav columns: 2-col on mobile/tablet, 3-col on sm+ -->
			<div class="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
				{#each Object.entries(footerLinks) as [group, links]}
					<div>
						<p class="text-foreground mb-3 text-xs font-semibold tracking-wider uppercase">{group}</p>
						<ul class="space-y-2">
							{#each links as link}
								<li>
									<a
										href={link.href}
										class="text-muted-foreground hover:text-foreground text-sm transition-colors"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

		</div>

		<!-- Divider -->
		<div class="border-border mt-10 border-t pt-6">
			<div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
				<p class="text-muted-foreground text-xs">
					© {year} Svelte Atoms. Open source under the MIT license.
				</p>
				<p class="text-muted-foreground text-xs">
					Built with Svelte 5 · Runes · TailwindCSS
				</p>
			</div>
		</div>

	</div>
</footer>
