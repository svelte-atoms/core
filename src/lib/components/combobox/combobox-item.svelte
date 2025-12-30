<script lang="ts">
	import { ComboboxBond } from './bond.svelte';
	import { Item } from '$svelte-atoms/core/components/dropdown/atoms';
	import { DropdownItemController } from '$svelte-atoms/core/components/dropdown/item/controller.svelte';

	import { on } from '$svelte-atoms/core/attachments';

	const bond = ComboboxBond.get() as ComboboxBond;

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
	{@attach (node: HTMLElement) => {
		const item = DropdownItemController.get();

		return on('click', (ev) => {
			ev.preventDefault();

			const currentTarget = ev.currentTarget as HTMLElement | undefined;

			const textElement = (currentTarget?.querySelector('data-text') ?? currentTarget) as
				| HTMLElement
				| undefined;

			// Set selected item text
			bond.state.props.text = textElement?.innerText ?? '';
			// Clear input query
			bond.state.props.query = '';

			item?.toggle();

			bond?.state.close();
		})(node);
	}}
	{bond}
	preset="combobox.item"
	class={['border-border', '$preset', klass].filter(Boolean).join(' ')}
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
