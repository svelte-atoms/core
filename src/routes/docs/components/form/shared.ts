const basicCode = `
<script lang="ts">
  import { Form, Field } from '@svelte-atoms/core/form';
  import { Input } from '@svelte-atoms/core/input';
  import { Button } from '@svelte-atoms/core/button';

  let name = $state('');
  let email = $state('');
<\/script>

<Form class="flex flex-col gap-4" onsubmit={(e) => e.preventDefault()}>
  <Field.Root name="name">
    <Field.Label>Name</Field.Label>
    <Input.Root>
      <Field.Control base={Input.Control} bind:value={name} placeholder="Enter your name" />
    </Input.Root>
  </Field.Root>

  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Input.Root>
      <Field.Control base={Input.Control} bind:value={email} type="email" placeholder="Enter your email" />
    </Input.Root>
  </Field.Root>

  <Button type="submit">Submit</Button>
</Form>`.trim();

const validatedCode = `
<script lang="ts">
  import { Form, Field } from '@svelte-atoms/core/form';
  import { Input } from '@svelte-atoms/core/input';
  import { Button } from '@svelte-atoms/core/button';
<\/script>

<Form class="flex flex-col gap-4" onsubmit={(e) => e.preventDefault()}>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Input.Root>
      <Field.Control base={Input.Control} type="email" placeholder="Enter your email" />
    </Input.Root>
    <Field.Errors>
      {#snippet children({ errors })}
        {#each errors as error}
          <p class="text-destructive mt-1 text-xs">{error}</p>
        {/each}
      {/snippet}
    </Field.Errors>
  </Field.Root>

  <Button type="submit">Submit</Button>
</Form>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  form: () => ({
    class: 'flex flex-col gap-4'
  }),
  'field.root': () => ({
    class: 'flex flex-col gap-1'
  }),
  'field.label': () => ({
    class: 'text-sm font-medium'
  }),
  'field.control': () => ({
    class: 'w-full'
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
		'Composable form components with validation, schema support, and field-level state management.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Form, Field } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Form' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		validated: validatedCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
