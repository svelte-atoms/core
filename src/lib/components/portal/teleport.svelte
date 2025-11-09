<script module lang="ts">
	export type { TeleportProps } from './types';
</script>

<script lang="ts" generics="E extends HtmlElementTagName = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { TeleportProps } from './types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName, HtmlElementType } from '$svelte-atoms/core/components/element';
	import { PortalsBond } from './portals';
	import { RootBond } from '$svelte-atoms/core/components/root/bond.svelte';
	import { port } from './utils';
	import type { PortalBond } from '.';

	type Element = HtmlElementType<E>;

	let { portal, as, base, children, ...restProps }: TeleportProps<E, B> & HTMLAttributes<Element> =
		$props();

	const portalsBond = PortalsBond.get();
	const rootBond = RootBond.get();

	const portalBond = $derived.by(() => {
		if (typeof portal === 'string') {
			return portalsBond?.state?.get(portal!) ?? rootBond?.state?.getPortal(portal!);
		}

		return portal;
	});

	const targetElement = $derived(portalBond?.targetElement);

	function _port(node: HTMLElement) {
		const hidden = node.hidden;

		node.hidden = true;

		const unport = port(node, targetElement);

		node.hidden = hidden;

		return unport;
	}
</script>

{#if targetElement && portal}
	<HtmlAtom {@attach _port} as={as as E} {base} {...restProps}>
		{@render children?.({ portal: portalBond })}
	</HtmlAtom>
{/if}
