<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { DialogBodyProps } from './types';
	import { DialogBodyAtom, DialogBond } from './bond.svelte';
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';

	let {
		class: klass,
		preset = undefined,
		children = undefined,
		...restProps
	}: DialogBodyProps<E, B> = $props();

	const bond = DialogBond.getOrThrow('<Dialog.Body /> must be used within a <Dialog.Root />');

	const atom = createAtomInstance<DialogBodyAtom, DialogBond, HTMLElement>('body', {
		bond,
		factory: (owner) => new DialogBodyAtom(owner as DialogBond)
	});

	const bodyProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom {bond} class={['px-4 py-2', '$preset', klass]} {...bodyProps}>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
