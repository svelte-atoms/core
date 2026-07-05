<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import {
		AccordionItemBond,
		AccordionItemRootAtom,
		type AccordionItemBondProps
	} from './bond.svelte';
	import type { AccordionItemRootProps } from './types';

	let {
		class: klass = '',
		value,
		data = undefined,
		disabled = false,
		factory = defaultFactory,
		children = undefined,
		preset = undefined,
		...restProps
	}: AccordionItemRootProps<E, B> = $props();

	const binding = bindBond<AccordionItemBond>(
		(props) => factory(props),
		{
			data: () => data,
			disabled: () => disabled,
			value: () => value
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	const rootAtom = createAtomInstance<AccordionItemRootAtom, AccordionItemBond>('root', {
		bond,
		factory: (owner) => new AccordionItemRootAtom(owner as AccordionItemBond)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: AccordionItemBondProps) {
		return AccordionItemBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={['border-border', '$preset', klass]} {...rootProps}>
	{@render children?.({ accordionItem: bond })}
</HtmlAtom>
