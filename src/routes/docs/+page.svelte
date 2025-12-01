<script lang="ts">
	import { Section } from '$docs';
	import { Card } from '$lib/components/card';
	import { Badge } from '$lib/components/badge';
	import { Button } from '$lib/components/button';
	import { Stack } from '$lib/components/stack';

	const features = [
		{
			title: 'Atomic Design',
			description:
				'Build UIs from the ground up with composable atomic components that work seamlessly together.',
			icon: '⚛️',
			href: '/docs/atoms'
		},
		{
			title: 'Bond System',
			description:
				'Powerful state management and component communication through intelligent bonds.',
			icon: '🔗',
			href: '/docs/bonds'
		},
		{
			title: 'Preset System',
			description:
				'Global theming with hierarchical composition, variants, and reactive state support.',
			icon: '🎨',
			href: '/docs/preset'
		},
		{
			title: 'Type-Safe',
			description:
				'Full TypeScript support with comprehensive type definitions and intelligent inference.',
			icon: '📘',
			href: '/docs/quick-start'
		},
		{
			title: 'Accessible',
			description:
				'Built with accessibility in mind, following WAI-ARIA guidelines and best practices.',
			icon: '♿',
			href: '/docs/accessibility'
		},
		{
			title: 'Svelte 5 Runes',
			description: 'Leverages the latest Svelte 5 features with $state, $derived, and $effect.',
			icon: '⚡',
			href: '/docs/philosophy'
		}
	];

	const quickLinks = [
		{ title: 'Installation', href: '/docs/installation', badge: 'Start Here' },
		{ title: 'Quick Start', href: '/docs/quick-start', badge: 'Guide' },
		{ title: 'Components', href: '/docs/components/button', badge: '30+' },
		{ title: 'Philosophy', href: '/docs/philosophy', badge: 'Concepts' }
	];
</script>

