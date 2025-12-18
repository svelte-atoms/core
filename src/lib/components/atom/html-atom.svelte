<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Base, HtmlAtomProps, SnippetBase } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import { cn, type ClassValue, type VariantDefinition } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import type { Bond } from '$svelte-atoms/core/shared';
	import SnippetRenderer from './snippet-renderer.svelte';
	import type { Component } from 'svelte';
	import { call } from '$svelte-atoms/core/utils/function';

	type Element = HTMLElementTagNameMap[E];

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = 'div',
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		variants = undefined,
		children: childrenProp = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & Omit<HTMLAttributes<Element>, 'children'> = $props();

	/**
	 * Resolve variant definition to props
	 */
	// Cache for resolved variants to avoid recomputation
	// Key: JSON stringified combination of variant props
	const variantCache = new Map<string, Record<string, any>>();

	// Memoize preset resolution - only recompute when presetKey or bond changes
	const preset = $derived.by(() => {
		if (!presetKey) return undefined;
		const result = getPreset(presetKey as PresetModuleName)?.apply?.(bond, [bond]);
		// Handle deferred preset result (factory function)
		return call(result);
	});

	const presetVariantsProps = $derived(preset?.variants);

	// Resolve local variants - either VariantDefinition or function
	const localVariants = $derived.by(() => {
		if (!variants) return undefined;

		// If it's a function, call it directly
		if (typeof variants === 'function') {
			return variants(bond as Bond, restProps);
		}

		// Otherwise it's a VariantDefinition, resolve it
		return resolveVariants(variants, bond as Bond, restProps);
	});

	// Merge preset variants with local variants
	// Memoized to avoid recomputation when inputs haven't changed
	const mergedVariants = $derived.by(() => {
		// No variants at all
		if (!presetVariantsProps && !localVariants) return undefined;

		// Only preset variants (raw object from preset)
		if (presetVariantsProps && !localVariants) {
			// Convert preset variants to VariantDefinition-like structure
			const variantDef: VariantDefinition<any> = {
				class: preset?.class ?? '',
				variants: presetVariantsProps,
				compounds: preset?.compounds ?? [],
				defaults: preset?.defaults ?? {}
			};
			return resolveVariants(variantDef, bond as Bond, restProps);
		}

		// Only local variants
		if (!presetVariantsProps && localVariants) {
			return localVariants;
		}

		// Both exist - merge them
		// When both preset and local variants exist, we need to merge the resolved props
		const presetVariantDef: VariantDefinition<any> = {
			class: preset?.class ?? '',
			variants: presetVariantsProps ?? {},
			compounds: preset?.compounds ?? [],
			defaults: preset?.defaults ?? {}
		};

		const presetResolved = resolveVariants(presetVariantDef, bond as Bond, restProps);

		// Merge the resolved variant props
		// Local variant classes and attributes override preset
		const presetClasses = Array.isArray(presetResolved.class)
			? presetResolved.class
			: [presetResolved.class];
		const localClasses = Array.isArray(localVariants?.class)
			? localVariants.class
			: [localVariants?.class];

		return {
			class: [...presetClasses, ...localClasses].filter(Boolean),
			...presetResolved,
			...localVariants
		};
	});

	const presetClassString = $derived(cn(preset?.class));

	const _klass = $derived.by(() => {
		const klassStr = cn(klass ?? '');
		// Check for $preset placeholder first
		if (!klassStr.includes('$preset')) {
			// No placeholder - normal merge: variants override direct class
			return cn(klass, mergedVariants?.class ?? '');
		}

		// Has placeholder - calculate position and inject preset classes
		const parts = klassStr.split('$preset');

		// Only keep the last $preset placeholder
		const beforeLastPlaceholder = parts.slice(0, -1).join('');
		const afterLastPlaceholder = parts[parts.length - 1];

		// Merge: before + preset + variants + after
		return cn(
			beforeLastPlaceholder,
			presetClassString,
			mergedVariants?.class ?? '',
			afterLastPlaceholder
		);
	});

	const _base = $derived(base ?? preset?.base);
	const _as = $derived(as ?? preset?.as);
	const _restProps = $derived.by(() => {
		const {
			class: klassPreset,
			base,
			as,
			variants: presetProps,
			...restPresetProps
		} = preset ?? {};
		const { class: variantClass, ...variantsRestProps } = mergedVariants ?? {};

		return { ...restPresetProps, ...variantsRestProps, ...restProps };
	});

	const isSnippet = $derived(typeof _base === 'function' && _base.length === 1 && !_base.prototype);

	const snippet = $derived(_base as SnippetBase);

	const atom = rootBond?.state?.props?.renderers?.html ?? HtmlElement;

	const renderer = $derived.by(() => {
		if (isSnippet)
			return {
				component: SnippetRenderer,
				props: { snippet: snippet, class: _klass, as: _as, children: childrenProp, ..._restProps }
			};

		return {
			component: base ?? atom,
			props: { class: _klass, as: _as, ..._restProps }
		};
	}) as { component: Component; props: Record<string, any> };

	function resolveVariants(
		def: VariantDefinition<any>,
		bond: Bond | null | undefined,
		props: Record<string, any>
	): Record<string, any> {
		const { variants: variantMap, compounds, defaults, class: baseClass } = def;
		// Merge props with defaults
		const finalProps = { ...defaults, ...props };

		// Create cache key from final props (only variant-related props)
		const variantKeys = variantMap ? Object.keys(variantMap) : [];
		const relevantProps = Object.fromEntries(
			Object.entries(finalProps).filter(([key]) => variantKeys.includes(key))
		);
		const cacheKey = JSON.stringify({ relevantProps, baseClass, compounds });

		// Check cache
		if (variantCache.has(cacheKey)) {
			return variantCache.get(cacheKey)!;
		}

		const classes: ClassValue[] = [];
		const attributes: Record<string, any> = {};

		// Add base class
		if (baseClass) classes.push(baseClass);

		// Add variant classes
		if (variantMap) {
			for (const [key, value] of Object.entries(finalProps)) {
				const variantValue = variantMap[key]?.[value as string];
				if (variantValue !== undefined) {
					const resolved = typeof variantValue === 'function' ? variantValue(bond) : variantValue;

					if (typeof resolved === 'string') {
						classes.push(resolved);
					} else if (typeof resolved === 'object' && resolved !== null) {
						if ('class' in resolved) {
							classes.push(resolved.class);
						}
						// Add other attributes (including Symbol-based attachment keys)
						Object.getOwnPropertySymbols(resolved).forEach((sym) => {
							attributes[sym] = resolved[sym];
						});
					}
				}
			}
		}

		// Add compound variants
		if (compounds) {
			for (const compound of compounds) {
				const { class: compoundClass, ...compoundProps } = compound;
				const matches = Object.entries(compoundProps).every(
					([key, value]) => finalProps[key] === value
				);
				if (matches) {
					if (compoundClass) classes.push(compoundClass);
					// Add compound attributes
					Object.entries(compound).forEach(([k, v]) => {
						if (k !== 'class' && !Object.keys(compoundProps).includes(k)) {
							attributes[k] = v;
						}
					});
				}
			}
		}

		const result = {
			class: classes,
			...attributes
		};

		// Store in cache (limit cache size to prevent memory leaks)
		if (variantCache.size > 100) {
			// Clear oldest entry (first in Map)
			const firstKey = variantCache.keys().next().value;
			if (firstKey) variantCache.delete(firstKey);
		}
		variantCache.set(cacheKey, result);

		return result;
	}
</script>

<renderer.component {...renderer.props}>
	{#snippet children(args: any)}
		{@render (childrenProp as any)?.(args)}
	{/snippet}
</renderer.component>
