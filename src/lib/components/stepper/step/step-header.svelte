<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { StepBond } from './bond.svelte';
	import type { StepHeaderProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: StepHeaderProps<E, B> = $props();

	const part = usePart(StepBond, 'header', () => restProps, {
		message: 'StepHeader must be used within a Step component.',
		preset: () => preset
	});
</script>

<HtmlAtom
	as="div"
	bond={part.bond}
	class={['font-medium text-sm flex flex-col', '$preset', klass]}
	{...part.props}
>
	{@render children?.({ step: part.bond })}
</HtmlAtom>
