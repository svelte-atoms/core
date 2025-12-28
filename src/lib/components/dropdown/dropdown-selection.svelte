<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { DropdownBond } from './bond.svelte';
	import Chip from '../chip/chip.svelte';
	import { HtmlAtom as Atom } from '../atom';
	import type { DropdownSelectionProps } from './types';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('DropdownValue must be used within a Dropdown');
	}

	const isMultiple = $derived(bond.state.props.multiple);

	let {
		class: klass = '',
		as = 'div' as T,
		base = undefined,
		item,
		children,
		onclose,
		...restProps
	}: DropdownSelectionProps<T, B> = $props();

	const _base = $derived((base ?? isMultiple) ? Chip : undefined);

	function handleClose(ev: Event) {
		onclose?.(ev);

		if (ev.defaultPrevented) return;

		bond?.state.unselect([item.value]);
	}
</script>

<Atom
	{as}
	{bond}
	base={_base}
	preset="dropdown.value"
	class={[
		'dropdown-value border-border inline-flex h-6 flex-nowrap items-center gap-1 rounded-sm px-2 whitespace-nowrap',
		'$preset',
		klass
	]}
	onclose={handleClose}
	{...restProps}
>
	{@render children?.()}
</Atom>
