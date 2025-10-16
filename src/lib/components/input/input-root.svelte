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
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const preset = getPreset('stack');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		value,
		checked = undefined,
		files = [],
		children = undefined,
		factory = _factory,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

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
	class={[
		'border-border text-foreground bg-background relative flex h-10 items-center overflow-hidden rounded-md border',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	{as}
	{base}
	{...rootProps}
>
	{@render children?.({ input: bond })}
</HtmlAtom>
