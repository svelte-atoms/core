<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { bindBond } from '$svelte-atoms/core/shared/bind-bond.svelte';
	import { StackBond, StackState, type StackStateProps } from './bond.svelte';
	import './stack.css';

	type Element = ElementType<E>;

	let {
		value = $bindable<string | undefined>(undefined),
		class: klass = '',
		preset = undefined,
		factory = defaultFactory,
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> & { factory?: typeof defaultFactory } = $props();

	const binding = bindBond<StackBond>(
		(props) => factory(props),
		{
			value: [() => value as string | undefined, (v) => { value = v; }]
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();

	function defaultFactory(props: StackStateProps) {
		const bondState = new StackState(props);
		return new StackBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['stack-root', '$preset', klass]}
	{...binding.props}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
