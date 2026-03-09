<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { KbdProps } from './types';

	let { class: klass = '', children, ...restProps }: KbdProps = $props();
</script>

<HtmlAtom
	preset="kbd"
	as="kbd"
	class={[
		'kbd border-border bg-muted text-foreground inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 font-mono text-xs font-medium shadow-[inset_0_-1px_0] shadow-black/10',
		'$preset',
		klass
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
