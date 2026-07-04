<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { AlertBond, AlertContentAtom } from './bond.svelte';
	import type { AlertContentProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertContentProps<E, B> & HTMLAttributes<Element> = $props();

	const atom = createAtomInstance<AlertContentAtom, AlertBond>('content', {
		bond,
		factory: (owner) => new AlertContentAtom(owner)
	});

	const contentProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{bond}
	class={['alert-content border-border flex-1 space-y-1', '$preset', klass]}
	{...contentProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
