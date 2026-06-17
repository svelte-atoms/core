<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$svelte-atoms/core/shared';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond, CardBondState, type CardBondProps } from './bond.svelte';
	import type { CardRootProps } from './types';
	import './card.css';

	let {
		class: klass = '',
		preset = undefined,
		disabled = false,
		factory = defaultFactory,
		children = undefined,
		onclick = undefined,
		onkeydown = undefined,
		...restProps
	}: CardRootProps<E, B> = $props();

	const binding = bindBond<CardBond>(
		(props) => factory(props),
		{
			disabled: [() => disabled, (v) => { disabled = v ?? false; }],
			rest: () => restProps
		}
	);
	const bond = binding.bond.share();

	const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

	const rootProps = $derived({
		preset: preset ?? 'card',
		...bond?.root(),
		...restProps
	});

	function defaultFactory(props: CardBondProps) {
		const bondState = new CardBondState(props);
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
	class={[
		'card bg-card border-border flex flex-col overflow-clip rounded-lg border shadow-sm',
		disabledStyles,
		'$preset',
		klass
	]}
	{bond}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...rootProps}
>
	{@render children?.({ card: bond })}
</HtmlAtom>
