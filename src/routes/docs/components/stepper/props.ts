export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const stepperRootProps: PropDefinition[] = [
	{
		name: 'step',
		type: 'number',
		default: '0',
		description: 'Active step index (0-based). Bindable for two-way sync.'
	},
	{
		name: 'linear',
		type: 'boolean',
		default: 'false',
		description: 'Enforce linear progression - users can only navigate to adjacent steps'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disable the entire stepper'
	},
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: "'horizontal'",
		description: 'Layout orientation for the stepper'
	},
	{
		name: 'factory',
		type: 'Factory<StepperBond>',
		default: 'undefined',
		description: 'Custom factory for creating stepper bond'
	},
	{
		name: 'children',
		type: 'Snippet<[{ stepper: StepperBond }]>',
		default: 'undefined',
		description: 'Content renderer with stepper bond access'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper'",
		description: 'Preset configuration key'
	}
];

export const stepperHeaderProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ stepper?: StepperBond }]>',
		default: 'undefined',
		description: 'Content renderer for step indicators'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.header'",
		description: 'Preset configuration key'
	}
];

export const stepperBodyProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ stepper?: StepperBond }]>',
		default: 'undefined',
		description: 'Custom body content'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.body'",
		description: 'Preset configuration key'
	}
];

export const stepperContentProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ stepper?: StepperBond }]>',
		default: 'undefined',
		description: 'Content renderer'
	},
	{
		name: 'enter',
		type: '(node: HTMLElement) => any',
		default: 'undefined',
		description: 'Enter animation function'
	},
	{
		name: 'exit',
		type: '(node: HTMLElement) => any',
		default: 'undefined',
		description: 'Exit animation function'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.content'",
		description: 'Preset configuration key'
	}
];

export const stepperFooterProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ stepper?: StepperBond }]>',
		default: 'undefined',
		description: 'Content renderer for navigation buttons'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.footer'",
		description: 'Preset configuration key'
	}
];

export const stepRootProps: PropDefinition[] = [
	{
		name: 'index',
		type: 'number',
		default: 'required',
		description: 'Step index (0-based) in the stepper sequence'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Whether this step is disabled'
	},
	{
		name: 'completed',
		type: 'boolean',
		default: 'false',
		description: 'Whether this step is completed'
	},
	{
		name: 'optional',
		type: 'boolean',
		default: 'false',
		description: 'Whether this step is optional'
	},
	{
		name: 'factory',
		type: 'Factory<StepBond>',
		default: 'undefined',
		description: 'Custom factory for creating step bond'
	},
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Content renderer with step bond access'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step'",
		description: 'Preset configuration key'
	}
];

export const stepHeaderProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Content renderer for step header'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.header'",
		description: 'Preset configuration key'
	}
];

export const stepIndicatorProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Custom indicator content'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.indicator'",
		description: 'Preset configuration key'
	}
];

export const stepTitleProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Title content'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.title'",
		description: 'Preset configuration key'
	}
];

export const stepDescriptionProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Description content'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.description'",
		description: 'Preset configuration key'
	}
];

export const stepSeparatorProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Custom separator content'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.separator'",
		description: 'Preset configuration key'
	}
];

export const stepBodyProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'Snippet<[{ step: StepBond }]>',
		default: 'undefined',
		description: 'Step content (shown when active)'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'preset',
		type: 'string',
		default: "'stepper.step.body'",
		description: 'Preset configuration key'
	}
];
