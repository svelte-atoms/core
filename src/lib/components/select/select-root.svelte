<script lang="ts" generics="T">
	import { bindBond, useCapabilities } from '$svelte-atoms/core/shared';
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
		// Arrow wrapper keeps `this` bound to SelectBond when used as a detached default.
		factory = (props: SelectStateProps) => SelectBond.create(props),
		children = undefined,
		onquerychange = undefined,
		...restProps
	}: SelectRootProps<T> = $props();

	const binding = bindBond<SelectBond>((props) => factory(props), {
		open: [
			() => open,
			(v) => {
				open = v;
			}
		],
		// Component is generic over `T`; the bond's props are string-keyed — bridge with casts.
		values: [
			() => (multiple ? values : ([value].filter(Boolean) as T[])) as SelectStateProps['values'],
			(v) => {
				values = v as T[];
				value = v?.[0] as T;
			}
		],
		label: [() => label, (v) => (label = v)],
		labels: [() => labels, (v) => (labels = v)],
		multiple: () => multiple,
		disabled: () => disabled,
		placement: () => placement as SelectStateProps['placement'],
		offset: () => offset,
		placements: () => (placements ?? []) as SelectStateProps['placements'],
		keys: () => keys ?? [],
		// Bond-owned filter source: accessor wiring makes writes reactive for `bind:query`
		// and fires `onquerychange` (read by `createBondFilter`, cleared by `ClearThenClose`).
		query: [
			() => query,
			(v) => {
				query = v ?? '';
				onquerychange?.(v ?? '');
			}
		],
		// Vestigial: element-less context root, no typed channel to forward restProps.
		rest: () => restProps
	});

	const bond = binding.bond.share();

	// Activate the bond's capability setups: the focus capability captures activeElement on
	// open and restores it on close, and the escape capability enrolls this overlay in the
	// topmost-open-overlay stack so only the frontmost surface acts on Escape.
	useCapabilities(bond);

	export function getBond() {
		return bond;
	}

	$effect(() => {
		return () => {
			bond.destroy();
		};
	});
</script>

{@render children?.({ select: bond, dropdown: bond })}
