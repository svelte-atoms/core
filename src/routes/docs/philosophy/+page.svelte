<script lang="ts">
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Philosophy</h1>
		<p class="text-muted-foreground text-lg">
			Understanding the principles and architecture that make Svelte Atoms different.
		</p>
	</div>

	<!-- Core Principles -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Core Principles</h2>
			<p class="text-muted-foreground">
				Svelte Atoms is built on three fundamental principles that guide every design decision.
			</p>
		</div>

		<div class="space-y-6">
			<div class="border-border/50 rounded-lg border p-6">
				<div class="mb-4 flex items-start gap-4">
					<div class="text-primary mt-1 flex-shrink-0">
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
							<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold">Simplicity Over Complexity</h3>
						<p class="text-muted-foreground leading-relaxed">
							Components should be easy to understand and use. We avoid unnecessary abstractions and
							keep APIs minimal. If a component feels complicated, we've failed.
						</p>
					</div>
				</div>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<div class="mb-4 flex items-start gap-4">
					<div class="text-primary mt-1 flex-shrink-0">
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
					<div>
						<h3 class="mb-2 text-xl font-semibold">Composability First</h3>
						<p class="text-muted-foreground leading-relaxed">
							Small, focused components that work together. Build complex UIs by combining simple
							parts. Each component does one thing well and composes naturally with others.
						</p>
					</div>
				</div>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<div class="mb-4 flex items-start gap-4">
					<div class="text-primary mt-1 flex-shrink-0">
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
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold">Accessibility By Default</h3>
						<p class="text-muted-foreground leading-relaxed">
							Accessible components shouldn't be an afterthought. Every component includes proper
							ARIA attributes, keyboard navigation, and screen reader support out of the box.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Bond Architecture -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Bond Architecture</h2>
			<p class="text-muted-foreground">
				The Bond pattern is our approach to state management and component communication.
			</p>
		</div>

		<div class="border-border/50 mb-6 rounded-lg border p-6">
			<h3 class="mb-4 text-xl font-semibold">What is a Bond?</h3>
			<p class="text-muted-foreground mb-4 leading-relaxed">
				A Bond is a self-contained unit of state and behavior. It's like a mini store that lives
				inside a component tree, managing its own state and exposing methods to interact with it.
			</p>
			<div class="bg-muted/30 rounded-lg p-4">
				<pre class="text-sm leading-relaxed"><code class="text-foreground"
						>{`// Creating a Bond
const accordion = createAccordionBond({
  multiple: false,
  defaultValue: 'item-1'
});

// Using the Bond
<Accordion bond={accordion}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`}</code
					></pre>
			</div>
		</div>

		<div class="space-y-4">
			<div class="border-border/50 rounded-lg border p-5">
				<h4 class="mb-2 font-semibold">Encapsulation</h4>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Bonds keep component state isolated. No global stores, no prop drilling. State lives where
					it's needed.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h4 class="mb-2 font-semibold">Flexibility</h4>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Bonds can be created inside or outside components. Pass them as props, share them between
					components, or use them standalone.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h4 class="mb-2 font-semibold">Type Safety</h4>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Full TypeScript support with inferred types. Your IDE knows exactly what methods and
					properties are available.
				</p>
			</div>
		</div>
	</section>

	<!-- Why Svelte 5 -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Why Svelte 5?</h2>
			<p class="text-muted-foreground">
				Svelte 5's Runes API enables patterns that weren't possible before.
			</p>
		</div>

		<div class="border-border/50 rounded-lg border p-6">
			<div class="space-y-6">
				<div>
					<h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">$state</span>
						<span class="text-muted-foreground text-sm font-normal">Fine-grained reactivity</span>
					</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Reactive state that works anywhere - not just in components. This makes Bonds possible
						and enables true separation of concerns.
					</p>
				</div>

				<div>
					<h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">$derived</span>
						<span class="text-muted-foreground text-sm font-normal">Computed values</span>
					</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Automatically computed values that update when dependencies change. No manual tracking,
						no stale closures.
					</p>
				</div>

				<div>
					<h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">$effect</span>
						<span class="text-muted-foreground text-sm font-normal">Side effects</span>
					</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Declarative side effects that run when dependencies change. Perfect for syncing external
						state or DOM operations.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Customization Philosophy -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Customization Philosophy</h2>
			<p class="text-muted-foreground">
				We believe in giving you full control without sacrificing convenience.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-3 text-lg font-semibold">Style Your Way</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Components use Tailwind classes by default but accept any styling approach. Override with
					your own classes, use CSS modules, or style components however you prefer.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-3 text-lg font-semibold">Preset System</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Define global defaults for all components. Create variants, set default values, and
					customize base styles in one place. Your design system, your rules.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-3 text-lg font-semibold">Component Props</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Every component accepts standard HTML attributes plus its own props. No magic wrappers, no
					hidden behavior. What you see is what you get.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-3 text-lg font-semibold">Escape Hatches</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Need to break out? Access the Bond directly, override behavior, or fork a component. We
					don't lock you in.
				</p>
			</div>
		</div>
	</section>

	<!-- Design Goals -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Design Goals</h2>
			<p class="text-muted-foreground">What we optimize for when building Svelte Atoms.</p>
		</div>

		<div class="space-y-4">
			<div class="border-border/50 rounded-lg border p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="mb-1 font-semibold">Developer Experience</h3>
						<p class="text-muted-foreground text-sm">
							Clear APIs, great TypeScript support, helpful error messages, and comprehensive
							documentation.
						</p>
					</div>
					<div class="text-primary flex-shrink-0">
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
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</div>
				</div>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="mb-1 font-semibold">Performance</h3>
						<p class="text-muted-foreground text-sm">
							Minimal bundle size, lazy loading where possible, and leveraging Svelte's compiler for
							optimal output.
						</p>
					</div>
					<div class="text-primary flex-shrink-0">
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
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</div>
				</div>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="mb-1 font-semibold">User Experience</h3>
						<p class="text-muted-foreground text-sm">
							Smooth animations, responsive interactions, proper focus management, and accessible by
							default.
						</p>
					</div>
					<div class="text-primary flex-shrink-0">
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
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</div>
				</div>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="mb-1 font-semibold">Extensibility</h3>
						<p class="text-muted-foreground text-sm">
							Easy to extend, customize, and build upon. Your design system, not ours.
						</p>
					</div>
					<div class="text-primary flex-shrink-0">
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
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- What We're Not -->
	<section>
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">What We're Not</h2>
			<p class="text-muted-foreground">
				Being clear about what Svelte Atoms is not helps set the right expectations.
			</p>
		</div>

		<div class="space-y-4">
			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-2 font-semibold">Not a CSS Framework</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					We use Tailwind for styling but we're not trying to replace it. Bring your own styles if
					you prefer something else.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-2 font-semibold">Not Opinionated About State</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Bonds handle internal component state, but we don't force a global state management
					solution. Use what works for your app.
				</p>
			</div>

			<div class="border-border/50 rounded-lg border p-6">
				<h3 class="mb-2 font-semibold">Not a Complete Design System</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					We provide components and a preset system, but you define the design language. Svelte
					Atoms is a foundation, not a finished product.
				</p>
			</div>
		</div>
	</section>
</div>
