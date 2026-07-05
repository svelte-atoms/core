<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond, createAtomInstance } from '$ixirjs/ui/shared';
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { CardBond, CardRootAtom } from './bond.svelte';
	import type { CardRootProps } from './types';
	import './card.css';

	let {
		class: klass = '',
		preset = undefined,
		disabled = false,
		clickable = undefined,
		factory = (props) => new CardBond(props),
		children = undefined,
		onclick = undefined,
		onkeydown = undefined,
		...restProps
	}: CardRootProps<E, B> = $props();

	const binding = bindBond<CardBond>((props) => factory(props), {
		disabled: [
			() => disabled,
			(v) => {
				disabled = v ?? false;
			}
		],
		clickable: () => clickable ?? Boolean(onclick)
	});
	const bond = binding.bond.share();

	const disabledStyles = $derived(disabled ? 'opacity-50 cursor-not-allowed' : '');

	const rootAtom = createAtomInstance<CardRootAtom, CardBond>('root', {
		bond,
		factory: (owner) => new CardRootAtom(owner).role('control')
	});

	const rootProps = $derived(mergeAtomProps(rootAtom, preset, restProps));

	function handleClick(event: MouseEvent) {
		if (disabled) return;
		onclick?.(event);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onclick?.(event as unknown as MouseEvent);
		}
		onkeydown?.(event);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={[
		'card bg-card border-border flex flex-col overflow-clip rounded-lg border shadow-sm',
		disabledStyles,
		'$preset',
		klass
	]}
	{bond}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...rootProps}
>
	{@render children?.({ card: bond })}
</HtmlAtom>
