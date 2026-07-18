<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { ActivePortal, PortalSurface } from '$ixirjs/ui/components/portal';
	import type { Base } from '$ixirjs/ui/components/atom';
	import { mergeAtomProps } from '$ixirjs/ui/components/atom';
	import { DialogBond, DialogRootAtom, type DialogBondProps } from './bond.svelte';
	import type { DialogProps } from './types';
	import { bindBond } from '$ixirjs/ui/shared';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { BACKDROP_PRESS } from '$ixirjs/ui/components/portal/host';

	let {
		class: klass = '',
		preset = undefined,
		open = $bindable(false),
		disabled = false,
		type = 'modal' as 'modal' | 'non-modal',
		as = 'dialog' as E,
		'z-index': zindex = undefined,
		order = undefined,
		portal = undefined,
		factory = defaultFactory,
		children = undefined,
		onopenchange = undefined,
		onclick = undefined,
		...restProps
	}: DialogProps<E, B> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as DialogBond | undefined };

	const binding = bindBond<DialogBond>(
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
			modal: () => type === 'modal'
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<DialogRootAtom, DialogBond, HTMLElement>('root', {
		bond,
		factory: (owner) => new DialogRootAtom(owner as DialogBond)
	});

	const rootProps: Record<string, unknown> = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);
	const backdropPress = $derived(bond.surface(BACKDROP_PRESS));

	function defaultFactory(props: DialogBondProps) {
		return DialogBond.create(props);
	}

	function onclickDialogElement(event: MouseEvent) {
		onclick?.(event);
		if (event.defaultPrevented) return;

		backdropPress?.(bond, event, {
			enabled: type === 'modal',
			onDismiss: (dismissEvent) =>
				bond.stageOpenChange({ event: dismissEvent, reason: 'backdrop-press' })
		});
	}

	export function getBond() {
		return bond;
	}
</script>

<PortalSurface
	owner={bond}
	band="modal"
	{order}
	{as}
	{portal}
	z-index={zindex}
	class={[
		'pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center bg-neutral-900/0 transition-colors duration-200',
		openState && 'pointer-events-auto bg-neutral-900/10',
		'$preset',
		klass
	]}
	onclick={onclickDialogElement}
	{...rootProps}
>
	<ActivePortal>
		{@render children?.({ dialog: bond })}
	</ActivePortal>
</PortalSurface>
