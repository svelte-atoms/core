<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AlertBond, AlertBondState, type AlertBondProps } from './bond.svelte';
	import type { AlertRootProps } from './types';
	import './alert.css';

	let {
		class: klass = '',
		preset = 'alert',
		dismissible = false,
		dismissed = $bindable(false),
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
	}: AlertRootProps<E, B> = $props();

	const bondProps = defineState<AlertBondProps>(
		[
			defineProperty(
				'dismissed',
				() => dismissed,
				(v) => {
					dismissed = v;
				}
			)
		],
		() => ({ dismissible, disabled, extend })
	);
	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	// Auto-hide logic for dismissed alerts
	$effect(() => {
		if (dismissed && bond.elements.root) {
			// Add smooth transition out animation
			const element = bond.elements.root;
			element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
			element.style.opacity = '0';
			element.style.transform = 'translateY(-10px)';

			// Optional: Remove from DOM after animation
			setTimeout(() => {
				if (element?.parentNode) {
					element.style.display = 'none';
				}
			}, 300);
		} else if (!dismissed && bond.elements.root) {
			// Restore visibility
			const element = bond.elements.root;
			element.style.display = '';
			element.style.opacity = '1';
			element.style.transform = 'translateY(0)';
		}
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
		'alert border-border relative flex gap-3 rounded-md border p-4 transition-all duration-200',
		// Base styles
		'bg-background text-foreground',
		// State styles
		{
			'pointer-events-none opacity-60': disabled,
			'pointer-events-none opacity-0': dismissed
		},
		'$preset',
		klass
	]}
	{bond}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ alert: bond })}
</HtmlAtom>
