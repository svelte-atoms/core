<script lang="ts">
	import { ComboboxBond } from './bond.svelte';
	import { Item } from '$svelte-atoms/core/components/select/atoms';

	const bond = ComboboxBond.getOrThrow(
		'ComboboxItem must be used within a Combobox'
	) as ComboboxBond;

	let {
		class: klass = '',
		preset = undefined as string | string[] | undefined,
		value = '',
		children = undefined,
		...restProps
	} = $props();

	// `bond.atom('item')` == the auto-generated `item()` slot accessor at runtime, but typechecks:
	// the 'item' slot comes via `parts:` composition so it isn't surfaced on the bond's typed map.
	const atom = bond.atom('item');

	const presentation = $derived({ preset: preset ?? atom.preset });

	// `Select.Item`'s own handler runs this first, then bails if we've `preventDefault`ed — so we
	// own the commit here. Toggle (so multi-select can deselect; single-select replaces), then
	// close only when single-select. Updates `props.values`, which drives `allSelections` → chips.
	function onItemClick(ev: MouseEvent) {
		ev.preventDefault();
		const selected = bond.state.props.values?.includes(value) ?? false;
		if (selected) bond.state.unselect([value]);
		else bond.state.select([value]);
		if (!bond.state.props.multiple) bond.state.close();
	}
</script>

<Item
	{bond}
	{value}
	class={['border-border', '$preset', klass].filter(Boolean).join(' ')}
	{...presentation}
	{...restProps}
	onclick={onItemClick}
>
	{@render children?.({ combobox: bond })}
</Item>
