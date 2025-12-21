<script module lang="ts">
	export type RootPortals = 'root.l0' | 'root.l1' | 'root.l2' | 'root.l3';
</script>

<script lang="ts">
	import { cn, defineState, defineProperty } from '$svelte-atoms/core/utils';
	import { ActivePortal, Portals } from '$svelte-atoms/core/components/portal';
	import { HtmlAtom as Atom } from '$svelte-atoms/core/components/atom';
	import { HtmlElement, MathmlElement, SvgElement } from '$svelte-atoms/core/components/element';
	import { RootBond, RootBondState, type RootStateProps } from './bond.svelte';
	import L0Portal from './l0-portal.svelte';
	import L1Portal from './l1-portal.svelte';
	import type { RootProps } from './types';

	let {
		class: klass = '',
		base = undefined,
		children = undefined,
		portals = undefined,
		l0portal = undefined,
		l1portal = undefined,
		...restProps
	}: RootProps = $props();

	let html: typeof HtmlElement | undefined = $state(HtmlElement);
	let svg: typeof SvgElement | undefined = $state(undefined);
	let mathml: typeof MathmlElement | undefined = $state(undefined);

	type Renderers = {
		html?: typeof HtmlElement;
		svg?: typeof SvgElement;
		mathml?: typeof MathmlElement;
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
		}),
		defineProperty('mathml', () => {
			if (!mathml) {
				import('$svelte-atoms/core/components/element/mathml-element.svelte').then((mod) => {
					mathml = mod.default;
				});
			}

			return mathml;
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
		{#if l0portal}
			{@render l0portal?.()}
		{:else}
			<L0Portal />
		{/if}

		{#if l1portal}
			{@render l1portal?.()}
		{:else}
			<L1Portal />
		{/if}

		{@render portals?.()}

		<ActivePortal portal="root.l0">
			{@render children?.()}
		</ActivePortal>
	</Atom>
</Portals>
