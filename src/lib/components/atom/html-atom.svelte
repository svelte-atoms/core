<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentBase, HtmlAtomProps, SnippetBase } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import { cn } from '$svelte-atoms/core/utils';

	type Element = HTMLElementTagNameMap[E];

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = 'div',
		base = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const isSnippet = $derived(typeof base === 'function' && base.length === 1 && !base.prototype);

	const snippet = $derived(base as SnippetBase);

	const atom = rootBond?.state?.props?.renderers?.html ?? HtmlElement;

	const Component = $derived(base ?? atom) as ComponentBase;
</script>

{#if isSnippet}
	{@render snippet({ class: cn(klass), as, base, children, ...restProps })}
{:else}
	<Component class={cn(klass)} {as} {...restProps}>
		{@render children?.()}
	</Component>
{/if}
