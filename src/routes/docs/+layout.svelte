<script lang="ts">
	import ContentSidebar, { type PageContent } from '$docs/content-sidebar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	type TocEntry = { id: string; text: string };
	let toc = $state<TocEntry[]>([]);
	let activeId = $state('');
	let mainEl = $state<HTMLElement | undefined>(undefined);
	let mobileNavOpen = $state(false);

	// Close mobile nav on route change
	$effect(() => {
		$page.url.pathname;
		mobileNavOpen = false;
	});

	$effect(() => {
		$page.url.pathname;
		requestAnimationFrame(() => {
			if (!mainEl) return;
			const headings = Array.from(mainEl.querySelectorAll('h2[id]'));
			toc = headings.map((h) => ({ id: h.id, text: h.textContent?.trim() ?? '' }));

			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeId = entry.target.id;
							break;
						}
					}
				},
				{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }
			);
			headings.forEach((h) => observer.observe(h));
			return () => observer.disconnect();
		});
	});

	const sidebarData: PageContent[] = [
		{
			title: 'Getting Started',
			children: [
				{ title: 'Introduction', href: '/docs' },
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
				{ title: 'Atom', href: '/docs/components/atom' },
				{ title: 'Avatar', href: '/docs/components/avatar' },
				{ title: 'Badge', href: '/docs/components/badge' },
				{ title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
				{ title: 'Button', href: '/docs/components/button' },
				{ title: 'Card', href: '/docs/components/card' },
				{ title: 'Checkbox', href: '/docs/components/checkbox' },
				{ title: 'Collapsible', href: '/docs/components/collapsible' },
				{ title: 'Combobox', href: '/docs/components/combobox' },
				{ title: 'Context Menu', href: '/docs/components/contextmenu', disabled: true },
				{ title: 'DataGrid', href: '/docs/components/datagrid' },
				{ title: 'Dialog', href: '/docs/components/dialog' },
				{ title: 'Divider', href: '/docs/components/divider' },
				{ title: 'Drawer', href: '/docs/components/drawer' },
				{ title: 'Dropdown', href: '/docs/components/dropdown' },
				{ title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
				{ title: 'Form', href: '/docs/components/form' },
				{ title: 'Input', href: '/docs/components/input' },
				{ title: 'Label', href: '/docs/components/label' },
				{ title: 'Link', href: '/docs/components/link' },
				{ title: 'List', href: '/docs/components/list' },
				{ title: 'Menu', href: '/docs/components/menu' },
				{ title: 'Select', href: '/docs/components/select' },
				{ title: 'Popover', href: '/docs/components/popover' },
				{ title: 'Radio', href: '/docs/components/radio' },
				{ title: 'Scrollable', href: '/docs/components/scrollable' },
				{ title: 'Sidebar', href: '/docs/components/sidebar' },
				{ title: 'Stack', href: '/docs/components/stack' },
				{ title: 'Stepper', href: '/docs/components/stepper' },
				{ title: 'Tabs', href: '/docs/components/tabs' },
				{ title: 'Textarea', href: '/docs/components/textarea' },
				{ title: 'Tooltip', href: '/docs/components/tooltip' },
				{ title: 'Tree', href: '/docs/components/tree' }
			]
		}
	];
</script>

<!-- Mobile nav bar -->
<div class="border-border bg-background/80 sticky top-14 z-40 flex items-center gap-3 border-b px-4 py-2 backdrop-blur-md lg:hidden">
	<button
		onclick={() => (mobileNavOpen = !mobileNavOpen)}
		class="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
		aria-label="Toggle navigation"
	>
		{#if mobileNavOpen}
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{:else}
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		{/if}
		<span>Menu</span>
	</button>

	{#if toc.length > 0}
		<span class="text-border">·</span>
		<span class="text-muted-foreground truncate text-sm">On this page</span>
	{/if}
</div>

<!-- Mobile nav drawer -->
{#if mobileNavOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		role="button"
		tabindex="-1"
		onclick={() => (mobileNavOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (mobileNavOpen = false)}
		aria-label="Close navigation"
	></div>
	<!-- Drawer -->
	<div class="bg-background border-border fixed top-14 bottom-0 left-0 z-50 w-72 overflow-y-auto border-r shadow-xl lg:hidden">
		<ContentSidebar data={sidebarData} pathname={$page.url.pathname} mobile={true} />
	</div>
{/if}

<!-- Desktop layout -->
<div class="docs-layout w-full items-start gap-4 px-4 lg:gap-16 lg:px-6">
	<ContentSidebar data={sidebarData} pathname={$page.url.pathname} />

	<main bind:this={mainEl} class="docs-scroll min-w-0 flex-1 py-8">
		{@render children?.()}
	</main>

	<aside
		class="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto docs-scroll xl:block"
	>
		{#if toc.length > 0}
			<div class="py-6 text-sm">
				<h4 class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
					On this page
				</h4>
				<nav class="space-y-0.5">
					{#each toc as entry (entry.id)}
						<a
							href="#{entry.id}"
							class={[
								'block py-1 pr-2 text-sm transition-colors',
								activeId === entry.id
									? 'text-foreground'
									: 'text-muted-foreground/60 hover:text-foreground'
							]}
						>{entry.text}</a>
					{/each}
				</nav>
			</div>
		{/if}
	</aside>
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
	}
</style>
