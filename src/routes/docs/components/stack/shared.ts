const basicCode = `
<Stack.Root class="h-64 w-64 overflow-hidden rounded-lg">
  <Stack.Item>
    <div class="h-64 w-64 bg-gradient-to-br from-blue-500 to-purple-600"></div>
  </Stack.Item>
  <Stack.Item class="flex items-end">
    <div class="w-full bg-black/50 p-4">
      <h3 class="text-lg font-bold text-white">Overlay Text</h3>
      <p class="text-sm text-white/80">Stays in document flow</p>
    </div>
  </Stack.Item>
</Stack.Root>`.trim();

const badgeCode = `
<Stack.Root class="inline-block w-fit">
  <Stack.Item base={Button} variant="primary">Messages</Stack.Item>
  <Stack.Item class="pointer-events-none -mr-2 -mt-2 flex justify-end">
    <span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
      5
    </span>
  </Stack.Item>
</Stack.Root>`.trim();

const loadingCode = `
<Stack.Root class="w-64 overflow-hidden">
  <Stack.Item base={Card.Root} class="rounded-lg border p-8">
    <h3 class="mb-2 text-lg font-bold">Content Card</h3>
    <p class="text-muted-foreground text-sm">Your content here determines the container size</p>
  </Stack.Item>
  <Stack.Item class="flex items-center justify-center rounded-lg backdrop-blur-sm">
    <div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg">
      <div class="text-muted-foreground text-sm">Loading…</div>
    </div>
  </Stack.Item>
</Stack.Root>`.trim();

const zOrderCode = `
<script lang="ts">
  import { Stack } from '@svelte-atoms/core';
  import type { StackBond } from '@svelte-atoms/core';

  let stackRoot = $state<any>();
  let activePage = $state('dashboard');
  const bond = $derived(stackRoot?.getBond() as StackBond | undefined);

  const pages = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', content: { title: 'Dashboard', subtitle: "Welcome back! Here's your overview.", color: 'bg-blue-500/10 border-blue-500/20' } },
    { id: 'analytics',  label: 'Analytics',  icon: '↗', content: { title: 'Analytics',  subtitle: 'Traffic and engagement metrics.',    color: 'bg-violet-500/10 border-violet-500/20' } },
    { id: 'settings',   label: 'Settings',   icon: '⚙', content: { title: 'Settings',   subtitle: 'Configure your preferences.',         color: 'bg-emerald-500/10 border-emerald-500/20' } },
  ];

  function navigate(id: string) {
    activePage = id;
    bond?.state.bringToFront(id);
  }

  function pageStyle(i: number): string {
    const activeIdx = pages.findIndex(p => p.id === activePage);
    const offset = (i - activeIdx + pages.length) % pages.length;
    if (offset === 0) return 'transform: translate(0,0) scale(1); opacity: 1; z-index: 10;';
    if (offset === 1) return 'transform: translate(8px,-8px) scale(0.97); opacity: 0.7; z-index: 5;';
    return 'transform: translate(16px,-16px) scale(0.94); opacity: 0.4; z-index: 1;';
  }
<\/script>

<div class="border-border bg-background overflow-hidden rounded-xl border" style="height: 320px;">
  <div class="flex h-full">

    <!-- Sidebar -->
    <aside class="border-border bg-muted/30 flex w-36 flex-col border-r">
      <div class="border-border border-b px-4 py-3">
        <span class="text-foreground text-sm font-semibold">MyApp</span>
      </div>
      <nav class="flex flex-col gap-0.5 p-2">
        {#each pages as page (page.id)}
          <button
            class={[
              'flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
              activePage === page.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            ]}
            onclick={() => navigate(page.id)}
          >
            <span class="text-base leading-none">{page.icon}</span>
            {page.label}
          </button>
        {/each}
      </nav>
    </aside>

    <!-- Main area -->
    <div class="flex min-w-0 flex-1 flex-col">

      <!-- Header -->
      <header class="border-border bg-background flex h-12 shrink-0 items-center border-b px-4">
        <span class="text-foreground text-sm font-medium">
          {pages.find(p => p.id === activePage)?.label}
        </span>
      </header>

      <!-- Stacked pages with cascade effect -->
      <div class="relative min-h-0 flex-1 flex items-center justify-center p-6">
        <Stack.Root bind:this={stackRoot} bind:value={activePage} class="w-full">
          {#each pages as page, i (page.id)}
            <Stack.Item
              id={page.id}
              class={['rounded-xl border p-5 transition-all duration-300 cursor-pointer', page.content.color]}
              style={pageStyle(i)}
              onclick={() => navigate(page.id)}
            >
              <h3 class="text-foreground mb-1 text-sm font-semibold">{page.content.title}</h3>
              <p class="text-muted-foreground text-xs">{page.content.subtitle}</p>
              <div class="mt-3 grid grid-cols-2 gap-1.5">
                {#each [1, 2, 3, 4] as _ (_)}
                  <div class="bg-background/60 border-border/40 rounded border p-2">
                    <div class="bg-muted-foreground/20 mb-1.5 h-1.5 w-12 rounded"></div>
                    <div class="bg-muted-foreground/10 h-1.5 w-8 rounded"></div>
                  </div>
                {/each}
              </div>
            </Stack.Item>
          {/each}
        </Stack.Root>
      </div>

    </div>
  </div>
</div>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

setPreset({
  'stack.root': () => ({
    class: '' // grid container — add padding, background, etc.
  }),
  'stack.item': () => ({
    class: '' // each item occupies grid-area: 'stack'
  })
});`.trim();

const accessibilityFeatures = [
	'Uses CSS Grid — maintains DOM order for screen readers and keyboard navigation',
	'No absolute positioning — parent container sizes naturally to its largest child',
	'bind:value tracks the topmost item reactively for programmatic control',
	'Works alongside ARIA attributes on individual Stack.Item elements'
];

const componentsSummary = [
	{
		name: 'Stack.Root',
		description: 'Creates the CSS Grid stacking context. All children share the same grid area.'
	},
	{
		name: 'Stack.Item',
		description: 'An individual layer. Registers with StackState on mount for z-order tracking.'
	}
];

const useCases = [
	{
		title: 'Image Overlays',
		description: 'Layer captions, gradients, or badges directly over images without absolute positioning.'
	},
	{
		title: 'Loading States',
		description: 'Overlay a spinner or skeleton over content while preserving the original layout dimensions.'
	},
	{
		title: 'Notification Badges',
		description: 'Position a badge counter over a button or avatar while keeping both in document flow.'
	},
	{
		title: 'Layer Panels',
		description: 'Build interactive layer managers (like in design tools) using bond.state z-order methods.'
	},
	{
		title: 'Card Stacks',
		description: 'Create deck-of-cards UIs where cards can be brought to front programmatically.'
	}
];

export const metadata = {
	title: 'Stack - Svelte Atoms',
	description: 'Layout component for layering elements in the same visual space using CSS Grid. Keeps elements in document flow so the parent sizes to its largest child.',
	componentTitle: 'Stack',
	componentDescription:
		'Layers multiple elements in the same visual space using CSS Grid with natural parent sizing and z-order control.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Stack } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Stack' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		badge: badgeCode,
		loading: loadingCode,
		zOrder: zOrderCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
