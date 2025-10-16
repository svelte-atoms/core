<script module lang="ts">
	import type { Override } from '$lib/types';

	export type InjectorProps<T extends Component> = Override<
		{
			component: T;
			target?: Element;
			anchor?: Element;
			context?: Map<any, any> | undefined;
			intro?: boolean;
			children?: Snippet;
		},
		ComponentProps<T> | {}
	>;
</script>

<script lang="ts" generics="T extends Component">
	import { mount, onMount, type Component, type ComponentProps, type Snippet } from 'svelte';

	let {
		component,
		target = undefined,
		anchor = undefined,
		context,
		intro = true,
		children = undefined,
		...restProps
	}: InjectorProps<T> = $props();

	let localTarget: HTMLElement | undefined = $state();

	let isLocal = $derived(target === undefined);

	let _target = $derived(target ?? localTarget ?? undefined);

	onMount(() => {
		if (!component) return;
		if (!_target) return;

		mount(component, {
			target: _target,
			anchor: anchor,
			context: context,
			intro: intro,
			props: {
				children,
				...restProps
			}
		});
	});
</script>

{#if isLocal}
	<div
		style="display: contents"
		{@attach (node) => {
			localTarget = node as HTMLElement;
		}}
	></div>
{/if}
