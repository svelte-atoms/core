<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { animate as motion } from 'motion';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { DataGridThBond } from './bond.svelte';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$lib/utils';

	const bond = DataGridThBond.get();

	const preset = getPreset('datagrid.sort-icon');

	const isSortable = $derived(bond.state.isSortable);
	const directionAsNumber = $derived(+(bond.state.props.direction === 'asc'));

	let {
		class: klass = '',
		as = preset?.as,
		base = preset?.base as B,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	function _animate(node: HTMLElement) {
		motion(
			node,
			{ rotate: directionAsNumber * 180, opacity: isSortable ? 0.7 : 0.2 },
			{ duration: 0.3, ease: 'anticipate' }
		);
	}
</script>

{#if !!isSortable}
	<HtmlAtom
		{as}
		{base}
		class={[toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		{...restProps}
	>
		<Icon>
			<IconArrowDown />
		</Icon>
	</HtmlAtom>
{/if}
