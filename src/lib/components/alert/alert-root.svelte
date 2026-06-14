<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$svelte-atoms/core/shared';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AlertBond, AlertBondState, type AlertBondProps } from './bond.svelte';
	import type { AlertRootProps } from './types';
	import './alert.css';

	let {
		class: klass = '',
		preset = undefined,
		disabled = false,
		extend = {},
		factory = defaultFactory,
		children,
		...restProps
	}: AlertRootProps<E, B> = $props();

	const binding = bindBond<AlertBond>(
		(props) => factory(props),
		{
			disabled: () => disabled,
			extend: () => extend,
			rest: () => restProps
		}
	);
	const bond = binding.bond.share();

	const rootProps = $derived({
		preset: preset ?? 'alert',
		...bond.root(),
		...restProps
	});

	function defaultFactory(props: AlertBondProps) {
		const bondState = new AlertBondState(props);
		return new AlertBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={[
		'alert border-border relative flex gap-1 rounded-md border p-4 transition-all duration-200',
		// Base styles
		'bg-background text-foreground',
		// State styles
		{
			'pointer-events-none opacity-50': disabled
		},
		'$preset',
		klass
	]}
	{bond}
	{...rootProps}
>
	{@render children?.({ alert: bond })}
</HtmlAtom>
