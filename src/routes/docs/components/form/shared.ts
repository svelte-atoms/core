const basicCode = `
<script lang="ts">
  import { Form, Field } from '@svelte-atoms/core/form';
  import { Input } from '@svelte-atoms/core/input';
  import Button from '@svelte-atoms/core/button';
<\/script>

<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
  <Field.Root>
    <Field.Label class="">Name</Field.Label>
    <Field.Control base={Input.Root}>
      <Input.Control bind:value={formData.name} class="" />
    </Field.Control>
  </Field.Root>
  
  <Field.Root>
    <Field.Label class="">Email</Field.Label>
    <Field.Control base={Input.Root}>
      <Input.Control 
        type="email" 
        bind:value={formData.email} 
        placeholder="Enter your email" 
        class="" 
      />
    </Field.Control>
  </Field.Root>
  
  <Button class="w-full">Submit</Button>
</Form>`.trim();

const validatedCode = `
<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
  <Field.Root>
    <Field.Label class="">Email Address</Field.Label>
    <Field.Control base={Input.Root}>
      <Input.Control 
        type="email" 
        bind:value={formData.email} 
        placeholder="Enter your email" 
        required 
        class="" 
      />
    </Field.Control>
  </Field.Root>
  
  <Field.Root>
    <Field.Label class="">Password</Field.Label>
    <Field.Control base={Input.Root}>
      <Input.Control 
        type="password" 
        bind:value={formData.password} 
        placeholder="Enter your password" 
        required 
        minlength="8" 
        class="" 
      />
    </Field.Control>
    <p class="text-muted-foreground mt-1 text-xs">Password must be at least 8 characters</p>
  </Field.Root>
  
  <Button class="w-full">Create Account</Button>
</Form>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  form: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper semantic form and input elements',
	'Label association with for/id attributes',
	'Keyboard navigation and focus management',
	'Built-in validation with aria-invalid',
	'Screen reader compatible error messages',
	'Support for required and optional fields'
];

const useCases = [
	{
		title: 'Registration & Login Forms',
		description: 'Build accessible sign-up and login forms with field-level validation, error messages, and label associations.'
	},
	{
		title: 'Settings & Profile Editing',
		description: 'Create user settings panels where fields map to specific data keys, with schema-based validation and error feedback.'
	},
	{
		title: 'Multi-Step Forms',
		description: 'Compose individual Field groups across steps in a wizard flow, with shared validation logic and state management.'
	},
	{
		title: 'Contact & Feedback Forms',
		description: 'Collect user input like name, email, and message in a structured form with required field validation and submission handling.'
	},
	{
		title: 'Data Entry Interfaces',
		description: 'Build admin or internal forms for creating or editing records (products, users, configurations) with rich input types and validation adapters.'
	},
	{
		title: 'Checkout & Payment Forms',
		description: 'Compose complex checkout flows with address, payment, and billing fields using consistent layout and field error display.'
	}
];

const componentsSummary = [
	{
		name: 'Form.Root',
		description: 'Root form element that manages form state, mounts field bonds, and provides the validator context to all child fields. Renders as a semantic <form> element.'
	},
	{
		name: 'Field.Root',
		description: 'Container for a single form field. Manages the field bond (name, value, validation), and provides field context to Label, Control, and Errors.'
	},
	{
		name: 'Field.Label',
		description: 'Accessible label element automatically associated with the field control via the field bond.'
	},
	{
		name: 'Field.Control',
		description: 'Wrapper component that connects an input element (Input.Root, Textarea.Root, etc.) to the field bond for value and validation state wiring.'
	},
	{
		name: 'Field.Errors',
		description: 'Displays validation error messages for the field. Reads errors from the field bond and renders them with proper ARIA attributes.'
	}
];

export const metadata = {
	title: 'Form & Field - Svelte Atoms',
	description: 'Composable form and field components for building accessible, validated forms with Bond-based state management.',
	componentTitle: 'Form & Field',
	componentDescription:
		'Composable form and field components for building accessible, validated forms. Form.Root manages form-level state and validator context, while Field.Root, Label, Control, and Errors handle individual fields. Supports custom validation adapters, schema-based validation, and renderless mode for headless integration.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Form, Field } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Form' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		validated: validatedCode
	},
	accessibility: accessibilityFeatures
};
