<script lang="ts">
	import { ComboboxBond } from './bond.svelte';
	import { Item } from '$svelte-atoms/core/components/select/atoms';
	import { SelectItemController as DropdownItemController } from '$svelte-atoms/core/components/select/item/controller.svelte';

	import { on } from '$svelte-atoms/core/attachments';

	const bond = ComboboxBond.get() as ComboboxBond;

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		children = undefined,
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
			bond.state.props.label = textElement?.innerText ?? '';
			// Clear input query
			bond.state.props.label = '';

			item?.toggle();

			bond?.state.close();
		})(node);
	}}
	{bond}
	preset="combobox.item"
	class={['border-border', '$preset', klass].filter(Boolean).join(' ')}
	{...restProps}
>
	{@render children?.({ combobox: bond })}
</Item>
