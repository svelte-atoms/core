<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='dialog', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { ActivePortal, PortalSurface } from '$ixirjs/ui/components/portal';
	import type { Base } from '$ixirjs/ui/components/atom';
	import { DrawerBond, DrawerRootAtom } from './bond.svelte';
	import type { SlideoverRootProps } from './types';
	import { animateDrawerRoot } from './motion.svelte';
	import { bindBond, createAtomInstance } from '$ixirjs/ui/shared';
	import { mergeAtomProps } from '$ixirjs/ui/components/atom';

	type Element = HTMLElementTagNameMap[E];

	let {
		open = $bindable(false),
		side = 'right',
		children = undefined,
		class: klass = '',
		preset = undefined,
		disabled = false,
		portal = undefined,
		position = 'fixed',
		'z-index': zindex = undefined,
		order = undefined,
		onopenchange = undefined,
		// swallowed: defaults is an internal HtmlAtom layer, not a public Drawer.Root override.
		defaults: _defaults = undefined,
		// swallowed: old fallback prop is removed; keep it off the DOM spread.
		fallback: _fallback = undefined,
		factory = (props) => DrawerBond.create(props),
		...restProps
		// Omit `children` from HTMLAttributes: it declares `children?: Snippet` (0-arg), which would
		// intersect with SlideoverRootProps' 1-arg `DrawerChildren` into an unsatisfiable type.
	}: SlideoverRootProps<E, B> & Omit<HTMLAttributes<Element>, 'children'> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as DrawerBond | undefined };

	const binding = bindBond<DrawerBond>(
		(props) => factory(props),
		{
			open: [
				() => openState,
				(v) => {
					const changed = !Object.is(openState, v);
					openState = v;
					open = openState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onopenchange?.(openState, {
							bond: callbackBond,
							...callbackBond.takeOpenChangeContext()
						});
					}
				}
			],
			disabled: () => disabled,
			side: () => side
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;

	const rootAtom = createAtomInstance<DrawerRootAtom, DrawerBond>('root', {
		bond,
		factory: (owner) => new DrawerRootAtom(owner!)
	});

	const defaults = {
		animate: animateDrawerRoot({}),
		initial: animateDrawerRoot({ duration: 0 })
	};

	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	$effect(() => {
		if (bond.elements.root instanceof HTMLDialogElement && bond.isOpen) {
			bond.elements.root.show?.();
		}
	});

	export function getBond() {
		return bond;
	}
</script>

<PortalSurface
	owner={bond}
	band="modal"
	{order}
	{portal}
	z-index={zindex}
	class={[
		'pointer-events-none inset-0 h-full w-full overflow-hidden bg-transparent',
		!openState && 'pointer-events-none',
		'$preset',
		klass
	]}
	style="position: {position};"
	closeby="none"
	{defaults}
	{...rootProps}
>
	<ActivePortal>
		{@render children?.({ drawer: bond })}
	</ActivePortal>
</PortalSurface>
