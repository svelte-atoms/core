<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { onDestroy } from 'svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond, FieldBondState, type FieldStateProps } from './bond.svelte';
	import type { FieldRootProps } from '../types';
	import { FormBond } from '../bond.svelte';

	const formBond = FormBond.get();

	let {
		value = $bindable(),
		class: klass = '',
		name = undefined,
		schema = undefined,
		validator = undefined,
		factory = _factory,
		children = undefined,
		...restProps
	}: FieldRootProps<E, B> = $props();

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

<HtmlAtom preset="field" class={['flex flex-col', '$preset', klass]} {...rootProps}>
	{@render children?.({ field: bond })}
</HtmlAtom>
