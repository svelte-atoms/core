<script lang="ts">
	import Badge from '$lib/components/badge/badge.svelte';

	const components = [
		{
			name: 'Accordion',
			description: 'Collapsible content sections for organizing information',
			category: 'Layout',
			status: 'Stable',
			href: '/components/accordion'
		},
		{
			name: 'Avatar',
			description: 'Display user profile pictures or initials',
			category: 'Display',
			status: 'Stable',
			href: '/components/avatar'
		},
		{
			name: 'Badge',
			description: 'Small status indicators for displaying metadata',
			category: 'Display',
			status: 'Stable',
			href: '/components/badge'
		},
		{
			name: 'Breadcrumb',
			description: 'Navigation helper showing page hierarchy',
			category: 'Navigation',
			status: 'Stable',
			href: '/components/breadcrumb'
		},
		{
			name: 'Button',
			description: 'Interactive element for triggering actions',
			category: 'Form',
			status: 'Stable',
			href: '/components/button'
		},
		{
			name: 'Checkbox',
			description: 'Selection control for multiple choices',
			category: 'Form',
			status: 'Stable',
			href: '/components/checkbox'
		},
		{
			name: 'Collapsible',
			description: 'Show and hide content with smooth transitions',
			category: 'Layout',
			status: 'Stable',
			href: '/components/collapsible'
		},
		{
			name: 'Combobox',
			description: 'Searchable dropdown for selecting from options',
			category: 'Form',
			status: 'Beta',
			href: '/components/combobox'
		},
		{
			name: 'Context Menu',
			description: 'Right-click menu for contextual actions',
			category: 'Overlay',
			status: 'Beta',
			href: '/components/contextmenu'
		},
		{
			name: 'DataGrid',
			description: 'Advanced data table with sorting and filtering',
			category: 'Display',
			status: 'Beta',
			href: '/components/datagrid'
		},
		{
			name: 'Dialog',
			description: 'Modal dialogs for important user interactions',
			category: 'Overlay',
			status: 'Stable',
			href: '/components/dialog'
		},
		{
			name: 'Divider',
			description: 'Visual separator for content sections',
			category: 'Layout',
			status: 'Stable',
			href: '/components/divider'
		},
		{
			name: 'Dropdown',
			description: 'Dropdown menu for actions and navigation',
			category: 'Navigation',
			status: 'Stable',
			href: '/components/dropdown'
		},
		{
			name: 'Form',
			description: 'Form controls with validation and layout',
			category: 'Form',
			status: 'Beta',
			href: '/components/form'
		},
		{
			name: 'Icon',
			description: 'Scalable vector icons for UI elements',
			category: 'Display',
			status: 'Stable',
			href: '/components/icon'
		},
		{
			name: 'Input',
			description: 'Text input fields with various types',
			category: 'Form',
			status: 'Stable',
			href: '/components/input'
		},
		{
			name: 'Label',
			description: 'Labels for form controls and content',
			category: 'Form',
			status: 'Stable',
			href: '/components/label'
		},
		{
			name: 'Link',
			description: 'Styled links for navigation and actions',
			category: 'Navigation',
			status: 'Stable',
			href: '/components/link'
		},
		{
			name: 'List',
			description: 'Organized lists with various styles',
			category: 'Display',
			status: 'Beta',
			href: '/components/list'
		},
		{
			name: 'Menu',
			description: 'Navigation menu with nested items',
			category: 'Navigation',
			status: 'Beta',
			href: '/components/menu'
		},
		{
			name: 'Popover',
			description: 'Floating content container',
			category: 'Overlay',
			status: 'Beta',
			href: '/components/popover'
		},
		{
			name: 'Portal',
			description: 'Render content outside component tree',
			category: 'Utility',
			status: 'Stable',
			href: '/components/portal'
		},
		{
			name: 'Radio',
			description: 'Single selection from multiple options',
			category: 'Form',
			status: 'Beta',
			href: '/components/radio'
		},
		{
			name: 'Sidebar',
			description: 'Collapsible navigation sidebar',
			category: 'Layout',
			status: 'Beta',
			href: '/components/sidebar'
		},
		{
			name: 'Slideover',
			description: 'Side panel that slides into view',
			category: 'Overlay',
			status: 'Beta',
			href: '/components/slideover'
		},
		{
			name: 'Slider',
			description: 'Range input for selecting values',
			category: 'Form',
			status: 'Beta',
			href: '/components/slider'
		},
		{
			name: 'Switch',
			description: 'Toggle control for binary choices',
			category: 'Form',
			status: 'Beta',
			href: '/components/switch'
		},
		{
			name: 'Tabs',
			description: 'Organize content in tabbed interface',
			category: 'Navigation',
			status: 'Beta',
			href: '/components/tabs'
		},
		{
			name: 'Textarea',
			description: 'Multi-line text input field',
			category: 'Form',
			status: 'Beta',
			href: '/components/textarea'
		},
		{
			name: 'Toast',
			description: 'Notification messages',
			category: 'Feedback',
			status: 'Beta',
			href: '/components/toast'
		},
		{
			name: 'Tooltip',
			description: 'Contextual help text on hover',
			category: 'Overlay',
			status: 'Beta',
			href: '/components/tooltip'
		},
		{
			name: 'Tree',
			description: 'Hierarchical data display',
			category: 'Display',
			status: 'Beta',
			href: '/components/tree'
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
				return 'bg-green-100 text-green-800';
			case 'Beta':
				return 'bg-blue-100 text-blue-800';
			case 'Alpha':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
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
		<h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Components</h1>
		<p class="max-w-3xl text-xl text-gray-600">
			Explore our collection of reusable, accessible, and customizable components. Each component is
			built with Svelte 5 and designed for modern web applications.
		</p>
	</div>

	<!-- Search and Filter -->
	<div class="mb-8 space-y-4">
		<!-- Search -->
		<div class="relative max-w-md">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
				class="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
				bind:value={searchQuery}
			/>
		</div>

		<!-- Category Filter -->
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<button
					class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
					category
						? 'bg-purple-600 text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
					onclick={() => (selectedCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Stats -->
	<div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
		<div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
			<div class="text-2xl font-bold text-purple-600">{components.length}</div>
			<div class="text-sm text-gray-600">Total Components</div>
		</div>
		<div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
			<div class="text-2xl font-bold text-green-600">
				{components.filter((c) => c.status === 'Stable').length}
			</div>
			<div class="text-sm text-gray-600">Stable</div>
		</div>
		<div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
			<div class="text-2xl font-bold text-blue-600">
				{components.filter((c) => c.status === 'Beta').length}
			</div>
			<div class="text-sm text-gray-600">Beta</div>
		</div>
		<div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
			<div class="text-2xl font-bold text-pink-600">{categories.length - 1}</div>
			<div class="text-sm text-gray-600">Categories</div>
		</div>
	</div>

	<!-- Components Grid -->
	{#if filteredComponents.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredComponents as component}
				<a
					href={component.href}
					class="group block transform rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
				>
					<div class="mb-3 flex items-start justify-between">
						<h3
							class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600"
						>
							{component.name}
						</h3>
						<Badge class={getStatusColor(component.status) + ' px-2 py-1 text-xs'}>
							{component.status}
						</Badge>
					</div>
					<p class="mb-4 text-sm text-gray-600">
						{component.description}
					</p>
					<div class="flex items-center justify-between">
						<span class="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600">
							{component.category}
						</span>
						<svg
							class="h-4 w-4 text-gray-400 transition-colors group-hover:text-purple-600"
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
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">No components found</h3>
			<p class="text-gray-600">Try adjusting your search or filter criteria.</p>
		</div>
	{/if}

	<!-- Call to Action -->
	<div class="mt-16 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-8 text-center">
		<h2 class="mb-4 text-2xl font-bold text-gray-900">Need a Custom Component?</h2>
		<p class="mx-auto mb-6 max-w-2xl text-gray-600">
			Don't see what you're looking for? Atomic SV is designed to be extensible. You can easily
			create custom components using our building blocks.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href="https://github.com/ryu-man/atomic-sv/issues"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
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
				class="inline-flex items-center rounded-lg border border-purple-600 px-6 py-3 font-medium text-purple-600 transition-colors hover:bg-purple-50"
			>
				Contribute
			</a>
		</div>
	</div>
</div>
