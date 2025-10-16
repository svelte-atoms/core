<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
</script>

<svelte:head>
	<title>Getting Started - Atomic SV</title>
	<meta
		name="description"
		content="Learn how to install and use Atomic SV in your Svelte projects."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Getting Started</h1>
		<p class="text-xl text-gray-600">
			Learn how to install and use Atomic SV in your Svelte projects
		</p>
		<div class="mt-6 flex items-center gap-3">
			<Badge class="bg-green-100 px-3 py-1 text-green-800">Beginner Friendly</Badge>
			<Badge class="bg-blue-100 px-3 py-1 text-blue-800">5 min read</Badge>
		</div>
	</div>

	<!-- Installation -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Installation</h2>

		<div class="space-y-6">
			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Package Manager</h3>
				<p class="mb-4 text-gray-600">Install Atomic SV using your preferred package manager:</p>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
						<div class="mb-1 text-green-400"># npm</div>
						<div>npm install atomic-sv</div>
					</div>
					<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
						<div class="mb-1 text-green-400"># yarn</div>
						<div>yarn add atomic-sv</div>
					</div>
					<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
						<div class="mb-1 text-green-400"># pnpm</div>
						<div>pnpm add atomic-sv</div>
					</div>
					<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
						<div class="mb-1 text-green-400"># bun</div>
						<div>bun add atomic-sv</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Requirements</h3>
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div class="flex items-start">
						<svg
							class="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<div>
							<h4 class="mb-1 font-medium text-blue-900">Prerequisites</h4>
							<ul class="space-y-1 text-sm text-blue-800">
								<li>• Svelte 5.0 or higher</li>
								<li>• Node.js 18 or higher</li>
								<li>• TypeScript (recommended)</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Setup -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Setup</h2>

		<div class="space-y-8">
			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">
					1. Configure Tailwind CSS (Optional)
				</h3>
				<p class="mb-4 text-gray-600">
					While not required, Atomic SV works best with Tailwind CSS for styling:
				</p>

				<div class="mb-4 rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div class="mb-1 text-green-400"># Install Tailwind CSS</div>
					<div>npm install -D tailwindcss postcss autoprefixer</div>
					<div>npx tailwindcss init -p</div>
				</div>

				<p class="mb-4 text-gray-600">
					Add to your <code class="rounded bg-gray-100 px-2 py-1 text-sm">app.css</code>:
				</p>

				<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div class="text-purple-400">@import</div>
					<div class="text-green-400">'tailwindcss'</div>
					<div class="text-gray-300">;</div>
				</div>
			</div>

			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">2. Import Components</h3>
				<p class="mb-4 text-gray-600">
					You can import components individually for better tree-shaking:
				</p>

				<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div class="text-gray-500">// Individual imports (recommended)</div>
					<div>
						<span class="text-purple-400">import</span> <span class="text-blue-400">Button</span>
						<span class="text-purple-400">from</span>
						<span class="text-green-400">'atomic-sv/button'</span><span class="text-gray-300"
							>;</span
						>
					</div>
					<div>
						<span class="text-purple-400">import</span> <span class="text-blue-400">Input</span>
						<span class="text-purple-400">from</span>
						<span class="text-green-400">'atomic-sv/input'</span><span class="text-gray-300">;</span
						>
					</div>
					<div>
						<span class="text-purple-400">import</span> <span class="text-blue-400">Dialog</span>
						<span class="text-purple-400">from</span>
						<span class="text-green-400">'atomic-sv/dialog'</span><span class="text-gray-300"
							>;</span
						>
					</div>
					<br />
					<div class="text-gray-500">// Or import from main package</div>
					<div>
						<span class="text-purple-400">import</span> <span class="text-gray-300">&#123;</span>
						<span class="text-blue-400">Button, Input, Dialog</span>
						<span class="text-gray-300">&#125;</span> <span class="text-purple-400">from</span>
						<span class="text-green-400">'atomic-sv'</span><span class="text-gray-300">;</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Basic Usage -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Basic Usage</h2>

		<div class="space-y-8">
			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Your First Component</h3>
				<p class="mb-4 text-gray-600">Here's a simple example using the Button component:</p>

				<div class="overflow-hidden rounded-lg border border-gray-200">
					<div class="border-b border-gray-200 bg-gray-50 px-4 py-2">
						<span class="text-sm font-medium text-gray-700">Example.svelte</span>
					</div>
					<div class="bg-gray-900 p-4 font-mono text-sm text-white">
						<div><span class="text-blue-400">&lt;script&gt;</span></div>
						<div class="ml-4">
							<span class="text-purple-400">import</span> <span class="text-blue-400">Button</span>
							<span class="text-purple-400">from</span>
							<span class="text-green-400">'atomic-sv/button'</span><span class="text-gray-300"
								>;</span
							>
						</div>
						<div><span class="text-blue-400">&lt;/script&gt;</span></div>
						<br />
						<div>
							<span class="text-blue-400">&lt;Button</span>
							<span class="text-yellow-400">class=</span><span class="text-green-400"
								>"bg-purple-600 text-white px-4 py-2"</span
							><span class="text-blue-400">&gt;</span>
						</div>
						<div class="ml-4 text-gray-300">Click me!</div>
						<div><span class="text-blue-400">&lt;/Button&gt;</span></div>
					</div>
				</div>

				<!-- Live Preview -->
				<div class="mt-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-4">
					<div class="mb-2 text-sm font-medium text-gray-700">Preview:</div>
					<Button class="bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700">
						Click me!
					</Button>
				</div>
			</div>

			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Working with Props</h3>
				<p class="mb-4 text-gray-600">
					Components accept standard HTML attributes and custom props:
				</p>

				<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div><span class="text-blue-400">&lt;Button</span></div>
					<div class="ml-4">
						<span class="text-yellow-400">type=</span><span class="text-green-400">"submit"</span>
					</div>
					<div class="ml-4">
						<span class="text-yellow-400">disabled=</span><span class="text-green-400"
							>{loading}</span
						>
					</div>
					<div class="ml-4">
						<span class="text-yellow-400">class=</span><span class="text-green-400"
							>"w-full bg-blue-600 text-white"</span
						>
					</div>
					<div class="ml-4">
						<span class="text-yellow-400">onclick=</span><span class="text-green-400"
							>{handleClick}</span
						>
					</div>
					<div><span class="text-blue-400">&gt;</span></div>
					<div class="ml-4 text-gray-300">Submit Form</div>
					<div><span class="text-blue-400">&lt;/Button&gt;</span></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Styling -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Styling</h2>

		<div class="space-y-6">
			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Using Tailwind Classes</h3>
				<p class="mb-4 text-gray-600">Override default styles with Tailwind CSS classes:</p>

				<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div class="text-gray-500">// Primary button</div>
					<div>
						<span class="text-blue-400">&lt;Button</span>
						<span class="text-yellow-400">class=</span><span class="text-green-400"
							>"bg-blue-600 hover:bg-blue-700 text-white"</span
						><span class="text-blue-400">&gt;</span><span class="text-gray-300">Primary</span><span
							class="text-blue-400">&lt;/Button&gt;</span
						>
					</div>
					<br />
					<div class="text-gray-500">// Outline button</div>
					<div>
						<span class="text-blue-400">&lt;Button</span>
						<span class="text-yellow-400">class=</span><span class="text-green-400"
							>"border border-gray-300 hover:bg-gray-50"</span
						><span class="text-blue-400">&gt;</span><span class="text-gray-300">Outline</span><span
							class="text-blue-400">&lt;/Button&gt;</span
						>
					</div>
					<br />
					<div class="text-gray-500">// Gradient button</div>
					<div>
						<span class="text-blue-400">&lt;Button</span>
						<span class="text-yellow-400">class=</span><span class="text-green-400"
							>"bg-gradient-to-r from-purple-600 to-pink-600 text-white"</span
						><span class="text-blue-400">&gt;</span><span class="text-gray-300">Gradient</span><span
							class="text-blue-400">&lt;/Button&gt;</span
						>
					</div>
				</div>
			</div>

			<div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Custom CSS</h3>
				<p class="mb-4 text-gray-600">
					You can also use custom CSS classes or CSS-in-JS solutions:
				</p>

				<div class="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
					<div class="text-gray-500">/* styles.css */</div>
					<div>
						<span class="text-yellow-400">.my-button</span>
						<span class="text-gray-300">&#123;</span>
					</div>
					<div class="ml-4">
						<span class="text-blue-400">background</span><span class="text-gray-300">:</span>
						<span class="text-green-400">linear-gradient(45deg, #ff6b6b, #4ecdc4)</span><span
							class="text-gray-300">;</span
						>
					</div>
					<div class="ml-4">
						<span class="text-blue-400">border</span><span class="text-gray-300">:</span>
						<span class="text-green-400">none</span><span class="text-gray-300">;</span>
					</div>
					<div class="ml-4">
						<span class="text-blue-400">border-radius</span><span class="text-gray-300">:</span>
						<span class="text-green-400">25px</span><span class="text-gray-300">;</span>
					</div>
					<div><span class="text-gray-300">&#125;</span></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Next Steps</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-gray-200 p-6 transition-colors hover:border-purple-300">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
					<svg
						class="h-5 w-5 text-purple-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Explore Components</h3>
				<p class="mb-4 text-gray-600">
					Browse our full component library with live examples and code snippets.
				</p>
				<a href="/components">
					<Button
						class="border border-purple-600 px-4 py-2 text-purple-600 transition-colors hover:bg-purple-50"
					>
						View Components
					</Button>
				</a>
			</div>

			<div class="rounded-lg border border-gray-200 p-6 transition-colors hover:border-blue-300">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
					<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Read the Docs</h3>
				<p class="mb-4 text-gray-600">
					Deep dive into advanced patterns, theming, and customization options.
				</p>
				<a href="https://github.com/ryu-man/atomic-sv" target="_blank" rel="noopener noreferrer">
					<Button
						class="border border-blue-600 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50"
					>
						GitHub Docs
					</Button>
				</a>
			</div>
		</div>
	</section>
</div>
