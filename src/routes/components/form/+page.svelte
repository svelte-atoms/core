<script lang="ts">
	import { Form, Field } from '$lib/components/form';
	import Button from '$lib/components/button/button.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import { Preview } from '$docs/preview';
	import Props from '$docs/props-datagrid.svelte';
	import ContentSidebar from '$docs/content-sidebar.svelte';
	import { Input } from '$lib/components/input';
	import Playground from './playground.svelte';

	let copySuccess = $state(false);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copySuccess = true;
		setTimeout(() => (copySuccess = false), 2000);
	}

	const examples = [
		{
			title: 'Basic Form',
			description: 'Simple form with text inputs and basic validation',
			code: `<form>
	<div>
		<label for="name">Name</label>
		<input id="name" type="text" placeholder="Enter your name" />
	</div>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" placeholder="Enter your email" />
	</div>
	<button type="submit">Submit</button>
</form>`
		},
		{
			title: 'Form with Validation',
			description: 'Form with built-in validation and error states',
			code: `<Form renderless={false}>
	{#snippet children({ form })}
		<Field.Root name="email" bind:value={email}>
			{#snippet children({ field })}
				<Field.Label>Email Address</Field.Label>
				<Field.Control 
					type="email" 
					placeholder="Enter your email"
					required
				/>
			{/snippet}
		</Field.Root>
	{/snippet}
</Form>`
		},
		{
			title: 'Advanced Form',
			description: 'Complex form with multiple field types and custom validation',
			code: `<Form>
	{#snippet children({ form })}
		<Field.Root name="profile">
			{#snippet children({ field })}
				<Field.Label>Profile Information</Field.Label>
				<Field.Control 
					component="textarea"
					placeholder="Tell us about yourself"
					rows="4"
				/>
			{/snippet}
		</Field.Root>
		
		<Field.Root name="terms">
			{#snippet children({ field })}
				<div class="flex items-center space-x-2">
					<Field.Control type="checkbox" />
					<Field.Label>I agree to the terms</Field.Label>
				</div>
			{/snippet}
		</Field.Root>
	{/snippet}
</Form>`
		}
	];

	// Example form data
	let basicFormData = $state({
		name: '',
		email: ''
	});

	let validatedFormData = $state({
		email: '',
		password: ''
	});

	let advancedFormData = $state({
		profile: '',
		preferences: '',
		newsletter: false
	});
</script>

<svelte:head>
	<title>Form & Field Components - Atomic SV</title>
	<meta
		name="description"
		content="Flexible form and field components for building accessible forms with validation."
	/>
</svelte:head>

