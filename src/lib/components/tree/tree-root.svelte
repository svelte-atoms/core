<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { mergeAtomProps } from '$ixirjs/ui/components/atom';
	import { TreeBond, TreeRootAtom } from './bond.svelte';
	import type { TreeRootProps } from './types';

	let {
		open = $bindable(false),
		disabled = false,
		class: klass = '',
		preset = undefined,
		children = undefined,
		factory = (props) => TreeBond.create(props),
		onopenchange = undefined,
		...restProps
	}: TreeRootProps<E, B> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as TreeBond | undefined };

	const binding = bindBond<TreeBond>(
		(props) => factory(props),
		{
			open: [
				() => openState,
				(v) => {
					const changed = !Object.is(openState, v);
					openState = v;
					open = openState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onopenchange?.(openState, {
							bond: callbackBond,
							...callbackBond.takeOpenChangeContext()
						});
					}
				}
			],
			disabled: () => disabled
		},
		{ preset: () => preset }
	);
	const bond: TreeBond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<TreeRootAtom, TreeBond, HTMLElement>('root', {
		bond,
		factory: (owner) => new TreeRootAtom(owner!)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	export function getBond(): TreeBond {
		return bond;
	}
</script>

<HtmlAtom class={['flex flex-col', '$preset', klass]} {...rootProps}>
	{@render children?.({ tree: bond })}
</HtmlAtom>
