<script lang="ts">
	import type { ComboboxRootProps } from './types';
	import { bindBond, useCapabilities } from '$svelte-atoms/core/shared';
	import { ComboboxBond, ComboboxBondState, type ComboboxBondProps } from './bond.svelte';

	let {
		open = $bindable(false),
		value = $bindable(),
		values = $bindable(),
		label = $bindable(),
		labels = $bindable(),
		multiple = false,
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 1,
		query = $bindable(''),
		factory = defaultFactory,
		children = undefined,
		...restProps
	}: ComboboxRootProps = $props();

	const binding = bindBond<ComboboxBond>((props) => factory(props), {
		open: [
			() => open,
			(v) => {
				open = v;
			}
		],
		// The bond's props are string-keyed; the bindables are loosely typed — bridge with casts.
		values: [
			() => (multiple ? values : [value]) as ComboboxBondProps['values'],
			(v) => {
				values = v;
				value = v?.[0];
			}
		],
		label: [() => label, (v) => (label = v)],
		labels: [() => labels, (v) => (labels = v)],
		disabled: () => disabled,
		multiple: () => multiple,
		placement: () => placement as ComboboxBondProps['placement'],
		placements: () => (placements ?? []) as ComboboxBondProps['placements'],
		offset: () => offset,
		// Bond-owned filter source (read by `createBondFilter`, cleared by `ClearThenClose`).
		// Wired as an accessor so writes are reactive and `bind:query` works.
		query: [
			() => query,
			(v) => {
				query = v ?? '';
			}
		],
		// Vestigial: element-less context root, no typed channel to forward restProps.
		rest: () => restProps
	});
	const bond = binding.bond.share();

	useCapabilities(bond);

	function defaultFactory(props: ComboboxBondProps) {
		const bondState = new ComboboxBondState(props);

		return new ComboboxBond(bondState).share();
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ combobox: bond })}
