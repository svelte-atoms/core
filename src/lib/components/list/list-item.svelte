<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'li', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		as = 'li' as T,
		preset: presetKey = 'list.item',
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	preset={presetKey}
	class={['border-border flex w-full gap-2 px-4 py-1', '$preset', klass]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
