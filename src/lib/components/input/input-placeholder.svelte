<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { InputBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const bond = InputBond.get();

	const preset = getPreset('input.placeholder');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const placeholderProps = $derived({
		...bond?.placeholder(),
		...restProps
	});

	const shouldShowPlaceholder = $derived.by(() => {
		const type = bond?.elements?.input?.type ?? '';

		if (['radio', 'checkbox'].includes(type)) {
			return false;
		}

		if (['files'].includes(type)) {
			return !bond?.state.props.files?.length;
		}

		console.log(!bond?.state.props.value);

		return !bond?.state.props.value;
	});
</script>

{#if shouldShowPlaceholder}
	<HtmlAtom
		class={[
			'pointer-events-none absolute inset-0 flex h-full w-full items-center px-1 leading-1 outline-none',
			toClassValue.apply(bond, [preset?.class]),
			toClassValue.apply(bond, [klass])
		]}
		style="left:{bond?.elements?.input?.offsetLeft ?? 0}px"
		{...placeholderProps}
	>
		{@render children?.()}
	</HtmlAtom>
{/if}
