import { nanoid } from 'nanoid';
import { ToastBond, ToastBondState, type ToastBondProps } from './bond';
import { defineProperty, defineState } from '$svelte-atoms/core/utils';

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'default';

export type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

export interface ToastItem {
	id: string;
	type: ToastType;
	title?: string | undefined;
	description?: string | undefined;
	duration: number;
	dismissible: boolean;
	bond: ToastBond;
	open: boolean;
}

export interface ToastOptions {
	id?: string;
	description?: string;
	duration?: number;
	dismissible?: boolean;
}

const DEFAULT_DURATION = 4000;

class ToastManager {
	#toasts = $state<ToastItem[]>([]);

	get toasts(): ToastItem[] {
		return this.#toasts;
	}

	add(title: string, type: ToastType = 'default', options: ToastOptions = {}): string {
		const id = options.id ?? nanoid(8);

		// If a toast with this id already exists, update it
		const existing = this.#toasts.find((t) => t.id === id);
		if (existing) {
			existing.title = title;
			existing.type = type;
			if (options.description !== undefined) existing.description = options.description;
			return id;
		}

		const duration = options.duration ?? DEFAULT_DURATION;
		const dismissible = options.dismissible ?? true;

		let open = $state(true);

		const bondProps = defineState<ToastBondProps>(
			[
				defineProperty(
					'open',
					() => open,
					(v) => {
						open = v;
						if (!v) {
							// Remove after exit animation completes
							setTimeout(() => this.remove(id), 300);
						}
					}
				)
			],
			() => ({ disabled: false, extend: {} })
		);

		const bondState = new ToastBondState(() => bondProps);
		const bond = new ToastBond(bondState);

		const item: ToastItem = {
			id,
			type,
			title,
			description: options.description,
			duration,
			dismissible,
			bond,
			get open() {
				return open;
			}
		};

		this.#toasts.push(item);

		// Auto-dismiss
		if (duration > 0) {
			setTimeout(() => {
				open = false;
			}, duration);
		}

		return id;
	}

	dismiss(id: string) {
		const item = this.#toasts.find((t) => t.id === id);
		if (item) {
			item.bond.state.close();
		}
	}

	dismissAll() {
		for (const item of this.#toasts) {
			item.bond.state.close();
		}
	}

	remove(id: string) {
		this.#toasts = this.#toasts.filter((t) => t.id !== id);
	}
}

// Singleton manager instance
export const toastManager = new ToastManager();

// Imperative API
export function toast(title: string, options?: ToastOptions): string {
	return toastManager.add(title, 'default', options);
}

toast.info = (title: string, options?: ToastOptions) => toastManager.add(title, 'info', options);
toast.success = (title: string, options?: ToastOptions) =>
	toastManager.add(title, 'success', options);
toast.error = (title: string, options?: ToastOptions) => toastManager.add(title, 'error', options);
toast.warning = (title: string, options?: ToastOptions) =>
	toastManager.add(title, 'warning', options);
toast.dismiss = (id: string) => toastManager.dismiss(id);
toast.dismissAll = () => toastManager.dismissAll();
