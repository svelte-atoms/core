<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import { Icon } from '$ixirjs/ui/components/icon';
	import Close from '$ixirjs/ui/icons/icon-close.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { ToastBond } from './bond.svelte';
	import type { ToastCloseProps } from './types';

	let {
		class: klass = '',
		as = 'button' as E,
		preset = 'toast.close',
		children = undefined,
		onclick = undefined,
		...restProps
	}: ToastCloseProps<E, B> = $props();

	const bond = ToastBond.get();

	const closeProps = $derived({
		...(bond?.dismiss().spread ?? {}),
		...restProps
	});

	function onclick_(ev: MouseEvent) {
		(onclick as ((ev: MouseEvent) => void) | undefined)?.(ev);
		if (ev.defaultPrevented) return;
		bond?.state.close();
	}
</script>

<HtmlAtom
	{as}
	{bond}
	{preset}
	class={['cursor-pointer text-current h-6', '$preset', klass]}
	{...closeProps}
	onclick={onclick_}
>
	{#if children}
		{@render children({ toast: bond })}
	{:else}
		<Icon class="h-full" src={Close} />
	{/if}
</HtmlAtom>
