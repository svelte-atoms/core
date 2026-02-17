<script lang="ts">
	import { Icon } from '$svelte-atoms/core';
	import { Section } from '$docs/components';
	import LinkCard from '$docs/components/link-card.svelte';
	import { metadata } from './shared';
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">{metadata.pageTitle}</h1>
		<p class="text-muted-foreground text-lg">
			{metadata.pageDescription}
		</p>
	</div>

	<!-- What Are Atoms -->
	<Section.Root>
		<Section.Header>
			<Section.Title>What Are Atoms?</Section.Title>
			<Section.Subtitle>
				Atoms are the most primitive components in the library - simple, focused, and composable.
			</Section.Subtitle>
		</Section.Header>

		<Section.Content>
			{#each metadata.whatAreAtoms as paragraph}
				<p class="text-muted-foreground leading-relaxed">
					{paragraph}
				</p>
			{/each}
		</Section.Content>
	</Section.Root>

	<!-- Core Concepts -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Core Concepts</Section.Title>
			<Section.Subtitle>
				Understanding these concepts will help you get the most out of atoms.
			</Section.Subtitle>
		</Section.Header>

		<div class="space-y-6">
			{#each metadata.concepts as concept}
				<div class="border-border/50 rounded-lg border p-6">
					<div class="mb-3 flex items-center gap-3">
						<div class="text-primary">
							{#if concept.icon === 'circle'}
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
							{:else if concept.icon === 'grid'}
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
							{:else if concept.icon === 'layers'}
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
							{/if}
						</div>
						<h3 class="text-lg font-semibold">{concept.title}</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						{concept.description}
					</p>
				</div>
			{/each}
		</div>
	</Section.Root>

	<!-- Example: Atom Component -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Anatomy of an Atom</Section.Title>
			<Section.Subtitle>
				Let's look at how an atom works with a simple example.
			</Section.Subtitle>
		</Section.Header>

		<div class="bg-muted/30 rounded-lg p-4">
			<pre class="text-xs leading-relaxed"><code class="text-foreground"
					>{metadata.examples.anatomy}</code
				></pre>
		</div>

		<div class="border-border/50 rounded-lg border p-6">
			<h3 class="mb-3 text-lg font-semibold">Key Features</h3>
			<ul class="space-y-3">
				{#each metadata.anatomyExample.features as feature}
					<li class="flex gap-3">
						<Icon class="text-primary mt-1 shrink-0 size-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
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
						</Icon>
						<div>
							<p class="text-muted-foreground text-sm">
								<strong class="text-foreground">{feature.label}:</strong>
								{feature.description}
							</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</Section.Root>

	<!-- When to Use Atoms -->
	<Section.Root>
		<Section.Header>
			<Section.Title>When to Use Atoms</Section.Title>
			<Section.Subtitle>
				Atoms shine in specific scenarios. Here's when to reach for them.
			</Section.Subtitle>
		</Section.Header>

		<Section.Content>
			{#each metadata.whenToUse as useCase}
				<div class="border-border/50 rounded-lg border p-6">
					<div class="mb-2 flex items-center gap-2">
						<Icon class="text-primary size-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
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
						</Icon>
						<h3 class="font-semibold">{useCase.category}</h3>
					</div>
					<p class="text-muted-foreground text-sm {useCase.features ? 'mb-3' : ''}">
						{useCase.description}
					</p>
					{#if useCase.features}
						<ul class="text-muted-foreground space-y-1.5 text-sm">
							{#each useCase.features as feature}
								<li class="flex gap-2">
									<span class="text-primary">•</span>
									<span>{@html feature}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</Section.Content>
	</Section.Root>

	<!-- Atoms vs Components -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Atoms vs Full Components</Section.Title>
			<Section.Subtitle>
				Understanding the difference helps you choose the right tool.
			</Section.Subtitle>
		</Section.Header>

		<div class="grid gap-5 sm:grid-cols-2">
			{#each [metadata.atomsVsComponents.atoms, metadata.atomsVsComponents.components] as comparison}
				<div class="border-border/50 rounded-lg border p-6">
					<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
						<span class="text-primary">{comparison.title}</span>
					</h3>
					<ul class="space-y-2 text-sm">
						{#each comparison.features as feature}
							<li class="text-muted-foreground flex gap-2">
								<span class="text-primary">{feature.positive ? '+' : '-'}</span>
								<span>{feature.text}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</Section.Root>

	<!-- Getting Started -->
	<Section.Root class="mb-0">
		<Section.Header>
			<Section.Title>Getting Started with Atoms</Section.Title>
			<Section.Subtitle>Ready to start building with atoms?</Section.Subtitle>
		</Section.Header>

		<div class="grid gap-5 sm:grid-cols-2">
			{#each metadata.gettingStartedLinks as link}
				<LinkCard
					title={link.title}
					description={link.description}
					href={link.href}
					linkText={link.linkText}
				>
					{#snippet icon()}
						{#if link.icon === 'grid'}
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
						{:else if link.icon === 'book'}
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
						{/if}
					{/snippet}
				</LinkCard>
			{/each}
		</div>
	</Section.Root>
</div>