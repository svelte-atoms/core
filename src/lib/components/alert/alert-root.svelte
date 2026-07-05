<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$ixirjs/ui/utils';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { AlertBond, AlertBondState, type AlertBondProps } from './bond.svelte';
	import type { AlertRootProps } from './types';
	import './alert.css';

	let {
		class: klass = '',
		preset = 'alert',
		disabled = false,
		extend = {},
		factory = _factory,
		children,
		...restProps
	}: AlertRootProps<E, B> = $props();

	const bondProps = defineState<AlertBondProps>(
		[defineProperty('disabled', () => disabled), defineProperty('rest', () => restProps)],
		() => ({ disabled, extend })
	);
	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new AlertBondState(() => props);
		return new AlertBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{preset}
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
