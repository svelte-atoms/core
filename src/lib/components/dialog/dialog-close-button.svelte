<script module lang="ts">
	export type DialogCloseButtonProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DialogBond } from './bond.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import Close from '$svelte-atoms/core/icons/icon-close.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = DialogBond.get();

	const preset = getPreset('dialog.close-button');

	let {
		class: klass = '',
		as = preset?.as ?? ('button' as E),
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		onclick = undefined,
		...restProps
	}: DialogCloseButtonProps<E, B> = $props();

	function onclick_(ev: MouseEvent) {
		onclick?.(ev);
		if (ev.defaultPrevented) {
			return;
		}

		bond?.state.close();
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'cursor-pointer',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={onclick_}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<Icon>
			<Close />
		</Icon>
	{/if}
</HtmlAtom>
