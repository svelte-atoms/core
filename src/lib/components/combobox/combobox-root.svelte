<script lang="ts">
	import type { ComboboxRootProps } from './types';
	import { bindBond } from '$ixirjs/ui/shared';
	import { ComboboxBond, type ComboboxBondProps } from './bond.svelte';

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
		onopenchange = undefined,
		onvaluechange = undefined,
		onvalueschange = undefined,
		onquerychange = undefined,
		...restProps
	}: ComboboxRootProps = $props();

	let openState = $derived(open);
	let valueState = $derived(value);
	let valuesState = $derived(values);
	let labelState = $derived(label);
	let labelsState = $derived(labels);
	let queryState = $derived(query);
	const callbackState = { bond: undefined as ComboboxBond | undefined };

	function valuesEqual(left: readonly unknown[], right: readonly unknown[]) {
		return (
			left.length === right.length && left.every((item, index) => Object.is(item, right[index]))
		);
	}

	const binding = bindBond<ComboboxBond>((props) => factory(props), {
		open: [
			() => openState,
			(v) => {
				const changed = !Object.is(openState, v);
				openState = v;
				open = openState;

				const callbackBond = callbackState.bond;
				if (changed && callbackBond) {
					onopenchange?.(openState, { bond: callbackBond });
				}
			}
		],
		// The bond's props are string-keyed; the bindables are loosely typed — bridge with casts.
		values: [
			() =>
				(multiple
					? valuesState
					: valueState == null
						? []
						: [valueState]) as ComboboxBondProps['values'],
			(v) => {
				const previousValues = multiple
					? (valuesState ?? [])
					: valueState == null
						? []
						: [valueState];
				const previousValue = valueState;
				const nextValues = (v ?? []) as unknown[];
				const nextValue = nextValues[0];
				const valuesChanged = !valuesEqual(previousValues, nextValues);
				const valueChanged = !Object.is(previousValue, nextValue);

				valuesState = nextValues;
				valueState = nextValue;
				values = valuesState;
				value = valueState;

				const callbackBond = callbackState.bond;
				if (!callbackBond) return;
				if (multiple) {
					if (valuesChanged) onvalueschange?.(nextValues, { bond: callbackBond });
				} else if (valueChanged) {
					onvaluechange?.(valueState, { bond: callbackBond });
				}
			}
		],
		label: [
			() => labelState,
			(v) => {
				labelState = v;
				label = labelState;
			}
		],
		labels: [
			() => labelsState,
			(v) => {
				labelsState = v;
				labels = labelsState;
			}
		],
		disabled: () => disabled,
		multiple: () => multiple,
		placement: () => placement as ComboboxBondProps['placement'],
		placements: () => (placements ?? []) as ComboboxBondProps['placements'],
		offset: () => offset,
		// Bond-owned filter source (read by `filterSelectData`, cleared by `ClearThenClose`).
		// Wired as an accessor so writes are reactive and `bind:query` works.
		query: [
			() => queryState,
			(v) => {
				const nextQuery = v ?? '';
				const changed = !Object.is(queryState, nextQuery);
				queryState = nextQuery;
				query = queryState;

				const callbackBond = callbackState.bond;
				if (changed && callbackBond) {
					onquerychange?.(queryState, { bond: callbackBond });
				}
			}
		],
		// Vestigial: element-less context root, no typed channel to forward restProps.
		rest: () => restProps
	});
	const bond = binding.bond.share();
	callbackState.bond = bond;

	function defaultFactory(props: ComboboxBondProps) {
		return ComboboxBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ combobox: bond })}
