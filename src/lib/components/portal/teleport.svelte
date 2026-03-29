<script lang="ts" generics="E extends HtmlElementTagName = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { TeleportProps } from './types';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName, HtmlElementType } from '$svelte-atoms/core/components/element';
	import { PortalsBond } from './portals';
	import { RootBond } from '$svelte-atoms/core/components/root/bond.svelte';
	import { port } from './utils';

	type Element = HtmlElementType<E>;

	let { portal, as, base, children, ...restProps }: TeleportProps<E, B> & HTMLAttributes<Element> =
		$props();

	const portalsBond = PortalsBond.get();
	const rootBond = RootBond.get();

	const portalBond = $derived.by(() => {
		if (typeof portal === 'string') {
			const p = portalsBond?.state.get(portal);
			if(p) return p;

			return rootBond?.state?.getPortal(portal!);
		}

		return portal;
	});

	const targetElement = $derived(portalBond?.targetElement);

	const ui = $derived(targetElement ? content : undefined);

	function teleport(node: HTMLElement) {

		const unport = port(node, targetElement);

		return unport;
	}
</script>

{#snippet content()}
	<HtmlAtom {@attach teleport} as={as as E} {base} {...restProps}>
		{@render children?.({ portal: portalBond })}
	</HtmlAtom>
{/snippet}

{@render ui?.()}
