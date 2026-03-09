<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import type { ChipCloseButtonProps } from './types';
	import CloseIcon from '../../icons/icon-close.svelte';

	let {
		class: klass = '',
		preset = 'chip.close-button',
		icon = undefined,
		onclick = undefined,
		...restProps
	}: ChipCloseButtonProps = $props();
</script>

<HtmlAtom
	{preset}
	as="button"
	class={[
		'bg-foreground/0 hover:bg-foreground/5 active:bg-foreground/10 inline-flex aspect-square h-full cursor-pointer items-center justify-center rounded-xs p-0.5',
		'$preset',
		klass
	]}
	type="button"
	{onclick}
	{...restProps}
>
	{#if icon}
		{@render icon?.()}
	{:else}
		<Icon src={CloseIcon} class="h-full" />
	{/if}
</HtmlAtom>
