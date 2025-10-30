<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Base, ComponentBase, HtmlAtomProps, SnippetBase } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import { cn, toClassValue, type ClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';

	type Element = HTMLElementTagNameMap[E];

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = 'div',
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const preset = $derived(
		presetKey ? getPreset(presetKey as PresetModuleName)?.apply?.(bond, [bond]) : undefined
	);

	const _klass = $derived(compilePresetPlaceholder(klass));

	const _base = $derived(base ?? preset?.base);
	const _as = $derived(as ?? preset?.as);
	const _restProps = $derived.by(() => {
		const { class: klass, base, as, ...restPresetProps } = preset ?? {};
		return { ...restPresetProps, ...restProps };
	});

	const isSnippet = $derived(typeof _base === 'function' && _base.length === 1 && !_base.prototype);

	const snippet = $derived(_base as SnippetBase);

	const atom = rootBond?.state?.props?.renderers?.html ?? HtmlElement;

	const Component = $derived(base ?? atom) as ComponentBase;

	function compilePresetPlaceholder(klass: ClassValue): ReturnType<typeof toClassValue> {
		if (Array.isArray(klass)) {
			return klass.map((k) => compilePresetPlaceholder(k));
		}

		const compiled = toClassValue.apply(bond, [klass, bond]);

		if (Array.isArray(compiled)) {
			return compiled.map((c) => compilePresetPlaceholder(c));
		}

		if (typeof compiled === 'string') {
			return compiled.replace('$preset', cn(preset?.class));
		}

		return compiled;
	}
</script>

{#if isSnippet}
	{@render snippet({ class: _klass, as: _as, base: _base, children, ..._restProps })}
{:else}
	<Component class={_klass} as={_as} {..._restProps}>
		{@render children?.()}
	</Component>
{/if}
