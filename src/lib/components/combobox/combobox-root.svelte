<script lang="ts" generics="D">
	import type { ComboboxRootProps } from './types';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { ComboboxBond, ComboboxBondState, type ComboboxBondProps } from './bond.svelte';

	let {
		open = $bindable(false),
		value = $bindable(),
		values = $bindable(),
		text = $bindable(),
		multiple = false,
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 1,
		factory = _factory,
		children = undefined,
		...restProps
	}: ComboboxRootProps = $props();

	const bondProps = defineState<ComboboxBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty(
				'values',
				() => (multiple ? values : [value]),
				(v) => {
					values = v;
					value = v[0];
				}
			),
			defineProperty(
				'text',
				() => text,
				(v) => (text = v)
			)
		],
		() => ({ disabled, multiple, placements, offset, placement: 'bottom-start', ...restProps })
	);
	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const bondState = new ComboboxBondState<D>(() => props);

		return new ComboboxBond(bondState).share();
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ combobox: bond })}
