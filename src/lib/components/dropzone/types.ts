import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom dropzone properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropzoneExtendProps {}

export interface DropzoneFile {
	file: File;
	id: string;
	url?: string;
}

export interface DropzoneContext {
	files: DropzoneFile[];
	isDragging: boolean;
	open: () => void;
	remove: (id: string) => void;
	clear: () => void;
}

export interface DropzoneProps extends HtmlAtomProps<'div'>, DropzoneExtendProps {
	/**
	 * Accepted file types (passed to the hidden input's accept attribute)
	 * e.g. 'image/*' or '.pdf,.docx'
	 */
	accept?: string;
	/**
	 * Allow multiple file selection
	 * @default false
	 */
	multiple?: boolean;
	/**
	 * Max file size in bytes. Files exceeding this are rejected.
	 */
	maxSize?: number;
	/**
	 * Disable the dropzone
	 */
	disabled?: boolean;
	/**
	 * Currently selected files (bindable)
	 */
	files?: DropzoneFile[];
	/**
	 * Called when files are added
	 */
	onadd?: (files: DropzoneFile[]) => void;
	/**
	 * Called when a file is rejected (too large, wrong type)
	 */
	onreject?: (file: File, reason: 'size' | 'type') => void;
	/**
	 * Called when files change (add or remove)
	 */
	onchange?: (files: DropzoneFile[]) => void;
	/**
	 * Children — receives full dropzone context
	 */
	children?: Snippet<[DropzoneContext]>;
	/**
	 * Custom idle state content snippet — replaces default prompt.
	 * Receives context.
	 */
	idleContent?: Snippet<[DropzoneContext]>;
	/**
	 * Custom drag-over state content snippet.
	 * Receives context.
	 */
	dragContent?: Snippet<[DropzoneContext]>;
}
