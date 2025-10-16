<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type ToastRootProps<T extends keyof HTMLElementTagNameMap> = HtmlAtomProps<T> & {
		as?: T;
		open?: boolean;
		disabled?: boolean;
		extend?: Record<string, unknown>;
		factory?: Factory<ToastBond>;
		children?: Snippet<[{ toast?: ToastBond }]>;
	};
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { ToastBond, ToastBondState, type ToastBondProps } from './bond';
	import { toClassValue, defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

	let {
		open = $bindable(false),
		as = 'div' as T,
		base = undefined,
		class: klass = '',
		disabled = false,
		extend = {},
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ToastRootProps<T> & HTMLAttributes<HTMLElementTagNameMap[T]> = $props();

	const bondProps = defineState<ToastBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			)
		],
		() => ({ disabled, extend })
	);

	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const bondState = new ToastBondState(() => props);
		return new ToastBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[toClassValue.apply(bond, [klass])]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bond?.root(restProps)}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
