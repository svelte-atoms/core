<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import { Icon } from '$ixirjs/ui/components/icon';
	import Close from '$ixirjs/ui/icons/icon-close.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { DialogBond } from './bond.svelte';
	import type { DialogCloseButtonProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		as = 'button' as E,
		children = undefined,
		onclick = undefined,
		onkeydown = undefined,
		...restProps
	}: DialogCloseButtonProps<E, B> = $props();

	const part = usePart(DialogBond, 'closeButton', () => restProps, {
		message: '<Dialog.Close /> must be used within a <Dialog.Root />',
		preset: () => preset
	});
	const bond = part.bond;
	const defaults = $derived({
		type: as === 'button' ? 'button' : undefined,
		role: as === 'button' ? undefined : 'button',
		tabindex: as === 'button' ? undefined : 0
	});

	function onclick_(event: MouseEvent) {
		onclick?.(event);
		if (event.defaultPrevented) return;

		bond.stageOpenChange({ event, reason: 'close-button' });
		(part.props.onclick as ((event: MouseEvent) => void) | undefined)?.(event);
	}

	function onkeydown_(event: KeyboardEvent) {
		onkeydown?.(event);
		if (event.defaultPrevented) return;

		if (event.key === 'Enter' || event.key === ' ') {
			bond.stageOpenChange({ event, reason: 'close-button' });
		}
		(part.props.onkeydown as ((event: KeyboardEvent) => void) | undefined)?.(event);
	}
</script>

<HtmlAtom
	{as}
	{bond}
	{defaults}
	class={['cursor-pointer', '$preset', klass]}
	{...part.props}
	onclick={onclick_}
	onkeydown={onkeydown_}
>
	{#if children}
		{@render children?.({ dialog: bond })}
	{:else}
		<Icon>
			<Close />
		</Icon>
	{/if}
</HtmlAtom>
