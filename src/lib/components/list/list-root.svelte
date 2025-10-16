<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'ul', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const preset = getPreset('list.item');

	let {
		class: klass = '',
		as = preset?.as ?? 'ul',
		base = preset?.base as B,
		children = undefined,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'atoms-ui atom-list flex flex-col',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
