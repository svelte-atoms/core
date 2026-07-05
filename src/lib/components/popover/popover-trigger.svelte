<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
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
		onpointerenter = undefined,
		...restProps
	}: PopoverTriggerProps<E, B> = $props();
 
	const triggerProps = $derived({
		...bond.trigger().spread,
		...restProps
	});

	function handlePointerEnter(event: PointerEvent) {
		onpointerenter?.(event);
		if(event.defaultPrevented) return;

		bond.state.tracking = true;
	}
</script>

<HtmlAtom
	{as}
	{bond}
	{preset}
	class={['border-border flex w-fit cursor-pointer rounded-md p-2', '$preset', klass]}
	type={as === 'button' ? 'button' : undefined}
	onpointerenter={handlePointerEnter}
	{...triggerProps}
>
	{@render children?.({ popover: bond })}
</HtmlAtom>
