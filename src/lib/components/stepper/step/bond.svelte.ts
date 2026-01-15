import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { StepperBond, StepperState } from '../bond.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';

export type StepBondProps = BondStateProps & {
	index: number;
	disabled: boolean;
	completed: boolean;
	error: boolean;
};

export type StepBondElements = {
	root: HTMLElement;
	indicator: HTMLElement;
	header: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
	body?: HTMLElement;
	separator?: HTMLElement;
};

export class StepBond extends Bond<StepBondProps, StepBondState, StepBondElements> {
	static CONTEXT_KEY = '@atoms/context/stepper/step';

	constructor(state: StepBondState) {
		super(state);
	}

	share() {
		return StepBond.set(this) as this;
	}

	root() {
		const state = this.state;

		return {
			'data-stepper': state?.stepper?.id ?? '',
			'data-atom': this.id ?? '',
			'data-kind': 'step',
			'data-index': state?.props.index ?? 0,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': state?.props.error,
			'aria-disabled': state?.isDisabled,
			'aria-describedby': `step-description-${this.id}`,
			'aria-labelledby': `step-title-${this.id}`,
			id: `step-${this.id}`,
			role: 'group',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		} as const;
	}

	indicator() {
		const state = this.state;

		return {
			'data-kind': 'step-indicator',
			'aria-current': state?.isActive ? 'step' : undefined,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': state?.props.error,
			role: 'presentation',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		} as const;
	}

	header() {
		const state = this.state;

		return {
			'data-kind': 'step-header',
			id: `step-header-${this.id}`,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': state?.props.error,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		} as const;
	}

	title() {
		return {
			'data-kind': 'step-title',
			id: `step-title-${this.id}`,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		} as const;
	}

	description() {
		return {
			'data-kind': 'step-description',
			id: `step-description-${this.id}`,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		} as const;
	}

	body() {
		const state = this.state;

		return {
			'data-kind': 'step-body',
			id: `step-body-${this.id}`,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': state?.props.error,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		} as const;
	}

	separator() {
		const state = this.state;

		return {
			'data-kind': 'step-separator',
			'aria-hidden': 'true',
			role: 'presentation',
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': state?.props.error,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.separator = node;
			}
		} as const;
	}

	static get(): StepBond | undefined {
		return getContext(StepBond.CONTEXT_KEY);
	}

	static set(bond: StepBond): StepBond {
		return setContext(StepBond.CONTEXT_KEY, bond);
	}
}

export class StepBondState extends BondState<StepBondProps> {
	#stepper?: StepperState;

	constructor(props: () => StepBondProps) {
		super(props);
		const stepperBond = StepperBond.get();
		if (!stepperBond) {
			throw new Error('Step must be used within a Stepper context.');
		}
		this.#stepper = stepperBond.state;
	}

	get isActive() {
		return this.#stepper?.props.step === this.props.index;
	}

	get isCompleted() {
		const stepperStep = this.#stepper?.props.step;
		return this.props.completed || (typeof stepperStep === 'number' && stepperStep > this.props.index);
	}

	get isDisabled() {
		return (
			this.props.disabled ||
			(this.#stepper?.props.linear && this.props.index > this.#stepper.props.step + 1)
		);
	}

	get stepper() {
		return this.#stepper;
	}

	mount() {
		this.#stepper?.mountStep(this.props.index, {} as StepBond);
		return this.unmount;
	}

	unmount = () => {
		this.#stepper?.unmountStep(this.props.index);
	};

	activate() {
		if (!this.isDisabled) {
			this.#stepper?.navigation.goto(this.props.index);
		}
	}
}
