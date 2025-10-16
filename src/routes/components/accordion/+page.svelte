<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
	import Badge from '$lib/components/badge/badge.svelte';
	import Button from '$lib/components/button/button.svelte';

	let copySuccess = $state(false);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copySuccess = true;
		setTimeout(() => (copySuccess = false), 2000);
	}
</script>

<svelte:head>
	<title>Accordion - Atomic SV</title>
	<meta name="description" content="Collapsible content sections for organizing information." />
</svelte:head>

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
		<span class="text-gray-900">Accordion</span>
	</nav>

	<!-- Header -->
	<div class="mb-12">
		<div class="mb-4 flex items-center gap-4">
			<h1 class="text-4xl font-bold text-gray-900 md:text-5xl">Accordion</h1>
			<Badge class="bg-green-100 px-3 py-1 text-green-800">Stable</Badge>
		</div>
		<p class="max-w-3xl text-xl text-gray-600">
			Collapsible content sections for organizing information. Perfect for FAQs, settings panels,
			and content organization.
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
					onclick={() => copyToClipboard("import { Accordion } from 'atomic-sv/accordion';")}
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
				<span class="text-gray-300">&#123;</span>
				<span class="text-blue-400">Accordion</span>
				<span>,</span>
				<span class="text-blue-400">AccordionItem</span>
				<span class="text-gray-300">&#125;</span>
				<span class="text-purple-400">from</span>
				<span class="text-green-400">'atomic-sv/accordion'</span><span class="text-gray-300">;</span
				>
			</code>
		</div>
	</section>

	<!-- Examples -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">Examples</h2>

		<div class="space-y-8">
			<!-- Basic Accordion -->
			<div class="overflow-hidden rounded-lg border border-gray-200">
				<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
					<h3 class="text-lg font-semibold text-gray-900">Basic Accordion</h3>
					<p class="mt-1 text-sm text-gray-600">Simple accordion with collapsible sections</p>
				</div>

				<div class="bg-white p-6">
					<div class="mx-auto max-w-md">
						<!-- Simulated Accordion since we don't have the full implementation -->
						<Accordion class="overflow-hidden rounded-lg border border-gray-200">
							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">What is Atomic SV?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Atomic SV is a modular, accessible, and extensible Svelte UI component library
									built with Svelte 5.
								</AccordionItem.Body>
							</AccordionItem.Root>

							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">How do I install it?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Simply run npm install atomic-sv to add it to your project. Import components as
									needed.
								</AccordionItem.Body>
							</AccordionItem.Root>

							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">Is it accessible?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Yes, all Atomic SV components are built with accessibility in mind. They include
									proper ARIA attributes, keyboard navigation, and screen reader support out of the
									box.
								</AccordionItem.Body>
							</AccordionItem.Root>
						</Accordion>
					</div>
				</div>

				<div class="bg-gray-900 p-4">
					<div class="mb-2 flex items-center justify-between">
						<span class="text-sm text-gray-400">Code</span>
						<button
							class="text-gray-400 transition-colors hover:text-white"
							onclick={() =>
								copyToClipboard(`<Accordion class="overflow-hidden rounded-lg border border-gray-200">
							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">What is Atomic SV?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Atomic SV is a modular, accessible, and extensible Svelte UI component library
									built with Svelte 5.
								</AccordionItem.Body>
							</AccordionItem.Root>

							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">How do I install it?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Simply run npm install atomic-sv to add it to your project. Import components as
									needed.
								</AccordionItem.Body>
							</AccordionItem.Root>

							<AccordionItem.Root class="border-b border-gray-200 last:border-b-0">
								<AccordionItem.Header
									class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-100/10"
								>
									<span class="font-medium text-gray-900">Is it accessible?</span>
									<AccordionItem.Indicator>
										<svg
											class="h-5 w-5 text-gray-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</AccordionItem.Indicator>
								</AccordionItem.Header>
								<AccordionItem.Body class="px-4 pb-3 text-sm text-gray-600">
									Yes, all Atomic SV components are built with accessibility in mind. They include
									proper ARIA attributes, keyboard navigation, and screen reader support out of the
									box.
								</AccordionItem.Body>
							</AccordionItem.Root>
						</Accordion>`)}
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
					<pre class="overflow-x-auto font-mono text-sm text-white">{`<Accordion>
  <AccordionItem>
    <AccordionHeader>What is Atomic SV?</AccordionHeader>
    <AccordionBody>
      Atomic SV is a modular, accessible, and extensible 
      Svelte UI component library built with Svelte 5.
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader>How do I install it?</AccordionHeader>
    <AccordionBody>
      Simply run npm install atomic-sv
    </AccordionBody>
  </AccordionItem>
</Accordion>`}</pre>
				</div>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">Features</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Fully Accessible</h3>
				<p class="text-sm text-gray-600">
					Built with ARIA best practices, keyboard navigation, and screen reader support.
				</p>
			</div>

			<div class="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Customizable</h3>
				<p class="text-sm text-gray-600">
					Style with Tailwind CSS or your own CSS. Full control over appearance and behavior.
				</p>
			</div>

			<div class="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Smooth Animations</h3>
				<p class="text-sm text-gray-600">
					Built-in smooth expand/collapse animations with respect for reduced motion preferences.
				</p>
			</div>

			<div class="rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 p-6">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Flexible Modes</h3>
				<p class="text-sm text-gray-600">
					Supports single or multiple panel expansion modes for different use cases.
				</p>
			</div>
		</div>
	</section>

	<!-- API Reference -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">API Reference</h2>

		<div class="space-y-6">
			<!-- Accordion Props -->
			<div>
				<h3 class="mb-3 text-lg font-semibold text-gray-900">Accordion Props</h3>
				<div class="overflow-x-auto">
					<table class="min-w-full rounded-lg border border-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Prop</th
								>
								<th
									class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Type</th
								>
								<th
									class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Default</th
								>
								<th
									class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Description</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							<tr>
								<td class="px-6 py-4 font-mono text-sm whitespace-nowrap text-purple-600"
									>multiple</td
								>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">boolean</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">false</td>
								<td class="px-6 py-4 text-sm text-gray-600"
									>Allow multiple panels to be open simultaneously</td
								>
							</tr>
							<tr>
								<td class="px-6 py-4 font-mono text-sm whitespace-nowrap text-purple-600"
									>collapsible</td
								>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">boolean</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">true</td>
								<td class="px-6 py-4 text-sm text-gray-600"
									>Allow panels to be collapsed when in single mode</td
								>
							</tr>
							<tr>
								<td class="px-6 py-4 font-mono text-sm whitespace-nowrap text-purple-600">class</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">string</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600">''</td>
								<td class="px-6 py-4 text-sm text-gray-600">Additional CSS classes</td>
							</tr>
						</tbody>
					</table>
				</div>
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
					<h3 class="mb-2 text-lg font-semibold text-blue-900">Built-in Accessibility Features</h3>
					<ul class="space-y-1 text-blue-800">
						<li>• Proper ARIA attributes (aria-expanded, aria-controls, etc.)</li>
						<li>• Keyboard navigation (Enter, Space, Arrow keys)</li>
						<li>• Focus management with visible indicators</li>
						<li>• Screen reader announcements for state changes</li>
						<li>• Semantic HTML structure</li>
						<li>• Respects prefers-reduced-motion setting</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<div class="flex items-center justify-between border-t border-gray-200 pt-8">
		<a
			href="/components"
			class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
		>
			<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Components
		</a>

		<a
			href="/components/button"
			class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
		>
			Next: Button
			<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</div>
