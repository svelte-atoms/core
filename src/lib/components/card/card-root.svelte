<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineState } from '$svelte-atoms/core/utils';
	import { defineProperty } from '$svelte-atoms/core/utils/state';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond, CardBondState, type CardBondProps } from './bond.svelte';
	import type { CardRootProps } from './types';
	import './card.css';

	let {
		class: klass = '',
		disabled = false,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		onkeydown = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CardRootProps<E, B> = $props();

	const bondProps = defineState<CardBondProps>(
		[
			defineProperty(
				'disabled',
				() => disabled,
				(v) => {
					disabled = v;
				}
			)
		],
		() => ({})
	);
	const bond = _factory(bondProps).share();

	// Disabled styles
	const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new CardBondState(() => props);
		return new CardBond(bondState);
	}

	function handleClick(event: MouseEvent) {
		if (disabled) return;
		onclick?.(event);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onclick?.(event as unknown as MouseEvent);
		}
		onkeydown?.(event);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	preset="card"
	class={[
		'card bg-card border-border flex flex-col gap-2 overflow-clip rounded-lg border shadow-sm',
		disabledStyles,
		'$preset',
		klass
	]}
	{bond}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...rootProps}
>
	{@render children?.({ card: bond })}
</HtmlAtom>
