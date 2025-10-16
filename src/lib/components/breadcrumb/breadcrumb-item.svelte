<script lang="ts" generics="B extends Base = Base">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('breadcrumb.item');

	let {
		class: klass = '',
		href = '',
		as = preset?.as ?? 'a',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	class={[
		'hover:text-primary hover:bg-primary/5 flex gap-2 rounded-lg px-2 py-1',
		toClassValue.apply(null, [preset?.class]),
		toClassValue.apply(null, [klass])
	]}
	data-kind="breadcrumb-item"
	{as}
	{base}
	{href}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
