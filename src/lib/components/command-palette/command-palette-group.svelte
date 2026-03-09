<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { CommandPaletteGroupProps } from './types';

	let {
		class: klass = '',
		label = '',
		preset = 'command-palette.group',
		children,
		...restProps
	}: CommandPaletteGroupProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['command-palette-group py-1', '$preset', klass]}
	role="group"
	aria-label={label}
	{...restProps}
>
	{#if label}
		<div class="text-muted-foreground px-2 py-1.5 text-xs font-medium">{label}</div>
	{/if}
	{@render children?.()}
</HtmlAtom>
