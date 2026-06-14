<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'ul', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'ul' as T, preset = undefined, children = undefined, ...restProps } = $props();

	const rootProps = $derived({ preset: preset ?? 'list.root', ...restProps });
</script>

<HtmlAtom
	{as}
	class={['flex flex-col', '$preset', klass]}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
