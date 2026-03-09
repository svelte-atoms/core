<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ChipProps } from './types';
	import ChipCloseButton from './chip-close-button.svelte';
	import { chipVariants } from './variants';

	let {
		class: klass = '',
		preset = 'chip',
		variant = 'default',
		size = 'md',
		children = undefined,
		icon = undefined,
		closeButton = undefined,
		onclose = undefined,
		...restProps
	}: ChipProps = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={[
		'chip border-border disabled:bg-muted disabled:text-muted-foreground w-fit cursor-pointer transition-colors duration-100',
		'$preset',
		klass
	]}
	variants={chipVariants}
	{variant}
	{size}
	{...restProps}
>
	{@render children?.()}

	{#if closeButton}
		{@render closeButton?.()}
	{:else}
		<ChipCloseButton {icon} onclick={onclose} />
	{/if}
</HtmlAtom>
