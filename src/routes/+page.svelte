<script lang="ts">
	import { Button } from '$svelte-atoms/core/components/button';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Badge } from '$svelte-atoms/core/components/badge';
	import { Card } from '$svelte-atoms/core/components/card';
	import { Alert } from '$svelte-atoms/core/components/alert';
	import { Tabs, Tab } from '$svelte-atoms/core/components/tabs';
	import { Select } from '$svelte-atoms/core/components/select';
	import { DropdownMenu } from '$svelte-atoms/core/components/dropdown-menu';
	import { Tooltip } from '$svelte-atoms/core/components/tooltip';
	import { Popover } from '$svelte-atoms/core/components/popover';
	import { Dialog } from '$svelte-atoms/core/components/dialog';
	import { animateDrawerContent, clickoutDrawer, Drawer } from '$svelte-atoms/core/components/drawer';
	import { animateSidebarContent, Sidebar } from '$svelte-atoms/core/components/sidebar';
	import Icon from '$svelte-atoms/core/components/icon/icon.svelte';
	import CloseIcon from '$svelte-atoms/core/icons/icon-close.svelte';
	import { goto } from '$app/navigation';

	let tabValue = $state('account');
	let selectOpen = $state(false);
	let dropdownMenuOpen = $state(false);
	let tooltipOpen = $state(false);
	let popoverOpen = $state(false);
	let isDialogOpen = $state(false);
	let isDrawerOpen = $state(false);
	let sidebarOpen = $state(false);
	let copied = $state(false);

	const fruits = $state(['apple', 'banana', 'cherry']);
	let packageManager = $state<'npm' | 'pnpm' | 'yarn' | 'bun'>('bun');

	const installCommands = {
		npm: 'npm install @svelte-atoms/core',
		pnpm: 'pnpm add @svelte-atoms/core',
		yarn: 'yarn add @svelte-atoms/core',
		bun: 'bun add @svelte-atoms/core'
	};

	function copyInstall() {
		navigator.clipboard.writeText(installCommands[packageManager]);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function getAlertLayoutStyle() {
		return "grid-template-areas: 'icon title close-button' '. description description' 'content content content' 'actions actions actions'; grid-template-columns: auto 1fr auto;";
	}
</script>

<svelte:head>
	<title>Svelte Atoms — Headless UI for Svelte 5</title>
	<meta
		name="description"
		content="A modern, headless, fully composable Svelte 5 UI component library. Build your design system with the Bond architecture and Preset system."
	/>
</svelte:head>

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="border-border/50 border-b">
	<div class="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
		<!-- Label -->
		<div class="mb-6 flex items-center gap-2">
			<Badge class="border-primary/20 bg-primary/5 text-primary gap-1.5 text-xs font-medium">
				<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
				</svg>
				Svelte 5 · Runes · TypeScript
			</Badge>
		</div>

		<!-- Headline -->
		<h1 class="from-foreground to-foreground/50 mb-6 bg-gradient-to-br bg-clip-text text-5xl leading-[1.1] font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
			Your design system,<br />
			<span class="text-primary">your rules.</span>
		</h1>

		<!-- Sub -->
		<p class="text-muted-foreground mb-10 max-w-xl text-lg leading-relaxed">
			A headless Svelte 5 component library. No hardcoded styles. You own every pixel via the
			<strong class="text-foreground font-medium">Preset system</strong> — globally configurable,
			locally overridable.
		</p>

		<!-- CTAs -->
		<div class="flex flex-wrap gap-3">
			<Button variant="primary" class="gap-2 px-5" onclick={() => goto('/docs/quick-start')}>
				Get started
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
				</svg>
			</Button>
			<Button variant="outline" class="gap-2 px-5" onclick={() => goto('/docs')}>
				Browse components
			</Button>
			<Button variant="ghost" class="gap-2 px-5" onclick={() => window.open('https://github.com/svelte-atoms/core', '_blank')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
					<path d="M9 18c-4.51 2-5-2-7-2"/>
				</svg>
				GitHub
			</Button>
		</div>

		<!-- Traits -->
		<div class="text-muted-foreground mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm">
			{#each ['Headless by default', 'Fully typed', 'WAI-ARIA compliant', 'Svelte 5 Runes', 'TailwindCSS ready'] as trait}
				<span class="flex items-center gap-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
						<path d="M20 6 9 17l-5-5"/>
					</svg>
					{trait}
				</span>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================
     HOW IT WORKS — Architecture
     ============================================================ -->
<section class="border-border/50 border-b">
	<div class="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="mb-12">
			<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Architecture</p>
			<h2 class="mb-3 text-3xl font-bold">Three layers. Total control.</h2>
			<p class="text-muted-foreground max-w-2xl">
				Svelte Atoms is built around three composable primitives that work together to give you
				complete control over behaviour, state, and style — without coupling them together.
			</p>
		</div>

		<div class="grid gap-px border md:grid-cols-3" style="border-color: var(--color-border);">
			<!-- Atoms -->
			<div class="bg-card p-8">
				<div class="bg-primary/10 text-primary mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/>
					</svg>
				</div>
				<h3 class="mb-2 text-base font-semibold">Atoms</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					The lowest-level building block. <code class="bg-muted rounded px-1 text-xs">HtmlAtom</code>
					wraps any HTML element and injects preset classes, variants, and bond state — with zero
					hardcoded styles.
				</p>
				<a href="/docs/atoms" class="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
					Learn more <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				</a>
			</div>

			<!-- Bond -->
			<div class="bg-card p-8">
				<div class="bg-primary/10 text-primary mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
					</svg>
				</div>
				<h3 class="mb-2 text-base font-semibold">Bond</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Shared reactive state between a component's parts. No prop drilling — child components
					read their parent's bond from Svelte context. State flows down automatically.
				</p>
				<a href="/docs/philosophy" class="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
					Learn more <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				</a>
			</div>

			<!-- Preset -->
			<div class="bg-card p-8">
				<div class="bg-primary/10 text-primary mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
				</div>
				<h3 class="mb-2 text-base font-semibold">Preset</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					A global style configuration for your entire app. Define variants, defaults, and classes
					per component slot once — override locally per instance. Your design system lives here.
				</p>
				<a href="/docs/styling" class="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
					Learn more <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ============================================================
     COMPONENT SHOWCASE
     ============================================================ -->
<section class="border-border/50 border-b">
	<div class="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="mb-12">
			<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Components</p>
			<h2 class="mb-3 text-3xl font-bold">Everything you need.</h2>
			<p class="text-muted-foreground max-w-2xl">
				30+ accessible components. Each one is headless — style it once in your preset, use it
				everywhere.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-3 bg-border" style="border-color: var(--color-border);">

			<!-- Button -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Button</h3>
					<a href="/docs/components/button" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<div class="flex flex-wrap gap-2">
					<Button variant="primary" class="text-sm">Primary</Button>
					<Button variant="secondary" class="text-sm">Secondary</Button>
					<Button variant="outline" class="text-sm">Outline</Button>
					<Button variant="ghost" class="text-sm">Ghost</Button>
					<Button variant="destructive" class="text-sm">Danger</Button>
				</div>
			</div>

			<!-- Badge -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Badge</h3>
					<a href="/docs/components/badge" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<Badge variant="primary">Primary</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="destructive">Error</Badge>
				</div>
			</div>

			<!-- Input -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Input</h3>
					<a href="/docs/components/input" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<div class="space-y-2">
					<Input.Root class="rounded-md">
						<Input.Control placeholder="Full name" class="px-3 py-2 text-sm" />
					</Input.Root>
					<Input.Root class="rounded-md">
						<Input.Control type="email" placeholder="email@example.com" class="px-3 py-2 text-sm" />
					</Input.Root>
				</div>
			</div>

			<!-- Alert -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Alert</h3>
					<a href="/docs/components/alert" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Alert.Root variant="info" class="grid items-center" style={getAlertLayoutStyle()}>
					<Alert.Icon>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
							<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
						</svg>
					</Alert.Icon>
					<Alert.Title class="text-sm font-medium">Heads up</Alert.Title>
					<Alert.Description class="text-xs">Your session expires in 10 minutes.</Alert.Description>
				</Alert.Root>
				<Alert.Root variant="success" class="grid items-center" style={getAlertLayoutStyle()}>
					<Alert.Icon>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
						</svg>
					</Alert.Icon>
					<Alert.Title class="text-sm font-medium">Saved</Alert.Title>
					<Alert.Description class="text-xs">Your changes have been saved.</Alert.Description>
				</Alert.Root>
			</div>

			<!-- Tabs -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Tabs</h3>
					<a href="/docs/components/tabs" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Tabs.Root bind:value={tabValue} onchange={() => {}} class="">
					<Tabs.Header class="border-border border-b text-sm">
						<Tab.Root value="account">
							<Tab.Header>Account</Tab.Header>
							<Tab.Body class="mt-3">
								<p class="text-muted-foreground text-sm">Manage your account settings.</p>
							</Tab.Body>
						</Tab.Root>
						<Tab.Root value="settings">
							<Tab.Header>Settings</Tab.Header>
							<Tab.Body class="mt-3">
								<p class="text-muted-foreground text-sm">Configure your preferences.</p>
							</Tab.Body>
						</Tab.Root>
					</Tabs.Header>
					<Tabs.Body><Tabs.Content /></Tabs.Body>
				</Tabs.Root>
			</div>

			<!-- Select -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Select</h3>
					<a href="/docs/components/select" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Select.Root bind:open={selectOpen} keys={fruits} offset={2}>
					<Select.Trigger base={Input.Root} class="w-full">
						<Select.Placeholder>Pick a fruit</Select.Placeholder>
						<Select.Selections />
						<Select.Indicator class="ml-auto" />
					</Select.Trigger>
					<Select.Content>
						{#each fruits as fruit (fruit)}
							<Select.Item value={fruit} class="capitalize">{fruit}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Dropdown Menu -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Dropdown Menu</h3>
					<a href="/docs/components/dropdown-menu" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<DropdownMenu.Root bind:open={dropdownMenuOpen}>
					<DropdownMenu.Trigger base={Button} variant="outline" class="w-full justify-between">
						Actions
						<DropdownMenu.Indicator class="ml-auto" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Item>Archive</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<!-- Tooltip -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Tooltip</h3>
					<a href="/docs/components/tooltip" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Tooltip.Root bind:open={tooltipOpen} offset={6}>
					<Tooltip.Trigger base={Button} variant="outline" class="w-full">
						Hover me
					</Tooltip.Trigger>
					<Tooltip.Content class="bg-popover border-border rounded-md border px-3 py-1.5 text-xs shadow-md">
						This is a helpful tooltip
						<Tooltip.Arrow />
					</Tooltip.Content>
				</Tooltip.Root>
			</div>

			<!-- Popover -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Popover</h3>
					<a href="/docs/components/popover" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Popover.Root bind:open={popoverOpen} offset={6}>
					<Popover.Trigger base={Button} variant="outline" class="w-full justify-between">
						Open popover
						<Popover.Indicator class="ml-auto" />
					</Popover.Trigger>
					<Popover.Content class="bg-popover border-border w-56 rounded-md border p-4 shadow-md">
						<h4 class="mb-1 text-sm font-semibold">Settings</h4>
						<p class="text-muted-foreground text-xs">Contextual panels with any content.</p>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Root>
			</div>

			<!-- Dialog -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Dialog</h3>
					<a href="/docs/components/dialog" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Dialog.Root bind:open={isDialogOpen}>
					{#snippet trigger({dialog})}
						<Button variant="outline" class="w-full" {...dialog.trigger()}>
							Open Dialog
						</Button>
					{/snippet}
					
					<Dialog.Content>
						<Dialog.Header>
							<h4 class="text-base font-semibold">Confirm action</h4>
							<Dialog.CloseButton class="ml-auto" />
						</Dialog.Header>
						<Dialog.Body>
							<p class="text-muted-foreground text-sm">
								Are you sure? This action cannot be undone.
							</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Button variant="outline" onclick={() => (isDialogOpen = false)}>Cancel</Button>
							<Button variant="destructive" onclick={() => (isDialogOpen = false)}>Delete</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>

			<!-- Drawer -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Drawer</h3>
					<a href="/docs/components/drawer" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<Drawer.Root bind:open={isDrawerOpen}>
					<Drawer.Content
						class="bg-background border-border fixed top-0 left-0 h-full w-72 border-r p-6 shadow-xl"
						animate={animateDrawerContent({ ease: 'easeOut', side: 'left' })}
						{@attach clickoutDrawer()}
					>
						<Drawer.Header class="mb-6">
							<Drawer.Title class="flex items-center justify-between text-base font-semibold">
								Navigation
								<button onclick={() => (isDrawerOpen = false)} class="cursor-pointer">
									<Icon class="h-4 w-4"><CloseIcon /></Icon>
								</button>
							</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body class="space-y-1 text-sm">
							{#each ['Dashboard', 'Components', 'Docs', 'Examples', 'Settings'] as item}
								<div class="hover:bg-muted rounded-md px-3 py-2 transition-colors">{item}</div>
							{/each}
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Root>
				<Button variant="outline" class="w-full" onclick={() => (isDrawerOpen = true)}>
					Open Drawer
				</Button>
			</div>

			<!-- Sidebar -->
			<div class="bg-card flex flex-col gap-4 p-6">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-semibold">Sidebar</h3>
					<a href="/docs/components/sidebar" class="text-muted-foreground hover:text-primary text-xs">docs →</a>
				</div>
				<div class="bg-muted border-border h-24 overflow-hidden rounded-md border">
					<Sidebar.Root bind:open={sidebarOpen}>
						<div class="flex h-full">
							<Sidebar.Content
								class="bg-card border-border flex min-w-fit flex-col items-center border-r px-2 py-3 text-xs"
								animate={animateSidebarContent({ '0': '48px', '1': '120px' })}
							>
								<span class="text-muted-foreground">{sidebarOpen ? 'Expanded' : 'Nav'}</span>
							</Sidebar.Content>
							<div class="text-muted-foreground flex flex-1 items-center justify-center text-xs">
								Main content
							</div>
						</div>
					</Sidebar.Root>
				</div>
				<Button variant="outline" class="w-full" onclick={() => (sidebarOpen = !sidebarOpen)}>
					Toggle Sidebar
				</Button>
			</div>

		</div>

		<div class="mt-6 text-center">
			<a href="/docs" class="text-primary text-sm font-medium hover:underline">
				View all 30+ components →
			</a>
		</div>
	</div>
</section>

<!-- ============================================================
     INSTALL
     ============================================================ -->
<section class="border-border/50 border-b">
	<div class="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="grid gap-12 md:grid-cols-2 md:items-start">

			<!-- Left: steps -->
			<div>
				<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Quick start</p>
				<h2 class="mb-3 text-3xl font-bold">Up in minutes.</h2>
				<p class="text-muted-foreground mb-8">
					Install the package, configure your preset in <code class="bg-muted rounded px-1 text-xs">+layout.svelte</code>,
					and start composing.
				</p>

				<ol class="space-y-5">
					{#each [
						{ n: '1', title: 'Install', body: 'Add the package to your SvelteKit project.' },
						{ n: '2', title: 'Import styles', body: 'Import root.css in your layout for base resets.' },
						{ n: '3', title: 'Configure preset', body: 'Call setPreset() once in +layout.svelte to define your design tokens and component styles.' },
						{ n: '4', title: 'Use components', body: 'Import any component and start building. All styles come from your preset.' }
					] as step}
						<li class="flex gap-4">
							<span class="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">{step.n}</span>
							<div>
								<p class="mb-0.5 text-sm font-semibold">{step.title}</p>
								<p class="text-muted-foreground text-sm">{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>

				<div class="mt-8">
					<a href="/docs/quick-start" class="text-primary text-sm font-medium hover:underline">
						Full setup guide →
					</a>
				</div>
			</div>

			<!-- Right: install block -->
			<div class="space-y-4">
				<!-- Package manager picker -->
				<div class="bg-muted flex gap-1 rounded-lg p-1">
					{#each (['npm', 'pnpm', 'yarn', 'bun'] as const) as pm}
						<button
							onclick={() => (packageManager = pm)}
							class="flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors {packageManager === pm
								? 'bg-background text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{pm}
						</button>
					{/each}
				</div>

				<!-- Command -->
				<div class="bg-muted relative rounded-lg px-4 py-3 font-mono text-sm">
					<span class="text-muted-foreground select-none">$ </span>{installCommands[packageManager]}
					<button
						onclick={copyInstall}
						class="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 rounded p-1 transition-colors"
						title="Copy"
					>
						{#if copied}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
						{/if}
					</button>
				</div>

				<!-- Code snippet preview -->
				<div class="bg-muted rounded-lg px-4 py-4 font-mono text-xs leading-6">
					<div><span class="text-muted-foreground">// +layout.svelte</span></div>
					<div><span class="text-blue-400">import</span> <span class="text-foreground">{'{ setPreset }'}</span> <span class="text-blue-400">from</span> <span class="text-green-400">'@svelte-atoms/core'</span>;</div>
					<div class="mt-2"><span class="text-blue-400">setPreset</span>({'{'}</div>
					<div>&nbsp;&nbsp;<span class="text-orange-400">button</span>: () =&gt; {'({'}</div>
					<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">class</span>: <span class="text-green-400">'px-4 py-2 rounded-lg'</span>,</div>
					<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">variants</span>: {'{ ... }'}</div>
					<div>&nbsp;&nbsp;{'})'}</div>
					<div>{'}'});</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ============================================================
     FINAL CTA
     ============================================================ -->
<section>
	<div class="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-3xl font-bold">Ready to build?</h2>
		<p class="text-muted-foreground mx-auto mb-8 max-w-md">
			Start with the quick-start guide or explore the component library. Everything is open source.
		</p>
		<div class="flex flex-wrap justify-center gap-3">
			<Button variant="primary" class="gap-2 px-6" onclick={() => goto('/docs/quick-start')}>
				Get started
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
				</svg>
			</Button>
			<Button variant="outline" class="gap-2 px-6" onclick={() => window.open('https://github.com/svelte-atoms/core', '_blank')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
					<path d="M9 18c-4.51 2-5-2-7-2"/>
				</svg>
				Star on GitHub
			</Button>
		</div>
	</div>
</section>
