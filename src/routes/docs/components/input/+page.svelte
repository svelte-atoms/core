<script lang="ts">
	import { Input } from '$lib/components/input';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props
	} from '$docs/components';

	const basicCode = `<Input placeholder="Enter text..." />`;

	const typesCode = `<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />`;

	const sizesCode = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

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

	<Section title="Preset Configuration" description="Customize the input appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Input components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  input: () => ({
    class: 'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}</code
					></pre>
			</div>
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
				title="Input Sizes"
				description="Different sizes for various contexts"
				code={sizesCode}
			>
				<div class="max-w-sm space-y-4">
					<Input.Root size="sm">
						<Input.Control placeholder="Small input" />
					</Input.Root>
					<Input.Root size="md">
						<Input.Control placeholder="Medium input" />
					</Input.Root>
					<Input.Root size="lg">
						<Input.Control placeholder="Large input" />
					</Input.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Controlled Input"
				description="Bind input value to state"
				code={`<script lang="ts">
  let value = $state('');
<\/script>

<Input bind:value />
<p>You typed: {value}</p>`}
			>
				<div class="max-w-sm space-y-4">
					<Input.Root class="max-w-sm">
						<Input.Control bind:value placeholder="Type something..." />
					</Input.Root>
					<p class="text-muted-foreground text-sm">You typed: {value || '(nothing yet)'}</p>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Input Props</h3>
				<Props
					data={[
						{
							name: 'type',
							type: 'string',
							default: "'text'",
							description: 'Input type (text, email, password, etc.)'
						},
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Input value'
						},
						{
							name: 'placeholder',
							type: 'string',
							default: "''",
							description: 'Placeholder text'
						},
						{
							name: 'size',
							type: "'sm' | 'md' | 'lg'",
							default: "'md'",
							description: 'Input size'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable input'
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
	</Section>

	<PageNavigation
		prev={{ label: 'Form', href: '/docs/components/form' }}
		next={{ label: 'Label', href: '/docs/components/label' }}
	/>
</div>
