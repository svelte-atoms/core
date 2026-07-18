<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$ixirjs/ui/components/atom';
	import { SelectBond } from './bond.svelte';
	import type { SelectSelectionProps } from './types';
	import { Chip } from '../chip';
	import { HtmlAtom } from '../atom';
	import { usePart } from '$ixirjs/ui/shared';

	let {
		class: klass = '',
		as = 'div' as T,
		base = undefined,
		preset = undefined,
		selection,
		children,
		onclose,
		...restProps
	}: SelectSelectionProps<T, B> = $props();

	const part = usePart(SelectBond, 'value', () => restProps, {
		message: 'SelectSelection must be used within a Select',
		preset: () => preset
	});
	const isMultiple = $derived(part.bond.props.multiple);
	const _base = $derived((base ?? isMultiple) ? Chip : undefined);

	function handleClose(ev: Event) {
		onclose?.(ev);

		if (ev.defaultPrevented) return;

		selection.unselect();
	}
</script>

<HtmlAtom
	{as}
	bond={part.bond}
	base={_base}
	class={[
		'select-value border-border inline-flex h-6 flex-nowrap items-center gap-1 rounded-sm px-2 whitespace-nowrap',
		'$preset',
		klass
	]}
	onclose={handleClose}
	{...part.props}
>
	{#if children}
		{@render children?.()}
	{:else}
		{selection?.label}
	{/if}
</HtmlAtom>
