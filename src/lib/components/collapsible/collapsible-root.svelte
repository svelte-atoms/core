<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { CollapsibleBond, CollapsibleRootAtom, type CollapsibleStateProps } from './bond.svelte';
	import type { CollapsibleRootProps } from './types';

	let {
		open = $bindable(false),
		class: klass = '',
		preset = undefined,
		value,
		data = undefined,
		disabled = false,
		factory = defaultFactory,
		onopenchange = undefined,
		children = undefined,
		...restProps
	}: CollapsibleRootProps<E, B> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as CollapsibleBond | undefined };

	const binding = bindBond<CollapsibleBond>(
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
						onopenchange?.(openState, { bond: callbackBond });
					}
				}
			],
			data: () => data,
			disabled: () => disabled,
			value: () => value
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<CollapsibleRootAtom, CollapsibleBond>('root', {
		bond,
		factory: (owner) => new CollapsibleRootAtom(owner as CollapsibleBond)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: CollapsibleStateProps) {
		return CollapsibleBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['border-border flex w-full flex-col overflow-hidden', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
