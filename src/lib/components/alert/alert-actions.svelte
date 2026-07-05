<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { AlertBond, AlertActionsAtom } from './bond.svelte';
	import type { AlertActionsProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertActionsProps<E, B> & HTMLAttributes<Element> = $props();

	const atom = createAtomInstance<AlertActionsAtom, AlertBond>('actions', {
		bond,
		factory: (owner) => new AlertActionsAtom(owner)
	});

	const actionsProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{bond}
	class={['alert-actions border-border mt-3 flex items-center gap-2', '$preset', klass]}
	{...actionsProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