<div class="page-grid">
	<div></div>

	<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Breadcrumb -->
		<nav class="mb-8 flex items-center space-x-2 text-sm text-gray-500">
			<a href="/components" class="transition-colors hover:text-purple-600">Components</a>
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
			<span class="text-gray-900">Form</span>
		</nav>

		<!-- Header -->
		<div class="mb-12">
			<div class="mb-4 flex items-center gap-4">
				<h1 class="text-4xl font-bold text-gray-900 md:text-5xl">Form & Field</h1>
				<Badge class="bg-green-100 px-3 py-1 text-green-800">Stable</Badge>
			</div>
			<p class="max-w-3xl text-xl text-gray-600">
				Composable form and field components for building accessible, validated forms with powerful
				state management.
			</p>
		</div>

		<!-- Installation -->
		<section class="mb-12">
			<h2 class="mb-4 text-2xl font-bold text-gray-900">Installation</h2>
			<div class="rounded-lg bg-gray-900 p-4">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-sm text-gray-400">Installation</span>
					<button
						class="text-gray-400 transition-colors hover:text-white"
						onclick={() => copyToClipboard("import { Form, Field } from 'atomic-sv/form';")}
					>
						{#if copySuccess}
							<svg
								class="h-4 w-4 text-green-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						{:else}
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<code class="font-mono text-sm text-white">
					<span class="text-purple-400">import</span>
					<span class="text-blue-400">{{ Form, Field }}</span>
					<span class="text-purple-400">from</span>
					<span class="text-green-400">'atomic-sv/form'</span><span class="text-gray-300">;</span>
				</code>
			</div>
		</section>

		<Playground />

		<!-- Examples -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Examples</h2>

			<div class="space-y-8">
				{#each examples as example, i}
					<Preview.Root class="overflow-hidden rounded-lg border border-gray-200">
						<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
							<h3 class="text-lg font-semibold text-gray-900">{example.title}</h3>
							<p class="mt-1 text-sm text-gray-600">{example.description}</p>
						</div>

						<!-- Preview -->
						<Preview.Content class="bg-white p-6">
							<div
								class="flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 py-8"
							>
								{#if i === 0}
									<!-- Basic Form -->
									<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
										<Field.Root>
											<Field.Label
												for="basic-name"
												class="mb-1 block text-sm font-medium text-gray-700"
											>
												Name
											</Field.Label>
											<Field.Control component={Input.Root}>
												<Input.Value bind:value={basicFormData.name} />
											</Field.Control>
										</Field.Root>
										<div>
											<label for="basic-email" class="mb-1 block text-sm font-medium text-gray-700">
												Email
											</label>
											<input
												id="basic-email"
												type="email"
												bind:value={basicFormData.email}
												placeholder="Enter your email"
												class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
											/>
										</div>
										<Button class="w-full bg-purple-600 text-white hover:bg-purple-700">
											Submit
										</Button>
									</Form>
								{:else if i === 1}
									<!-- Validated Form -->
									<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
										<div>
											<label
												for="validated-email"
												class="mb-1 block text-sm font-medium text-gray-700"
											>
												Email Address
											</label>
											<input
												id="validated-email"
												type="email"
												bind:value={validatedFormData.email}
												placeholder="Enter your email"
												required
												class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm invalid:border-red-500 invalid:ring-red-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
											/>
										</div>
										<div>
											<label
												for="validated-password"
												class="mb-1 block text-sm font-medium text-gray-700"
											>
												Password
											</label>
											<input
												id="validated-password"
												type="password"
												bind:value={validatedFormData.password}
												placeholder="Enter your password"
												required
												minlength="8"
												class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm invalid:border-red-500 invalid:ring-red-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
											/>
										</div>
										<Button class="w-full bg-purple-600 text-white hover:bg-purple-700">
											Create Account
										</Button>
									</Form>
								{:else if i === 2}
									<!-- Advanced Form -->
									<Form class="w-full max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
										<div>
											<label
												for="advanced-profile"
												class="mb-1 block text-sm font-medium text-gray-700"
											>
												Profile Information
											</label>
											<textarea
												id="advanced-profile"
												bind:value={advancedFormData.profile}
												placeholder="Tell us about yourself"
												rows="4"
												class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
											></textarea>
										</div>
										<div>
											<label
												for="advanced-preferences"
												class="mb-1 block text-sm font-medium text-gray-700"
											>
												Preferences
											</label>
											<select
												id="advanced-preferences"
												bind:value={advancedFormData.preferences}
												class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
											>
												<option value="">Select preferences</option>
												<option value="email">Email notifications</option>
												<option value="sms">SMS notifications</option>
												<option value="none">No notifications</option>
											</select>
										</div>
										<div class="flex items-center space-x-2">
											<input
												id="advanced-newsletter"
												type="checkbox"
												bind:checked={advancedFormData.newsletter}
												class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
											/>
											<label for="advanced-newsletter" class="text-sm text-gray-700">
												I agree to the terms
											</label>
										</div>
										<Button class="w-full bg-purple-600 text-white hover:bg-purple-700">
											Save Profile
										</Button>
									</Form>
								{/if}
							</div>
						</Preview.Content>

						<!-- Code -->
						<Preview.Code code={example.code}></Preview.Code>
					</Preview.Root>
				{/each}
			</div>
		</section>

		<!-- Form Component Props -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Form Component Props</h2>
			<Props
				data={[
					{
						name: 'renderless',
						type: 'boolean',
						default: 'false',
						description: 'Whether to render as a renderless component (no DOM output)'
					},
					{
						name: 'build',
						type: 'function',
						default: '-',
						description: 'Custom form builder function for advanced state management'
					},
					{
						name: 'children',
						type: 'Snippet<[{ form: FormBond }]>',
						default: '-',
						description: 'Content to render with access to form state'
					},
					{
						name: 'class',
						type: 'string',
						default: '',
						description: 'Additional CSS classes to apply to the form element'
					}
				]}
			></Props>
		</section>

		<!-- Field Component Props -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Field Component Props</h2>

			<div class="space-y-8">
				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Field.Root</h3>
					<Props
						data={[
							{
								name: 'name',
								type: 'string',
								default: '-',
								description: 'Unique name identifier for the field'
							},
							{
								name: 'value',
								type: 'any',
								default: '-',
								description: 'The current value of the field (bindable)'
							},
							{
								name: 'disabled',
								type: 'boolean',
								default: 'false',
								description: 'Whether the field is disabled'
							},
							{
								name: 'readonly',
								type: 'boolean',
								default: 'false',
								description: 'Whether the field is read-only'
							},
							{
								name: 'schema',
								type: 'any',
								default: '-',
								description: 'Validation schema for the field'
							},
							{
								name: 'parser',
								type: 'function',
								default: '-',
								description: 'Function to parse and validate the schema'
							},
							{
								name: 'children',
								type: 'Snippet<[{ field: FieldBond }]>',
								default: '-',
								description: 'Content to render with access to field state'
							}
						]}
					></Props>
				</div>

				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Field.Label</h3>
					<Props
						data={[
							{
								name: 'class',
								type: 'string',
								default: '',
								description: 'Additional CSS classes to apply to the label'
							},
							{
								name: 'children',
								type: 'Snippet',
								default: '-',
								description: 'Label content to render'
							}
						]}
					></Props>
				</div>

				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Field.Control</h3>
					<Props
						data={[
							{
								name: 'component',
								type: 'Component',
								default: '-',
								description: 'Custom component to use for the control (e.g., "textarea")'
							},
							{
								name: 'value',
								type: 'any',
								default: '-',
								description: 'The current value of the control (bindable)'
							},
							{
								name: 'class',
								type: 'string',
								default: '',
								description: 'Additional CSS classes to apply to the control'
							},
							{
								name: 'children',
								type: 'Snippet',
								default: '-',
								description: 'Content to render inside the control'
							},
							{
								name: '...restProps',
								type: 'HTMLAttributes',
								default: '-',
								description: 'All standard HTML input/textarea attributes'
							}
						]}
					></Props>
				</div>
			</div>
		</section>

		<!-- Accessibility -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Accessibility</h2>
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<div class="flex items-start">
					<svg
						class="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 class="mb-2 text-lg font-semibold text-blue-900">
							Built-in Accessibility Features
						</h3>
						<ul class="space-y-1 text-blue-800">
							<li>• Automatic label-control association with proper `for` attributes</li>
							<li>• Semantic form structure with proper roles and ARIA attributes</li>
							<li>• Keyboard navigation support for all form controls</li>
							<li>• Screen reader compatibility with descriptive labels</li>
							<li>• Focus management with visible focus indicators</li>
							<li>• Form validation states communicated to assistive technologies</li>
							<li>• Proper fieldset and legend usage for grouped controls</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Usage Patterns -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Usage Patterns</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 p-6">
					<h3 class="mb-3 text-lg font-semibold text-gray-900">Simple Form</h3>
					<p class="mb-4 text-sm text-gray-600">
						Use standard HTML form elements for basic forms without complex state management needs.
					</p>
					<div class="rounded bg-gray-100 p-3">
						<code class="text-sm">
							&lt;form&gt;<br />
							&nbsp;&nbsp;&lt;input type="text" /&gt;<br />
							&nbsp;&nbsp;&lt;button&gt;Submit&lt;/button&gt;<br />
							&lt;/form&gt;
						</code>
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 p-6">
					<h3 class="mb-3 text-lg font-semibold text-gray-900">Advanced Form</h3>
					<p class="mb-4 text-sm text-gray-600">
						Use Form and Field components for complex forms with validation, state management, and
						dynamic behavior.
					</p>
					<div class="rounded bg-gray-100 p-3">
						<code class="text-sm">
							&lt;Form&gt;<br />
							&nbsp;&nbsp;&lt;Field.Root&gt;<br />
							&nbsp;&nbsp;&nbsp;&nbsp;&lt;Field.Label /&gt;<br />
							&nbsp;&nbsp;&nbsp;&nbsp;&lt;Field.Control /&gt;<br />
							&nbsp;&nbsp;&lt;/Field.Root&gt;<br />
							&lt;/Form&gt;
						</code>
					</div>
				</div>
			</div>
		</section>

		<!-- Navigation -->
		<div class="flex items-center justify-between border-t border-gray-200 pt-8">
			<a
				href="/components/button"
				class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
			>
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Previous: Button
			</a>

			<a
				href="/components/input"
				class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
			>
				Next: Input
				<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>

	<ContentSidebar
		data={[
			{ title: 'Installation', href: '/components/form#installation' },
			{ title: 'Examples', href: '/components/form#examples' },
			{ title: 'Form Props', href: '/components/form#form-props' },
			{ title: 'Field Props', href: '/components/form#field-props' },
			{ title: 'Accessibility', href: '/components/form#accessibility' },
			{ title: 'Usage Patterns', href: '/components/form#usage-patterns' }
		]}
	/>
</div>

<style>
	.page-grid {
		display: grid;
		grid-template-columns: auto 1fr auto;
	}
</style>
