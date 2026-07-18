<script
	lang="ts"
	generics="Tag extends keyof HTMLElementTagNameMap = 'div', BaseComponent extends Base = Base, Children extends AnySnippet = Snippet"
>
	import { type Snippet } from 'svelte';
	import type { AnySnippet, Base, HtmlAtomProps } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import SnippetAdapter from './snippet.svelte';
	import { createPresentation } from './presentation.svelte';
	import {
		resolveRendererComponent,
		resolveRendererProps,
		resolveRenderTarget
	} from './render-target';
	import { runLifecycle } from './lifecycle.svelte';

	const rootBond = RootBond.get();

	type HtmlAtomInternalProps<
		Tag extends keyof HTMLElementTagNameMap,
		BaseComponent extends Base,
		Children extends AnySnippet
	> = HtmlAtomProps<Tag, BaseComponent, Children> & {
		// Internal defaults layer: applied before preset/variants/rest so presets and users can override.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		defaults?: Record<string, any> | undefined;
	};

	let {
		class: klass = '',
		as = undefined,
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		variants = undefined,
		defaults = undefined,
		oninit = undefined,
		children: children = undefined,
		...restProps
	}: HtmlAtomInternalProps<Tag, BaseComponent, Children> = $props();

	// Bond lifecycle attachments (createLifecycleKey): fire each phase's `(bond) => …` callbacks
	// against the live bond. The lifecycle keys are symbol-keyed, so Svelte ignores them on the
	// DOM spread downstream — `restProps` flows on untouched.
	runLifecycle(
		() => restProps,
		() => bond,
		() => oninit
	);

	// Full HtmlAtom and lightweight native/SVG adapters share this presentation seam.
	const presentation = createPresentation({
		preset: () => presetKey,
		bond: () => bond,
		variants: () => variants,
		defaults: () => defaults,
		class: () => klass,
		as: () => as,
		base: () => base,
		restProps: () => restProps
	});
	const finalKlass = $derived(presentation.class);
	const finalBase = $derived(presentation.base);
	const finalAs = $derived(presentation.as);
	const finalRestProps = $derived(presentation.attrs);

	const atom = $derived(rootBond?.props?.renderers?.html ?? HtmlElement);

	// Render-target normalization names the component/snippet decision in one place.
	const renderTarget = $derived(resolveRenderTarget(finalBase, atom));
	// Component identity and props are separate signals so prop changes do not remount the renderer.
	const RendererComponent = $derived(resolveRendererComponent(renderTarget, SnippetAdapter));
	const rendererProps = $derived.by(() =>
		resolveRendererProps(renderTarget, finalKlass, finalAs, finalRestProps, {
			presentationResolved: renderTarget.kind === 'component' && renderTarget.component === atom
		})
	);

	function forwardChildren(...args: unknown[]) {
		return (children as ((...args: unknown[]) => unknown) | undefined)?.(...args);
	}
</script>

<RendererComponent {...rendererProps} children={forwardChildren} />
