<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import type { TabHeaderProps } from '../types';
	import { TabBond } from './bond.svelte';
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';

	const bond = TabBond.get();

	if(!bond) {
		throw new Error('TabHeader must be used within a Tab component.');
	}

	const isActive = $derived(bond?.state.isActive);
	const isDisabled = $derived(bond?.state.props.disabled);

	let {
		class: klass = '',
		as = 'button' as E,
		children,
		onpointerdown,
		...restProps
	}: TabHeaderProps<E, B> = $props();

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

<Atom
	{bond}
	preset="tab.header"
	as="button"
	class={[
		'border-border text-foreground/50 bg-foreground/0 hover:bg-foreground/5 active:bg-foreground/10 flex cursor-pointer items-center px-2 py-2 text-sm font-medium transition-colors duration-100',
		isActive && 'text-primary bg-primary/5 hover:bg-primary/10 active:bg-primary/15',
		isDisabled && 'opacity-50',
		'$preset',
		klass
	]}  
	type="button"
	disabled={isDisabled}
	onpointerdown={handlePointerDown}
	{...headerProps}
>
	{@render children?.({ tab: bond })}
</Atom>
