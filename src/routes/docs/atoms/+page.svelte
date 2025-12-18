<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';
	import LinkCard from '$docs/components/link-card.svelte';
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
	<section class="mb-16 flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">What Are Atoms?</h2>
			<p class="text-muted-foreground text-sm">
				Atoms are the most primitive components in the library - simple, focused, and composable.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			<p class="text-muted-foreground leading-relaxed">
				In chemistry, atoms are the basic units that combine to form molecules. In Svelte Atoms, the
				same principle applies: atoms are the fundamental components that combine to create more
				complex UI patterns.
			</p>
			<p class="text-muted-foreground leading-relaxed">
				Unlike traditional component libraries that provide fully-featured components, atoms give
				you the raw building blocks. They handle the hard parts (accessibility, keyboard navigation,
				state management) while giving you complete control over structure and styling.
			</p>
		</div>
	</section>

	<!-- Core Concepts -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">Core Concepts</h2>
			<p class="text-muted-foreground text-sm">
				Understanding these concepts will help you get the most out of atoms.
			</p>
		</div>

		<div class="space-y-6">
			<Card.Root class="">
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

			<Card.Root class="">
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

			<Card.Root class="">
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
	<section class="mb-16 flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">Anatomy of an Atom</h2>
			<p class="text-muted-foreground text-sm">
				Let's look at how an atom works with a simple example.
			</p>
		</div>

		<div class="bg-muted rounded-lg p-4">
			<pre class="text-xs leading-relaxed"><code class="text-foreground"
					>{`<script lang="ts">
  import { HtmlAtom as Atom, defineVariants } from '@svelte-atoms/core';
  

  let { ...restProps } = $props();

  // Define component local variants
  const variants = defineVariants({
	variants: {
	  variant: {
		'primary': {
			class: '',
			// Primary variant configuration goes here
		},
		'secondary': {
			class: '',
			// Secondary variant configuration goes here
		}
	 }
	},
	compounds: [],
	defaults: {
		variant: 'primary'
	}
  });
</script>

<Atom
  preset="custom-preset"
  as="button"
  base={undefined}
  {variants}
  class="px-4 py-2 rounded bg-blue-500 text-white"
  onclick={() => console.log('clicked')}
>
  Click me
</Atom>

<!-- Renders as: -->
<button class="px-4 py-2 rounded bg-blue-500 text-white">
  Click me
</button>
<!-- plus configuration defined in the preset, so the output may look different -->`}</code
				></pre>
		</div>

		<Card.Root class="">
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

	<!-- When to Use Atoms -->
	<section class="mb-16 flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">When to Use Atoms</h2>
			<p class="text-muted-foreground text-sm">
				Atoms shine in specific scenarios. Here's when to reach for them.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			<Card.Root class="">
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
					<p class="text-muted-foreground mb-3 text-sm">
						Use atoms as the foundation for your own component library. Atoms provide powerful
						features that make building custom components easier:
					</p>
					<ul class="text-muted-foreground space-y-1.5 text-sm">
						<li class="flex gap-2">
							<span class="text-primary">•</span>
							<span
								><strong class="text-foreground">Preset configuration</strong> for consistent styling
								across your app</span
							>
						</li>
						<li class="flex gap-2">
							<span class="text-primary">•</span>
							<span
								><strong class="text-foreground">Animation lifecycles</strong> for smooth transitions
								and effects</span
							>
						</li>
						<li class="flex gap-2">
							<span class="text-primary">•</span>
							<span
								><strong class="text-foreground">Base/as props</strong> for polymorphic rendering and
								flexible composition</span
							>
						</li>
					</ul>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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

			<Card.Root class="">
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
	<section class="mb-16 flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">Atoms vs Full Components</h2>
			<p class="text-muted-foreground text-sm">
				Understanding the difference helps you choose the right tool.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root class="">
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
							<span>Preset configuration system</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Animation lifecycles built-in</span>
						</li>
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">+</span>
							<span>Polymorphic (base/as props)</span>
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
							<span class="text-primary">-</span>
							<span>More setup required</span>
						</li>
					</ul>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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
						<li class="text-muted-foreground flex gap-2">
							<span class="text-primary">-</span>
							<span>Fixed styling approach</span>
						</li>
					</ul>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Getting Started -->
	<section class="flex flex-col gap-4">
		<div class="mb-4 flex flex-col gap-1">
			<h2 class="text-3xl font-bold">Getting Started with Atoms</h2>
			<p class="text-muted-foreground text-sm">Ready to start building with atoms?</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<LinkCard
				title="Browse Atoms"
				description="Explore all available atoms with examples and documentation."
				href="/docs"
				linkText="View all atoms"
			>
				{#snippet icon()}
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
				{/snippet}
			</LinkCard>

			<LinkCard
				title="Learn More"
				description="Understand the philosophy and architecture behind atoms."
				href="/docs/philosophy"
				linkText="Read philosophy"
			>
				{#snippet icon()}
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
				{/snippet}
			</LinkCard>
		</div>
	</section>
</div>
