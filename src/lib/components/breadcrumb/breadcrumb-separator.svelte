<script lang="ts" generics="B extends Base = Base">
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('breadcrumb.separator');

	let {
		class: klass = '',
		as = preset?.as ?? 'span',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	class={[
		'text-stroke-0/50 px-0',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	data-kind="breadcrumb-separator"
	{as}
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
