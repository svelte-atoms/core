<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'div', children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	preset="breadcrumb"
	class={['flex flex-nowrap items-center gap-1', '$preset', klass]}
	data-kind="breadcrumb-root"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
