<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends import('./bond.svelte').ScrollableBond = import('./bond.svelte').ScrollableBond">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ScrollableBond } from './bond.svelte';
	import type { ScrollableThumbProps } from './types';

	let {
		class: klass = '',
		children,
		orientation = 'vertical',
		onmount,
		ondestroy,
		animate,
		enter,
		exit,
		initial,
		...restProps
	}: ScrollableThumbProps<E, B> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableThumb must be used within a ScrollableRoot');
	}

	const thumbProps = $derived({
		...(orientation === 'horizontal' ? bond.thumbX().spread : bond.thumbY().spread),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	as="div"
	preset="scrollable.thumb"
	class={[
		'scrollable-thumb border-border bg-foreground/10 hover:bg-foreground/20 absolute cursor-grab rounded-md active:cursor-grabbing',
		orientation === 'horizontal' ? 'scrollable-thumb-x' : 'scrollable-thumb-y',
		{ horizontal: 'h-full', vertical: 'w-full' }[orientation],
		'$preset',
		klass
	]}
	{enter}
	{exit}
	{initial}
	{animate}
	{onmount}
	{ondestroy}
	{...thumbProps}
>
	{@render children?.()}
</HtmlAtom>
