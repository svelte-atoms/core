<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { InputBond, InputState, type InputStateProps } from './bond.svelte';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import type { InputRootProps } from './types';

	type Element = ElementType<E>;

	let {
		class: klass = '',
		value,
		checked = undefined,
		files = [],
		preset = 'input',
		children = undefined,
		factory = _factory,
		...restProps
	}: InputRootProps<E, B> = $props();

	const bondProps = defineState<InputStateProps>([
		defineProperty(
			'value',
			() => value,
			(v) => {
				value = v;
			}
		),

		defineProperty(
			'checked',
			() => checked,
			(v) => {
				checked = v;
			}
		),

		defineProperty(
			'files',
			() => files,
			(v) => {
				files = [...v];
			}
		)
	]);
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new InputState(() => props);

		return new InputBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{preset}
	class={[
		'border-border text-foreground bg-input relative flex h-10 items-center overflow-hidden rounded-md border w-auto',
		'$preset',
		klass
	]}
	{bond}
	{...rootProps}
>
	{@render children?.({ input: bond })}
</HtmlAtom>
