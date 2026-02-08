<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { ComboboxBond } from './bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/dropdown/atoms';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = ComboboxBond.get();

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		as = 'button',
		preset = 'combobox.trigger',
		children = undefined,
		...restProps
	} = $props();
</script>

<Trigger
	{as}
	{bond}
	preset={preset}
	class={['border-border h-8 w-40', '$preset', klass]}
	onclick={(ev: Event) => {
		ev.preventDefault();

		bond?.state?.open();
	}}
	{...restProps}
>
	{@render children?.({ dropdown: bond })}
</Trigger>
