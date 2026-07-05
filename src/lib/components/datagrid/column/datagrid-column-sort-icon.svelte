<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { animate as motion } from 'motion';
	import { Icon } from '$ixirjs/ui/components/icon';
	import { DataGridColumnBond } from './bond.svelte.ts';
	import IconArrowDown from '$ixirjs/ui/icons/icon-arrow-down.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';

	const bond = DataGridColumnBond.get();

	const isSortable = $derived(bond.state.isSortable);
	const directionAsNumber = $derived(+(bond.state.props.direction === 'asc'));

	let {
		class: klass = '',
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
		{bond}
			preset="datagrid.column-sort-icon"
		class={['border-border', '$preset', klass]}
		fallback={{
			animate: _animate,
		}}
		{...restProps}
	>
		<Icon>
			<IconArrowDown />
		</Icon>
	</HtmlAtom>
{/if}
