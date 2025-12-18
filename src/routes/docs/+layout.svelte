<script lang="ts">
	import ContentSidebar, { type PageContent } from '$docs/content-sidebar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const sidebarData: PageContent[] = [
		{
			title: 'Getting Started',
			children: [
				{ title: 'Introduction', href: '/docs' },
				{ title: 'Installation', href: '/docs/installation' },
				{ title: 'Quick Start', href: '/docs/quick-start' },
				{ title: 'Philosophy', href: '/docs/philosophy' }
			]
		},
		{
			title: 'Core Concepts',
			children: [
				{ title: 'Atoms', href: '/docs/atoms' },
				{ title: 'Bonds', href: '/docs/bonds' },
				{ title: 'Preset System', href: '/docs/preset' },
				{ title: 'Styling', href: '/docs/styling' },
				{ title: 'Accessibility', href: '/docs/accessibility' }
			]
		},
		{
			title: 'Components',
			children: [
				{ title: 'Accordion', href: '/docs/components/accordion' },
				{ title: 'Alert', href: '/docs/components/alert' },
				{ title: 'Avatar', href: '/docs/components/avatar' },
				{ title: 'Badge', href: '/docs/components/badge' },
				{ title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
				{ title: 'Button', href: '/docs/components/button' },
				{ title: 'Card', href: '/docs/components/card' },
				{ title: 'Checkbox', href: '/docs/components/checkbox' },
				{ title: 'Collapsible', href: '/docs/components/collapsible' },
				{ title: 'Combobox', href: '/docs/components/combobox' },
				{ title: 'Context Menu', href: '/docs/components/contextmenu', disabled: true },
				{ title: 'DataTable', href: '/docs/components/datatable' },
				{ title: 'DataGrid', href: '/docs/components/datagrid' },
				{ title: 'Dialog', href: '/docs/components/dialog' },
				{ title: 'Divider', href: '/docs/components/divider' },
				{ title: 'Drawer', href: '/docs/components/drawer' },
				{ title: 'Dropdown', href: '/docs/components/dropdown' },
				{ title: 'Form', href: '/docs/components/form' },
				{ title: 'Input', href: '/docs/components/input' },
				{ title: 'Label', href: '/docs/components/label' },
				{ title: 'Link', href: '/docs/components/link' },
				{ title: 'List', href: '/docs/components/list' },
				{ title: 'Menu', href: '/docs/components/menu' },
				{ title: 'Popover', href: '/docs/components/popover' },
				{ title: 'Radio', href: '/docs/components/radio' },
				{ title: 'Scrollable', href: '/docs/components/scrollable' },
				{ title: 'Sidebar', href: '/docs/components/sidebar' },
				{ title: 'Stack', href: '/docs/components/stack' },
				{ title: 'Tabs', href: '/docs/components/tabs' },
				{ title: 'Textarea', href: '/docs/components/textarea' },
				{ title: 'Toast', href: '/docs/components/toast' },
				{ title: 'Tooltip', href: '/docs/components/tooltip' },
				{ title: 'Tree', href: '/docs/components/tree' }
			]
		},
		{
			title: 'Guides',
			children: [
				{ title: 'Theming', href: '/docs/guides/theming' },
				{ title: 'Dark Mode', href: '/docs/guides/dark-mode' },
				{ title: 'Customization', href: '/docs/guides/customization' }
			]
		}
	];
</script>

<div class="mx-auto flex max-w-[1800px] items-start gap-8 px-6 lg:px-8">
	<ContentSidebar data={sidebarData} pathname={$page.url.pathname} />

	<main class="min-w-0 flex-1 py-8">
		{@render children?.()}
	</main>

	<aside
		class="sticky top-16 hidden w-64 shrink-0 overflow-y-auto xl:block"
		style="height: calc(100vh - 4rem);"
	>
		<div class="py-6 text-sm">
			<h4 class="mb-4 font-semibold">On this page</h4>
			<nav class="text-muted-foreground space-y-2">
				<a href="#overview" class="hover:text-foreground block">Overview</a>
				<a href="#installation" class="hover:text-foreground block">Installation</a>
				<a href="#usage" class="hover:text-foreground block">Usage</a>
				<a href="#api" class="hover:text-foreground block">API Reference</a>
				<a href="#examples" class="hover:text-foreground block">Examples</a>
			</nav>
		</div>
	</aside>
</div>
