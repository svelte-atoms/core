<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { SidebarBond, SidebarBondState, type SidebarBondProps } from './bond.svelte';
	import type { SidebarRootProps } from './types';
	import { ZLayer } from '../portal/zlayer.svelte';
	import { untrack } from 'svelte';

	let {
		open = $bindable(false),
		disabled = false,
		"z-index": zindex = 0,
		factory = _factory,
		children = undefined,
		...restProps
	}: SidebarRootProps<E, B> = $props();

	const normalizedZIndex = $derived(
		typeof zindex === 'number' && Number.isFinite(zindex) ? zindex : undefined
	);

	new ZLayer('sidebar', () => normalizedZIndex ?? 0).share();

	const bondProps = defineState<SidebarBondProps>([
		defineProperty(
			'open',
			() => open,
			(v) => {
				open = v;
			}
		),
		defineProperty('disabled', () => disabled),
		defineProperty('rest', () => restProps)
	]);

	const bond = untrack(() => factory(bondProps)).share();

	function _factory(props: typeof bondProps) {
		const bondState = new SidebarBondState(() => props);
		const bond = new SidebarBond(bondState);

		return bond;
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ sidebar: bond })}
