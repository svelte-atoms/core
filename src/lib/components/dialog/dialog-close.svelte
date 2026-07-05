<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import { Icon } from '$ixirjs/ui/components/icon';
	import Close from '$ixirjs/ui/icons/icon-close.svelte';
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { DialogBond, DialogCloseAtom } from './bond.svelte';
	import type { DialogCloseButtonProps } from './types';

	const bond = DialogBond.getOrThrow('<Dialog.Close /> must be used within a <Dialog.Root />');

	let {
		class: klass = '',
		preset = undefined,
		as = 'button' as E,
		children = undefined,
		onclick = undefined,
		...restProps
	}: DialogCloseButtonProps<E, B> = $props();

	const atom = createAtomInstance<DialogCloseAtom, DialogBond, HTMLElement>('close', {
		bond,
		factory: (owner) => new DialogCloseAtom(owner as DialogBond)
	});

	const closePreset = $derived(preset ?? `${bond.preset}.close`);
	const defaults = $derived({
		type: as === 'button' ? 'button' : undefined,
		role: as === 'button' ? undefined : 'button',
		tabindex: as === 'button' ? undefined : 0
	});
	const closeProps = $derived(mergeAtomProps(atom, closePreset, restProps));

	function onclick_(ev: MouseEvent) {
		onclick?.(ev);
		if (ev.defaultPrevented) return;

		(closeProps.onclick as ((ev: MouseEvent) => void) | undefined)?.(ev);
	}
</script>

<HtmlAtom
	{as}
	{bond}
	{defaults}
	class={['cursor-pointer', '$preset', klass]}
	{...closeProps}
	onclick={onclick_}
>
	{#if children}
		{@render children?.({ dialog: bond })}
	{:else}
		<Icon>
			<Close />
		</Icon>
	{/if}
</HtmlAtom>
