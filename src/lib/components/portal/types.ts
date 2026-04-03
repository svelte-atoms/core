import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { PortalBond } from './bond.svelte';
import type { RootPortals } from '$svelte-atoms/core/components/root/root.svelte';
import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';

export type PortalRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Omit<HtmlAtomProps<E, B>, 'children'> & {
		name?: string;
		factory?: Factory<PortalBond>;
		children?: Snippet<[{ portal: PortalBond }]>;
	};

export type PortalOuterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
		id: RootPortals | (string & {});
		children?: Snippet;
	};

export type TeleportProps<
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
		portal?: string | PortalBond;
	};


