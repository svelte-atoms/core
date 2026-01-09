<script lang="ts">
	import { Button } from '$svelte-atoms/core/components/button';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Badge } from '$svelte-atoms/core/components/badge';
	import { Card } from '$svelte-atoms/core/components/card';
	import { Alert } from '$svelte-atoms/core/components/alert';
	import { Tabs, Tab } from '$svelte-atoms/core/components/tabs';
	import { Dropdown } from '$svelte-atoms/core/components/dropdown';
	import { Tooltip } from '$svelte-atoms/core/components/tooltip';
	import { Popover } from '$svelte-atoms/core/components/popover';
	import { Dialog } from '$svelte-atoms/core/components/dialog';
	import {
		animateDrawerContent,
		clickoutDrawer,
		Drawer
	} from '$svelte-atoms/core/components/drawer';
	import { animateSidebarContent, Sidebar } from '$svelte-atoms/core/components/sidebar';
	import Icon from '$svelte-atoms/core/components/icon/icon.svelte';
	import CloseIcon from '$svelte-atoms/core/icons/icon-close.svelte';
	import { goto } from '$app/navigation';

	let tabValue = $state('account');
	let dropdownOpen = $state(false);
	let tooltipOpen = $state(false);
	let popoverOpen = $state(false);
	let isDialogOpen = $state(false);
	let isDrawerOpen = $state(false);
	let sidebarOpen = $state(false);

	const fruits = $state(['apple', 'banana', 'cherry']);

	let packageManager = $state<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

	const installCommands = {
		npm: 'npm install @svelte-atoms/core',
		pnpm: 'pnpm add @svelte-atoms/core',
		yarn: 'yarn add @svelte-atoms/core',
		bun: 'bun add @svelte-atoms/core'
	};

	function getAlertLayoutStyle() {
		return "grid-template-areas: 'icon title close-button' '. description description' 'content content content' 'actions actions actions'; grid-template-columns: auto 1fr auto;";
	}
</script>

