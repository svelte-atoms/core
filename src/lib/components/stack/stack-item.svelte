<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', children, ...restProps } = $props();
</script>

<HtmlAtom preset="stack.item" class={['stack-item flex flex-1', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
