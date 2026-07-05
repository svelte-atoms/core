<script module lang="ts">
	export type RootPortals = 'root.l0';
</script>

<script lang="ts">
	import { cn, defineState, defineProperty } from '$ixirjs/ui/utils';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { ActivePortal, Portals } from '$ixirjs/ui/components/portal';
	import { PortalHost } from '$ixirjs/ui/components/portal/host';
	import { mergePresetProps, HtmlAtom } from '$ixirjs/ui/components/atom';
	import { HtmlElement, SvgElement } from '$ixirjs/ui/components/element';
	import { RootBond } from './bond.svelte';
	import type { RootProps } from './types';

	let {
		class: klass = '',
		base = undefined,
		preset = undefined,
		children = undefined,
		portal = undefined,
		...restProps
	}: RootProps = $props();

	const atomProps = $derived(mergePresetProps(preset, 'root', restProps));

	let html: typeof HtmlElement | undefined = $state(HtmlElement);
	let svg: typeof SvgElement | undefined = $state(undefined);

	type Renderers = {
		html?: typeof HtmlElement;
		svg?: typeof SvgElement;
	};

	const renderers = defineState<Renderers>([
		defineProperty('html', () => {
			if (!html) {
				import('$ixirjs/ui/components/element/html-element.svelte').then((mod) => {
					html = mod.default;
				});
			}

			return html;
		}),
		defineProperty('svg', () => {
			if (!svg) {
				import('$ixirjs/ui/components/element/svg-element.svelte').then((mod) => {
					svg = mod.default;
				});
			}

			return svg;
		})
	]);

	const binding = bindBond<RootBond>((props) => new RootBond(props), {
		renderers: () => renderers
	});
	const bond = binding.bond.share();
</script>

<Portals id="root">
	<HtmlAtom
		{@attach (node: HTMLElement) => {
			bond.rootElement = node;
		}}
		{base}
		class={cn(
			'atom-root bg-background text-foreground relative flex h-full w-full flex-1 flex-col items-start justify-stretch font-sans',
			'$preset',
			klass
		)}
		{...atomProps}
	>
		{#if portal}
			{@render portal?.()}
			<ActivePortal portal="root.l0">
				{@render children?.()}
			</ActivePortal>
		{:else}
			<PortalHost id="root.l0" class="flex-1 flex flex-col w-full h-full">
				{@render children?.()}
			</PortalHost>
		{/if}
	</HtmlAtom>
</Portals>
