<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import { Icon } from '$svelte-atoms/core/components/icon';
	import Close from '$svelte-atoms/core/icons/icon-close.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';
	import type { DialogCloseButtonProps } from './types';

	const bond = DialogBond.get();

	let {
		class: klass = '',
		as = 'button' as E,
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
	{bond}
	preset="dialog.close-button"
	class={['border-border cursor-pointer', '$preset', klass]}
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
