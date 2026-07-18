<script
	lang="ts"
	generics="D extends string, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { onMount } from 'svelte';
	import { TabsBond, TabsRootAtom, type TabsBondProps } from './bond.svelte';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import type { TabsRootProps } from './types';

	let {
		class: klass = '',
		value = $bindable(),
		children,
		onvaluechange = undefined,
		onchange = undefined,
		preset = undefined,
		...restProps
	}: TabsRootProps<D, E, B> = $props();

	let valueState = $derived<D | undefined>(value as D | undefined);
	const callbackState = { bond: undefined as TabsBond | undefined, ready: false };

	const binding = bindBond<TabsBond>(
		(props) => defaultFactory(props),
		{
			value: [
				() => valueState,
				(v) => {
					const nextValue = v as D | undefined;
					const changed = !Object.is(valueState, nextValue);
					valueState = nextValue;
					value = valueState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond && callbackState.ready) {
						onvaluechange?.(valueState, { bond: callbackBond });
					}
				}
			]
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	onMount(() => {
		callbackState.ready = true;
	});
	const rootAtom = createAtomInstance<TabsRootAtom, TabsBond>('root', {
		bond,
		factory: (owner) => new TabsRootAtom(owner as TabsBond)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: TabsBondProps) {
		return TabsBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={['flex w-full flex-1 flex-col', '$preset', klass]} {...rootProps} {onchange}>
	{@render children?.({ tabs: bond })}
</HtmlAtom>
