<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import Kbd from './kbd.svelte';
	import type { ShortcutProps } from './types';

	let {
		class: klass = '',
		keys = [],
		separator = '+',
		children,
		...restProps
	}: ShortcutProps = $props();
</script>

<HtmlAtom
	preset="shortcut"
	as="span"
	class={['shortcut inline-flex items-center gap-1', '$preset', klass]}
	aria-label={keys.join(' ' + separator + ' ')}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{#each keys as key, i}
			{#if i > 0}
				<span class="text-muted-foreground text-xs">{separator}</span>
			{/if}
			<Kbd>{key}</Kbd>
		{/each}
	{/if}
</HtmlAtom>
