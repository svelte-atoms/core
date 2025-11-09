<script
	lang="ts"
	generics="D, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { nanoid } from 'nanoid';
	import { animate as motion } from 'motion';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { TabBond, TabBondState, type TabBondProps } from './bond.svelte';
	import { TabsBond } from '../bond.svelte';
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { Stack } from '$svelte-atoms/core/components/stack';

	const tabsBond = TabsBond.get();

	const headerElement = $derived(tabsBond?.elements.header);

	let {
		class: klass = '',
		value = nanoid(),
		disabled = false,
		data = undefined,
		factory = _factory,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	const bondProps = defineState<TabBondProps<D>>([
		defineProperty('value', () => value),
		defineProperty('disabled', () => disabled),
		defineProperty('data', () => data)
	]);

	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	const isActive = $derived(bond.state.isActive ?? false);

	const unmount = bond.mount();
	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		const bondState = new TabBondState(() => props);

		return new TabBond(bondState);
	}

	function _animate(node: HTMLElement) {
		motion(node, { opacity: +isActive }, { duration: 0 });
	}

	export function getBond() {
		return bond;
	}
</script>

{#if headerElement && children}
	<Stack.Item
		{bond}
		preset="tab"
		class={[
			'border-border tab-root flex flex-col',
			!isActive && 'pointer-events-none',
			'$preset',
			klass
		]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		{...rootProps}
	>
		{@render children?.({ tab: bond })}
	</Stack.Item>
{/if}
