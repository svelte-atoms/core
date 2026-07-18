<script lang="ts" generics="T">
	import { bindBond } from '$ixirjs/ui/shared';
	import { SelectBond, type SelectStateProps } from './bond.svelte';
	import type { SelectRootProps } from './types';

	let {
		open = $bindable(false),
		value = $bindable(),
		values = $bindable(),
		labels = $bindable(),
		label = $bindable(),
		multiple = false,
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 1,
		keys = [],
		query = $bindable(''),
		// Arrow wrapper keeps the constructor facade bound when passed as a default factory.
		factory = (props: SelectStateProps) => SelectBond.create(props),
		children = undefined,
		onopenchange = undefined,
		onvaluechange = undefined,
		onvalueschange = undefined,
		onquerychange = undefined,
		...restProps
	}: SelectRootProps<T> = $props();

	let openState = $derived(open);
	let valueState = $derived<T | undefined>(value);
	let valuesState = $derived<T[] | undefined>(values);
	let labelState = $derived<string | undefined>(label);
	let labelsState = $derived<string[] | undefined>(labels);
	let queryState = $derived(query);
	const callbackState = { bond: undefined as SelectBond | undefined };

	function valuesEqual(left: readonly T[], right: readonly T[]) {
		return (
			left.length === right.length && left.every((item, index) => Object.is(item, right[index]))
		);
	}

	const binding = bindBond<SelectBond>((props) => factory(props), {
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
		// Component is generic over `T`; the bond's props are string-keyed — bridge with casts.
		values: [
			() =>
				(multiple
					? valuesState
					: valueState === undefined
						? []
						: [valueState]) as SelectStateProps['values'],
			(v) => {
				const previousValues = multiple
					? (valuesState ?? [])
					: valueState === undefined
						? []
						: [valueState];
				const previousValue = valueState;
				const nextValues = (v ?? []) as T[];
				const nextValue = nextValues[0];
				const valuesChanged = !valuesEqual(previousValues, nextValues);
				const valueChanged = !Object.is(previousValue, nextValue);

				valuesState = nextValues;
				valueState = nextValue;
				values = valuesState;
				value = valueState as T;

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
		multiple: () => multiple,
		disabled: () => disabled,
		placement: () => placement as SelectStateProps['placement'],
		offset: () => offset,
		placements: () => (placements ?? []) as SelectStateProps['placements'],
		keys: () => keys ?? [],
		// Bond-owned filter source: accessor wiring makes writes reactive for `bind:query`
		// and fires `onquerychange` (read by `filterSelectData`, cleared by `ClearThenClose`).
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

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ select: bond })}
