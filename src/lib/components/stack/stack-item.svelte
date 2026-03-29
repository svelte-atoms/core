<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { StackBond } from './bond.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ElementType } from '$svelte-atoms/core/components/atom';

	type Element = ElementType<E>;

	const bond = StackBond.get();

	if (!bond) {
		throw new Error('Stack.Item must be used within a Stack.Root component.');
	}

	let {
		class: klass = '',
		value,
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> & { value: string } = $props();

	$effect.pre(() => {
		if(!bond) return;

		bond.state.register(value)

		return () => {
			bond.state.unregister(value)
		};
	});

	const itemProps = $derived({
		...bond?.item(value).spread,
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
