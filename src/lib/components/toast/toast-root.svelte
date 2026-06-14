<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { ToastBond, ToastBondState, type ToastBondProps } from './bond.svelte';
	import type { ToastRootProps } from './types';
	import { bindBond } from '$svelte-atoms/core/shared';

	let {
		open = $bindable(true),
		disabled = false,
		duration = 0,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		dismissible: _dismissible,
		preset = undefined,
		factory = defaultFactory,
		children = undefined,
		onclose = undefined,
		...restProps
	}: ToastRootProps<E, B> = $props();

	const binding = bindBond<ToastBond>(
		(props) => factory(props),
		{
			open: [() => open, (v) => (open = v)],
			disabled: () => disabled,
			rest: () => restProps
		},
		{ preset: () => preset }
	);
	
	const bond = binding.bond.share();

	function defaultFactory(props: ToastBondProps) {
		const bondState = new ToastBondState(props);
		return new ToastBond(bondState);
	}

	const rootProps = $derived({
		...binding.props,
		...restProps
	});

	// Auto-dismiss when a positive duration is provided
	$effect(() => {
		if (!open || duration <= 0) return;
		const handle = setTimeout(() => {
			open = false;
		}, duration);
		return () => clearTimeout(handle);
	});

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{...rootProps}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
