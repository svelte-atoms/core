<script lang="ts" module>
	export type AccordionItemHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ accordionItem: AccordionItemBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AccordionItemBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('accordion.item.header');

	let {
		class: klass = '',
		as = preset?.as ?? 'button',
		base = preset?.base as B,
		children = undefined,
		onpointerdown = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	const bond = AccordionItemBond.get();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<HtmlAtom
	class={[
		'relative box-border flex w-full cursor-pointer items-center',
		toClassValue(preset?.class, {
			bond: bond
		}),
		toClassValue(klass, {
			bond: bond
		})
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	tabindex={as !== 'button' ? 0 : undefined}
	{as}
	{base}
	{...headerProps}
>
	{@render children?.({
		accordionItem: bond
	})}
</HtmlAtom>
