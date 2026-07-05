<script lang="ts">
	import { HtmlAtom } from '$ixirjs/ui/components/atom';
	import Kbd from './kbd.svelte';
	import type { ShortcutProps } from './types';

	let {
		class: klass = '',
		keys = [],
		separator = '+',
		children,
		...restProps
	}: ShortcutProps = $props();

	let content = $derived(children ?? defaultChildren)
</script>

{#snippet separatorContent()}
	<span class="text-muted-foreground text-xs">{separator}</span>
{/snippet}

{#snippet defaultChildren()}
	{#each keys as key, i ( key )}
		{@const content = i > 0 ? separatorContent : null}
	
		{@render content?.()}
		<Kbd>{key}</Kbd>
	{/each}
{/snippet}

<HtmlAtom
	preset="shortcut"
	as="span"
	class={['shortcut inline-flex items-center gap-1', '$preset', klass]}
	aria-label={keys.join(' ' + separator + ' ')}
	{...restProps}
>
	{@render content()}
</HtmlAtom>
