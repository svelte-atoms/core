<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { StackBond } from './bond.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ElementType } from '$svelte-atoms/core/components/atom';

	type Element = ElementType<E>;

	const bond = StackBond.get();

	const ID = $props.id();
	let {
		class: klass = '',
		id = ID,
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> & { id?: string } = $props();

	$effect.pre(() => {
		bond?.state.register(id);
		return () => bond?.state.unregister(id);
	});

	const itemProps = $derived({
		...bond?.item(id),
		...restProps
	});
</script>

<HtmlAtom
	preset="stack.item"
	class={['stack-item', '$preset', klass]}
	{...itemProps}
>
	{@render children?.()}
</HtmlAtom>
