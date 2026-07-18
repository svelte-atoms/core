<script
	lang="ts"
	generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import {
		DataGridColumnBond,
		DataGridColumnRootAtom,
		type DataGridColumnBondProps
	} from './bond.svelte';
	import type { DatagridColumnProps, SortBy } from '../types';

	const ID = $props.id();

	let {
		class: klass = '',
		preset = undefined,
		id = ID,
		width = '1fr',
		direction = 'asc',
		hidden = false,
		sortable = undefined,
		factory = defaultFactory,
		children = undefined,
		onclick = undefined,
		onsort = undefined,
		...restProps
	}: DatagridColumnProps<T, E, B> = $props();

	const binding = bindBond<DataGridColumnBond<T>>(
		(props) => factory(props),
		{
			id: () => id,
			width: () => width,
			sortable: () => sortable,
			hidden: () => hidden,
			direction: () => direction
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	const rootAtom = createAtomInstance<DataGridColumnRootAtom, DataGridColumnBond<T>>('root', {
		bond,
		factory: (owner) => new DataGridColumnRootAtom(owner as DataGridColumnBond<T>)
	});

	const isSortable = $derived(bond.isSortable);
	const columnProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...bond.props, ...restProps })
	);

	const unmount = bond.mount();

	$effect(() => unmount);

	function defaultFactory(props: DataGridColumnBondProps): DataGridColumnBond<T> {
		return DataGridColumnBond.create<T>(props);
	}

	function handleClick(event: MouseEvent) {
		const onClick = onclick as ((event: MouseEvent) => void) | undefined;
		onClick?.(event);
		if (event.defaultPrevented || !isSortable) return;

		direction = direction === 'asc' ? 'desc' : 'asc';

		const sort: SortBy = {
			id: bond.id,
			direction,
			...(typeof sortable === 'string' ? { by: sortable } : {})
		};
		onsort?.(sort, { bond, event, reason: 'click' });
	}
</script>

{#if !hidden}
	<HtmlAtom
		class={[
			'flex cursor-pointer py-1 font-medium select-none',
			!!sortable && 'sortable',
			'$preset',
			klass
		]}
		onclick={handleClick}
		{...columnProps}
	>
		{@render children?.({ column: bond })}
	</HtmlAtom>
{/if}
