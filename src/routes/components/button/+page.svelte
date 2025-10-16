<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import { Preview } from '$docs/preview';
	import Props from '$docs/props-datagrid.svelte';
	import ContentSidebar from '$docs/content-sidebar.svelte';
	import Code from '$docs/code/code.svelte';
	import { buttonCode } from './code';
	import { Alert } from '$lib/components/alert';
</script>

<svelte:head>
	<title>Button | Atomic SV</title>
	<meta name="description" content="Interactive button component for triggering actions." />
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
			<span class="text-gray-900">Button</span>
		</nav>

		<!-- Header -->
		<div class="mb-12">
			<div class="mb-4 flex items-center gap-4">
				<h1 class="text-4xl font-bold text-gray-900 md:text-5xl">Button</h1>
				<Badge class="bg-green-100 px-3 py-1 text-green-800">Stable</Badge>
			</div>
			<p class="max-w-3xl text-xl text-gray-600">
				Interactive element for triggering actions. Supports various styles, sizes, and states.
			</p>
		</div>

		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Simple Usage</h2>

			<Code code={buttonCode} />
		</section>

		<!-- Playground -->
		<!-- <Playground /> -->

		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Preview</h2>

			<Preview.Root>
				<Preview.Content class="bg-background flex h-96 items-center justify-center rounded-lg">
					<Button>Click me</Button>
				</Preview.Content>
			</Preview.Root>
		</section>

		<!-- Props Documentation -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Props</h2>
			<Props
				data={[
					{
						name: 'class',
						type: 'string',
						default: '',
						description: 'Additional CSS classes to apply'
					},
					{
						name: 'children',
						type: 'Snippet',
						default: '-',
						description: 'Content to render inside the button'
					},
					{
						name: 'disabled',
						type: 'boolean',
						default: 'false',
						description: 'Whether the button is disabled'
					},
					{
						name: 'type',
						type: "'button' | 'submit' | 'reset'",
						default: "'button'",
						description: 'Button type attribute'
					},
					{
						name: 'onclick',
						type: 'function',
						default: '-',
						description: 'Click event handler'
					}
				]}
			></Props>
		</section>

		<!-- Accessibility -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Accessibility</h2>
			<Alert.Root class="flex flex-col bg-blue-600/5 text-blue-600">
				<div class="flex items-center gap-2">
					<Alert.Icon class="h-6">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</Alert.Icon>
					<Alert.Title class="text-lg">Built-in Accessibility Features</Alert.Title>
				</div>
				<Alert.Description>
					<ul class="space-y-1">
						<li>• Proper semantic button element with role</li>
						<li>• Keyboard navigation support (Enter and Space keys)</li>
						<li>• Focus management with visible focus indicators</li>
						<li>• Screen reader compatible with proper ARIA attributes</li>
						<li>• Disabled state handling</li>
					</ul>
				</Alert.Description>
			</Alert.Root>
		</section>

		<!-- Navigation -->
		<div class="flex items-center justify-between border-t border-gray-200 pt-8">
			<a
				href="/components"
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
				Back to Components
			</a>

			<a
				href="/components/checkbox"
				class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
			>
				Next: Checkbox
				<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>

	<ContentSidebar
		data={[
			{ title: 'Installation', href: '/components/button#installation' },
			{ title: 'Usage', href: '/components/button#usage' },
			{ title: 'Variants', href: '/components/button#variants' },
			{ title: 'Accessibility', href: '/components/button#accessibility' }
		]}
	/>
</div>

<style>
	.page-grid {
		display: grid;
		grid-template-columns: auto 1fr auto;
	}
</style>
