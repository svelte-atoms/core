<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DropdownBond } from './bond.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const bond = DropdownBond.get();
	const preset = getPreset('dropdown.placeholder');

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	const hasValue = $derived(!!bond?.state.props.values?.length);

	const placeholderProps = $derived({
		...bond?.placeholder(),
		...restProps
	});
</script>

{#if !hasValue}
	<HtmlAtom
		class={[
			'absolute inset-0 flex h-full w-full items-center px-2 leading-1 opacity-50 outline-none',
			toClassValue.apply(bond, [preset?.class]),
			toClassValue.apply(bond, [klass])
		]}
		{...placeholderProps}
	>
		{@render children?.()}
	</HtmlAtom>
{/if}
