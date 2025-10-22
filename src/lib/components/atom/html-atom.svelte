<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Base, ComponentBase, HtmlAtomProps, SnippetBase } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
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

	const preset = $derived(presetKey ? getPreset(presetKey as PresetModuleName) : undefined);

	const _klass = $derived.by(() => {
		const klasses = Array.isArray(klass) ? klass : [klass];

		const hasPresetPlaceholder = klasses.some(
			(cls) => typeof cls === 'string' && cls.includes('$preset')
		);

		if (hasPresetPlaceholder) {
			return klasses.map((cls) => {
				if (typeof cls === 'string' && cls.includes('$preset')) {
					return cls.replace('$preset', cn(toClassValue.apply(bond, [preset?.class])));
				}

				return toClassValue.apply(bond, [cls]);
			});
		}

		return [preset?.class ?? '', '$preset', klass].map((arg) => toClassValue.apply(bond, [arg]));
	});

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
</script>

{#if isSnippet}
	{@render snippet({ class: _klass, as: _as, base: _base, children, ..._restProps })}
{:else}
	<Component class={_klass} as={_as} {..._restProps}>
		{@render children?.()}
	</Component>
{/if}
