<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import type { ChipProps } from './types';
	import CloseIcon from '../../icons/icon-close.svelte';

	let {
		class: klass = '',
		preset = 'chip',
		children = undefined,
		icon = undefined,
		onclose = undefined,
		...restProps
	}: ChipProps & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={[
		'chip text-foreground bg-foreground/5 border-border hover:bg-foreground/10 active:bg-foreground/15 disabled:bg-muted disabled:text-muted-foreground w-fit cursor-pointer rounded-md px-3 py-1 transition-colors duration-100',
		'$preset',
		klass
	]}
	{...restProps}
>
	{@render children?.()}

	<button
		class="bg-foreground/0 hover:bg-foreground/5 active:bg-foreground/10 inline-flex aspect-square h-full cursor-pointer items-center justify-center rounded-xs p-0.5"
		type="button"
		onclick={onclose}
	>
		{#if icon}
			{@render icon?.()}
		{:else}
			<Icon src={CloseIcon} class="h-full" />
		{/if}
	</button>
</HtmlAtom>
