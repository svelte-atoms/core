<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { TabBodyProps } from '../types';
	import { TabBond } from './bond.svelte';

	const bond = TabBond.get();

	if (!bond) {
		throw new Error('TabBody must be used within a Tab');
	}

	let {
		class: klass = '',
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TabBodyProps<E, B> = $props();

	let mounted = $state(false);

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});

	$effect(() => {
		mounted = true;
	});
</script>

<HtmlAtom
	preset="tab.body"
	class={[
		'tab-body border-border pointer-events-auto flex h-auto w-full min-w-full flex-1 flex-col',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ tab: bond })}
</HtmlAtom>
