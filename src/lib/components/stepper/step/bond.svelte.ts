import { getContext, setContext, untrack } from 'svelte';
import { StepperBond, StepperState } from '../bond.svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

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

class StepRootAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'root');
	}
	override get attrs() {
		const bond = this.bond;
		const state = bond.state;

		const props = untrack(() => bond.state.props);

		return {
			...super.attrs,
			'data-stepper': state?.stepper?.id ?? '',
			'data-index': props.index ?? 0,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': props.error,
			'aria-disabled': state?.isDisabled,
			'aria-describedby': `step-description-${bond.id}`,
			'aria-labelledby': `step-title-${bond.id}`,
			role: 'group' as const
		};
	}
}

class StepIndicatorAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'indicator');
	}
	override get attrs() {
		const state = untrack(() => this.bond.state);
		const props = untrack(() => this.bond.state.props);

		return {
			...super.attrs,
			'aria-current': state?.isActive ? ('step' as const) : undefined,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': props.error,
			role: 'presentation' as const
		};
	}
}

class StepHeaderAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'header');
	}
	override get attrs() {
		const bond = this.bond;
		const state = untrack(() => bond.state);
		const props = untrack(() => bond.state.props);

		return {
			...super.attrs,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': props.error
		};
	}
}

class StepTitleAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'title');
	}
	override get attrs() {
		return {
			...super.attrs
		};
	}
}

class StepDescriptionAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'description');
	}
	override get attrs() {
		return {
			...super.attrs
		};
	}
}

class StepBodyAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'body');
	}
	override get attrs() {
		const bond = this.bond;
		const state = untrack(() => bond.state);
		const props = untrack(() => bond.state.props);

		return {
			...super.attrs,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': props.error
		};
	}
}

class StepSeparatorAtom extends BondAtom<StepBond, HTMLElement> {
	constructor(bond: StepBond) {
		super(bond, 'separator');
	}
	override get attrs() {
		const state = untrack(() => this.bond.state);
		const props = untrack(() => this.bond.state.props);

		return {
			...super.attrs,
			'aria-hidden': 'true',
			role: 'presentation' as const,
			'data-active': state?.isActive,
			'data-completed': state?.isCompleted,
			'data-disabled': state?.isDisabled,
			'data-error': props.error
		};
	}
}

export class StepBond extends Bond<StepBondProps, StepBondState, StepBondElements> {
	static CONTEXT_KEY = '@atoms/context/stepper/step';

	constructor(state: StepBondState) {
		super(state, 'step');
	}

	share() {
		return StepBond.set(this) as this;
	}

	root() {
		return this.atom('root', () => new StepRootAtom(this));
	}

	indicator() {
		return this.atom('indicator', () => new StepIndicatorAtom(this));
	}

	header() {
		return this.atom('header', () => new StepHeaderAtom(this));
	}

	title() {
		return this.atom('title', () => new StepTitleAtom(this));
	}

	description() {
		return this.atom('description', () => new StepDescriptionAtom(this));
	}

	body() {
		return this.atom('body', () => new StepBodyAtom(this));
	}

	separator() {
		return this.atom('separator', () => new StepSeparatorAtom(this));
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
		return (
			this.props.completed || (typeof stepperStep === 'number' && stepperStep > this.props.index)
		);
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
