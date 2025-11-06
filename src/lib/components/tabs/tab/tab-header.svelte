<script module lang="ts">
	export type TabHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'button',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ tab?: TabBond<unknown> }]>;
		onpointerdown?: (ev: PointerEvent, context: { tab?: TabBond<unknown> }) => void;
	};
</script>

<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import type { Snippet } from 'svelte';
	import { TabBond } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = TabBond.get();

	const isActive = $derived(bond?.state.isActive);
	const isDisabled = $derived(bond?.state.props.disabled);

	let {
		class: klass = '',
		as = 'button' as E,
		children,
		onpointerdown,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TabHeaderProps = $props();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});

	function handlePointerDown(ev: PointerEvent) {
		if (isDisabled) return;

		onpointerdown?.(ev, { tab: bond });

		if (ev.defaultPrevented) {
			return;
		}

		bond?.state.select();
	}
</script>

<HtmlAtom
	{bond}
	preset="tab.header"
	as="button"
	class={[
		'border-border text-foreground/60 hover:text-foreground/80 active:text-foreground/100 bg-foreground/0 hover:bg-foreground/5 active:bg-foreground/10 flex cursor-pointer items-center px-2 py-2 text-sm font-medium transition-colors duration-100',
		isActive && 'text-primary bg-accent/10 hover:bg-accent/15 active:bg-accent/20',
		isDisabled && 'opacity-50',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	type="button"
	disabled={isDisabled}
	onpointerdown={handlePointerDown}
	{...headerProps}
>
	{@render children?.({
		tab: bond
	})}
</HtmlAtom>
