<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { AccordionBond, AccordionRootAtom, type AccordionBondProps } from './bond.svelte';
	import type { AccordionRootProps } from './types';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';

	let {
		value = $bindable(undefined),
		values = $bindable([]),
		data = $bindable([]),
		class: klass = '',
		multiple = false,
		collapsible = false,
		disabled = false,
		onvaluechange = undefined,
		onvalueschange = undefined,
		children = undefined,
		factory = defaultFactory,
		preset = undefined,
		...restProps
	}: AccordionRootProps<E, B> = $props();

	let valueState = $derived<string | undefined>(value);
	let valuesState = $derived<string[]>(values);
	const callbackState = { bond: undefined as AccordionBond | undefined };

	const binding = bindBond<AccordionBond>(
		(props) => factory(props),
		{
			open: () => (multiple ? valuesState.length > 0 : valueState !== undefined),
			values: [
				() => (multiple ? valuesState : ([valueState].filter(Boolean) as string[])),
				(v) => {
					const previousValues = multiple
						? valuesState
						: valueState === undefined
							? []
							: [valueState];
					const changed = !sameValues(previousValues, v);
					valuesState = v;
					valueState = valuesState[0];
					values = valuesState;
					value = valueState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						if (multiple) {
							onvalueschange?.(valuesState, { bond: callbackBond });
						} else {
							onvaluechange?.(valueState, { bond: callbackBond });
						}
					}
				}
			],
			multiple: () => multiple,
			collapsible: () => collapsible,
			disabled: () => disabled
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<AccordionRootAtom, AccordionBond>('root', {
		bond,
		factory: (owner) => new AccordionRootAtom(owner as AccordionBond)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function sameValues(left: readonly string[], right: readonly string[]) {
		return left.length === right.length && left.every((item, index) => item === right[index]);
	}

	function defaultFactory(props: AccordionBondProps) {
		return AccordionBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['bg-card border-border flex list-none flex-col', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ accordion: bond })}
</HtmlAtom>
