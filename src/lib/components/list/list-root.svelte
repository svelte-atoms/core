<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'ul', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';

	let { class: klass = '', as = 'ul' as T, children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	preset="list.root"
	class={['border-border flex flex-col', '$preset', klass]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