<svelte:head>
	<title>Svelte Atoms — Modern Svelte 5 UI Library</title>
	<meta
		name="description"
		content="A modern, modular, and accessible Svelte 5 UI component library built with composability at its core."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-24 pb-32 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<div class="mb-32">
		<!-- Badge -->
		<div class="mb-8 flex items-center gap-3">
			<Badge variant="outline" class="border-primary/20 bg-primary/5 text-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="mr-1.5"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5z" />
					<path d="M2 17l10 5 10-5" />
					<path d="M2 12l10 5 10-5" />
				</svg>
				Built with Svelte 5
			</Badge>
		</div>

		<!-- Main Headline -->
		<div class="mb-6">
			<h1
				class="from-foreground to-foreground/60 bg-gradient-to-br bg-clip-text text-5xl leading-[1.1] font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
			>
				Build <span class="text-primary">Without</span><br />
				Compromise
			</h1>
		</div>

		<!-- Subheadline -->
		<p class="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
			A modern component library for Svelte 5. Accessible, composable, extensible, and fully
			customizable. Built with Runes and the Bond architecture.
		</p>

		<!-- CTA Buttons -->
		<div class="mb-12 flex flex-wrap items-center gap-4">
			<Button size="lg" class="gap-2 px-6" onclick={() => goto('/docs/quick-start')}>
				<Icon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</Icon>
				Get Started
			</Button>
			<Button variant="outline" size="lg" class="gap-2 px-6" onclick={() => goto('/docs')}>
				<Icon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
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
				</Icon>
				View Docs
			</Button>
			<Button
				variant="ghost"
				size="lg"
				class="gap-2 px-6"
				onclick={() => window.open('https://github.com/svelte-atoms/core', '_blank')}
			>
				<Icon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
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
				</Icon>
				GitHub
			</Button>
		</div>

		<!-- Feature Pills -->
		<div class="flex flex-wrap items-center gap-6 text-sm">
			<div class="flex items-center gap-0">
				<div class="rounded-full p-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
					</svg>
				</div>
				<span class="text-muted-foreground font-medium">Fully Typed</span>
			</div>
			<div class="flex items-center gap-0">
				<div class="rounded-full p-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<circle cx="12" cy="8" r="5" />
						<path d="M3 21v-7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7" />
					</svg>
				</div>
				<span class="text-muted-foreground font-medium">Accessible</span>
			</div>
			<div class="flex items-center gap-0">
				<div class="rounded-full p-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
					</svg>
				</div>
				<span class="text-muted-foreground font-medium">Headless</span>
			</div>
			<div class="flex items-center gap-0">
				<div class="rounded-full p-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<polyline points="16 18 22 12 16 6" />
						<polyline points="8 6 2 12 8 18" />
					</svg>
				</div>
				<span class="text-muted-foreground font-medium">Composable</span>
			</div>
		</div>
	</div>

	<!-- Main Grid -->
	<div class="mb-16 grid gap-6 md:grid-cols-2">
		<!-- Svelte 5 Native -->
		<Card.Root class="">
			<Card.Body class="p-6">
				<div class="text-primary mb-4">
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
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
						<polyline points="14 2 14 8 20 8" />
						<path d="M12 18v-6" />
						<path d="m9 15 3 3 3-3" />
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-bold">Svelte 5 Native</h3>
				<p class="text-muted-foreground mb-6">
					Built from the ground up using Runes for fine-grained reactivity and optimal performance.
				</p>
				<a
					href="/docs/overview"
					class="text-foreground inline-flex items-center text-sm font-medium hover:underline"
				>
					Learn about Runes
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
						class="ml-1"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</Card.Body>
		</Card.Root>

		<!-- Bond Architecture -->
		<Card.Root class="">
			<Card.Body class="p-6">
				<div class="text-primary mb-4">
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
						<path d="M12 2a7 7 0 1 0 10 10" />
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-bold">Bond Architecture</h3>
				<p class="text-muted-foreground mb-6">
					Self-contained state management that enables seamless parent-child communication without
					prop drilling.
				</p>
				<a
					href="/docs/philosophy"
					class="text-foreground inline-flex items-center text-sm font-medium hover:underline"
				>
					Explore Bonds
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
						class="ml-1"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</Card.Body>
		</Card.Root>

		<!-- Accessibility First -->
		<Card.Root class="">
			<Card.Body class="p-6">
				<div class="text-primary mb-4">
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
				<h3 class="mb-2 text-lg font-bold">Accessibility First</h3>
				<p class="text-muted-foreground mb-6">
					WAI-ARIA compliant with built-in keyboard navigation and focus management out of the box.
				</p>
				<a
					href="/docs/accessibility"
					class="text-foreground inline-flex items-center text-sm font-medium hover:underline"
				>
					Accessibility Guide
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
						class="ml-1"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</Card.Body>
		</Card.Root>

		<!-- Headless & Stylable -->
		<Card.Root class="">
			<Card.Body class="p-6">
				<div class="text-primary mb-4">
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
				<h3 class="mb-2 text-lg font-bold">Headless & Stylable</h3>
				<p class="text-muted-foreground mb-6">
					Unstyled by default. Full control over the look and feel using Tailwind CSS or your
					preferred styling solution.
				</p>
				<a
					href="/docs/styling"
					class="text-foreground inline-flex items-center text-sm font-medium hover:underline"
				>
					Styling Guide
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
						class="ml-1"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</Card.Body>
		</Card.Root>
	</div>

	<!-- Get Started Section -->
	<div class="mb-8">
		<h2 class="mb-6 text-2xl font-bold">Get Started</h2>
		<p class="text-muted-foreground mb-8 max-w-3xl">
			Start building your design system today. Install the core package and start composing your
			atoms.
		</p>

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Install -->
			<Card.Root class="">
				<Card.Body class="p-6">
					<div class="text-primary mb-4">
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
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" x2="12" y1="15" y2="3" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-bold">Install Package</h3>

					<!-- Package Manager Selector -->
					<div class="bg-muted mb-3 flex gap-1 rounded-lg p-1">
						{#each ['npm', 'pnpm', 'yarn', 'bun'] as pm}
							<button
								onclick={() => (packageManager = pm as typeof packageManager)}
								class="flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors {packageManager ===
								pm
									? 'bg-background shadow-sm'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								{pm}
							</button>
						{/each}
					</div>

					<div class="bg-muted relative mt-2 rounded p-3 font-mono text-sm">
						{installCommands[packageManager]}
						<button
							onclick={() => navigator.clipboard.writeText(installCommands[packageManager])}
							class="text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded p-1 transition-colors"
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

			<!-- Components -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col p-6">
					<div class="text-primary mb-4">
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
					<h3 class="mb-2 text-lg font-bold">Browse Components</h3>
					<p class="text-muted-foreground mb-4">Explore our collection of accessible components.</p>
					<a
						href="/docs"
						class="text-foreground mt-auto inline-flex items-center text-sm font-medium hover:underline"
					>
						View Component Library
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
							class="ml-1"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Configuration -->
			<Card.Root class="md:col-span-2">
				<Card.Body class="flex flex-col p-6">
					<div class="text-primary mb-4">
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
							<path
								d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
							/>
							<circle cx="12" cy="12" r="3" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-bold">Configure Setup</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Follow these steps to configure your project:
					</p>
					<ol class="text-muted-foreground mb-4 space-y-2 text-sm">
						<li class="flex gap-2">
							<span class="text-primary font-semibold">1.</span>
							<span>Import internal style file in your app</span>
						</li>
						<li class="flex gap-2">
							<span class="text-primary font-semibold">2.</span>
							<span>Setup app.css for Tailwind overrides</span>
						</li>
						<li class="flex gap-2">
							<span class="text-primary font-semibold">3.</span>
							<span>Configure the preset of your application the a global +layout.svelte</span>
						</li>
					</ol>
					<a
						href="/docs/setup"
						class="text-foreground mt-auto inline-flex items-center text-sm font-medium hover:underline"
					>
						Setup Guide
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
							class="ml-1"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>
		</div>
	</div>

	<!-- Examples Section -->
	<div class="mb-16">
		<h2 class="mb-6 text-2xl font-bold">Popular Components</h2>
		<p class="text-muted-foreground mb-8 max-w-3xl">
			Explore our most used components. Each one is fully customizable and accessible.
		</p>

		<div class="grid gap-6 md:grid-cols-3">
			<!-- Button Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Button</h3>
					<div class="flex flex-wrap gap-2">
						<Button class="" variant="primary">Primary</Button>
						<Button class="" variant="secondary">Secondary</Button>
						<Button class="" variant="destructive">Destructive</Button>
					</div>
					<a
						href="/docs/components/button"
						class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Input Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Input</h3>
					<div class="space-y-3">
						<Input.Root class="rounded-md">
							<Input.Control placeholder="Enter your name..." class="px-3 py-2" />
						</Input.Root>
						<Input.Root class="rounded-md">
							<Input.Control type="email" placeholder="email@example.com" class="px-3 py-2" />
						</Input.Root>
					</div>
					<a
						href="/docs/components/input"
						class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Card Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Card</h3>
					<Card.Root class="border-border border">
						<Card.Header>
							<Card.Title class="text-base">Card Title</Card.Title>
						</Card.Header>
						<Card.Body class="pb-2">
							<p class="text-muted-foreground text-sm">A container for grouping related content.</p>
						</Card.Body>
					</Card.Root>
					<a
						href="/docs/components/card"
						class="text-muted-foreground hover:text-foreground text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Badge Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Badge</h3>
					<div class="flex flex-1 items-center">
						<div class="flex flex-wrap gap-2">
							<Badge class="" variant="primary">Primary</Badge>
							<Badge class="" variant="secondary">Secondary</Badge>
							<Badge class="" variant="outline">Outline</Badge>
						</div>
					</div>
					<a
						href="/docs/components/badge"
						class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Alert Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Alert</h3>
					<div class="flex flex-1 items-center">
						<Alert.Root
							variant="primary"
							class="grid w-full items-center"
							style={getAlertLayoutStyle()}
						>
							<Alert.Icon>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-4 w-4"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M12 16v-4M12 8h.01"></path>
								</svg>
							</Alert.Icon>
							<Alert.Title class="text-sm font-medium">Session Expiring</Alert.Title>
							<Alert.Content class="text-foreground text-sm">
								Your session is about to expire. Please save your work.
							</Alert.Content>
							<Alert.Actions>
								<button class="text-sm font-medium underline"> Extend Session </button>
							</Alert.Actions>
						</Alert.Root>
					</div>
					<a
						href="/docs/components/alert"
						class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Tabs Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Tabs</h3>
					<Tabs.Root bind:value={tabValue} onchange={() => {}} class="mb-4">
						<Tabs.Header class="border-border border-b text-sm font-medium" />
						<Tabs.Body>
							<Tab.Root value="account">
								<Tab.Header class="">Account</Tab.Header>
								<Tab.Body class="mt-4">
									<p class="text-muted-foreground text-sm">Manage your account settings</p>
								</Tab.Body>
							</Tab.Root>
							<Tab.Root value="settings">
								<Tab.Header class="">Settings</Tab.Header>
								<Tab.Body class="mt-4">
									<p class="text-muted-foreground text-sm">Configure your preferences</p>
								</Tab.Body>
							</Tab.Root>
						</Tabs.Body>
					</Tabs.Root>
					<a
						href="/docs/components/tabs"
						class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Dropdown Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Dropdown</h3>
					<Dropdown.Root bind:open={dropdownOpen} keys={fruits} offset={2}>
						{#snippet children({ dropdown })}
							{@const selectedItem = dropdown.state.selections?.at(0)}

							<Dropdown.Trigger base={Button} class="w-full">
								{#if selectedItem}
									<div class="capitalize">{selectedItem.label}</div>
								{:else}
									<div>Select fruit</div>
								{/if}

								<Dropdown.Indicator class="ml-auto" />
							</Dropdown.Trigger>
							<Dropdown.Content class="">
								{#each fruits as fruit (fruit)}
									<Dropdown.Item value={fruit} class="capitalize">{fruit}</Dropdown.Item>
								{/each}
							</Dropdown.Content>
						{/snippet}
					</Dropdown.Root>
					<a
						href="/docs/components/dropdown"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Tooltip Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Tooltip</h3>
					<Tooltip.Root bind:open={tooltipOpen} offset={1}>
						<Tooltip.Trigger onmount={() => {}} base={Button} variant="outline" class="w-full">
							Hover me
						</Tooltip.Trigger>
						<Tooltip.Content class="">
							This is a helpful tooltip!
							<Tooltip.Arrow />
						</Tooltip.Content>
					</Tooltip.Root>
					<a
						href="/docs/components/tooltip"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Popover Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Popover</h3>
					<Popover.Root bind:open={popoverOpen} offset={0}>
						{#snippet children()}
							<Popover.Trigger base={Button} class="w-full">
								<div>Open popover</div>

								<Popover.Indicator class="ml-auto" />
							</Popover.Trigger>
							<Popover.Content class="">
								<div class="space-y-2">
									<h4 class="font-semibold">Popover Content</h4>
									<p class="text-muted-foreground text-sm">You can put any content here.</p>
								</div>
								<Popover.Arrow />
							</Popover.Content>
						{/snippet}
					</Popover.Root>
					<a
						href="/docs/components/popover"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Dialog Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Dialog</h3>
					<Dialog.Root bind:open={isDialogOpen}>
						<Dialog.Content class="">
							<Dialog.Header class="mb-4">
								<h4 class="text-lg font-semibold">Dialog Title</h4>
								<Dialog.CloseButton class="ml-auto" />
							</Dialog.Header>
							<Dialog.Body class="">
								<p class="text-muted-foreground mb-4 text-sm">
									A modal dialog for important interactions. Perfect for confirmations, forms, or
									displaying critical information that requires user attention.
								</p>
								<div class="bg-muted rounded-md p-3">
									<p class="text-muted-foreground text-xs">
										Supports keyboard navigation with Escape to close.
									</p>
								</div>
							</Dialog.Body>
							<Dialog.Footer class="">
								<Button variant="outline" onclick={() => (isDialogOpen = false)}>Cancel</Button>
								<Button onclick={() => (isDialogOpen = false)}>Confirm</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>

					<div class="flex flex-1 items-center">
						<Button class="w-full" onclick={() => (isDialogOpen = true)}>Open Dialog</Button>
					</div>

					<a
						href="/docs/components/dialog"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Drawer Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-1 flex-col gap-4 p-6">
					<h3 class="text-lg font-semibold">Drawer</h3>
					<Drawer.Root bind:open={isDrawerOpen}>
						<Drawer.Content
							class="bg-background border-border fixed top-0 left-0 h-full w-80 border-r p-6 shadow-lg"
							animate={animateDrawerContent({ ease: 'easeOut', side: 'left' })}
							{@attach clickoutDrawer()}
						>
							<Drawer.Header class="mb-4">
								<Drawer.Title class="flex items-center text-lg font-semibold">
									<div>Drawer Title</div>
									<button onclick={() => (isDrawerOpen = false)} class="ml-auto h-4 cursor-pointer">
										<Icon class="h-full">
											<CloseIcon />
										</Icon>
									</button>
								</Drawer.Title>
								<Drawer.Description class="text-muted-foreground text-xs">
									Slide-in panel for navigation or content.
								</Drawer.Description>
							</Drawer.Header>
							<Drawer.Body>
								<p class="text-muted-foreground mb-4 text-sm">
									Slide-in panel for navigation or content. Ideal for sidebars, filters, or
									additional context without leaving the current page.
								</p>

								<ul class="space-y-2 text-sm">
									<li class="flex items-center gap-2">
										<div class="bg-primary h-1.5 w-1.5 rounded-full"></div>
										Navigate menus
									</li>
									<li class="flex items-center gap-2">
										<div class="bg-primary h-1.5 w-1.5 rounded-full"></div>
										Show filters
									</li>
									<li class="flex items-center gap-2">
										<div class="bg-primary h-1.5 w-1.5 rounded-full"></div>
										Display settings
									</li>
								</ul>
							</Drawer.Body>
						</Drawer.Content>
					</Drawer.Root>

					<div class="flex flex-1 items-center">
						<Button class="w-full" onclick={() => (isDrawerOpen = true)}>Open Drawer</Button>
					</div>

					<a
						href="/docs/components/drawer"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>

			<!-- Sidebar Example -->
			<Card.Root class="">
				<Card.Body class="flex flex-col gap-4 p-6">
					<h3 class=" text-lg font-semibold">Sidebar</h3>
					<div class="bg-muted border-border h-32 overflow-hidden rounded-md border">
						<Sidebar.Root bind:open={sidebarOpen}>
							<div class="flex h-full">
								<Sidebar.Content
									class="bg-background border-border flex min-w-fit flex-col border-r p-2"
									animate={animateSidebarContent({ '0': '72px', '1': '144px' })}
								>
									<div class="text-muted-foreground text-xs">
										{sidebarOpen ? 'Expanded' : 'Collapsed'}
									</div>
								</Sidebar.Content>
								<div class="bg-muted flex-1 p-2">
									<div class="text-muted-foreground text-xs">Content</div>
								</div>
							</div>
						</Sidebar.Root>
					</div>
					<Button class="w-full" onclick={() => (sidebarOpen = !sidebarOpen)}>Toggle Sidebar</Button
					>
					<a
						href="/docs/components/sidebar"
						class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
					>
						View docs →
					</a>
				</Card.Body>
			</Card.Root>
		</div>
	</div>
</div>

<!-- Floating Search Bar -->
<!-- <div class="fixed bottom-6 left-1/2 -translate-x-1/2 transform">
	<button
		class="bg-background border-border flex items-center gap-3 rounded-full border px-6 py-3 shadow-lg transition-transform hover:scale-105"
	>
		<span class="text-muted-foreground text-sm">Ask a question...</span>
		<div class="text-muted-foreground flex items-center gap-1 text-xs">
			<span>Ctrl+I</span>
			<div class="bg-primary/20 flex h-5 w-5 items-center justify-center rounded-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-primary"
				>
					<path d="M12 19V5" />
					<path d="m5 12 7-7 7 7" />
				</svg>
			</div>
		</div>
	</button>
</div> -->
