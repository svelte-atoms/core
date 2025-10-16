import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

export type AlertBondProps = BondStateProps & {
	variant?: 'info' | 'success' | 'warning' | 'error';
	dismissible?: boolean;
	dismissed?: boolean;
	disabled?: boolean;
	extend?: Record<string, unknown>;
};

export type AlertBondElements = {
	root: HTMLElement;
	icon: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
	content: HTMLElement;
	actions: HTMLElement;
	closeButton: HTMLElement;
};

export class AlertBond<
	State extends AlertBondState<AlertBondProps> = AlertBondState<AlertBondProps>
> extends Bond<AlertBondProps, State, AlertBondElements> {
	static CONTEXT_KEY = '@atoms/context/alert';

	constructor(s: State) {
		super(s);
	}

	share(): this {
		return AlertBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		const variant = this.state.props.variant ?? 'info';
		const dismissed = this.state.props.dismissed ?? false;
		const disabled = this.state.props.disabled ?? false;

		return {
			id: `alert-root-${this.id}`,
			role: 'alert',
			'aria-labelledby': `alert-title-${this.id}`,
			'aria-describedby': `alert-description-${this.id}`,
			'aria-disabled': disabled,
			'data-variant': variant,
			'data-dismissed': dismissed,
			'data-dismissible': this.state.props.dismissible ?? false,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	icon(props: Record<string, unknown> = {}) {
		return {
			id: `alert-icon-${this.id}`,
			'aria-hidden': true,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.icon = node;
			}
		};
	}

	title(props: Record<string, unknown> = {}) {
		return {
			id: `alert-title-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	description(props: Record<string, unknown> = {}) {
		return {
			id: `alert-description-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	content(props: Record<string, unknown> = {}) {
		return {
			id: `alert-content-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	actions(props: Record<string, unknown> = {}) {
		return {
			id: `alert-actions-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.actions = node;
			}
		};
	}

	closeButton(props: Record<string, unknown> = {}) {
		const dismissed = this.state.props.dismissed ?? false;

		return {
			id: `alert-close-button-${this.id}`,
			type: 'button',
			'aria-label': 'Dismiss alert',
			'aria-expanded': !dismissed,
			onclick: () => this.state.dismiss(),
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.closeButton = node;
			}
		};
	}

	static get(): AlertBond | undefined {
		return getContext(AlertBond.CONTEXT_KEY);
	}

	static set(bond: AlertBond): AlertBond {
		return setContext(AlertBond.CONTEXT_KEY, bond);
	}
}

export class AlertBondState<Props extends AlertBondProps> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	dismiss() {
		if (this.props.dismissible && !this.props.disabled) {
			// Update the dismissed state through props if mutable
			const props = this.props as Props & { dismissed?: boolean };
			if ('dismissed' in props) {
				props.dismissed = true;
			}
		}
	}

	restore() {
		const props = this.props as Props & { dismissed?: boolean };
		if ('dismissed' in props) {
			props.dismissed = false;
		}
	}

	get isDismissed() {
		return this.props.dismissed ?? false;
	}

	get isDismissible() {
		return this.props.dismissible ?? false;
	}

	get variant() {
		return this.props.variant ?? 'info';
	}
}
