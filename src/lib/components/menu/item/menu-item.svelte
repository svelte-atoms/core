<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { MenuItemAtom, type MenuItemAtomProps } from './bond.svelte';
	import { MenuBond } from '../bond.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { MenuItemProps } from './types';

	const menu = MenuBond.get();

	if (!menu) {
		throw new Error('<MenuItem> must be used within a <Menu>.');
	}

	let {
		class: klass = '',
		id,
		preset: presetKey = 'menu.item',
		disabled = undefined,
		children = undefined,
		onclick = undefined,
		...restProps
	}: MenuItemProps = $props();

	// Create reactive props object for the atom
	const itemProps = $derived<MenuItemAtomProps>({
		id: id ?? '',
		disabled
	});

	// Create the atom instance
	const atom = new MenuItemAtom<typeof menu>(() => itemProps, menu);

	// Derived reactive properties
	const isHighlighted = $derived(atom.isHighlighted);

	// Merge atom attrs with custom props
	const itemAttrs = $derived({
		...atom.attrs,
		...restProps
	});

	// Register item with menu state and handle mounting
	$effect.pre(() => {
		menu.state.registerItem(id ?? '', atom as any);

		const unmount = atom.mount();
		return () => {
			unmount?.();
			atom.unmount();
			menu.state.unregisterItem(id ?? '');
		};
	});

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		atom.close();
	}

	export function getController() {
		return atom;
	}
</script>

<HtmlAtom
	preset={presetKey}
	class={[
		'border-border last:border-b-none hover:bg-foreground/5 active:bg-foreground/10 outline-primary cursor-pointer border-b',
		'$preset',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	{...itemAttrs}
	onclick={handleClick}
>
	{@render children?.({ menuItem: atom })}
</HtmlAtom>
