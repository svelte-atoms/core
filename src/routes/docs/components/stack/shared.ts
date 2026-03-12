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
  <Stack.Item class="flex justify-end" style="margin-top: -8px; margin-right: -8px;">
    <span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
      5
    </span>
  </Stack.Item>
</Stack.Root>`.trim();

const loadingCode = `
<Stack.Root class="w-64">
  <Stack.Item base={Card.Root} class="rounded-lg border p-8">
    <h3 class="mb-2 text-lg font-bold">Content Card</h3>
    <p class="text-muted-foreground text-sm">Your content here determines the container size</p>
  </Stack.Item>
  <Stack.Item class="flex items-center justify-center">
    <div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg backdrop-blur-sm">
      <div class="text-muted-foreground text-sm">Loading…</div>
    </div>
  </Stack.Item>
</Stack.Root>`.trim();

const zOrderCode = `
<script>
  let root;
  const bond = $derived(root?.getBond());
  let active = $state('a');
</script>

<Stack.Root bind:this={root} bind:value={active} class="h-40 w-64">
  <Stack.Item id="a" class="bg-blue-400 rounded-lg">A</Stack.Item>
  <Stack.Item id="b" class="bg-green-400 rounded-lg" style="margin-top:16px; margin-left:16px;">B</Stack.Item>
  <Stack.Item id="c" class="bg-red-400 rounded-lg"   style="margin-top:32px; margin-left:32px;">C</Stack.Item>
</Stack.Root>

<div class="flex gap-2 mt-4">
  <button onclick={() => bond?.bringToFront(active)}>Bring to Front</button>
  <button onclick={() => bond?.bringForward(active)}>Forward</button>
  <button onclick={() => bond?.sendBackward(active)}>Backward</button>
  <button onclick={() => bond?.sendToBack(active)}>Send to Back</button>
</div>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'stack.root': () => ({ class: 'rounded-xl overflow-hidden' }),
  'stack.item': () => ({ class: '' })
});
// Stack uses CSS Grid grid-template-areas: 'stack'
// All items share the same grid area — largest child determines size.
// z-index starts at 1 and re-indexes on every reorder operation.`.trim();

const useCases = [
	{
		title: 'Image with overlay',
		description: 'Layer text, gradients, or badges over images without absolute positioning.'
	},
	{
		title: 'Notification badge',
		description: 'Place a count badge over a button or avatar while keeping parent size natural.'
	},
	{
		title: 'Loading overlay',
		description: 'Show a spinner or skeleton on top of existing content without layout shifts.'
	},
	{
		title: 'Programmatic z-order',
		description: 'Use bringToFront / sendToBack / bringForward / sendBackward to reorder layers at runtime — useful for card stacks, photo albums, or layer panels.'
	},
	{
		title: 'Tooltip / popover anchor',
		description: 'Keep a floating element visually paired with its trigger without breaking document flow.'
	},
	{
		title: 'Watermark',
		description: 'Render a semi-transparent watermark behind content with a single extra Stack.Item.'
	}
];

const componentsSummary = [
	{
		name: 'Stack.Root',
		description: 'CSS Grid container that creates a single named grid area. All children occupy the same area, layering naturally. Exposes bind:value (id of topmost item) and getBond() for programmatic control.'
	},
	{
		name: 'Stack.Item',
		description: 'A child that occupies the shared grid area. Registers itself with StackState on mount. Automatically unregisters on destroy. Accepts an id prop for programmatic reordering.'
	}
];

export const metadata = {
	title: 'Stack - Svelte Atoms',
	description: 'CSS Grid-based layout component for layering elements on top of each other in the same space, with programmatic z-order control.',
	componentTitle: 'Stack',
	componentDescription:
		'A compound component that layers multiple elements in the same visual space using CSS Grid. Unlike absolute positioning, Stack keeps elements in the document flow so the parent container sizes naturally to its largest child. Provides programmatic z-order control via StackBond (bringToFront, sendToBack, bringForward, sendBackward).',
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
	accessibility: [
		'Uses CSS Grid — no absolute positioning, so DOM order is preserved for screen readers',
		'Keyboard navigation follows natural tab order (back → front in DOM)',
		'Items remain fully interactive regardless of visual z-order',
		'bind:value tracks the topmost item for aria-controls or focus management'
	]
};
