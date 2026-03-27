<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { PopoverBond } from './bond.svelte';
	import type { PopoverTriggerProps } from './types';

	const bond = PopoverBond.get();

	if (!bond) {
		throw new Error('<PopoverTrigger /> must be used within a <Popover />');
	}

	let {
		class: klass = '',
		as = 'button' as E,
		preset = 'popover.trigger',
		children = undefined,
		...restProps
	}: PopoverTriggerProps<E, B> = $props();
 
	const triggerProps = $derived({
		...bond.trigger().spread,
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	{preset}
	class={['border-border flex w-fit cursor-pointer rounded-md p-2', '$preset', klass]}
	type={as === 'button' ? 'button' : undefined}
	{...triggerProps}
>
	{@render children?.({ popover: bond })}
</HtmlAtom>
