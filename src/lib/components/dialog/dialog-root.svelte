<script module lang="ts">
	export type DialogProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		open?: boolean;
		disabled?: boolean;
		portal?: string;
		factory?: (props: DialogBondProps) => DialogBond;
		children?: Snippet<[{ dialog: DialogBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { animate as motion } from 'motion';
	import { Teleport, ActivePortal } from '$svelte-atoms/core/components/portal';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
	import { DURATION } from '$svelte-atoms/core/shared';
	import { DialogBond, DialogBondState, type DialogBondProps } from './bond.svelte';

	let {
		class: klass = '',
		open = $bindable(false),
		disabled = false,
		as = 'dialog' as E,
		portal = undefined,
		factory = _factory,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
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
			)
		],
		() => ({ disabled })
	);
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root({}),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new DialogBondState(() => props);
		return new DialogBond(bondState);
	}

	function _animate(node: HTMLDialogElement) {
		motion(
			node,
			{
				opacity: +open
			},
			{
				duration: DURATION.normal / 1000,
				ease: 'anticipate',
				onComplete: () => {
					if (!open) {
						node?.close?.();
					}
				}
			}
		);
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
	<!-- <div class="w-full h-full flex items-center justify-center"> -->
	<ActivePortal id={portal ?? 'root.l1'}>
		{@render children?.({ dialog: bond })}
	</ActivePortal>
	<!-- </div> -->
</Teleport>
