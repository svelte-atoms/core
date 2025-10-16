<script module lang="ts">
	export type DialogContentProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as motion } from 'motion';
	import { DialogBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = DialogBond.get();

	const preset = getPreset('dialog.content');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
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
		motion(
			node,
			{ scale: 0.9 + 0.1 * +open, opacity: +open },
			{
				duration: 0.3,
				ease: 'anticipate',
				onComplete: () => {
					if (!open) {
						const root = bond?.elements.root;

						root?.close?.();
						console.log(root);
					}
				}
			}
		);
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'bg-card text-foreground border-border flex h-fit w-full max-w-[90svw] flex-col rounded-md border py-4 shadow-sm md:min-w-sm lg:max-w-xl lg:min-w-md',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
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
