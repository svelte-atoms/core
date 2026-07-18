<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { TabsBond } from './bond.svelte';
	import type { TabsHeaderProps } from './types';

	let {
		class: klass = '',
		children,
		preset = undefined,
		...restProps
	}: TabsHeaderProps<E, B> = $props();

	const part = usePart(TabsBond, 'header', () => restProps, {
		message: 'TabsHeader must be used within a Tabs component',
		preset: () => preset
	});
</script>

<HtmlAtom bond={part.bond} class={['relative flex min-w-full', '$preset', klass]} {...part.props}>
	{@render children?.({ tabs: part.bond })}
</HtmlAtom>
