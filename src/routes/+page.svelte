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
	import { clickoutDrawer, Drawer } from '$svelte-atoms/core/components/drawer';
	import { Sidebar } from '$svelte-atoms/core/components/sidebar';
	import Icon from '$svelte-atoms/core/components/icon/icon.svelte';
	import CloseIcon from '$svelte-atoms/core/icons/icon-close.svelte';

	let tabValue = $state('account');
	let dropdownOpen = $state(false);
	let tooltipOpen = $state(false);
	let popoverOpen = $state(false);
	let isDialogOpen = $state(false);
	let isDrawerOpen = $state(false);
	let sidebarOpen = $state(false);

	const fruits = $state(['apple', 'banana', 'cherry']);
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
		<div class="text-primary mb-6 text-sm font-semibold tracking-wider uppercase">
			Svelte 5 Ready
		</div>
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Svelte Atoms</h1>
		</div>
		<p class="text-muted-foreground max-w-3xl text-xl leading-relaxed">
			A modern, modular, and accessible UI component library built with composability at its core.
			Powered by Svelte 5 Runes and the Bond architecture.
		</p>
	</div>

	<!-- Main Grid -->
	<div class="mb-16 grid gap-6 md:grid-cols-2">
		<!-- Svelte 5 Native -->
		<div
			class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
		>
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
		</div>

		<!-- Bond Architecture -->
		<div
			class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
		>
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
		</div>

		<!-- Accessibility First -->
		<div
			class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
		>
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
		</div>

		<!-- Headless & Stylable -->
		<div
			class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
		>
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
		</div>
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
			<div
				class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
			>
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
				<div class="bg-muted mt-2 rounded p-3 font-mono text-sm">
					npm install @svelte-atoms/core
				</div>
			</div>

			<!-- Components -->
			<div
				class="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
			>
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
					class="text-foreground inline-flex items-center text-sm font-medium hover:underline"
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
			</div>
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
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Input Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Card Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Badge Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Alert Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
				<h3 class="text-lg font-semibold">Alert</h3>
				<div class="flex flex-1 items-center">
					<Alert.Root variant="primary" class="w-full">
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
					</Alert.Root>
				</div>
				<a
					href="/docs/components/alert"
					class="text-muted-foreground hover:text-foreground mt-auto text-sm hover:underline"
				>
					View docs →
				</a>
			</div>

			<!-- Tabs Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Dropdown Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
				<h3 class="text-lg font-semibold">Dropdown</h3>
				<Dropdown.Root bind:open={dropdownOpen} keys={fruits} offset={2}>
					{#snippet children({ dropdown })}
						{@const selectedItem = dropdown.state.selectedItems?.at(0)}

						<Dropdown.Trigger base={Button} class="w-full">
							{#if selectedItem}
								<div class="capitalize">{selectedItem.text}</div>
							{:else}
								<div>Select fruit</div>
							{/if}

							<Dropdown.Indicator class="ml-auto" />
						</Dropdown.Trigger>
						<Dropdown.List class="">
							{#each fruits as fruit (fruit)}
								<Dropdown.Item value={fruit} class="capitalize">{fruit}</Dropdown.Item>
							{/each}
						</Dropdown.List>
					{/snippet}
				</Dropdown.Root>
				<a
					href="/docs/components/dropdown"
					class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
				>
					View docs →
				</a>
			</div>

			<!-- Tooltip Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Popover Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Dialog Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
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
			</div>

			<!-- Drawer Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
				<h3 class="text-lg font-semibold">Drawer</h3>
				<Drawer.Root bind:open={isDrawerOpen}>
					<Drawer.Content
						class="bg-background border-border fixed top-0 left-0 h-full w-80 border-r p-6 shadow-lg"
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
								Slide-in panel for navigation or content. Ideal for sidebars, filters, or additional
								context without leaving the current page.
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
			</div>

			<!-- Sidebar Example -->
			<div class="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
				<h3 class=" text-lg font-semibold">Sidebar</h3>
				<div class="bg-muted border-border h-32 overflow-hidden rounded-md border">
					<Sidebar.Root bind:open={sidebarOpen}>
						<div class="flex h-full">
							<Sidebar.Content
								class="bg-background border-border flex min-w-fit flex-col border-r p-2"
								width="128px"
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
				<Button class="w-full" onclick={() => (sidebarOpen = !sidebarOpen)}>Toggle Sidebar</Button>
				<a
					href="/docs/components/sidebar"
					class="text-muted-foreground hover:text-foreground mt-auto block text-sm hover:underline"
				>
					View docs →
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Floating Search Bar -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 transform">
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
</div>
