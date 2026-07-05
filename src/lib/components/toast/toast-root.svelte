<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { ToastBond, ToastBondState, type ToastBondProps } from './bond.svelte';
	import { defineProperty, defineState } from '$ixirjs/ui/utils';
	import type { ToastRootProps } from './types';
	import { untrack } from 'svelte';

	let {
		open = $bindable(true),
		disabled = false,
		duration = 0,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		dismissible: _dismissible,
		class: klass = '',
		preset = 'toast',
		factory = defaultFactory,
		children = undefined,
		onclose = undefined,
		...restProps
	}: ToastRootProps<E, B> = $props();

	const bondProps = defineState<ToastBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					if (open === v) return;
					open = v;
					if (!v) onclose?.();
				}
			),
			defineProperty('rest', () => restProps)
		],
		() => ({ disabled })
	);

	const bond = untrack(() => factory(bondProps)).share();

	function defaultFactory(props: ToastBondProps) {
		const bondState = new ToastBondState(() => props);
		return new ToastBond(bondState);
	}

	const rootProps: Record<string, unknown> = $derived({
		...bond.root().spread,
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
	{bond}
	{preset}
	class={['border-border', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
