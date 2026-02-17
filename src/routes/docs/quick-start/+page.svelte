<script lang="ts">
	import DocCodeBlock from '$docs/components/doc-code-block.svelte';
	import { Alert, Button, Icon } from '$svelte-atoms/core';
	import { layoutCode, appCssCode, presetCode, firstComponentCode } from './codes';
	import { Section } from '$docs/components';

	let packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun' = 'npm';

	const installCommands = {
		npm: 'install @svelte-atoms/core',
		pnpm: 'add @svelte-atoms/core',
		yarn: 'add @svelte-atoms/core',
		bun: 'add @svelte-atoms/core'
	};
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Quick Start</h1>
		<p class="text-muted-foreground text-lg">
			Get up and running with Svelte Atoms in minutes. This guide will walk you through
			installation, configuration, and your first component.
		</p>
	</div>

	<!-- Requirements Section -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Requirements</Section.Title>
			<Section.Subtitle>Make sure your project meets the following requirements:</Section.Subtitle>
		</Section.Header>

		<div class="border-border/50 rounded-lg border p-6">
			<ul class="space-y-3">
				<li class="flex items-start gap-3">
					<Icon class="text-primary mt-1 size-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
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
					</Icon>
					<div>
						<p class="font-semibold">Svelte 5</p>
						<p class="text-muted-foreground text-sm">
							Svelte Atoms is built for Svelte 5 and uses the new Runes API.
						</p>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<Icon class="text-primary mt-1 size-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
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
					</Icon>
					<div>
						<p class="font-semibold">Tailwind CSS (Version 4)</p>
						<p class="text-muted-foreground text-sm">
							Components are styled with Tailwind CSS utilities for easy customization.
						</p>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<Icon class="text-primary mt-1 size-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
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
					</Icon>
					<div>
						<p class="font-semibold">Node.js 18+</p>
						<p class="text-muted-foreground text-sm">
							Modern Node.js version for build tools and development.
						</p>
					</div>
				</li>
			</ul>
		</div>
	</Section.Root>

	<!-- Installation Section -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
			<Section.Subtitle>
				Install <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-semibold"
					>@svelte-atoms/core</code
				> using your preferred package manager:
			</Section.Subtitle>
		</Section.Header>

		<div class="border-border/50 overflow-hidden rounded-lg border">
			<!-- Package Manager Tabs -->
			<div class="border-border/30 flex border-b">
				{#each ['npm', 'pnpm', 'yarn', 'bun'] as pm}
					<button
						onclick={() => (packageManager = pm as typeof packageManager)}
						class="-mb-px cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors {packageManager ===
						pm
							? 'border-primary text-foreground'
							: 'text-muted-foreground hover:text-foreground border-transparent'}"
					>
						{pm}
					</button>
				{/each}
			</div>

			<!-- Command Display -->
			<div class="bg-muted/30 flex items-center justify-between gap-4 p-6">
				<code class="text-foreground flex-1 font-mono text-sm">
					<span class="bg-foreground/5 rounded-md px-1.5 py-0.5">{packageManager}</span>
					<span>
						{installCommands[packageManager]}
					</span>
				</code>
				<Button base={Icon} variant="ghost"
					onclick={() => navigator.clipboard.writeText(installCommands[packageManager])}
					class="size-5 p-0.5 text-muted-foreground hover:text-foreground"
					title="Copy to clipboard"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
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
				</Button>
			</div>
		</div>
	</Section.Root>

	<!-- Configuration Section -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Configuration</Section.Title>
			<Section.Subtitle>
				After installing the package, you need to configure your project to use the Svelte Atoms
				components and styling system.
			</Section.Subtitle>
		</Section.Header>

		<!-- Step 1: Import Internal Styles -->
		<div class="mb-10">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
				>
					1
				</div>
				<h3 class="text-2xl font-semibold">Import Internal Styles</h3>
			</div>
			<p class="text-muted-foreground mb-4">
				Import the internal style file in your root layout file (e.g., <code
					class="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-semibold"
					>src/routes/+layout.svelte</code
				>) to load the base styles for all components:
			</p>

			<DocCodeBlock filepath="src/routes/+layout.svelte" language="Svelte" code={layoutCode} />

			<Alert.Root variant="info" class="mt-4">
				<Alert.Icon class="size-5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M12 16v-4M12 8h.01"></path>
					</svg>
				</Alert.Icon>
				<Alert.Content>
					<Alert.Title>Important</Alert.Title>
					<Alert.Description>
						Make sure to import the internal styles before your app.css to ensure proper style
						precedence.
					</Alert.Description>
				</Alert.Content>
			</Alert.Root>
		</div>

		<!-- Step 2: Setup App CSS -->
		<div class="mb-10">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
				>
					2
				</div>
				<h3 class="text-2xl font-semibold">Setup App CSS for Tailwind</h3>
			</div>
			<p class="text-muted-foreground mb-4">
				Create or update your <code
					class="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-semibold">app.css</code
				> file to include Tailwind directives and CSS variables that Svelte Atoms uses:
			</p>

			<DocCodeBlock filepath="src/app.css" language="CSS" code={appCssCode} />

			<p class="text-muted-foreground mt-4">
				These CSS variables provide a complete theming system with light and dark mode support. You
				can customize these values to match your brand colors.
			</p>

			<Alert.Root variant="warning" class="mt-4">
				<Alert.Icon class="size-5" />
				<Alert.Content>
					<Alert.Title>Note</Alert.Title>
					<Alert.Description>
						Make sure to include <code
							class="leading-0 bg-amber-500/10 text-amber-800 rounded px-1 py-0.5 text-xs font-semibold"
							>node_modules/@svelte-atoms/core/**/*</code
						>
						in your content array so Tailwind can detect classes used in the library components.
					</Alert.Description>
				</Alert.Content>
			</Alert.Root>
		</div>

		<!-- Step 3: Configure Component Preset -->
		<div class="mb-10">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
				>
					3
				</div>
				<h3 class="text-2xl font-semibold">Configure Component Preset</h3>
			</div>
			<p class="text-muted-foreground mb-4">
				Create a preset file to customize the default styles for Svelte Atoms components. This
				allows you to define your own variants and default classes:
			</p>

			<DocCodeBlock filepath="src/preset.ts" language="TypeScript" code={presetCode} />
		</div>
	</Section.Root>

	<!-- First Component Section -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Your First Component</Section.Title>
			<Section.Subtitle>
				Now that everything is configured, let's create a simple example using a Button component:
			</Section.Subtitle>
		</Section.Header>

		<DocCodeBlock filepath="src/routes/+page.svelte" language="Svelte" code={firstComponentCode} />

		<Alert.Root variant="success" class="mt-4">
			<Alert.Icon />
			<Alert.Content>
				<Alert.Title>Success!</Alert.Title>
				<Alert.Description>
					You now have a working setup with Svelte Atoms. The components are fully styled and ready
					to use.
				</Alert.Description>
			</Alert.Content>
		</Alert.Root>
	</Section.Root>

	<!-- Next Steps Section -->
	<Section.Root class="mb-0">
		<Section.Header>
			<Section.Title>Next Steps</Section.Title>
			<Section.Subtitle>
				Now that you have Svelte Atoms set up, here are some recommended next steps:
			</Section.Subtitle>
		</Section.Header>

		<div class="grid gap-5 sm:grid-cols-2">
			<div
				class="group border-border/50 hover:border-border/60 rounded-lg border p-6 transition-all duration-300"
			>
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
					Explore the full library of accessible, composable components.
				</p>
				<a
					href="/docs"
					class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
				>
					View all components
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
			</div>

			<div
				class="group border-border/50 hover:border-border/60 rounded-lg border p-6 transition-all duration-300"
			>
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
						<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
						<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Learn the Philosophy</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Understand the Bond architecture and design principles behind Svelte Atoms.
				</p>
				<a
					href="/docs/philosophy"
					class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
				>
					Read the philosophy
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
			</div>

			<div
				class="group border-border/50 hover:border-border/60 rounded-lg border p-6 transition-all duration-300"
			>
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
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
						<path d="m9 12 2 2 4-4" />
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Styling Guide</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Learn how to customize component styles and create your own design system.
				</p>
				<a
					href="/docs/styling"
					class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
				>
					Styling guide
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
			</div>

			<div
				class="group border-border/50 hover:border-border/60 rounded-lg border p-6 transition-all duration-300"
			>
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
						<circle cx="12" cy="8" r="5" />
						<path d="M3 21v-7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7" />
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Accessibility</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Discover how Svelte Atoms ensures your applications are accessible to everyone.
				</p>
				<a
					href="/docs/accessibility"
					class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
				>
					Accessibility guide
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
			</div>
		</div>
	</Section.Root>

	<!-- Troubleshooting Section -->
	<div class="border-border/50 bg-muted/30 mt-8 rounded-lg border p-6">
		<div class="flex items-start gap-4">
			<div class="text-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="28"
					height="28"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
					<path d="M12 17h.01"></path>
				</svg>
			</div>
			<div>
				<h3 class="mb-2 text-xl font-semibold">Need Help?</h3>
				<p class="text-muted-foreground mb-4">
					If you're still having issues, check out our GitHub repository for more examples and to
					report bugs.
				</p>
				<a
					href="https://github.com/svelte-atoms/core"
					class="text-primary inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
				>
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
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/>
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
					View on GitHub
				</a>
			</div>
		</div>
	</div>
</div>
