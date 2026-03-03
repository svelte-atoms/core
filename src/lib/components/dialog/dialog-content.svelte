<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';
	import type { DialogContentProps } from './types';
	import { animateDialogContent } from './motion.svelte';

	const bond = DialogBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DialogContentProps<E, B> = $props();

	const dialogProps = $derived({
		...bond?.content({}),
		...restProps
	});
</script>

<HtmlAtom
	preset="dialog.content"
	class={[
		'bg-card text-foreground border-border flex h-fit w-full max-w-[90svw] flex-col rounded-md border py-4 shadow-sm',
		'$preset',
		klass
	]}
	{bond}
	defaults={{
		animate: animateDialogContent()
	}}
	{...dialogProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
