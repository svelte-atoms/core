<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond } from './bond.svelte';
	import type { TreeHeaderProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = TreeBond.get();

	let {
		class: klass = '',
		children = undefined,
		onpointerdown = undefined,
		...restProps
	}: TreeHeaderProps<E, B> & HTMLAttributes<Element> = $props();

	const headerProps = $derived({
		...bond?.header().spread,
		...restProps
	});

	function handlePointerDown(ev: PointerEvent) {
		onpointerdown?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		bond?.state.toggle();
	}
</script>

<HtmlAtom
	{bond}
	preset="tree.header"
	class={['border-border cursor-pointer', '$preset', klass]}
	onpointerdown={handlePointerDown}
	{...headerProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
