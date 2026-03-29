<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { StackBond, StackState } from './bond.svelte';
	import './stack.css';

	type Element = ElementType<E>;

	let {
		value = $bindable<string | undefined>(undefined),
		class: klass = '',
		factory = _factory,
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> & { factory?: typeof _factory } = $props();

	const bondProps = defineState([
		defineProperty(
			'value',
			() => value,
			(v) => { value = v; }
		)
	]);

	const bond = untrack(()=> factory(bondProps)).share();

	const rootProps = $derived({
		...bond.root().spread,
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new StackState(() => props);
		return new StackBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	preset="stack.root"
	{bond}
	class={['stack-root', '$preset', klass]}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
