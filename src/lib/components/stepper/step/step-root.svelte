<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond, StepBondState, type StepBondProps } from './bond.svelte';
	import type { StepRootProps } from './types';
	import type { Factory } from '$svelte-atoms/core/types';
	import { onDestroy } from 'svelte';

	let {
		index,
		disabled = false,
		completed = false,
		optional = false,
		children = undefined,
		factory = _factory as Factory<StepBond>,
	}: StepRootProps<E, B> = $props();

	const stepProps = defineState<StepBondProps>([
		defineProperty('index', () => index),
		defineProperty('disabled', () => disabled),
		defineProperty('completed', () => completed),
		defineProperty('optional', () => optional),
	]);

	const bond = $derived(factory(stepProps).share());

	bond.state.mount();
	onDestroy(()=> {
		bond.state.unmount();  
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
