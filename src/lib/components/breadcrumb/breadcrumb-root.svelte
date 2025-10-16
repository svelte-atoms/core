<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';

	const preset = getPreset('breadcrumb');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	class={[
		'flex flex-nowrap items-center gap-1',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	data-kind="breadcrumb-root"
	{as}
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
