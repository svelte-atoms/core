<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { StackBond, StackRootAtom, type StackStateProps } from './bond.svelte';
	import type { StackRootProps } from './types';
	import './stack.css';

	let {
		value = $bindable<string | undefined>(undefined),
		class: klass = '',
		preset = undefined,
		factory = defaultFactory,
		onvaluechange = undefined,
		children,
		...restProps
	}: StackRootProps<E, B> = $props();

	let valueState = $derived<string | undefined>(value as string | undefined);
	const callbackState = { bond: undefined as StackBond | undefined };

	const binding = bindBond<StackBond>(
		(props) => factory(props),
		{
			value: [
				() => valueState,
				(v) => {
					const changed = !Object.is(valueState, v);
					valueState = v;
					value = valueState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onvaluechange?.(valueState, { bond: callbackBond });
					}
				}
			]
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance('root', {
		bond,
		factory: (owner) => new StackRootAtom(owner!)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: StackStateProps) {
		return StackBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={['stack-root', '$preset', klass]} {...rootProps}>
	{@render children?.({})}
</HtmlAtom>
