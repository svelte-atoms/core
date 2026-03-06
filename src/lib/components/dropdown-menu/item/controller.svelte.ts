import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { nanoid } from 'nanoid';
import { DropdownMenuBond, DropdownMenuBondState, type DropdownMenuBondProps } from '../bond.svelte';

export type DropdownMenuItemControllerProps = {
	readonly id: string;
};

export interface DropdownMenuItemControllerInterface<Props extends Record<string, unknown>> {
	get id(): string;
	get createdAt(): Date;
	get props(): Props;
	get element(): HTMLElement | null;
	get isHighlighted(): boolean;

	mount(): () => void;
	unmount(): void;
	destroy(): void;
	share(): DropdownMenuItemControllerInterface<Props>;
	elementProps(): Record<string, unknown>;
}

export class DropdownMenuItemController
	implements DropdownMenuItemControllerInterface<DropdownMenuItemControllerProps>
{
	static CONTEXT_KEY = '@atoms/context/dropdown-menu/item';

	#id: string;
	#props: () => DropdownMenuItemControllerProps;
	#element: HTMLElement | null = null;
	#menu: DropdownMenuBond<DropdownMenuBondProps, DropdownMenuBondState<DropdownMenuBondProps>> | undefined;

	#unmount?: (() => void) | undefined;

	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => DropdownMenuItemControllerProps) {
		this.#props = props;
		this.#id = this.props.id ?? nanoid();
		this.#menu = DropdownMenuBond.get() as
			| DropdownMenuBond<DropdownMenuBondProps, DropdownMenuBondState<DropdownMenuBondProps>>
			| undefined;

		if (!this.#menu) {
			throw new Error('DropdownMenuItem must be used within a DropdownMenu context');
		}
	}

	get id() {
		return this.#id;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get props() {
		return this.#props();
	}

	get element() {
		return this.#element;
	}

	get menu() {
		return this.#menu;
	}

	get isHighlighted() {
		return this.#menu?.state.highlightedId === this.#id;
	}

	mount() {
		this.#unmount = this.#menu?.state?.mountItem?.(this.#id, this) ?? undefined;

		return this.unmount;
	}

	unmount() {
		this.#unmount?.();
	}

	destroy() {
		this.unmount();
	}

	share() {
		return DropdownMenuItemController.set(this);
	}

	elementProps() {
		const itemId = `menu-item-${this.id}`;
		return {
			id: itemId,
			role: 'menuitem',
			'data-highlighted': this.isHighlighted,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.#element = node;

				return () => {
					this.#element = null;
				};
			}
		} as const;
	}

	static get(): DropdownMenuItemController | undefined {
		return getContext(DropdownMenuItemController.CONTEXT_KEY);
	}

	static set(item: DropdownMenuItemController): DropdownMenuItemController {
		return setContext(DropdownMenuItemController.CONTEXT_KEY, item);
	}
}
