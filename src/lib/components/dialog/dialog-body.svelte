<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { DialogBodyProps } from './types';
	import { DialogBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';

	let {
		class: klass,
		preset = undefined,
		children = undefined,
		...restProps
	}: DialogBodyProps<E, B> = $props();

	const part = usePart(DialogBond, 'body', () => restProps, {
		message: '<Dialog.Body /> must be used within a <Dialog.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {bond} class={['px-4 py-2', '$preset', klass]} {...part.props}>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
