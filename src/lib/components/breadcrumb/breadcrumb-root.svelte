<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'div', preset = undefined, children = undefined, ...restProps } = $props();

	const rootProps = $derived({ preset: preset ?? 'breadcrumb', ...restProps });
</script>

<HtmlAtom
	{as}
	class={['border-border flex flex-nowrap items-center gap-1', '$preset', klass]}
	data-kind="breadcrumb-root"
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
