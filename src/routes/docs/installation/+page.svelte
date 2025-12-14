<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';

	let packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun' = 'npm';

	const installCommands = {
		npm: 'npm install @svelte-atoms/core',
		pnpm: 'pnpm add @svelte-atoms/core',
		yarn: 'yarn add @svelte-atoms/core',
		bun: 'bun add @svelte-atoms/core'
	};
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Installation</h1>
		<p class="text-muted-foreground text-lg">
			Install Svelte Atoms in your project using your preferred package manager.
		</p>
	</div>

	<!-- Installation -->
	<section class="mb-16">
		<div class="mb-6">
			<h2 class="mb-2 text-3xl font-bold">Install Package</h2>
			<p class="text-muted-foreground">
				Choose your package manager and run the installation command:
			</p>
		</div>

		<Card.Root class="border-2">
			<Card.Body class="p-6">
				<div class="bg-muted mb-4 flex gap-2 rounded-lg p-1">
					{#each ['npm', 'pnpm', 'yarn', 'bun'] as pm}
						<button
							onclick={() => (packageManager = pm as typeof packageManager)}
							class="flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors {packageManager ===
							pm
								? 'bg-background shadow-sm'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{pm}
						</button>
					{/each}
				</div>

				<div class="bg-muted relative rounded-lg p-4">
					<code class="text-foreground font-mono text-sm">{installCommands[packageManager]}</code>
					<button
						onclick={() => navigator.clipboard.writeText(installCommands[packageManager])}
						class="text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded p-2 transition-colors"
						title="Copy to clipboard"
					>
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
						>
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
						</svg>
					</button>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- What's Included -->
	<section class="mb-16">
		<div class="mb-6">
			<h2 class="mb-2 text-3xl font-bold">What's Included</h2>
			<p class="text-muted-foreground">
				The <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-semibold"
					>@svelte-atoms/core</code
				> package includes:
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="text-primary mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Components</h3>
					<p class="text-muted-foreground text-sm">
						A complete library of accessible, composable UI components built with Svelte 5.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="text-primary mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M12 2v20M2 12h20" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Utilities</h3>
					<p class="text-muted-foreground text-sm">
						Helper functions, hooks, and utilities for common UI patterns and interactions.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="text-primary mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<circle cx="12" cy="12" r="4" />
							<line x1="21.17" x2="12" y1="8" y2="8" />
							<line x1="3.95" x2="8.54" y1="6.06" y2="14" />
							<line x1="10.88" x2="15.46" y1="21.94" y2="14" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Styling System</h3>
					<p class="text-muted-foreground text-sm">
						Pre-configured styles with support for Tailwind CSS and customizable theming.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="text-primary mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">TypeScript Support</h3>
					<p class="text-muted-foreground text-sm">
						Full TypeScript definitions for all components and utilities with type-safe APIs.
					</p>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Requirements -->
	<section class="mb-16">
		<div class="mb-6">
			<h2 class="mb-2 text-3xl font-bold">Requirements</h2>
			<p class="text-muted-foreground">Make sure your project meets the following requirements:</p>
		</div>

		<Card.Root class="border-2">
			<Card.Body class="p-6">
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
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
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="font-semibold">Svelte 5</p>
							<p class="text-muted-foreground text-sm">
								Svelte Atoms is built for Svelte 5 and uses the new Runes API.
							</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
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
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="font-semibold">Tailwind CSS (Version 4)</p>
							<p class="text-muted-foreground text-sm">
								Components are styled with Tailwind CSS utilities for easy customization.
							</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
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
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="font-semibold">Node.js 18+</p>
							<p class="text-muted-foreground text-sm">
								Modern Node.js version for build tools and development.
							</p>
						</div>
					</li>
				</ul>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Next Steps -->
	<section>
		<div class="mb-6">
			<h2 class="mb-2 text-3xl font-bold">Next Steps</h2>
			<p class="text-muted-foreground">After installation, follow these guides to get started:</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
							<path d="m13 13 6 6" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Quick Start Guide</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Learn how to configure your project and create your first component.
					</p>
					<a
						href="/docs/quick-start"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						Get started
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
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>

			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Browse Components</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Explore the full library of components with live examples and documentation.
					</p>
					<a
						href="/docs"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						View components
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
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
