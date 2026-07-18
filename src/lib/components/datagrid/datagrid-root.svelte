<script
	lang="ts"
	generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { DataGridBond, DataGridRootAtom, type DataGridBondProps } from './bond.svelte';
	import type { DatagridRootProps } from './types';
	import './datagrid.css';

	let {
		class: klass = '',
		preset = undefined,
		values = $bindable([]),
		template = undefined,
		fallbackTemplate = 'auto',
		factory = defaultFactory,
		onvalueschange = undefined,
		children = undefined,
		...restProps
	}: DatagridRootProps<T, E, B> = $props();

	let valuesState = $derived<string[]>(values);
	const callbackState = { bond: undefined as DataGridBond<T> | undefined };

	function sameValues(left: readonly string[], right: readonly string[]) {
		return left.length === right.length && left.every((item, index) => item === right[index]);
	}

	const binding = bindBond<DataGridBond<T>>(
		(props) => factory(props),
		{
			template: () => template,
			values: [
				() => valuesState,
				(v) => {
					const nextValues = v ?? [];
					const changed = !sameValues(valuesState, nextValues);
					valuesState = nextValues;
					values = valuesState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onvalueschange?.(valuesState, {
							bond: callbackBond,
							...callbackBond.takeValuesChangeContext()
						});
					}
				}
			]
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<DataGridRootAtom, DataGridBond<T>>('root', {
		bond,
		factory: (owner) => new DataGridRootAtom(owner as DataGridBond<T>)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: DataGridBondProps<T>) {
		return DataGridBond.create<T>(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['datagrid-root w-full gap-x-0 gap-y-0', '$preset', klass]}
	style="--template-columns:{bond.template || fallbackTemplate}"
	{...rootProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
