<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('list.item');

	let {
		class: klass = '',
		as = preset?.as ?? 'h3',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'atoms-ui list-title',
		'mb-1 flex w-full px-6 py-1 font-medium',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
