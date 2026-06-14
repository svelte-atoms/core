<script module lang="ts">
	export type { PortalOuterProps } from './types';
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PortalOuterProps } from './types';
	import { PortalsBond, PortalBond, PortalState, type PortalStateProps } from '.';
	import { RootBond } from '$svelte-atoms/core/components/root';
	import { HtmlAtom, type ElementType, type Base } from '$svelte-atoms/core/components/atom';
	import { bindBond } from '$svelte-atoms/core/shared/bind-bond.svelte';
	import type { Factory } from '$svelte-atoms/core/types';

	type Element = ElementType<E>;

	let {
		class: klass = '',
		preset = undefined,
		id,
		factory = defaultFactory,
		children = undefined,
		...restProps
	}: PortalOuterProps<E, B> & HTMLAttributes<Element> = $props();

	const rootBond = RootBond.get();
	const portalsBond = PortalsBond.get();

	const binding = bindBond<PortalBond>(
		(props) => (factory as Factory<PortalBond>)(props),
		{
			id: () => id,
			rest: () => restProps
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();

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

	function defaultFactory(props: PortalStateProps) {
		const portalState = new PortalState(props);
		return new PortalBond(portalState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['border-border pointer-events-none', '$preset', klass]}
	{...binding.props}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
