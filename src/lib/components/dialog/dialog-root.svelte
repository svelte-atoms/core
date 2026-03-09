<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Teleport, ActivePortal } from '$svelte-atoms/core/components/portal';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond, DialogBondState, type DialogBondProps } from './bond.svelte';
	import type { DialogProps } from './types';
	import { ZIndex } from '../portal/zindex';

	let {
		class: klass = '',
		open = $bindable(false),
		disabled = false,
		type = 'modal' as 'modal' | 'non-modal',
		as = 'dialog' as E,
		"z-index": zindex = 20,
		portal = undefined,
		factory = _factory,
		children = undefined,
		trigger = undefined,
		onclick = undefined,
		...restProps
	}: DialogProps<E, B> = $props();

	new ZIndex(() => zindex).share();

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
		// Ignore clicks that originated inside the dialog content
		if (bond?.elements?.content?.contains(ev.target as Node)) {
			return;
		}

		// Let the user's onclick handler run first; they can call ev.preventDefault() to cancel close
		onclick?.(ev, bond);

		if (ev.defaultPrevented) return;

		// Close on backdrop click unless opted out
		if (type === 'modal' && !disabled) {
			bond.state.close();
		}
	}

	export function getBond() {
		return bond;
	}
</script>

{@render trigger?.({ dialog: bond })}

<Teleport
	{as}
	{bond}
	preset="dialog"
	portal={portal ?? 'root.l0'}
	class={[
		'border-border pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-900/0 transition-colors duration-200',
		open && 'pointer-events-auto bg-neutral-900/10',
		'$preset',
		klass
	]}
	style={`z-index: ${zindex};`}
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
