<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type SlideoverRootProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ slideover: DrawerBond }]>;
			initial?: (node: HTMLElement, bond: DrawerBond) => void;
			enter?: (node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>;
			exit?: (node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>;
		}
	> & {
		open?: boolean;
		disabled?: boolean;
		portal?: string;
		onclose?: (event: Event, bond: DrawerBond) => void;
		factory?: Factory<DrawerBond>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='dialog', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Override } from '$svelte-atoms/core/types';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { type TransitionFunction } from '$svelte-atoms/core/components/element';
	import Teleport from '$svelte-atoms/core/components/portal/teleport.svelte';
	import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
	import { DrawerBond, DrawerBondState, type DrawerBondProps } from './bond.svelte';

	type Element = HTMLElementTagNameMap[E];

	let {
		open = $bindable(false),
		children = undefined,
		class: klass = '',
		as = 'dialog',
		disabled = false,
		portal = undefined,
		onclose = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		factory = _factory,
		...restProps
	}: SlideoverRootProps<E, B> & HTMLAttributes<Element> = $props();

	const bondProps = defineState<DrawerBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty('disabled', () => disabled)
		],
		() => ({})
	);
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	$effect(() => {
		if (bond.elements.root instanceof HTMLDialogElement) {
			if (open) {
				bond.elements.root?.show?.();
			}
		}
	});

	function _factory(props: typeof bondProps) {
		const bondState = new DrawerBondState(() => props);
		const bond = new DrawerBond(bondState);

		return bond;
	}

	export function getBond() {
		return bond;
	}
</script>

<Teleport
	{as}
	{bond}
	portal={portal ?? 'root.l1'}
	preset="drawer"
	class={[
		'border-border pointer-events-auto h-full w-full overflow-hidden bg-transparent',
		!open && 'pointer-events-none',
		'$preset',
		klass
	]}
	closeby="none"
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ drawer: bond })}
</Teleport>
