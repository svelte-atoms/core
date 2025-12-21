<script module lang="ts">
	export type RootPortals = 'root.l0' | 'root.l1' | 'root.l2' | 'root.l3';
</script>

<script lang="ts">
	import { cn, defineState, defineProperty } from '$svelte-atoms/core/utils';
	import { Portal, ActivePortal, Portals } from '$svelte-atoms/core/components/portal';
	import { HtmlAtom as Atom } from '$svelte-atoms/core/components/atom';
	import { HtmlElement, MathmlElement, SvgElement } from '$svelte-atoms/core/components/element';
	import { RootBond, RootBondState, type RootStateProps } from './bond.svelte';

	let {
		class: klass = '',
		base = undefined,
		children = undefined,
		portals = undefined,
		...restProps
	} = $props();

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
		{#if portals}
			{@render portals?.()}
		{:else}
			<Portal.Outer id="root.l0" class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
				<Portal.Inner />
			</Portal.Outer>

			<Portal.Outer id="root.l1" class="pointer-events-none absolute inset-0 z-12 overflow-hidden">
				<Portal.Inner />
			</Portal.Outer>

			<Portal.Outer id="root.l2" class="pointer-events-none absolute inset-0 z-14 overflow-hidden">
				<Portal.Inner />
			</Portal.Outer>

			<Portal.Outer id="root.l3" class="pointer-events-none absolute inset-0 z-16 overflow-hidden">
				<Portal.Inner />
			</Portal.Outer>
		{/if}

		<ActivePortal portal="root.l0">
			{@render children?.()}
		</ActivePortal>
	</Atom>
</Portals>
