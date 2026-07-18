<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { StepBond } from './bond.svelte';
	import type { StepDescriptionProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		as = 'p',
		children = undefined,
		...restProps
	}: StepDescriptionProps<E, B> = $props();

	const part = usePart(StepBond, 'description', () => restProps, {
		message: 'StepDescription must be used within a Step component.',
		preset: () => preset
	});
</script>

<HtmlAtom
	{as}
	bond={part.bond}
	class={['text-xs text-muted-foreground', '$preset', klass]}
	{...part.props}
>
	{@render children?.({ step: part.bond })}
</HtmlAtom>
