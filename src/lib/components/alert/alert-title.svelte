<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { AlertBond, AlertTitleAtom } from './bond.svelte';
	import type { AlertTitleProps } from './types';

	const bond = AlertBond.get();

	let {
		as = 'h4' as E,
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertTitleProps<E, B> = $props();

	const atom = createAtomInstance<AlertTitleAtom, AlertBond>('title', {
		bond,
		factory: (owner) => new AlertTitleAtom(owner).role('label')
	});

	const titleProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['alert-title border-border text-sm leading-tight font-medium', '$preset', klass]}
	{...titleProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
