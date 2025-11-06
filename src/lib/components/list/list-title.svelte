<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'h3' as T, children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	preset="list.title"
	class={['border-border mb-1 flex w-full px-6 py-1 font-medium', '$preset', klass]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
