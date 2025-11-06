<script module lang="ts">
	export type DialogContentProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as motion } from 'motion';
	import { DURATION } from '$svelte-atoms/core/shared';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';

	const bond = DialogBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DialogContentProps<E, B> = $props();

	const dialogProps = $derived({
		...bond?.content({}),
		...restProps
	});

	const open = $derived(bond?.state?.props?.open ?? false);

	function _animate(node: HTMLElement) {
		if (open) {
			bond?.elements.root?.show?.();
		}

		motion(
			node,
			{ scale: 0.9 + 0.1 * +open, opacity: +open },
			{
				duration: DURATION.normal / 1000,
				ease: 'anticipate'
			}
		);
	}
</script>

<HtmlAtom
	preset="dialog.content"
	class={[
		'bg-card text-foreground border-border flex h-fit w-full max-w-[90svw] flex-col rounded-md border py-4 shadow-sm md:min-w-sm lg:max-w-xl lg:min-w-md',
		'$preset',
		klass
	]}
	{bond}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...dialogProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
