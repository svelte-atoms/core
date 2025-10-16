<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type FieldRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			disabled: boolean;
			readonly: boolean;
			name?: string;
			value?: any;
			schema?: Schema;
			parse: (schema: Schema) => void;
			extend: any;
			factory?: Factory<FieldBond>;
			children?: Snippet<[{ field?: FieldBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { onDestroy, type Component, type Snippet } from 'svelte';
	import { FieldBond, FieldBondState, type FieldStateProps } from './bond.svelte';
	import { FormBond } from '../bond.svelte';
	import type { Override } from '$svelte-atoms/core/types';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const formBond = FormBond.get();

	const preset = getPreset('field');

	let {
		value = $bindable(),
		class: klass = '',
		as = preset?.class ?? ('div' as E),
		base = preset?.base as B,
		name = undefined,
		schema = undefined,
		validator = undefined,
		factory = _factory,
		children = undefined,
		...restProps
	}: FieldRootProps<E, B, Extension, Schema> = $props();

	const bondProps = defineState<FieldStateProps>([
		defineProperty(
			'name',
			() => name,
			(v) => (name = v)
		),
		defineProperty(
			'value',
			() => value,
			(v) => (value = v)
		),
		defineProperty('type', () => typeof value),
		defineProperty('schema', () => schema),
		defineProperty('validator', () => validator ?? formBond.state.props.validator)
	]);
	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	const unmount = formBond.state.mountField(bond.id, bond);
	onDestroy(() => unmount());

	function _factory(props: typeof bondProps) {
		const bondState = new FieldBondState(() => props);
		return new FieldBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={['flex flex-col', klass]} {as} {base} {...rootProps}>
	{@render children?.({ field: bond })}
</HtmlAtom>
