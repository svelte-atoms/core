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
		DemoExample
	} from '$docs/components';
	import { DataGrid } from '$lib/components/datagrid'; // Example form data
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
<\/script>

<Form onsubmit={(e) => e.preventDefault()}>
  <Field.Root>
    <Field.Label for="name">Name</Field.Label>
    <Field.Control component={Input.Root}>
      <Input.Value bind:value={formData.name} />
    </Field.Control>
  </Field.Root>
  
  <button type="submit">Submit</button>
</Form>`;

	const validatedCode = `<Form onsubmit={(e) => e.preventDefault()}>
  <div>
    <label for="email">Email Address</label>
    <input
      id="email"
      type="email"
      bind:value={formData.email}
      placeholder="Enter your email"
      required
    />
  </div>
  
  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={formData.password}
      placeholder="Enter your password"
      required
      minlength="8"
    />
  </div>
  
  <button type="submit">Create Account</button>
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
				You can customize the default styles for Form and Field components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  form: () => ({
    class: 'space-y-4'
  }),
  'form.field': () => ({
    class: 'space-y-2'
  }),
  'form.field.label': () => ({
    class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  }),
  'form.field.description': () => ({
    class: 'text-xs text-muted-foreground'
  }),
  'form.field.error': () => ({
    class: 'text-xs text-destructive'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different form variations and use cases">
		<div class="space-y-8">
			<DemoExample title="Basic Form" description="Simple form with text inputs" code={basicCode}>
				<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
					<Field.Root>
						<Field.Label for="basic-name" class="text-foreground mb-1 block text-sm font-medium">
							Name
						</Field.Label>
						<Field.Control component={Input.Root}>
							<Input.Value
								bind:value={basicFormData.name}
								class="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
							/>
						</Field.Control>
					</Field.Root>

					<div>
						<label for="basic-email" class="text-foreground mb-1 block text-sm font-medium">
							Email
						</label>
						<input
							id="basic-email"
							type="email"
							bind:value={basicFormData.email}
							placeholder="Enter your email"
							class="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
						/>
					</div>

					<Button class="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-white">
						Submit
					</Button>
				</Form>
			</DemoExample>

			<DemoExample
				title="Form with Validation"
				description="Form with built-in validation and error states"
				code={validatedCode}
			>
				<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
					<div>
						<label for="validated-email" class="text-foreground mb-1 block text-sm font-medium">
							Email Address
						</label>
						<input
							id="validated-email"
							type="email"
							bind:value={validatedFormData.email}
							placeholder="Enter your email"
							required
							class="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm invalid:border-red-500 invalid:ring-red-500 focus:ring-1 focus:outline-none"
						/>
					</div>

					<div>
						<label for="validated-password" class="text-foreground mb-1 block text-sm font-medium">
							Password
						</label>
						<input
							id="validated-password"
							type="password"
							bind:value={validatedFormData.password}
							placeholder="Enter your password"
							required
							minlength="8"
							class="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm invalid:border-red-500 invalid:ring-red-500 focus:ring-1 focus:outline-none"
						/>
						<p class="text-muted-foreground mt-1 text-xs">Password must be at least 8 characters</p>
					</div>

					<Button class="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-white">
						Create Account
					</Button>
				</Form>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Form Props</h3>
				<div class="border-border bg-card overflow-x-auto rounded-lg border">
					<DataGrid.Root class="min-w-full">
						<DataGrid.Header class="bg-muted">
							<DataGrid.Tr>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Prop</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Type</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Default</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									width="2fr">Description</DataGrid.Th
								>
							</DataGrid.Tr>
						</DataGrid.Header>

						<DataGrid.Body>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>class</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>''</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Additional CSS classes to apply</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>onsubmit</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>function</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Form submission handler</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>children</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>Snippet</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm">Form content</DataGrid.Td>
							</DataGrid.Tr>
						</DataGrid.Body>
					</DataGrid.Root>
				</div>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Field.Root Props</h3>
				<div class="border-border bg-card overflow-x-auto rounded-lg border">
					<DataGrid.Root class="min-w-full">
						<DataGrid.Header class="bg-muted">
							<DataGrid.Tr>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Prop</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Type</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Default</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									width="2fr">Description</DataGrid.Th
								>
							</DataGrid.Tr>
						</DataGrid.Header>

						<DataGrid.Body>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>name</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Field name for form data</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>value</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>any</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>''</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm">Field value</DataGrid.Td>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>class</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>''</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Additional CSS classes</DataGrid.Td
								>
							</DataGrid.Tr>
						</DataGrid.Body>
					</DataGrid.Root>
				</div>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Field.Label Props</h3>
				<div class="border-border bg-card overflow-x-auto rounded-lg border">
					<DataGrid.Root class="min-w-full">
						<DataGrid.Header class="bg-muted">
							<DataGrid.Tr>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Prop</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Type</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Default</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									width="2fr">Description</DataGrid.Th
								>
							</DataGrid.Tr>
						</DataGrid.Header>

						<DataGrid.Body>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>for</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>ID of the associated form control</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>class</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>''</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Additional CSS classes</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>children</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>Snippet</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm">Label content</DataGrid.Td>
							</DataGrid.Tr>
						</DataGrid.Body>
					</DataGrid.Root>
				</div>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Field.Control Props</h3>
				<div class="border-border bg-card overflow-x-auto rounded-lg border">
					<DataGrid.Root class="min-w-full">
						<DataGrid.Header class="bg-muted">
							<DataGrid.Tr>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Prop</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Type</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									>Default</DataGrid.Th
								>
								<DataGrid.Th
									class="border-border text-muted-foreground border-b px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
									width="2fr">Description</DataGrid.Th
								>
							</DataGrid.Tr>
						</DataGrid.Header>

						<DataGrid.Body>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>component</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>Component</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Component to use for the control</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>class</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>string</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>''</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>Additional CSS classes</DataGrid.Td
								>
							</DataGrid.Tr>
							<DataGrid.Tr>
								<DataGrid.Td class="text-accent px-6 py-4 font-mono text-sm whitespace-nowrap"
									>...props</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>any</DataGrid.Td
								>
								<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
									>-</DataGrid.Td
								>
								<DataGrid.Td class="text-foreground px-6 py-4 text-sm"
									>All other props passed to control component</DataGrid.Td
								>
							</DataGrid.Tr>
						</DataGrid.Body>
					</DataGrid.Root>
				</div>
			</div>
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
		prev={{ label: 'Back to Components', href: '/components' }}
		next={{ label: 'Next: Accordion', href: '/components/accordion' }}
	/>
</div>
