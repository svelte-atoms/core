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
  let active = $state('a');
  const bond = $derived(stackRoot?.getBond() as StackBond | undefined);

  const items = [
    { id: 'a', label: 'A', bg: 'bg-blue-500',  offset: '' },
    { id: 'b', label: 'B', bg: 'bg-green-500', offset: 'mt-4 ml-4' },
    { id: 'c', label: 'C', bg: 'bg-rose-500',  offset: 'mt-8 ml-8' },
  ];
<\/script>

<Stack.Root bind:this={stackRoot} bind:value={active} class="relative h-40 w-64">
  {#each items as item (item.id)}
    <Stack.Item
      id={item.id}
      class={[item.bg, item.offset, 'flex cursor-pointer items-center justify-center rounded-xl text-white font-bold text-xl']}
      onclick={() => (active = item.id)}
    >
      {item.label}
    </Stack.Item>
  {/each}
</Stack.Root>

<div class="flex gap-2 mt-4">
  <button onclick={() => bond?.state.bringToFront(active)}>Bring to Front</button>
  <button onclick={() => bond?.state.bringForward(active)}>Forward</button>
  <button onclick={() => bond?.state.sendBackward(active)}>Backward</button>
  <button onclick={() => bond?.state.sendToBack(active)}>Send to Back</button>
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
		'A compound component that layers multiple elements in the same visual space using CSS Grid. Unlike absolute positioning, Stack keeps elements in the document flow so the parent container sizes naturally to its largest child. Provides programmatic z-order control via StackState (bond.state.bringToFront, sendToBack, bringForward, sendBackward).',
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
