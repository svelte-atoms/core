<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableCaptionProps } from './types';

	let { class: klass = '', preset = 'table.caption', children, ...restProps }: TableCaptionProps & HTMLAttributes<HTMLTableCaptionElement> = $props();
</script>

<HtmlAtom {preset} as="caption" class={['table-caption text-muted-foreground mt-2 text-sm', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
