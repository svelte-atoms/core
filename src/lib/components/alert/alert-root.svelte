<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond, createAtomInstance } from '$svelte-atoms/core/shared';
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AlertBond, AlertRootAtom } from './bond.svelte';
	import type { AlertRootProps } from './types';
	import './alert.css';

	let {
		class: klass = '',
		preset = undefined,
		disabled = false,
		extend = {},
		factory = (props) => new AlertBond(props),
		children,
		...restProps
	}: AlertRootProps<E, B> = $props();

	const binding = bindBond<AlertBond>((props) => factory(props), {
		disabled: () => disabled,
		extend: () => extend
	});
	const bond = binding.bond.share();

	const rootAtom = createAtomInstance<AlertRootAtom, AlertBond>('root', {
		bond,
		factory: (owner) => new AlertRootAtom(owner).role('control')
	});

	const rootProps = $derived(mergeAtomProps(rootAtom, preset, restProps));

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={[
		'alert border-border relative flex gap-1 rounded-md border p-4 transition-all duration-200',
		'bg-background text-foreground',
		{
			'pointer-events-none opacity-50': disabled
		},
		'$preset',
		klass
	]}
	{bond}
	{...rootProps}
>
	{@render children?.({ alert: bond })}
</HtmlAtom>
