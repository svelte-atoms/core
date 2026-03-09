<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { CommandPaletteEmptyProps } from './types';

	let {
		class: klass = '',
		preset = 'command-palette.empty',
		children,
		...restProps
	}: CommandPaletteEmptyProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['command-palette-empty text-muted-foreground py-8 text-center text-sm', '$preset', klass]}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		No results found.
	{/if}
</HtmlAtom>
