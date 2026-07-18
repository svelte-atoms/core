<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { InputBond, InputRootAtom, type InputStateProps } from './bond.svelte';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { mergeAtomProps } from '$ixirjs/ui/components/atom';
	import type { Factory } from '$ixirjs/ui/types';
	import type { InputRootProps } from './types';

	let {
		class: klass = '',
		value,
		checked = undefined,
		files = [],
		preset = undefined,
		children = undefined,
		factory = (props: InputStateProps) => InputBond.create(props),
		...restProps
	}: InputRootProps<E, B> = $props();

	const binding = bindBond<InputBond>(
		(props) => (factory as Factory<InputBond>)(props),
		{
			// Bridge HTML-input prop shapes to the bond's domain props (was loose `defineProperty`).
			value: [
				() => value as InputStateProps['value'],
				(v) => {
					value = v as typeof value;
				}
			],
			checked: [
				() => checked as InputStateProps['checked'],
				(v) => {
					checked = v as typeof checked;
				}
			],
			files: [
				() => files as InputStateProps['files'],
				(v) => {
					files = [...(v ?? [])];
				}
			]
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	const rootAtom = createAtomInstance('root', {
		bond,
		factory: (owner) => new InputRootAtom(owner!)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={[
		'text-foreground bg-input relative flex h-10 w-auto items-center overflow-hidden rounded-md border',
		'$preset',
		klass
	]}
	{...rootProps}
>
	{@render children?.({ input: bond })}
</HtmlAtom>
