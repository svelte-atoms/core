<script lang="ts" generics="D">
	import { nanoid } from 'nanoid';
	import { DropdownItemAtom, type DropdownItemAtomProps } from './bond.svelte';
	import type { DropdownItemProps } from './types';
	import { DropdownBond } from '../bond.svelte';
	import { HtmlAtom } from '../../atom';

	const dropdown = DropdownBond.get();

	if (!dropdown) {
		throw new Error('<DropdownItem> must be used within a <Dropdown>.');
	}

	let {
		class: klass = '',
		preset = 'dropdown.item',
		value = nanoid(),
		data = undefined,
		children = undefined,
		onclick = undefined,
		...restProps
	}: DropdownItemProps<D> = $props();

	// Create reactive props object for the atom
	const itemProps = $derived<DropdownItemAtomProps<D>>({
		id: value,
		value,
		data,
		label: undefined
	});

	// Create the atom instance
	const atom = new DropdownItemAtom<D>(() => itemProps, dropdown);

	// Derived reactive properties
	const isHighlighted = $derived(atom.isHighlighted);
	const isSelected = $derived(atom.isSelected);

	// Merge atom attrs with custom props
	const itemAttrs = $derived({
		...atom.attrs,
		...restProps
	});

	// Register item with dropdown state and handle mounting
	$effect.pre(() => {
		dropdown.state.registerItem(value, atom as any);

		return () => {
			dropdown.state.unregisterItem(value);
		};
	});

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		atom.toggle();
	}
</script>

<HtmlAtom
	{preset}
	class={[
		isHighlighted && 'bg-foreground/5',
		isSelected && 'bg-primary/5 hover:bg-primary/10 active:bg-primary/15',
		'$preset',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	{...itemAttrs}
	onclick={handleClick}
>
	{@render children?.({ dropdownItem: atom })}
</HtmlAtom>
