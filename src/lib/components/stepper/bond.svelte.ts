import { SvelteMap } from 'svelte/reactivity';
import { createAttachmentKey } from 'svelte/attachments';
import type { StepBond } from './step/bond.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';

export type StepperStateProps = BondStateProps & {
	step: number;
	linear?: boolean;
};

export type StepperElements = {
	root: HTMLElement;
};

export type StepContentSnippet = {
	props: Record<string, unknown>;
	children: Snippet<[{ step?: StepBond }]>;
};

export class StepperBond extends Bond<StepperStateProps, StepperState, StepperElements> {
	static CONTEXT_KEY = '@atoms/context/stepper';

	constructor(s: StepperState) {
		super(s);
	}

	share(): this {
		return StepperBond.set(this) as this;
	}

	root() {
		return {
			'data-atom': this.id ?? '',
			id: `stepper-${this.id}`,
			role: 'group',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	static get(): StepperBond | undefined {
		return getContext(StepperBond.CONTEXT_KEY);
	}

	static set(bond: StepperBond): StepperBond {
		return setContext(StepperBond.CONTEXT_KEY, bond);
	}
}

export class StepperState extends BondState<StepperStateProps> {
	#steps: SvelteMap<number, StepBond> = new SvelteMap();
	#stepContents: SvelteMap<number, { props: Record<string, unknown>, children: Snippet<[{ step?: StepBond }]> }> = new SvelteMap();
	#totalSteps = $state(0);

	constructor(props: () => StepperStateProps) {
		super(props);
	}

	get activeStep() {
		return this.props.step;
	}

	get totalSteps() {
		return this.#totalSteps;
	}

	get isFirstStep() {
		return this.props.step === 0;
	}

	get isLastStep() {
		return this.props.step === this.#totalSteps - 1;
	}

	get activeStepContent() {
		return this.#stepContents.get(this.props.step);
	}

	get navigation() {
		return {
			next: () => {
				if (!this.isLastStep) {
					this.props.step = this.props.step + 1;
				}
			},
			previous: () => {
				if (!this.isFirstStep) {
					this.props.step = this.props.step - 1;
				}
			},
			reset: () => {
				this.props.step = 0;
			},
			goto: (step: number) => {
				if (step >= 0 && step < this.#totalSteps) {
					// In linear mode, only allow going to previous steps or next immediate step
					if (this.props.linear) {
						if (step <= this.props.step + 1) {
							this.props.step = step;
						}
					} else {
						this.props.step = step;
					}
				}
			}
		}
	}

	mountStep(index: number, step: StepBond) {
		this.#steps.set(index, step);
		this.#totalSteps = this.#steps.size;
	}

	unmountStep(index: number) {
		this.#steps.delete(index);
		this.#totalSteps = this.#steps.size;
	}

	getStep(index: number) {
		return this.#steps.get(index);
	}

	registerStepContent(index: number, props: Record<string, unknown>, children: Snippet<[{ step?: StepBond }]>) {
		this.#stepContents.set(index, { props, children });
	}

	unregisterStepContent(index: number) {
		this.#stepContents.delete(index);
	}
}
