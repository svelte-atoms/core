<script lang="ts">
	import { animate as motion } from 'motion';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { PopoverBond } from './bond.svelte';

	const bond = PopoverBond.get();
	const preset = getPreset('popover.indicator');

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined
	} = $props();

	const isOpen = $derived(bond?.state.props.open ?? false);
</script>

<HtmlAtom
	class={[
		'flex items-center justify-center',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
>
	{#if children}
		{@render children?.({ popover: bond })}
	{:else}
		<Icon
			src={IconArrowDown}
			animate={(node) => motion(node, { rotate: 180 * +isOpen }, { duration: 0.2 })}
		/>
	{/if}
</HtmlAtom>
