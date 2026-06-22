<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Teleport, ActivePortal } from '$svelte-atoms/core/components/portal';
	import { containsTarget } from '$svelte-atoms/core/utils/dom.svelte';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond, DialogBondState } from './bond.svelte';
	import type { DialogProps } from './types';
	import { ZLayer } from '../portal/zlayer.svelte';
	import { bindBond, bondFactory, useCapabilities } from '$svelte-atoms/core/shared';

	let {
		class: klass = '',
		preset = undefined,
		open = $bindable(false),
		disabled = false,
		type = 'modal' as 'modal' | 'non-modal',
		as = 'dialog' as E,
		// Default +0 within the `modal` band; a sibling Drawer (+1) wins by convention. Override to reorder.
		'z-index': zindex = 0,
		portal = undefined,
		factory = bondFactory(DialogBondState, DialogBond),
		children = undefined,
		onclick = undefined,
		...restProps
	}: DialogProps<E, B> = $props();

	const z = $derived(
		typeof zindex === 'function'
			? zindex(0)
			: typeof zindex === 'number' && Number.isFinite(zindex)
				? zindex
				: 0
	);
	const layer = new ZLayer('modal', () => z);
	new ZLayer('base', () => 0).share();

	const binding = bindBond<DialogBond>(
		(props) => factory(props),
		{
			open: [() => open, (v) => (open = v)],
			disabled: () => disabled
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();

	// Activate the bond's capability setups: the focus capability captures activeElement on
	// open and restores it however the dialog closes, and the escape capability enrolls this
	// overlay in the topmost-open-overlay stack so a nested popover's Escape closes only it.
	useCapabilities(bond);

	const rootProps: Record<string, unknown> = $derived({
		...binding?.props,
		...restProps
	});

	function onclickDialogElement(ev: MouseEvent) {
		if (containsTarget(bond?.elements?.content, ev.target)) {
			return;
		}

		// User handler runs first; ev.preventDefault() cancels the close
		onclick?.(ev, bond);

		if (ev.defaultPrevented) return;

		if (type === 'modal' && !disabled) {
			bond.state.close();
		}
	}

	export function getBond() {
		return bond;
	}
</script>

<Teleport
	{as}
	portal={portal ?? 'root.l0'}
	class={[
		'pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-900/0 transition-colors duration-200',
		open && 'pointer-events-auto bg-neutral-900/10',
		'$preset',
		klass
	]}
	style="z-index: {layer.value};"
	onclick={onclickDialogElement}
	oncancel={(ev) => {
		ev.preventDefault();
		open = false;
	}}
	{...rootProps}
>
	<ActivePortal portal={portal ?? 'root.l0'}>
		{@render children?.({ dialog: bond })}
	</ActivePortal>
</Teleport>
