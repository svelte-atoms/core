<script module lang="ts">
	export type { PortalOuterProps } from './types';
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PortalOuterProps } from './types';
	import { PortalsBond, PortalBond, PortalState, type PortalStateProps } from '.';
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

	// Eager register so descendants (e.g. ActivePortal) resolve this portal within the same render;
	// `id` is read once at init.
	// svelte-ignore state_referenced_locally
	const unregister = portalsBond?.state.register(id, bond);

	$effect(() => {
		return () => {
			unregister?.();
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

<!--
	Portal surface: an `absolute inset-0` layer rendered in place (not detached to <body>), so it
	scrolls and stacks with the host. `pointer-events-none` lets page clicks through (overlays opt
	back in).
-->
<HtmlAtom
	class={[
		'portal-root border-border pointer-events-none absolute inset-0',
		'$preset',
		klass
	]}
	{...binding.props}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>