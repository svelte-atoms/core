<script lang="ts">
	import { Input } from '$lib/components/input';
	import { Alert } from '$lib/components/alert';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';

	const basicCode = `<Input.Root>
  <Input.Control placeholder="Enter text..." />
</Input.Root>`;

	const typesCode = `<Input.Root>
  <Input.Control type="text" placeholder="Text input" />
</Input.Root>

<Input.Root>
  <Input.Control type="email" placeholder="Email input" />
</Input.Root>

<Input.Root>
  <Input.Control type="password" placeholder="Password input" />
</Input.Root>

<Input.Root>
  <Input.Control type="number" placeholder="Number input" />
</Input.Root>`;

	const withIconCode = `<Input.Root>
  <Input.Icon>$</Input.Icon>
  <Input.Control placeholder="0.00" />
  <Input.Icon>.00</Input.Icon>
</Input.Root>`;

	const withPlaceholderCode = `<Input.Root>
  <Input.Control />
  <Input.Placeholder>Enter your email...</Input.Placeholder>
</Input.Root>`;

	let value = $state('');
</script>

<svelte:head>
	<title>Input - Svelte Atoms</title>
	<meta name="description" content="Text input field for user data entry." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Input' }]} />

	<PageHeader
		title="Input"
		description="Text input field for user data entry. Supports various types, sizes, and states."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Input &#125; from '@svelte-atoms/core/input';"
		/>
	</Section>

	<Alert.Root variant="info" class="my-8">
		<Alert.Title>Why a Compound Component?</Alert.Title>
		<Alert.Content class="text-foreground/60">
			Input is designed as a compound component (Root, Control, Icon, Placeholder) to maximize
			reusability. This means other components can reuse <code
				class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">Input.Root</code
			>
			styling without recreating it from scratch. For example, a dropdown trigger can look exactly like
			an input by wrapping its content with
			<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">Input.Root</code>,
			maintaining consistent styling across your application.
		</Alert.Content>
	</Alert.Root>

	<Section title="Preset Configuration" description="Customize the input appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Input components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  input: () => ({
    class: 'flex items-center gap-0 rounded-md border border-border bg-background'
  }),
  'input.control': () => ({
    class: 'flex-1 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
  }),
  'input.icon': () => ({
    class: 'flex items-center justify-center px-2 text-muted-foreground'
  }),
  'input.placeholder': () => ({
    class: 'pointer-events-none absolute text-muted-foreground'
  })
});`}
			/>
			<p class="text-muted-foreground mt-4 text-sm">
				The Input component uses a compound structure with separate preset keys for Root, Control,
				Icon, and Placeholder.
			</p>
		</div>
	</Section>

	<Section title="Examples" description="Explore different input variations">
		<div class="space-y-8">
			<DemoExample title="Basic Input" description="Simple text input" code={basicCode}>
				<Input.Root class="max-w-sm">
					<Input.Control placeholder="Enter text..." />
				</Input.Root>
			</DemoExample>

			<DemoExample
				title="Input Types"
				description="Different input types for various data"
				code={typesCode}
			>
				<div class="max-w-sm space-y-4">
					<Input.Root>
						<Input.Control type="text" placeholder="Text input" />
					</Input.Root>
					<Input.Root>
						<Input.Control type="email" placeholder="Email input" />
					</Input.Root>
					<Input.Root>
						<Input.Control type="password" placeholder="Password input" />
					</Input.Root>
					<Input.Root>
						<Input.Control type="number" placeholder="Number input" />
					</Input.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Input with Icons"
				description="Add icons or text decorations around the input"
				code={withIconCode}
			>
				<Input.Root class="max-w-sm">
					<Input.Icon class="text-foreground px-2">$</Input.Icon>
					<Input.Control class="border-border border-x px-2 py-2" placeholder="0.00" />
					<Input.Icon class="text-foreground px-2">.00</Input.Icon>
				</Input.Root>
			</DemoExample>

			<DemoExample
				title="Input with Placeholder"
				description="Custom placeholder component that disappears when input has value"
				code={withPlaceholderCode}
			>
				<Input.Root class="max-w-sm">
					<Input.Control class="px-3 py-2" />
					<Input.Placeholder class="text-muted-foreground">Enter your email...</Input.Placeholder>
				</Input.Root>
			</DemoExample>

			<DemoExample
				title="Controlled Input"
				description="Bind input value to state"
				code={`<script lang="ts">
  let value = $state('');
<\/script>

<Input.Root>
  <Input.Control bind:value />
</Input.Root>
<p>You typed: {value}</p>`}
			>
				<div class="max-w-sm space-y-4">
					<Input.Root>
						<Input.Control bind:value class="px-3 py-2" placeholder="Type something..." />
					</Input.Root>
					<p class="text-muted-foreground text-sm">You typed: {value || '(nothing yet)'}</p>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Input.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container component that manages input state and context.
				</p>
				<Props
					data={[
						{
							name: 'value',
							type: 'string | number',
							default: 'undefined',
							description: 'Controlled value (bindable)'
						},
						{
							name: 'checked',
							type: 'boolean',
							default: 'undefined',
							description: 'Checked state for checkbox/radio inputs (bindable)'
						},
						{
							name: 'files',
							type: 'File[]',
							default: '[]',
							description: 'Files for file input (bindable)'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'input'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Input.Control</h3>
				<p class="text-muted-foreground mb-4 text-sm">The actual input element.</p>
				<Props
					data={[
						{
							name: 'type',
							type: 'HTMLInputTypeAttribute',
							default: "'text'",
							description: 'Input type (text, email, password, number, date, file, etc.)'
						},
						{
							name: 'value',
							type: 'any',
							default: 'undefined',
							description: 'Input value (bindable)'
						},
						{
							name: 'number',
							type: 'number',
							default: 'undefined',
							description: 'Number value for type="number" (bindable)'
						},
						{
							name: 'date',
							type: 'Date',
							default: 'null',
							description: 'Date value for date inputs (bindable)'
						},
						{
							name: 'files',
							type: 'File[]',
							default: '[]',
							description: 'Files for type="file" (bindable)'
						},
						{
							name: 'checked',
							type: 'boolean',
							default: 'undefined',
							description: 'Checked state (bindable)'
						},
						{
							name: 'placeholder',
							type: 'string',
							default: "''",
							description: 'Native placeholder text'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'input.control'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Input.Icon</h3>
				<p class="text-muted-foreground mb-4 text-sm">Icon or text decoration component.</p>
				<Props
					data={[
						{
							name: 'preset',
							type: 'string',
							default: "'input.icon'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Input.Placeholder</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Custom placeholder component that automatically hides when input has value.
				</p>
				<Props
					data={[
						{
							name: 'preset',
							type: 'string',
							default: "'input.placeholder'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
		</div>
	</Section>
<!-- 
	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper label association with for/id',
				'Error message linking with aria-describedby',
				'Keyboard accessible',
				'Focus visible indicators',
				'Screen reader friendly'
			]}
		/>
	</Section> -->

	<PageNavigation
		prev={{ label: 'Form', href: '/docs/components/form' }}
		next={{ label: 'Label', href: '/docs/components/label' }}
	/>
</div>
