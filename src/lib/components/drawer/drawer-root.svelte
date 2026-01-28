<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='dialog', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import Teleport from '$svelte-atoms/core/components/portal/teleport.svelte';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DrawerBond, DrawerBondState, type DrawerBondProps } from './bond.svelte';
	import type { SlideoverRootProps } from './types';
	import { ActivePortal } from '../portal';
	import { animateDrawerRoot } from './motion';

	type Element = HTMLElementTagNameMap[E];

	let {
		open = $bindable(false),
		children = undefined,
		class: klass = '',
		as = 'div',
		disabled = false,
		portal = undefined,
		onclose = undefined,
		initial = animateDrawerRoot({ duration: 0 }),
		animate = animateDrawerRoot({}),
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
			defineProperty('disabled', () => disabled),
			defineProperty('rest', () => restProps)
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
		'border-border pointer-events-none fixed inset-0 h-full w-full overflow-hidden bg-transparent',
		!open && 'pointer-events-none',
		'$preset',
		klass
	]}
	closeby="none"
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...rootProps}
>
	<ActivePortal portal={portal ?? 'root.l1'}>
		{@render children?.({ drawer: bond })}
	</ActivePortal>
</Teleport>
