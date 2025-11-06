<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';

	let { class: klass = '', children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	preset="list.group"
	class={[
		'rounded-b-inherit rounded-t-inherit border-border flex flex-col',
		'$preset',
		toClassValue.apply(null, [klass, {}])
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
