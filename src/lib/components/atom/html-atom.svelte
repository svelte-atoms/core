<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Base, ComponentBase, HtmlAtomProps, SnippetBase } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import {
		cn,
		toClassValue,
		type ClassValue,
		type VariantDefinition
	} from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import type { Bond } from '$svelte-atoms/core/shared';
	import { merge } from 'es-toolkit';

	type Element = HTMLElementTagNameMap[E];

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = 'div',
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		variants = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const preset = $derived(
		presetKey ? getPreset(presetKey as PresetModuleName)?.apply?.(bond, [bond]) : undefined
	);

	const presetProps = $derived(preset?.variants);
	
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
	const mergedVariants = $derived.by(() => {
		// No variants at all
		if (!presetProps && !localVariants) return undefined;

		// Only preset variants (raw object from preset)
		if (presetProps && !localVariants) {
			// Convert preset variants to VariantDefinition-like structure
			const variantDef = {
				class: preset?.class,
				variants: presetProps,
				compounds: preset?.compounds ?? [],
				defaults: preset?.defaults ?? {}
			};
			return resolveVariants(variantDef, bond as Bond, restProps);
		}

		// Only local variants
		if (!presetProps && localVariants) {
			return localVariants;
		}

		// Both exist - merge them
		// When both preset and local variants exist, we need to merge the resolved props
		const presetVariantDef = {
			class: preset?.class,
			variants: presetProps,
			compounds: preset?.compounds ?? [],
			defaults: preset?.defaults ?? {}
		};
		
		const presetResolved = resolveVariants(presetVariantDef, bond as Bond, restProps);
		
		// Merge the resolved variant props
		// Local variant classes and attributes override preset
		const presetClasses = Array.isArray(presetResolved.class) ? presetResolved.class : [presetResolved.class];
		const localClasses = Array.isArray(localVariants?.class) ? localVariants.class : [localVariants?.class];
		
		return {
			class: [...presetClasses, ...localClasses].filter(Boolean),
			...presetResolved,
			...localVariants
		};
	});

	$inspect(mergedVariants);

	const _klass = $derived([compilePresetPlaceholder(klass), mergedVariants?.class ?? '']);

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

	/**
	 * Resolve variant definition to props
	 */
	function resolveVariants(
		def: VariantDefinition<any>,
		bond: Bond | null | undefined,
		props: Record<string, any>
	): Record<string, any> {
		const { variants: variantMap, compounds, defaults, class: baseClass } = def;

		// Merge props with defaults
		const finalProps = { ...defaults, ...props };

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
						// Add other attributes
						Object.entries(resolved).forEach(([k, v]) => {
							if (k !== 'class') {
								attributes[k] = v;
							}
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

		return {
			class: classes,
			...attributes
		};
	}
</script>

{#if isSnippet}
	{@render snippet({ class: _klass, as: _as, base: _base, children, ..._restProps })}
{:else}
	<Component class={_klass} as={_as} {..._restProps}>
		{@render children?.()}
	</Component>
{/if}
