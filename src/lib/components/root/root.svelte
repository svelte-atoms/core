<script module lang="ts">
	export type RootPortals = 'root.l0' | 'root.l1' | 'root.l2' | 'root.l3';
</script>

<script lang="ts">
	import { toClassValue, cn, defineState, defineProperty } from '$svelte-atoms/core/utils';
	import { RootBond, RootBondState, type RootStateProps } from './bond.svelte';
	import { Portal, ActivePortal, Portals } from '$svelte-atoms/core/components/portal';
	import { Stack } from '../stack';
	import { getPreset } from '$svelte-atoms/core/context/preset.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { HtmlElement, MathmlElement, SvgElement } from '$svelte-atoms/core/components/element';

	const rootPreset = getPreset('root');
	const portalsPreset = getPreset('root.portals');

	let { class: klass = '', children = undefined, portals = undefined, ...restProps } = $props();

	let html: typeof HtmlElement | undefined = HtmlElement;
	let svg: typeof SvgElement | undefined = undefined;
	let mathml: typeof MathmlElement | undefined = undefined;

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

<HtmlAtom
	{@attach (node) => {
		bond.rootElement = node;
	}}
	class={cn(
		'atom-root bg-background text-foreground relative flex w-full flex-1 flex-col items-start font-sans',
		toClassValue.apply(bond, [rootPreset?.class]),
		toClassValue.apply(bond, [klass])
	)}
	{...restProps}
>
	<Portals id="root fixed">
		{#if portals}
			{@render portals?.()}
		{:else}
			<Stack.Root
				class={[
					'portals pointer-events-none absolute inset-0 z-1 overflow-hidden',
					toClassValue.apply(bond, [portalsPreset?.class])
				]}
			>
				<Portal.Outer base={Stack.Item} id="root.l0">
					<Portal.Inner />
				</Portal.Outer>

				<Portal.Outer base={Stack.Item} id="root.l1">
					<Portal.Inner />
				</Portal.Outer>

				<Portal.Outer base={Stack.Item} id="root.l2">
					<Portal.Inner />
				</Portal.Outer>

				<Portal.Outer base={Stack.Item} id="root.l3">
					<Portal.Inner />
				</Portal.Outer>
			</Stack.Root>
		{/if}

		<ActivePortal id="root.l0">
			{@render children?.()}
		</ActivePortal>
	</Portals>
</HtmlAtom>
