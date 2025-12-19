<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', href = '', as = 'a', children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	{href}
	preset="breadcrumb.item"
	class={[
		'border-border text-foreground/70 hover:text-foreground flex gap-2 rounded-lg px-2 py-1',
		'$preset',
		klass
	]}
	data-kind="breadcrumb-item"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
