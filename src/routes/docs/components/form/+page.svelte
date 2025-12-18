<script lang="ts">
	import { Form, Field } from '$lib/components/form';
	import Button from '$lib/components/button/button.svelte';
	import { Input } from '$lib/components/input';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		CodeBlock,
		Props
	} from '$docs/components';
	import formProps from './props';

	let basicFormData = $state({
		name: '',
		email: ''
	});

	let validatedFormData = $state({
		email: '',
		password: ''
	});

	const basicCode = `<script lang="ts">
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
</Form>`;

	const validatedCode = `<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
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
</Form>`;
</script>

<svelte:head>
	<title>Form & Field - Atomic SV</title>
	<meta
		name="description"
		content="Flexible form and field components for building accessible forms with validation."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/components' }, { label: 'Form' }]} />

	<PageHeader
		title="Form & Field"
		description="Composable form and field components for building accessible, validated forms with powerful state management."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Form, Field &#125; from '@svelte-atoms/core/form';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the form appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Form and Field components by defining presets in
				your configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'form.root': () => ({
    class: 'space-y-4'
  }),
  'field.root': () => ({
    class: 'space-y-2'
  }),
  'field.label': () => ({
    class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  }),
  'field.control': () => ({
    class: 'border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm'
  }),
  'field.errors': () => ({
    class: 'text-xs text-destructive mt-1'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different form variations and use cases">
		<div class="space-y-8">
			<DemoExample title="Basic Form" description="Simple form with text inputs" code={basicCode}>
				<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
					<Field.Root>
						<Field.Label class="">Name</Field.Label>
						<Field.Control base={Input.Root}>
							<Input.Control bind:value={basicFormData.name} class="" />
						</Field.Control>
					</Field.Root>

					<Field.Root>
						<Field.Label class="">Email</Field.Label>
						<Field.Control base={Input.Root}>
							<Input.Control
								type="email"
								bind:value={basicFormData.email}
								placeholder="Enter your email"
								class=""
							/>
						</Field.Control>
					</Field.Root>

					<Button class="w-full">Submit</Button>
				</Form>
			</DemoExample>

			<DemoExample
				title="Form with Validation"
				description="Form with built-in validation and error states"
				code={validatedCode}
			>
				<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
					<Field.Root>
						<Field.Label class="">Email Address</Field.Label>
						<Field.Control base={Input.Root}>
							<Input.Control
								type="email"
								bind:value={validatedFormData.email}
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
								bind:value={validatedFormData.password}
								placeholder="Enter your password"
								required
								minlength="8"
								class=""
							/>
						</Field.Control>
						<p class="text-muted-foreground mt-1 text-xs">Password must be at least 8 characters</p>
					</Field.Root>

					<Button class="w-full">Create Account</Button>
				</Form>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			{#each formProps as prop (prop.name)}
				<div>
					<h3 class="text-foreground mb-3 text-lg font-semibold">{prop.name}</h3>
					<p class="text-muted-foreground mb-4 text-sm">{prop.description}</p>
					<Props data={prop.props} />
				</div>
			{/each}
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper semantic form and input elements',
				'Label association with for/id attributes',
				'Keyboard navigation and focus management',
				'Built-in validation with aria-invalid',
				'Screen reader compatible error messages',
				'Support for required and optional fields'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Dropdown', href: '/components/dropdown' }}
		next={{ label: 'Input', href: '/components/input' }}
	/>
</div>
