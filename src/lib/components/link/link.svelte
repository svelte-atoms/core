<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const preset = getPreset('link');

	let {
		class: klass = '',
		base = preset?.base as B,
		children,
		...restProps
	}: HtmlAtomProps<E, B> = $props();
</script>

<HtmlAtom
	class={[
		'hover:text-primary/80 active:text-primary/100 cursor-pointer underline transition-colors duration-200',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	as="a"
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
