<script module lang="ts">
	export type RootPortals = 'root.l0' | 'root.l1' | 'root.l2' | 'root.l3';
</script>

<script lang="ts">
	import { cn, defineState, defineProperty } from '$svelte-atoms/core/utils';
	import { ActivePortal, Portal, Portals } from '$svelte-atoms/core/components/portal';
	import { HtmlAtom as Atom } from '$svelte-atoms/core/components/atom';
	import { HtmlElement, SvgElement } from '$svelte-atoms/core/components/element';
	import { RootBond, RootBondState, type RootStateProps } from './bond.svelte';
	import L0Portal from './l0-portal.svelte';
	import type { RootProps } from './types';

	let {
		class: klass = '',
		base = undefined,
		children = undefined,
		portal = undefined,
		...restProps
	}: RootProps = $props();

	let html: typeof HtmlElement | undefined = $state(HtmlElement);
	let svg: typeof SvgElement | undefined = $state(undefined);

	type Renderers = {
		html?: typeof HtmlElement;
		svg?: typeof SvgElement;
	};

	const renderers = defineState<Renderers>([
		defineProperty('html', () => {
			if (!html) {
				import('$svelte-atoms/core/components/element/html-element.svelte').then((mod) => {
					html = mod.default;
				});
			}

			return html;
		}),
		defineProperty('svg', () => {
			if (!svg) {
				import('$svelte-atoms/core/components/element/svg-element.svelte').then((mod) => {
					svg = mod.default;
				});
			}

			return svg;
		})
	]);

	const bondProps = defineState<RootStateProps>([defineProperty('renderers', () => renderers)]);

	const bondState = new RootBondState(() => bondProps);
	const bond = new RootBond(bondState).share();
</script>

<Portals id="root">
	<Atom
		{@attach (node) => {
			bond.rootElement = node;
		}}
		{base}
		preset="root"
		class={cn(
			'atom-root bg-background text-foreground relative flex h-full w-full flex-1 flex-col items-start justify-stretch font-sans',
			'$preset',
			klass
		)}
		{...restProps}
	>
		{#if portal}
			{@render portal?.()}
		{:else}
			<Portal.Outer id="root.l0" class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
				<Portal.Inner />
			</Portal.Outer>
		{/if}

		<ActivePortal portal="root.l0">
			{@render children?.()}
		</ActivePortal>
	</Atom>
</Portals>
