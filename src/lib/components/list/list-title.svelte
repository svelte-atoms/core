<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'h3' as T, preset = undefined, children = undefined, ...restProps } = $props();

	const titleProps = $derived({ preset: preset ?? 'list.title', ...restProps });
</script>

<HtmlAtom
	{as}
	class={['mb-1 flex w-full px-6 py-1 font-medium', '$preset', klass]}
	{...titleProps}
>
	{@render children?.()}
</HtmlAtom>
