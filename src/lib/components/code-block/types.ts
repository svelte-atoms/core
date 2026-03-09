import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CodeBlockExtendProps {}

export interface CodeBlockProps extends HtmlAtomProps<'div'>, CodeBlockExtendProps {
	/**
	 * The source code to highlight
	 */
	code: string;
	/**
	 * Language identifier passed to Shiki
	 * @default 'plaintext'
	 */
	lang?: string;
	/**
	 * Shiki theme name
	 * @default 'github-dark'
	 */
	theme?: string;
	/**
	 * Optional filename or title shown in the header
	 */
	title?: string;
	/**
	 * Show line numbers
	 * @default false
	 */
	lineNumbers?: boolean;
	/**
	 * Show copy-to-clipboard button
	 * @default true
	 */
	copyable?: boolean;
}
