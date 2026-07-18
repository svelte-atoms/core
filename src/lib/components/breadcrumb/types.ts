import type { Base, HtmlAtomProps } from '$ixirjs/ui/components/atom';

export type BreadcrumbRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B>;

export interface BreadcrumbItemProps<
	E extends keyof HTMLElementTagNameMap = 'a',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	href?: string;
}

export type BreadcrumbSeparatorProps<
	E extends keyof HTMLElementTagNameMap = 'span',
	B extends Base = Base
> = HtmlAtomProps<E, B>;
