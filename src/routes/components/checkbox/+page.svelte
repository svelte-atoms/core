<script lang="ts">
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import Badge from '$lib/components/badge/badge.svelte';

	let copySuccess = $state(false);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copySuccess = true;
		setTimeout(() => (copySuccess = false), 2000);
	}
</script>

<svelte:head>
	<title>Checkbox - Atomic SV</title>
	<meta name="description" content="Selection control for multiple choices." />
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
		<span class="text-gray-900">Checkbox</span>
	</nav>

	<!-- Header -->
	<div class="mb-12">
		<div class="mb-4 flex items-center gap-4">
			<h1 class="text-4xl font-bold text-gray-900 md:text-5xl">Checkbox</h1>
			<Badge class="bg-green-100 px-3 py-1 text-green-800">Stable</Badge>
		</div>
		<p class="max-w-3xl text-xl text-gray-600">
			Selection control for multiple choices. Allows users to select one or more options from a set.
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
					onclick={() => copyToClipboard("import Checkbox from 'atomic-sv/checkbox';")}
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
				<span class="text-purple-400">import</span> <span class="text-blue-400">Checkbox</span>
				<span class="text-purple-400">from</span>
				<span class="text-green-400">'atomic-sv/checkbox'</span><span class="text-gray-300">;</span>
			</code>
		</div>
	</section>

	<!-- Examples -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">Examples</h2>

		<div class="space-y-8">
			<!-- Basic Checkbox -->
			<div class="overflow-hidden rounded-lg border border-gray-200">
				<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
					<h3 class="text-lg font-semibold text-gray-900">Basic Checkbox</h3>
					<p class="mt-1 text-sm text-gray-600">Simple checkbox with label</p>
				</div>

				<div class="bg-white p-6">
					<div
						class="flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 py-8"
					>
						<div class="flex items-center space-x-2">
							<Checkbox id="basic" />
							<label for="basic" class="cursor-pointer text-sm text-gray-700">
								Accept terms and conditions
							</label>
						</div>
					</div>
				</div>

				<div class="bg-gray-900 p-4">
					<div class="mb-2 flex items-center justify-between">
						<span class="text-sm text-gray-400">Code</span>
						<button
							class="text-gray-400 transition-colors hover:text-white"
							onclick={() =>
								copyToClipboard(`<Checkbox id="basic" />
<label for="basic">Accept terms and conditions</label>`)}
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
					<pre class="overflow-x-auto font-mono text-sm text-white">{`<Checkbox id="basic" />
<label for="basic">Accept terms and conditions</label>`}</pre>
				</div>
			</div>

			<!-- Checkbox Group -->
			<div class="overflow-hidden rounded-lg border border-gray-200">
				<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
					<h3 class="text-lg font-semibold text-gray-900">Checkbox Group</h3>
					<p class="mt-1 text-sm text-gray-600">
						Multiple checkboxes for selecting multiple options
					</p>
				</div>

				<div class="bg-white p-6">
					<div
						class="flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 py-8"
					>
						<div class="space-y-3">
							<div class="flex items-center space-x-2">
								<Checkbox id="option1" />
								<label for="option1" class="cursor-pointer text-sm text-gray-700">
									Newsletter updates
								</label>
							</div>
							<div class="flex items-center space-x-2">
								<Checkbox id="option2" />
								<label for="option2" class="cursor-pointer text-sm text-gray-700">
									Marketing emails
								</label>
							</div>
							<div class="flex items-center space-x-2">
								<Checkbox id="option3" />
								<label for="option3" class="cursor-pointer text-sm text-gray-700">
									Product announcements
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-gray-900 p-4">
					<div class="mb-2 flex items-center justify-between">
						<span class="text-sm text-gray-400">Code</span>
						<button
							class="text-gray-400 transition-colors hover:text-white"
							onclick={() =>
								copyToClipboard(`<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox id="option1" />
    <label for="option1">Newsletter updates</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option2" />
    <label for="option2">Marketing emails</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option3" />
    <label for="option3">Product announcements</label>
  </div>
</div>`)}
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
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							{/if}
						</button>
					</div>
					<pre class="overflow-x-auto font-mono text-sm text-white">{`<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox id="option1" />
    <label for="option1">Newsletter updates</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option2" />
    <label for="option2">Marketing emails</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option3" />
    <label for="option3">Product announcements</label>
  </div>
</div>`}</pre>
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
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Previous: Button
		</a>

		<a
			href="/components"
			class="inline-flex items-center text-purple-600 transition-colors hover:text-purple-700"
		>
			Back to Components
		</a>
	</div>
</div>