<svelte:head>
	<title>Documentation - Svelte Atoms</title>
	<meta
		name="description"
		content="Complete documentation for Svelte Atoms - A modern component library for Svelte 5 with atomic design, bonds, and powerful theming."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="text-foreground mb-4 text-5xl font-bold tracking-tight">Welcome to Svelte Atoms</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-xl">
			A modern, composable component library for Svelte 5 built on atomic design principles with
			powerful theming and state management.
		</p>
		<div class="mt-8 flex items-center justify-center gap-4">
			<Button href="/docs/installation" as="a" class="h-11 px-8">Get Started</Button>
			<Button href="/docs/components/button" as="a" variant="outline" class="h-11 px-8">
				Browse Components
			</Button>
		</div>
	</div>

	<!-- Quick Links -->
	<Section title="Quick Links">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each quickLinks as link}
				<a href={link.href} class="group block">
					<Card.Root class="hover:border-primary transition-all hover:shadow-md">
						<Card.Header>
							<div class="flex items-center justify-between">
								<Card.Title class="group-hover:text-primary text-base">{link.title}</Card.Title>
								<Badge variant="secondary" class="text-xs">{link.badge}</Badge>
							</div>
						</Card.Header>
					</Card.Root>
				</a>
			{/each}
		</div>
	</Section>

	<!-- Features -->
	<Section title="Core Features" description="Everything you need to build modern web applications">
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<a href={feature.href} class="group block">
					<Card.Root class="hover:border-primary h-full transition-all hover:shadow-md">
						<Card.Header>
							<div class="mb-2 text-4xl">{feature.icon}</div>
							<Card.Title class="group-hover:text-primary">{feature.title}</Card.Title>
							<Card.Description>{feature.description}</Card.Description>
						</Card.Header>
					</Card.Root>
				</a>
			{/each}
		</div>
	</Section>

	<!-- Getting Started -->
	<Section title="Getting Started" description="Jump right in and start building">
		<div class="space-y-6">
			<Card.Root>
				<Card.Header>
					<Card.Title>1. Install the package</Card.Title>
				</Card.Header>
				<Card.Body>
					<div class="bg-muted rounded-lg p-4">
						<code class="text-sm">npm install @svelte-atoms/core</code>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>2. Import the stylesheet</Card.Title>
				</Card.Header>
				<Card.Body>
					<div class="space-y-3">
						<p class="text-muted-foreground text-sm">
							Import the internal stylesheet in your root layout to include base styles:
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-sm"><code
									>{`// +layout.svelte or app entry point
import '@svelte-atoms/core/tw';`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>3. Configure Tailwind CSS</Card.Title>
				</Card.Header>
				<Card.Body>
					<div class="space-y-4">
						<div>
							<p class="text-muted-foreground mb-2 text-sm font-medium">
								For Tailwind CSS v3:
							</p>
							<div class="bg-muted rounded-lg p-4">
								<pre class="text-sm"><code
										>{`// tailwind.config.js
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@svelte-atoms/core/dist/**/*.{js,svelte}'
  ],
  // ... rest of config
};`}</code
									></pre>
							</div>
						</div>

						<div>
							<p class="text-muted-foreground mb-2 text-sm font-medium">
								For Tailwind CSS v4:
							</p>
							<div class="bg-muted rounded-lg p-4">
								<pre class="text-sm"><code
										>{`/* app.css or main stylesheet */
@import 'tailwindcss';
@source './node_modules/@svelte-atoms/core/dist/**/*.{js,svelte}';`}</code
									></pre>
							</div>
						</div>

						<p class="text-muted-foreground text-xs">
							This ensures Tailwind includes all CSS utility classes used by the components.
						</p>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>4. Import and use components</Card.Title>
				</Card.Header>
				<Card.Body>
					<div class="bg-muted rounded-lg p-4">
						<pre class="text-sm"><code
								>{`<script>
  import { Button } from '@svelte-atoms/core/button';
</script>

<Button>Click me</Button>`}</code
							></pre>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>5. Customize with presets (optional)</Card.Title>
				</Card.Header>
				<Card.Body>
					<div class="bg-muted rounded-lg p-4">
						<pre class="text-sm"><code
								>{`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  button: () => ({
    class: 'rounded-lg px-4 py-2',
    variants: {
      variant: {
        primary: { class: 'bg-blue-500 text-white' }
      }
    }
  })
});`}</code
							></pre>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</Section>

	<!-- Why Svelte Atoms -->
	<Section title="Why Svelte Atoms?">
		<div class="prose prose-slate dark:prose-invert max-w-none">
			<div class="grid gap-6 md:grid-cols-2">
				<div>
					<h3 class="text-foreground">🎯 Built for Svelte 5</h3>
					<p class="text-muted-foreground">
						Designed from the ground up for Svelte 5's new paradigm with runes, snippets, and the
						latest features.
					</p>
				</div>

				<div>
					<h3 class="text-foreground">🧩 Truly Composable</h3>
					<p class="text-muted-foreground">
						Atomic design meets component composition. Build complex UIs from simple, reusable
						pieces.
					</p>
				</div>

				<div>
					<h3 class="text-foreground">🎨 Powerful Theming</h3>
					<p class="text-muted-foreground">
						Hierarchical preset system with deep merging, variants, and reactive state-based
						styling.
					</p>
				</div>

				<div>
					<h3 class="text-foreground">⚡ Performance First</h3>
					<p class="text-muted-foreground">
						Optimized with memoization, early exits, and Svelte's reactive system for minimal
						overhead.
					</p>
				</div>

				<div>
					<h3 class="text-foreground">♿ Accessible by Default</h3>
					<p class="text-muted-foreground">
						ARIA attributes, keyboard navigation, and screen reader support built into every
						component.
					</p>
				</div>

				<div>
					<h3 class="text-foreground">🛠️ Developer Experience</h3>
					<p class="text-muted-foreground">
						Full TypeScript support, comprehensive docs, and intuitive APIs that make development a
						joy.
					</p>
				</div>
			</div>
		</div>
	</Section>

	<!-- Next Steps -->
	<Section title="Next Steps">
		<Card.Root class="border-primary/50 bg-primary/5">
			<Card.Header>
				<Card.Title>Ready to dive deeper?</Card.Title>
				<Card.Description>
					Explore our comprehensive documentation to learn about atoms, bonds, styling, and more.
				</Card.Description>
			</Card.Header>
			<Card.Body class="flex flex-wrap gap-2">
				<Button href="/docs/philosophy" as="a" variant="outline">Learn the Philosophy</Button>
				<Button href="/docs/atoms" as="a" variant="outline">Understand Atoms</Button>
				<Button href="/docs/bonds" as="a" variant="outline">Master Bonds</Button>
				<Button href="/docs/preset" as="a" variant="outline">Explore Presets</Button>
			</Card.Body>
		</Card.Root>
	</Section>
</div>
