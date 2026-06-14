<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { ScrollableBond } from './bond.svelte';
	import type { ScrollableThumbProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		children,
		orientation = 'vertical',

		...restProps
	}: ScrollableThumbProps<E, B> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableThumb must be used within a ScrollableRoot');
	}

	const atom = $derived(orientation === 'horizontal' ? bond.atom('thumbX') : bond.atom('thumbY'));

	const thumbProps = $derived({
		preset: preset ?? 'scrollable.thumb',
		...atom.spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	as="div"
	class={[
		'scrollable-thumb border-border bg-foreground/10 hover:bg-foreground/20 absolute cursor-grab rounded-md active:cursor-grabbing',
		orientation === 'horizontal' ? 'scrollable-thumb-x' : 'scrollable-thumb-y',
		{ horizontal: 'h-full', vertical: 'w-full' }[orientation],
		'$preset',
		klass
	]}
	{...thumbProps}
>
	{@render children?.()}
</HtmlAtom>
