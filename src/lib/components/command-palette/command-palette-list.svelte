<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CommandPaletteBond } from './bond.svelte.ts';
	import type { CommandPaletteListProps } from './types';

	const bond = CommandPaletteBond.get();

	let {
		class: klass = '',
		preset = 'command-palette.list',
		children,
		...restProps
	}: CommandPaletteListProps & HTMLAttributes<HTMLDivElement> = $props();

	$effect(() => {
		// Clear item registry when list re-renders (query changes)
		bond?.state.clearItems();
	});
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['command-palette-list max-h-80 overflow-y-auto p-1', '$preset', klass]}
	role="listbox"
	aria-label="Commands"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
