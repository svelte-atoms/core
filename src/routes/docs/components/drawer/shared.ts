const basicCode = `
<script lang="ts">
  import { Drawer } from '@svelte-atoms/core/drawer';
  import { Button } from '@svelte-atoms/core/button';

  let open = $state(false);

  const notifications = [
    { title: 'New message from Alex', time: '2 min ago', read: false },
    { title: 'Your report is ready', time: '1 hour ago', read: false },
    { title: 'Deployment succeeded', time: '3 hours ago', read: true },
  ];
<\/script>

<Button onclick={() => (open = true)}>Open Notifications</Button>

<Drawer.Root bind:open>
  <Drawer.Content class="w-80 flex flex-col">
    <Drawer.Header class="border-b border-border px-6 py-4">
      <div>
        <Drawer.Title>Notifications</Drawer.Title>
        <Drawer.Description class="mt-1">You have 2 unread</Drawer.Description>
      </div>
    </Drawer.Header>
    <Drawer.Body class="flex-1 overflow-y-auto px-4 py-3">
      <div class="space-y-2">
        {#each notifications as n}
          <div class="flex items-start gap-3 rounded-lg p-3 transition-colors {n.read ? 'bg-muted/30 hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10 border border-primary/20'}">
            <div class="mt-1.5 size-2.5 shrink-0 rounded-full {n.read ? 'bg-muted-foreground/40' : 'bg-primary'}"></div>
            <div class="flex-1">
              <p class="text-sm font-medium leading-tight">{n.title}</p>
              <p class="text-muted-foreground text-xs mt-1">{n.time}</p>
            </div>
          </div>
        {/each}
      </div>
    </Drawer.Body>
    <Drawer.Footer class="border-t border-border px-6 py-4">
      <Button variant="primary" class="w-full" onclick={() => (open = false)}>Mark all as read</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`.trim();

const sidesCode = `
<script lang="ts">
  import { Home, Folder, Users, Settings, Moon, Zap, LogOut } from 'lucide-svelte';
  
  const navLinks = [
    { section: 'Main', items: [
      { label: 'Dashboard', href: '#', icon: Home },
      { label: 'Projects', href: '#', icon: Folder },
      { label: 'Team', href: '#', icon: Users },
    ]},
    { section: 'Settings', items: [
      { label: 'Preferences', href: '#', icon: Settings },
      { label: 'Appearance', href: '#', icon: Moon },
      { label: 'Performance', href: '#', icon: Zap },
    ]},
  ];
<\/script>

<!-- Left: Navigation Drawer -->
<Drawer.Root bind:open={leftOpen} side="left">
  <Drawer.Content class="w-72 flex flex-col">
    <Drawer.Header class="border-b border-border px-6 py-4">
      <Drawer.Title>Navigation</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body class="flex-1 overflow-y-auto px-4 py-6">
      <nav class="space-y-6">
        {#each navLinks as section}
          <div>
            <h4 class="text-foreground/60 mb-2 px-2 text-xs font-semibold uppercase tracking-wider">{section.section}</h4>
            <div class="space-y-1">
              {#each section.items as link}
                {\@const Icon = link.icon}
                <a
                  href={link.href}
                  class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted active:bg-muted/80"
                >
                  <Icon class="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </nav>
    </Drawer.Body>
    <Drawer.Footer class="border-t border-border px-6 py-4 mt-auto">
      <Button variant="ghost" class="w-full flex items-center gap-2 justify-center">
        <LogOut class="w-4 h-4" />
        <span>Sign Out</span>
      </Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>

<!-- Bottom: Confirmation Sheet -->
<Drawer.Root bind:open={bottomOpen} side="bottom">
  <Drawer.Content class="mx-auto max-w-lg rounded-t-2xl">
    <Drawer.Header class="border-b border-border px-6 pt-6 pb-4">
      <div>
        <Drawer.Title class="text-lg font-semibold">Delete this item?</Drawer.Title>
        <Drawer.Description class="text-muted-foreground mt-2 text-sm leading-relaxed">
          This action cannot be undone. The item will be permanently removed.
        </Drawer.Description>
      </div>
    </Drawer.Header>
    <Drawer.Footer class="flex gap-3 px-6 pb-8">
      <Button variant="destructive" class="flex-1 font-medium">Delete</Button>
      <Button variant="outline" class="flex-1">Cancel</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  drawer: () => ({
    class: 'fixed inset-0 z-50'
  }),
  'drawer.backdrop': () => ({
    class: 'fixed inset-0 bg-background/80 backdrop-blur-sm'
  }),
  'drawer.content': () => ({
    class: 'fixed z-50 bg-background shadow-lg transition-transform'
  }),
  'drawer.header': () => ({
    class: 'border-b border-border px-6 py-4'
  }),
  'drawer.footer': () => ({
    class: 'border-t border-border px-6 py-4'
  })
});`.trim();

const accessibilityFeatures = [
	'Focus trap within drawer',
	'Escape key to close',
	'ARIA attributes (role="dialog", aria-modal)',
	'Returns focus to trigger on close',
	'Screen reader announcements',
	'Keyboard navigation support'
];

const useCases = [
	{
		title: 'Navigation Menus',
		description:
			'Slide-out navigation panels for mobile and responsive layouts, providing access to main app navigation.'
	},
	{
		title: 'Filters and Settings',
		description:
			'Show filtering options or settings panels that don\'t require full-page navigation.'
	},
	{
		title: 'Shopping Carts',
		description:
			'Display shopping cart contents in a side panel for e-commerce applications without leaving the current page.'
	},
	{
		title: 'Notification Panels',
		description:
			'Show notifications, messages, or activity feeds in a drawer that slides in from the side.'
	},
	{
		title: 'Detail Views',
		description:
			'Display detailed information about selected items while keeping the main content visible.'
	},
	{
		title: 'Form Sidebars',
		description:
			'Present forms or data entry panels as side drawers for editing or creating content.'
	}
];

const componentsSummary = [
	{
		name: 'Drawer.Root',
		description:
			'Root container that manages drawer state, backdrop, and focus trap. Controls open/close state and slide direction.'
	},
	{
		name: 'Drawer.Content',
		description:
			'Main container for drawer content. Slides in from specified edge (left, right, top, bottom).'
	},
	{
		name: 'Drawer.Header',
		description:
			'Optional header section for drawer title and close button.'
	},
	{
		name: 'Drawer.Body',
		description:
			'Main content area of the drawer.'
	},
	{
		name: 'Drawer.Footer',
		description:
			'Optional footer section for action buttons.'
	},
	{
		name: 'Drawer.Title',
		description:
			'Semantic title element with proper ARIA labeling.'
	},
	{
		name: 'Drawer.Description',
		description:
			'Semantic description for additional context to screen readers.'
	},
	{
		name: 'Drawer.Backdrop',
		description:
			'Overlay backdrop that dims the background when drawer is open.'
	}
];

export const metadata = {
	title: 'Drawer - Svelte Atoms',
	description: 'Side panel that slides in from screen edge.',
	componentTitle: 'Drawer',
	componentDescription:
		'Side panel that slides in from screen edge, perfect for navigation menus and contextual content.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Drawer } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Drawer' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		sides: sidesCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
