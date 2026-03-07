<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { StackBond } from './bond.svelte';

	const bond = StackBond.get();

	const ID = $props.id();
	let { class: klass = '', id = ID, children, ...restProps } = $props();

	bond?.state.register(id);
	$effect.pre(() => {
		return () => bond?.state.unregister(id);
	});

	const itemProps = $derived({
		...bond?.item(id),
		...restProps
	})
</script>
	
<HtmlAtom
	preset="stack.item"
	class={['stack-item border-border flex flex-1', '$preset', klass]}
	{...itemProps}
>
	{@render children?.()}
</HtmlAtom>
