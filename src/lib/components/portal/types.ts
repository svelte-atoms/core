import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { Factory } from '$ixirjs/ui/types';
import type { PortalBond } from './bond.svelte';
import type { RootPortals } from '$ixirjs/ui/components/root/types';
import type { HtmlElementTagName } from '$ixirjs/ui/components/element';
import type { OverlayView } from './host';
import type { LayerInput, LayerRelation, ZIndexInput } from './zlayer.svelte';

export type PortalId = RootPortals | (string & {});
export type PortalTarget = PortalId | PortalBond;

export interface PortalSnippetProps extends SnippetProps {
	portal: PortalBond;
}

export type PortalChildren = Snippet<[PortalSnippetProps]>;

export type PortalRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, PortalChildren> & {
	name?: string;
	factory?: Factory<PortalBond>;
};

export type PortalOuterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, PortalChildren> & {
	id: PortalId;
	children?: Snippet;
};

export type ActivePortalProps = {
	// Portal to make active for descendants: a registry id or a PortalBond instance.
	// Omitted targets resolve to the ambient portal, then the root portal.
	portal?: PortalTarget | undefined;
	children?: Snippet;
};

export type TeleportProps<
	E extends HtmlElementTagName = 'div',
	B extends Base = Base,
	Children extends Snippet<unknown[]> = PortalChildren
> = HtmlAtomProps<E, B, Children> & {
	portal?: PortalTarget | undefined;
};

export type PortalSurfaceChildren = Snippet<[{ portal: PortalBond; z: number | undefined }]>;

export interface PortalSurfaceProps<
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, PortalSurfaceChildren> {
	portal?: PortalTarget | undefined;
	owner?: OverlayView | undefined;
	band?: LayerInput | undefined;
	order?: LayerRelation | undefined;
	'z-index'?: ZIndexInput | undefined;
	children?: PortalSurfaceChildren;
}
