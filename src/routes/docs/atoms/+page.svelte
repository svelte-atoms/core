<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Atoms</h1>
		<p class="text-muted-foreground text-lg">
			The fundamental building blocks of Svelte Atoms - primitive components that power everything.
		</p>
	</div>

	<!-- What Are Atoms -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">What Are Atoms?</h2>
			<p class="text-muted-foreground">
				Atoms are the most primitive components in the library - simple, focused, and composable.
			</p>
		</div>

		<Card.Root class="border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground mb-4 leading-relaxed">
					In chemistry, atoms are the basic units that combine to form molecules. In Svelte Atoms,
					the same principle applies: atoms are the fundamental components that combine to create
					more complex UI patterns.
				</p>
				<p class="text-muted-foreground leading-relaxed">
					Unlike traditional component libraries that provide fully-featured components, atoms give
					you the raw building blocks. They handle the hard parts (accessibility, keyboard
					navigation, state management) while giving you complete control over structure and
					styling.
				</p>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Core Concepts -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Core Concepts</h2>
			<p class="text-muted-foreground">
				Understanding these concepts will help you get the most out of atoms.
			</p>
		</div>

		<div class="space-y-6">
			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-center gap-3">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<circle cx="12" cy="12" r="4" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold">Primitive Components</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Atoms are unstyled by default. They provide behavior, accessibility, and state
						management without imposing design decisions. You add the styling.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-center gap-3">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="18" height="18" x="3" y="3" rx="2" />
								<path d="M3 9h18" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold">Render Props Pattern</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Many atoms use render props (snippet slots in Svelte 5) to give you full control over
						rendering. The atom handles logic, you handle markup.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-center gap-3">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold">Composition Over Configuration</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Instead of dozens of props for every possible use case, atoms compose together. Build
						what you need from simple pieces.
					</p>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Example: Atom Component -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Anatomy of an Atom</h2>
			<p class="text-muted-foreground">Let's look at how an atom works with a simple example.</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Basic Atom Usage</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="text-sm leading-relaxed"><code class="text-foreground"
							>{`<script lang="ts">
  import { Atom } from '@svelte-atoms/core';
  
  // Atoms accept any HTML element props
  // Plus their own specific props
</script>

<Atom
  as="button"
  class="px-4 py-2 rounded bg-blue-500 text-white"
  onclick={() => console.log('clicked')}
>
  Click me
</Atom>

<!-- Renders as: -->
<button class="px-4 py-2 rounded bg-blue-500 text-white">
  Click me
</button>`}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-6">
				<h3 class="mb-3 text-lg font-semibold">Key Features</h3>
				<ul class="space-y-3">
					<li class="flex gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="text-muted-foreground text-sm">
								<strong class="text-foreground">Polymorphic:</strong> The
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">as</code> prop lets
								you render any HTML element
							</p>
						</div>
					</li>
					<li class="flex gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="text-muted-foreground text-sm">
								<strong class="text-foreground">Type-safe:</strong> Full TypeScript support with proper
								types for the rendered element
							</p>
						</div>
					</li>
					<li class="flex gap-3">
						<span class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<p class="text-muted-foreground text-sm">
								<strong class="text-foreground">Flexible:</strong> Accepts all standard HTML attributes
								for the element type
							</p>
						</div>
					</li>
				</ul>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Types of Atoms -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Types of Atoms</h2>
			<p class="text-muted-foreground">
				Different atoms serve different purposes in your component architecture.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-4 flex items-center gap-2">
						<Badge variant="primary">Core</Badge>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Layout Atoms</h3>
					<p class="text-muted-foreground mb-3 text-sm">
						Building blocks for page structure and spacing.
					</p>
					<div class="flex flex-wrap gap-2">
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Stack</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Layer</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Scrollable</code>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-4 flex items-center gap-2">
						<Badge variant="primary">Core</Badge>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Interactive Atoms</h3>
					<p class="text-muted-foreground mb-3 text-sm">Handle user interactions and state.</p>
					<div class="flex flex-wrap gap-2">
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Button</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Input</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Checkbox</code>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-4 flex items-center gap-2">
						<Badge variant="secondary">Utility</Badge>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Display Atoms</h3>
					<p class="text-muted-foreground mb-3 text-sm">Present information to users.</p>
					<div class="flex flex-wrap gap-2">
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Badge</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Avatar</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Icon</code>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-4 flex items-center gap-2">
						<Badge variant="secondary">Utility</Badge>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Container Atoms</h3>
					<p class="text-muted-foreground mb-3 text-sm">Group and organize other components.</p>
					<div class="flex flex-wrap gap-2">
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Card</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Dialog</code>
						<code class="bg-muted text-foreground rounded px-2 py-1 text-xs">Popover</code>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- When to Use Atoms -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">When to Use Atoms</h2>
			<p class="text-muted-foreground">
				Atoms shine in specific scenarios. Here's when to reach for them.
			</p>
		</div>

		<div class="space-y-4">
			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Building Custom Components</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						Use atoms as the foundation for your own component library. They handle the complexity
						so you can focus on your unique design.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Need Full Control</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When pre-built components are too opinionated, atoms give you the power to build exactly
						what you need.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Accessibility is Critical</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						Atoms include proper ARIA attributes and keyboard handling. Build accessible UIs without
						the hassle.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Prototyping Rapidly</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						Quickly compose interfaces without fighting with pre-built component constraints.
					</p>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Atoms vs Components -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Atoms vs Full Components</h2>
			<p class="text-muted-foreground">
				Understanding the difference helps you choose the right tool.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">Atoms</span>
					</h3>
					<ul class="space-y-2 text-sm">
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Maximum flexibility</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Minimal bundle size</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>No styling constraints</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Compose freely</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">-</span>
							<span>More setup required</span>
						</li>
					</ul>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">Full Components</span>
					</h3>
					<ul class="space-y-2 text-sm">
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Ready to use</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Pre-styled</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Common patterns built-in</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">-</span>
							<span>Less flexible</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">-</span>
							<span>Larger bundle</span>
						</li>
					</ul>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Getting Started -->
	<section>
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Getting Started with Atoms</h2>
			<p class="text-muted-foreground">Ready to start building with atoms?</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Browse Atoms</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Explore all available atoms with examples and documentation.
					</p>
					<a
						href="/docs"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						View all atoms
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>

			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
							<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Learn More</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Understand the philosophy and architecture behind atoms.
					</p>
					<a
						href="/docs/philosophy"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						Read philosophy
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
