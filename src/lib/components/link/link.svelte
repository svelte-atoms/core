<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', children, ...restProps }: HtmlAtomProps<E, B> = $props();
</script>

<HtmlAtom
	preset="link"
	class={[
		'hover:text-primary/80 active:text-primary/100 cursor-pointer underline transition-colors duration-200',
		'$preset',
		klass
	]}
	as="a"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
