<script lang="ts">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { Dialog } from '$svelte-atoms/core/components/dialog';
	import { DialogBondState, type DialogBondProps } from '$svelte-atoms/core/components/dialog/bond.svelte';
	import { CommandPaletteBond, CommandPaletteBondState, type CommandPaletteBondProps } from './bond.svelte.ts';
	import type { CommandPaletteRootProps } from './types';

	let {
		open = $bindable(false),
		query = $bindable(''),
		placeholder = 'Search commands…',
		onsearch = undefined,
		children,
		...restProps
	}: CommandPaletteRootProps = $props();

	const seed = {};

	const bondProps = defineState<CommandPaletteBondProps>([
		defineProperty('open', () => open, (v) => { open = v; }),
		defineProperty('query', () => query, (v) => { query = v; }),
		defineProperty('placeholder', () => placeholder),
		defineProperty('onsearch', () => onsearch),
		defineProperty('disabled', () => false),
		defineProperty('rest', () => restProps)
	], () => seed);

	const bond = _factory().share();

	function _factory() {
		const state = new CommandPaletteBondState(() => bondProps);
		return new CommandPaletteBond(state);
	}

	export function getBond() { return bond; }
</script>

<Dialog.Root bind:open {...restProps}>
	{@render children?.({ commandPalette: bond })}
</Dialog.Root>
