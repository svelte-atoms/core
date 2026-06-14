<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';

	let { class: klass = '', preset = undefined, children = undefined, ...restProps } = $props();

	const groupProps = $derived({ preset: preset ?? 'list.group', ...restProps });
</script>

<HtmlAtom
	class={[
		'rounded-b-inherit rounded-t-inherit border-border flex flex-col',
		'$preset',
		toClassValue.apply(null, [klass, {}])
	]}
	{...groupProps}
>
	{@render children?.()}
</HtmlAtom>
