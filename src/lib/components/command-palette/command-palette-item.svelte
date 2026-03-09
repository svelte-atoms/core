<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CommandPaletteBond } from './bond.svelte.ts';
	import type { CommandPaletteItemProps } from './types';

	const bond = CommandPaletteBond.get();

	let {
		class: klass = '',
		value = '',
		disabled = false,
		preset = 'command-palette.item',
		iconContent = undefined,
		suffixContent = undefined,
		onselect = undefined,
		children,
		...restProps
	}: CommandPaletteItemProps & HTMLButtonAttributes = $props();

	let el: HTMLElement | undefined = $state();

	$effect(() => {
		if (el) bond?.state.registerItem(el);
		return () => { if (el) bond?.state.unregisterItem(el); };
	});

	const isActive = $derived(bond?.state.getActiveItem() === el);

	function handleClick() {
		if (disabled) return;
		onselect?.();
		bond?.state.close();
	}
</script>

<HtmlAtom
	bind:el
	{preset}
	as="button"
	type="button"
	{disabled}
	class={[
		'command-palette-item flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
		'hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50',
		isActive && 'bg-accent',
		'$preset',
		klass
	]}
	role="option"
	aria-selected={isActive}
	onclick={handleClick}
	{...restProps}
>
	{#if iconContent}
		<span class="text-muted-foreground flex h-4 w-4 shrink-0 items-center justify-center">
			{@render iconContent()}
		</span>
	{/if}

	<span class="flex-1 truncate text-left">
		{@render children?.()}
	</span>

	{#if suffixContent}
		<span class="text-muted-foreground ml-auto shrink-0">
			{@render suffixContent()}
		</span>
	{/if}
</HtmlAtom>
