<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DropdownBond } from './bond.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import CloseIcon from '$svelte-atoms/core/icons/icon-close.svelte';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('DropdownValue must be used within a Dropdown');
	}

	let {
		class: klass = '',
		as = 'div' as T,
		value,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	function handleClick(ev: Event) {
		ev.preventDefault();
		ev.stopPropagation();

		console.log('unselect', value);

		bond?.state.unselect([value]);
	}
</script>

<HtmlAtom
	{as}
	{bond}
	preset="dropdown.value"
	class={[
		'dropdown-value border-border bg-foreground/5 inline-flex flex-nowrap items-center gap-1 rounded-xs px-1 whitespace-nowrap',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...restProps}
>
	{@render children?.()}

	<button
		class="bg-foreground/5 flex aspect-square h-4 cursor-pointer items-center justify-center rounded-xs p-0"
		onclick={handleClick}
	>
		<Icon class="h-3" src={CloseIcon} />
	</button>
</HtmlAtom>
