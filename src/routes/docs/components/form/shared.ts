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
		title: 'Use Case 1',
		description: 'TODO: Describe when and why to use this component in this scenario.'
	},
	{
		title: 'Use Case 2',
		description: 'TODO: Describe another practical application.'
	}
	// TODO: Add 4-6 use cases total
];

// TODO: Remove if simple component, or fill in for compound component
const componentsSummary = [
	{
		name: 'Form.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Form - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Form',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Form } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Form' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		validated: validatedCode
	},
	accessibility: accessibilityFeatures
};
