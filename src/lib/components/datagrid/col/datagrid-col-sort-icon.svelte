<script lang="ts">
	import { animate as motion } from 'motion';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { DataGridThBond } from './bond.svelte';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	const bond = DataGridThBond.get();

	const isSortable = $derived(bond?.state.isSortable);
	const isAsc = $derived(bond?.state.props.direction === 'asc');

	let { class: klass = '', animate = defaultAnimate, ...restProps } = $props();

	const content = $derived(isSortable ? icon : undefined);

	function defaultAnimate(node: HTMLElement) {
		motion(
			node,
			{ rotate: isAsc ? 0 : 180, opacity: isSortable ? 0.7 : 0.2 },
			{ duration: 0.3, ease: 'anticipate' }
		);
	}
</script>

{#snippet icon()}
	<HtmlAtom
		{bond}
			preset="datagrid.column-sort-icon"
		class={['border-border', '$preset', klass]}
		{animate}
		{...restProps}
	>
		<Icon>
			<IconArrowDown />
		</Icon>
	</HtmlAtom>
{/snippet}

{@render content?.()}
