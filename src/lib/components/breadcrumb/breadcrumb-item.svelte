<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', href = '', as = 'a', children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	{href}
	preset="breadcrumb.item"
	class={[
		'hover:text-primary hover:bg-primary/5 border-border flex gap-2 rounded-lg px-2 py-1',
		'$preset',
		klass
	]}
	data-kind="breadcrumb-item"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
