<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond, StepBondState, type StepBondProps } from './bond.svelte';
	import type { StepRootProps } from './types';
	import type { Factory } from '$svelte-atoms/core/types';

	let {
		index,
		header,
		body = undefined,
		disabled = false,
		completed = false,
		optional = false,
		error = false,
		class: klass = '',
		children = undefined,
		factory = _factory as Factory<StepBond>,
		preset = 'stepper.step' as const,
		...restProps
	}: StepRootProps<E, B> = $props();

	const stepProps = defineState<StepBondProps>([
		defineProperty('index', () => index),
		defineProperty('header', () => header),
		defineProperty('body', () => body),
		defineProperty('disabled', () => disabled),
		defineProperty('completed', () => completed),
		defineProperty('optional', () => optional),
		defineProperty('error', () => error)
	]);

	const bond = $derived(factory(stepProps).share());

	bond.state.mount();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props = stepProps) {
		const stepState = new StepBondState(() => props);
		return new StepBond(stepState);
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ step: bond })}
