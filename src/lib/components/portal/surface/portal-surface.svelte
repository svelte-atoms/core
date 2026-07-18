<script lang="ts" generics="E extends HtmlElementTagName = 'div', B extends Base = Base">
	import { DEV } from 'esm-env';
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import type { HtmlElementTagName, HtmlElementType } from '$ixirjs/ui/components/element';
	import { overlayIsOpen } from '$ixirjs/ui/components/portal/host/policies/overlay-view';
	import { PortalBond } from '../bond.svelte';
	import { describePortalTarget, PortalsBond, resolveTeleportTarget } from '../portals';
	import { hasUnresolvedExplicitTarget } from '../portals/utils';
	import { port } from '../port';
	import type { PortalSurfaceProps } from '../types';

	type Element = HtmlElementType<E>;

	let {
		portal = undefined,
		owner = undefined,
		band = undefined,
		order = undefined,
		'z-index': zIndex = undefined,
		as,
		base,
		children,
		style = undefined,
		class: klass = undefined,
		...restProps
	}: PortalSurfaceProps<E, B> & HTMLAttributes<Element> = $props();

	const portalsBond = PortalsBond.get();
	const ambientPortal = $derived(PortalBond.get());
	const targetPortal = $derived(resolveTeleportTarget(portalsBond, portal, ambientPortal));
	const targetElement = $derived(targetPortal?.sinkElement);
	const unresolvedExplicitTarget = $derived(hasUnresolvedExplicitTarget(portalsBond, portal));
	const isOpen = $derived(owner ? overlayIsOpen(owner) : true);
	const liveRank = $derived(
		owner !== undefined && band !== undefined && targetPortal
			? (portalsBond?.rankOf(owner, band, targetPortal) ?? 0)
			: 0
	);
	type RankedEnrollment = {
		owner: NonNullable<typeof owner>;
		band: NonNullable<typeof band>;
		portal: PortalBond;
		rank: number;
	};
	let retainedEnrollment = $state.raw<RankedEnrollment>();
	const retainsCurrentEnrollment = $derived(
		retainedEnrollment !== undefined &&
			retainedEnrollment.owner === owner &&
			retainedEnrollment.band === band &&
			retainedEnrollment.portal === targetPortal
	);
	$effect(() => {
		if (liveRank > 0 && owner && band !== undefined && targetPortal) {
			retainedEnrollment = { owner, band, portal: targetPortal, rank: liveRank };
		} else if (retainedEnrollment && !retainsCurrentEnrollment) {
			retainedEnrollment = undefined;
		}
	});
	// Preserve rank only while the same enrollment closes and its exit animation runs.
	const rank = $derived(
		liveRank || (retainsCurrentEnrollment ? (retainedEnrollment?.rank ?? 0) : 0)
	);
	const z = $derived(
		targetPortal && band !== undefined
			? targetPortal.elevation({ band, relation: order, rank, 'z-index': zIndex })
			: undefined
	);
	const surfaceStyle = $derived(
		z === undefined ? style : [style, `z-index: ${z}; --ixir-z: ${z}`].filter(Boolean).join('; ')
	);

	$effect(() => {
		if (!owner || band === undefined || !targetPortal || !isOpen) return;
		return portalsBond?.enrollOverlay(owner, band, targetPortal);
	});

	$effect(() => {
		if (!DEV) return;
		if (unresolvedExplicitTarget) {
			const fallback = targetPortal
				? ` using fallback portal "${targetPortal.props.id}".`
				: ' no fallback portal resolved; nothing is ported.';
			console.warn(
				`[ixirjs] <PortalSurface${describePortalTarget(portal)}>: explicit portal target did not resolve;${fallback}`
			);
			return;
		}
		if (!targetElement) {
			console.warn(
				`[ixirjs] <PortalSurface${describePortalTarget(portal)}>: no portal sink resolved; nothing is ported.`
			);
		}
	});

	function teleport(node: HTMLElement) {
		return port(node, targetElement);
	}

	function sharePortal(portal: PortalBond): true {
		portal.share();
		return true;
	}
</script>

{#snippet content()}
	<HtmlAtom
		{@attach teleport}
		as={as as E}
		{base}
		class={klass ?? undefined}
		{...restProps as Record<string, unknown>}
		style={surfaceStyle}
		data-band={band}
		data-portal={targetPortal?.props.id}
	>
		{#if targetPortal && sharePortal(targetPortal)}
			{@render children?.({ portal: targetPortal, z })}
		{/if}
	</HtmlAtom>
{/snippet}

{#if targetElement}
	{@render content()}
{/if}
