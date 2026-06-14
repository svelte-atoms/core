<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$svelte-atoms/core/shared/bind-bond.svelte';
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { SidebarBond, SidebarBondState, type SidebarBondProps } from './bond.svelte';
	import type { SidebarRootProps } from './types';
	import { ZLayer } from '../portal/zlayer.svelte';

	let {
		open = $bindable(false),
		disabled = false,
		"z-index": zindex = 0,
		factory = defaultFactory,
		children = undefined,
		...restProps
	}: SidebarRootProps<E, B> = $props();

	const normalizedZIndex = $derived(
		typeof zindex === 'number' && Number.isFinite(zindex) ? zindex : undefined
	);

	new ZLayer('sidebar', () => normalizedZIndex ?? 0).share();

	const binding = bindBond<SidebarBond>(
		(props) => factory(props),
		{
			open: [() => open, (v) => { open = v; }],
			disabled: () => disabled,
			rest: () => restProps
		}
	);
	const bond = binding.bond.share();

	function defaultFactory(props: SidebarBondProps) {
		const bondState = new SidebarBondState(props);
		const bond = new SidebarBond(bondState);

		return bond;
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ sidebar: bond })}
