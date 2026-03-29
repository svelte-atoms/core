<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DropdownMenuItemAtom, type DropdownMenuItemAtomProps } from './bond.svelte';
	import { DropdownMenuBond } from '../bond.svelte';
	import type { DropdownMenuItemProps } from './types';
	import { List } from '../../list';

	const menu = DropdownMenuBond.get();

	if (!menu) {
		throw new Error('<DropdownMenuItem> must be used within a <DropdownMenu>.');
	}

	let {
		class: klass = '',
		id,
		preset: presetKey = 'dropdown-menu.item',
		disabled = undefined,
		children = undefined,
		onclick = undefined,
		...restProps
	}: DropdownMenuItemProps = $props();

	// Create reactive props object for the atom
	const itemProps = $derived<DropdownMenuItemAtomProps>({
		id: id ?? '',
		disabled
	});

	// Create the atom instance
	const atom = new DropdownMenuItemAtom<typeof menu>(() => itemProps, menu);

	// Derived reactive properties
	const isHighlighted = $derived(atom.isHighlighted);

	// Merge atom attrs with custom props
	const itemAttrs = $derived({
		...atom.attrs,
		...restProps
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

<List.Item
	preset={presetKey}
	class={[
		'border-border last:border-b-0 hover:bg-foreground/5 active:bg-foreground/10 outline-primary cursor-pointer border-b',
		'$preset',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	{...itemAttrs}
	onclick={handleClick}
>
	{@render children?.({ menuItem: atom })}
</List.Item>
