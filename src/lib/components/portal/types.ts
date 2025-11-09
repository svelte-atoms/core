import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { PortalBond } from './bond.svelte';
import type { RootPortals } from '$svelte-atoms/core/components/root/root.svelte';
import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';

/**
 * Extend this interface to add custom portal root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PortalRootExtendProps {}

/**
 * Extend this interface to add custom portal outer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PortalOuterExtendProps {}

/**
 * Extend this interface to add custom teleport properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TeleportExtendProps {}

export type PortalRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Omit<HtmlAtomProps<E, B>, 'children'> &
	PortalRootExtendProps & {
		name?: string;
		factory?: Factory<PortalBond>;
		children?: Snippet<[{ portal: PortalBond }]>;
	};

export type PortalOuterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	PortalOuterExtendProps & {
		id: RootPortals | (string & {});
		children?: Snippet;
	};

export type TeleportProps<
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TeleportExtendProps & {
		portal?: string | PortalBond;
	};

/**
 * @deprecated Use PortalRootExtendProps instead
 */
export type PortalExtendProps = PortalRootExtendProps;
