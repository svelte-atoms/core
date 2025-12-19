<script lang="ts">
	import Badge from '$lib/components/badge/badge.svelte';

	const components = [
		{
			name: 'Accordion',
			description: 'Collapsible content sections for organizing information',
			category: 'Layout',
			status: 'Stable',
			href: '/docs/components/accordion'
		},
		{
			name: 'Avatar',
			description: 'Display user profile pictures or initials',
			category: 'Display',
			status: 'Stable',
			href: '/docs/components/avatar'
		},
		{
			name: 'Badge',
			description: 'Small status indicators for displaying metadata',
			category: 'Display',
			status: 'Stable',
			href: '/docs/components/badge'
		},
		{
			name: 'Breadcrumb',
			description: 'Navigation helper showing page hierarchy',
			category: 'Navigation',
			status: 'Stable',
			href: '/docs/components/breadcrumb'
		},
		{
			name: 'Button',
			description: 'Interactive element for triggering actions',
			category: 'Form',
			status: 'Stable',
			href: '/docs/components/button'
		},
		{
			name: 'Checkbox',
			description: 'Selection control for multiple choices',
			category: 'Form',
			status: 'Stable',
			href: '/docs/components/checkbox'
		},
		{
			name: 'Collapsible',
			description: 'Show and hide content with smooth transitions',
			category: 'Layout',
			status: 'Stable',
			href: '/docs/components/collapsible'
		},
		{
			name: 'Combobox',
			description: 'Searchable dropdown for selecting from options',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/combobox'
		},
		// {
		// 	name: 'Context Menu',
		// 	description: 'Right-click menu for contextual actions',
		// 	category: 'Overlay',
		// 	status: 'Beta',
		// 	href: '/docs/components/contextmenu'
		// },
		{
			name: 'DataGrid',
			description: 'Advanced data table with sorting and filtering',
			category: 'Display',
			status: 'Beta',
			href: '/docs/components/datagrid'
		},
		{
			name: 'Dialog',
			description: 'Modal dialogs for important user interactions',
			category: 'Overlay',
			status: 'Stable',
			href: '/docs/components/dialog'
		},
		{
			name: 'Divider',
			description: 'Visual separator for content sections',
			category: 'Layout',
			status: 'Stable',
			href: '/docs/components/divider'
		},
		{
			name: 'Dropdown',
			description: 'Dropdown menu for actions and navigation',
			category: 'Navigation',
			status: 'Stable',
			href: '/docs/components/dropdown'
		},
		{
			name: 'Form',
			description: 'Form controls with validation and layout',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/form'
		},
		{
			name: 'Icon',
			description: 'Scalable vector icons for UI elements',
			category: 'Display',
			status: 'Stable',
			href: '/docs/components/icon'
		},
		{
			name: 'Input',
			description: 'Text input fields with various types',
			category: 'Form',
			status: 'Stable',
			href: '/docs/components/input'
		},
		{
			name: 'Label',
			description: 'Labels for form controls and content',
			category: 'Form',
			status: 'Stable',
			href: '/docs/components/label'
		},
		{
			name: 'Link',
			description: 'Styled links for navigation and actions',
			category: 'Navigation',
			status: 'Stable',
			href: '/docs/components/link'
		},
		{
			name: 'List',
			description: 'Organized lists with various styles',
			category: 'Display',
			status: 'Beta',
			href: '/docs/components/list'
		},
		{
			name: 'Menu',
			description: 'Navigation menu with nested items',
			category: 'Navigation',
			status: 'Beta',
			href: '/docs/components/menu'
		},
		{
			name: 'Popover',
			description: 'Floating content container',
			category: 'Overlay',
			status: 'Beta',
			href: '/docs/components/popover'
		},
		{
			name: 'Portal',
			description: 'Render content outside component tree',
			category: 'Utility',
			status: 'Stable',
			href: '/docs/components/portal'
		},
		{
			name: 'Radio',
			description: 'Single selection from multiple options',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/radio'
		},
		{
			name: 'Sidebar',
			description: 'Collapsible navigation sidebar',
			category: 'Layout',
			status: 'Beta',
			href: '/docs/components/sidebar'
		},
		{
			name: 'Slideover',
			description: 'Side panel that slides into view',
			category: 'Overlay',
			status: 'Beta',
			href: '/docs/components/slideover'
		},
		{
			name: 'Slider',
			description: 'Range input for selecting values',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/slider'
		},
		{
			name: 'Switch',
			description: 'Toggle control for binary choices',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/switch'
		},
		{
			name: 'Tabs',
			description: 'Organize content in tabbed interface',
			category: 'Navigation',
			status: 'Beta',
			href: '/docs/components/tabs'
		},
		{
			name: 'Textarea',
			description: 'Multi-line text input field',
			category: 'Form',
			status: 'Beta',
			href: '/docs/components/textarea'
		},
		// {
		// 	name: 'Toast',
		// 	description: 'Notification messages',
		// 	category: 'Feedback',
		// 	status: 'Beta',
		// 	href: '/docs/components/toast'
		// },
		{
			name: 'Tooltip',
			description: 'Contextual help text on hover',
			category: 'Overlay',
			status: 'Beta',
			href: '/docs/components/tooltip'
		},
		{
			name: 'Tree',
			description: 'Hierarchical data display',
			category: 'Display',
			status: 'Beta',
			href: '/docs/components/tree'
		}
	];

	const categories = [
		'All',
		'Form',
		'Display',
		'Layout',
		'Navigation',
		'Overlay',
		'Feedback',
		'Utility'
	];

	let selectedCategory = $state('All');
	let searchQuery = $state('');

	const filteredComponents = $derived(
		components.filter((component) => {
			const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
			const matchesSearch =
				component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				component.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);

	function getStatusColor(status: string) {
		switch (status) {
			case 'Stable':
				return 'bg-palette-electron/10 text-palette-electron';
			case 'Beta':
				return 'bg-palette-ion/10 text-palette-ion';
			case 'Alpha':
				return 'bg-palette-radiation/10 text-palette-radiation';
			default:
				return 'bg-muted text-muted-foreground';
		}
	}
</script>

<svelte:head>
	<title>Components - Atomic SV</title>
	<meta name="description" content="Browse all available components in the Atomic SV library." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-foreground mb-4 text-4xl font-bold md:text-5xl">Components</h1>
		<p class="text-muted-foreground max-w-3xl text-xl">
			Explore our collection of reusable, accessible, and customizable components. Each component is
			built with Svelte 5 and designed for modern web applications.
		</p>
	</div>

	<!-- Search and Filter -->
	<div class="mb-8 space-y-4">
		<!-- Search -->
		<div class="relative max-w-md">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<svg
					class="text-muted-foreground h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<input
				type="text"
				placeholder="Search components..."
				class="border-border bg-background placeholder-muted-foreground focus:placeholder-muted-foreground/60 focus:ring-primary block w-full rounded-md border py-2 pr-3 pl-10 leading-5 focus:border-transparent focus:ring-2 focus:outline-none"
				bind:value={searchQuery}
			/>
		</div>

		<!-- Category Filter -->
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<button
					class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
					category
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-foreground hover:bg-muted/80'}"
					onclick={() => (selectedCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Stats -->
	<div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
		<div class="border-border/50 bg-background rounded-lg border p-4 text-center">
			<div class="text-primary text-2xl font-bold">{components.length}</div>
			<div class="text-muted-foreground text-sm">Total Components</div>
		</div>
		<div class="border-border/50 bg-background rounded-lg border p-4 text-center">
			<div class="text-2xl font-bold text-palette-electron">
				{components.filter((c) => c.status === 'Stable').length}
			</div>
			<div class="text-muted-foreground text-sm">Stable</div>
		</div>
		<div class="border-border/50 bg-background rounded-lg border p-4 text-center">
			<div class="text-2xl font-bold text-palette-ion">
				{components.filter((c) => c.status === 'Beta').length}
			</div>
			<div class="text-muted-foreground text-sm">Beta</div>
		</div>
		<div class="border-border/50 bg-background rounded-lg border p-4 text-center">
			<div class="text-2xl font-bold text-palette-critical">{categories.length - 1}</div>
			<div class="text-muted-foreground text-sm">Categories</div>
		</div>
	</div>

	<!-- Components Grid -->
	{#if filteredComponents.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredComponents as component}
				<a
					href={component.href}
					class="group border-border bg-background hover:border-border/60 block rounded-lg border p-6 transition-all duration-200"
				>
					<div class="mb-3 flex items-start justify-between">
						<h3
							class="text-foreground group-hover:text-primary text-lg font-semibold transition-colors"
						>
							{component.name}
						</h3>
						<Badge class={getStatusColor(component.status) + ' px-2 py-1 text-xs'}>
							{component.status}
						</Badge>
					</div>
					<p class="text-muted-foreground mb-4 text-sm">
						{component.description}
					</p>
					<div class="flex items-center justify-between">
						<span class="bg-muted/30 text-primary rounded px-2 py-1 text-xs font-medium">
							{component.category}
						</span>
						<svg
							class="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<div class="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
				<svg
					class="text-muted-foreground h-8 w-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<h3 class="text-foreground mb-2 text-lg font-medium">No components found</h3>
			<p class="text-muted-foreground">Try adjusting your search or filter criteria.</p>
		</div>
	{/if}

	<!-- Call to Action -->
	<div class="bg-muted/30 border-border/50 mt-16 rounded-2xl border p-8 text-center">
		<h2 class="text-foreground mb-4 text-2xl font-bold">Need a Custom Component?</h2>
		<p class="text-muted-foreground mx-auto mb-6 max-w-2xl">
			Don't see what you're looking for? Atomic SV is designed to be extensible. You can easily
			create custom components using our building blocks.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href="https://github.com/ryu-man/atomic-sv/issues"
				target="_blank"
				rel="noopener noreferrer"
				class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 font-medium transition-colors"
			>
				<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
				Request Component
			</a>
			<a
				href="https://github.com/ryu-man/atomic-sv/blob/main/CONTRIBUTING.md"
				target="_blank"
				rel="noopener noreferrer"
				class="border-primary text-primary hover:bg-muted/50 inline-flex items-center rounded-lg border px-6 py-3 font-medium transition-colors"
			>
				Contribute
			</a>
		</div>
	</div>
</div>
