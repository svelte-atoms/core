<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', href = '', as = 'a', preset = undefined, children = undefined, ...restProps } = $props();

	const itemProps = $derived({ preset: preset ?? 'breadcrumb.item', ...restProps });
</script>

<HtmlAtom
	{as}
	{href}
	class={[
		'border-border text-foreground/70 hover:text-foreground flex gap-2 rounded-lg px-2 py-1',
		'$preset',
		klass
	]}
	data-kind="breadcrumb-item"
	{...itemProps}
>
	{@render children?.()}
</HtmlAtom>
