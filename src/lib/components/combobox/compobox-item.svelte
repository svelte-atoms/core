<script
	lang="ts"
	generics="D, T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { ComboboxBond } from './bond.svelte';
	import { Item } from '$svelte-atoms/core/components/dropdown/atoms';
	import { DropdownItemBond } from '$svelte-atoms/core/components/dropdown/item/bond.svelte';

	import { on } from '$svelte-atoms/core/attachments';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = ComboboxBond.get() as ComboboxBond<{}>;

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();
</script>

<Item
	{@attach (node) => {
		const item = DropdownItemBond.get();

		return on('click', (ev) => {
			ev.preventDefault();

			const currentTarget = ev.currentTarget as HTMLElement | undefined;

			const textElement = (currentTarget?.querySelector('data-text') ?? currentTarget) as
				| HTMLElement
				| undefined;

			// Set selected item text
			bond.state.props.text = textElement?.innerText ?? '';
			// Clear input query
			bond.state.props.query = undefined;

			item?.state?.toggle();

			// Create a promise that resolves when combobox.state.props.open is set to false

			bond?.state.close();
		})(node);
	}}
	{bond}
	preset="combobox.item"
	class={['border-border', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...restProps}
>
	{@render children?.({ combobox: bond })}
</Item>
