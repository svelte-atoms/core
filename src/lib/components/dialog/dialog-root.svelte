<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Teleport, ActivePortal } from '$svelte-atoms/core/components/portal';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond, DialogBondState, type DialogBondProps } from './bond.svelte';
	import type { DialogProps } from './types';
	import { animateDialogRoot } from './motion.svelte';

	let {
		class: klass = '',
		open = $bindable(false),
		disabled = false,
		as = 'dialog' as E,
		portal = undefined,
		factory = _factory,
		onmount = undefined,
		ondestroy = undefined,
		animate = animateDialogRoot(),
		enter = undefined,
		exit = undefined,
		initial = undefined,
		children = undefined,
		...restProps
	}: DialogProps<E, B> = $props();

	const bondProps = defineState<DialogBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty('rest', () => restProps)
		],
		() => ({ disabled })
	);
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new DialogBondState(() => props);
		return new DialogBond(bondState);
	}

	function onclickDialogElement(ev: MouseEvent) {
		if (bond?.elements?.content?.contains(ev.target)) {
			return;
		}

		// Clicked the backdrop
		bond.state.close();
	}

	export function getBond() {
		return bond;
	}
</script>

<Teleport
	{as}
	{bond}
	preset="dialog"
	portal={portal ?? 'root.l1'}
	class={[
		'border-border pointer-events-auto fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-900/10 opacity-0',
		!open && 'pointer-events-none',
		'$preset',
		klass
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={onclickDialogElement}
	oncancel={(ev) => {
		ev.preventDefault();
		open = false;
	}}
	{...rootProps}
>
	<ActivePortal portal={portal ?? 'root.l1'}>
		{@render children?.({ dialog: bond })}
	</ActivePortal>
</Teleport>
