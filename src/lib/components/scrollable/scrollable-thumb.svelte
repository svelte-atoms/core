<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ScrollableBond } from './bond.svelte';
	import type { ScrollableThumbProps } from './types';

	let {
		class: klass = '',
		children = undefined,
		orientation,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ScrollableThumbProps<T> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableThumb must be used within a ScrollableRoot');
	}

	const scrollX = $derived(bond.state.props.scrollX);
	const scrollY = $derived(bond.state.props.scrollY);

	const clientWidth = $derived(bond.state.props.clientWidth);
	const clientHeight = $derived(bond.state.props.clientHeight);

	const scrollWidth = $derived(bond.state.props.scrollWidth);
	const scrollHeight = $derived(bond.state.props.scrollHeight);

	const thumbX = $derived((scrollX / scrollWidth) * 100);
	const thumbY = $derived((scrollY / scrollHeight) * 100);

	const thumbWidth = $derived((clientWidth / scrollWidth) * 100);
	const thumbHeight = $derived((clientHeight / scrollHeight) * 100);

	const thumbProps = $derived(bond.thumb(orientation));

	function _animate(node: HTMLElement) {
		if (orientation === 'horizontal') {
			node.style.left = thumbX + '%';
			node.style.transform = `translateZ(1px)`;
			node.style.width = thumbWidth + '%';
		} else {
			node.style.top = thumbY + '%';
			node.style.transform = `translateZ(1px)`;
			node.style.height = thumbHeight + '%';
		}
	}
</script>

<HtmlAtom
	{bond}
	preset="scrollable.thumb"
	class={[
		'scrollable-thumb border-border bg-foreground/10 hover:bg-foreground/20 absolute cursor-grab rounded-md active:cursor-grabbing',
		orientation === 'horizontal' ? 'scrollable-thumb-x' : 'scrollable-thumb-y',
		{ horizontal: 'h-full', vertical: 'w-full' }[orientation],
		'$preset',
		klass
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...thumbProps}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
