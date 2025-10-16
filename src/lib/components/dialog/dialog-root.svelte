<script module lang="ts">
	export type DialogProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		open?: boolean;
		disabled?: boolean;
		factory?: (props: DialogBondProps) => DialogBond;
		children?: Snippet<[{ dialog: DialogBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { animate as motion } from 'motion';
	import { DialogBond, DialogBondState, type DialogBondProps } from './bond.svelte';
	import { Teleport, ActivePortal } from '$svelte-atoms/core/components/portal';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('dialog');

	let {
		class: klass = '',
		open = $bindable(false),
		disabled = false,
		as = preset?.as ?? ('dialog' as E),
		base = preset?.base as B,
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
		if (open) {
			bond.elements.root?.show?.();
			motion(
				node,
				{
					opacity: +open
				},
				{
					duration: 0,
					ease: 'anticipate'
				}
			);
		}
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
	{base}
	portal="root.l1"
	class={[
		'pointer-events-auto fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-900/10 opacity-0',
		!open && 'pointer-events-none',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
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
	<ActivePortal id="root.l1">
		{@render children?.({ dialog: bond })}
	</ActivePortal>
	<!-- </div> -->
</Teleport>
