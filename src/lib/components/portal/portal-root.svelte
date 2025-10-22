<script module lang="ts">
	export type PortalOuterProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		id: RootPortals | (string & {});
		children?: Snippet;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { PortalsBond, PortalBond, PortalState, type PortalStateProps } from '.';
	import { RootBond } from '$svelte-atoms/core/components/root';
	import type { RootPortals } from '$svelte-atoms/core/components/root/root.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { toClassValue, defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const preset = getPreset('portal');

	let {
		class: klass = '',
		id,
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: PortalOuterProps<E, B> & HTMLAttributes<Element> = $props();

	const rootBond = RootBond.get();
	const portalsBond = PortalsBond.get();

	const bondProps = defineState<PortalStateProps>([defineProperty('id', () => id)]);
	const bond = factory(bondProps) as PortalBond;

	portalsBond?.state.set(id, bond);

	$effect(() => {
		if (rootBond) {
			rootBond.state.setPortal(id, bond);
		}

		return () => {
			portalsBond?.state.delete(id);
			bond.destroy();
		};
	});

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const portalState = new PortalState(() => props);
		return new PortalBond(portalState).share();
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={[
		'pointer-events-none',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	{as}
	{base}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
