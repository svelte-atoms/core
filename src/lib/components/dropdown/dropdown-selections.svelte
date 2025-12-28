<script lang="ts">
	import { HtmlAtom as Atom } from '../atom';
	import DropdownSelection from './dropdown-selection.svelte';
	import { DropdownBond } from './bond.svelte';
	import type { DropdownSelectionsProps } from './types';
	import type { Component } from 'svelte';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('DropdownValue must be used within a Dropdown');
	}

	let {
		class: klass = '',
		children,
		getSelections = undefined,
		Selection = DropdownSelection as unknown as Component,
		...restProps
	}: DropdownSelectionsProps = $props();

	const selections = $derived.by(() => {
		if (getSelections) {
			return getSelections(bond);
		}

		return bond.state.selections.map((controller) => ({
			id: controller.id,
			value: controller.value,
			get text() {
				return controller.text;
			},
			unselect() {
				controller.unselect();
			},
			get createdAt() {
				return controller.createdAt;
			},
			controller
		}));
	});
	const isMultiple = $derived(bond.state.props.multiple);
</script>

{#if isMultiple && selections.length}
	<Atom class={['flex flex-wrap items-center gap-2', klass]} {...restProps}>
		{#if children}
			{@render children?.({ selections: selections, selection: selections[0] })}
		{:else}
			{#each selections as selection (selection.id)}
				<Selection {selection}>
					{selection.text}
				</Selection>
			{/each}
		{/if}
	</Atom>
{:else if children && selections[0]}
	{@render children?.({ selections: selections, selection: selections[0] })}
{:else if selections[0]}
	{@const selection = selections[0]}
	{selection.text}
{/if}
