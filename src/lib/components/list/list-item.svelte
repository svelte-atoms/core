<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'li', B extends Base = Base">
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const preset = getPreset('list.item');

	let {
		class: klass = '',
		as = preset?.as ?? 'li',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'flex w-full gap-2 px-4 py-1',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
