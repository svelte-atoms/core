<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { StackBond, StackState } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { values } from 'es-toolkit/compat';
	import './stack.css';

	type Element = ElementType<E>;

	let {
		value = $bindable(),
		class: klass = '',
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const bondProps = defineState([
		defineProperty('value', ()=> values, (v)=> (value=v))
	])

	const bond = defaultFactory().share()

	const rootProps = $derived({
		...bond.root(),
		...restProps
	})
		
	function defaultFactory(){
		const bondState = new StackState(()=> bondProps);
		return new StackBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	preset="stack.root"
	class={['stack-root border-border flex flex-1', '$preset', klass]}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
