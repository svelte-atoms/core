<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import AnimatedAtoms from './animated-atoms.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import FeatureCard from './feature-card.svelte';
	import { animate, createTimeline, stagger, text } from 'animejs';

	let darkMode = $state(false);

	onMount(() => {
		if (browser) {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = (e: MediaQueryListEvent) => {
				darkMode = e.matches;
			};

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	});

	const features = [
		{
			title: 'Lightning Fast Reactions',
			description:
				'Built with Svelte 5 runes for instant reactivity and atomic-level performance optimization.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			class:
				'from-palette-ion/15 to-palette-ion/5 hover:from-palette-ion/20 hover:from-palette-ion/20 border border-palette-ion/10',
			iconClass: 'bg-palette-ion/20'
		},
		{
			title: 'Accessible Fusion',
			description:
				'ARIA-compliant components that seamlessly fuse accessibility with modern interactions.',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
			class:
				'from-palette-energy/15 to-palette-energy/5 hover:from-palette-energy/20 border border-palette-energy/10',
			iconClass: 'bg-palette-energy/20'
		},
		{
			title: 'Atomic Modularity',
			description:
				'Each component is atomically independent and perfectly tree-shakable for optimal bundle size.',
			icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z',
			class:
				'from-palette-neutron/15 to-palette-neutron/5 hover:from-palette-neutron/20 border border-palette-neutron/10',
			iconClass: 'bg-palette-neutron/20'
		},
		{
			title: 'Fusion Customization',
			description:
				'Seamlessly fuse your design system with atomic-level control over every visual aspect.',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
			secondaryIcon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
			class:
				'from-palette-fusion/15 to-palette-fusion/5 hover:from-palette-fusion/20 border border-palette-fusion/10',
			iconClass: 'bg-palette-fusion/20'
		},
		{
			title: 'TypeScript Reactive',
			description:
				'First-class TypeScript support with reactive type inference for maximum developer productivity.',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
			class:
				'from-palette-steel/15 to-palette-steel/5 hover:from-palette-steel/20 border border-palette-steel/10',
			iconClass: 'bg-palette-steel/20'
		},
		{
			title: 'Developer Fusion',
			description:
				'Intuitive API that fuses simplicity with power, creating an exceptional developer experience.',
			icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
			class:
				'from-palette-plasma/15  to-palette-plasma/5 hover:from-palette-plasma/20 border border-palette-plasma/10',
			iconClass: 'bg-palette-plasma/20'
		}
	];
</script>

<svelte:head>
	<title>Atomic SV | Modern Svelte Component Library</title>
	<meta
		name="description"
		content="A modular, accessible, and extensible Svelte UI component library built with Svelte 5."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="mb-20 flex min-h-[900px] overflow-visible pt-40"
	{@attach (node) => {
		const h = window?.innerHeight;

		node.style.minHeight = `${Math.floor(h) * 0.9}px`;
	}}
>
	<div class="relative flex flex-1 items-center justify-center">
		<AnimatedAtoms />

		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-6xl dark:text-gray-100">
					Build <span
						class="bg-gradient-to-r from-palette-atomic via-palette-ion to-palette-neutron bg-clip-text text-transparent"
						{@attach (node) => {
							animate(node, {
								opacity: 1,
								filter: ['brightness(.5)', 'brightness(1.5)'],
								duration: 1000,
								loop: true,
								alternate: true
							});
						}}>Reactive UIs</span
					><br />
					with Atomic Fusion
				</h1>
				<p class="mx-auto mb-16 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
					Experience the fusion of reactive components with atomic precision. Built with <span
						class="text-palette-fusion"
						{@attach (node) => {
							animate(node, {
								opacity: 1,
								filter: ['brightness(.5)', 'brightness(1.5)'],
								duration: 1000,
								loop: true,
								alternate: true
							});
						}}>Svelte 5</span
					>
					runes for lightning-fast reactions and seamless user experiences.
				</p>
				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<a href="/getting-started">
						<Button
							class="animate-pulse-glow hover:proton transform bg-gradient-to-r from-palette-ion to-palette-neutron/50 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-400 hover:scale-105 hover:to-palette-neutron/80 hover:shadow-xl"
						>
							Get Started
						</Button>
					</a>
					<a href="/components">
						<Button
							class="dark:hover:palette-quantum/20 transform border border-palette-photon/50 bg-gradient-to-r from-palette-energy/10 to-red-500/10 px-8 py-3 text-lg font-medium text-palette-photon transition-all duration-200 hover:scale-105 hover:bg-orange-50 dark:border-palette-photon/50 dark:bg-gradient-to-r dark:from-palette-energy/10 dark:to-palette-energy/20 dark:text-palette-photon"
						>
							View Components
						</Button>
					</a>
				</div>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Badge
						class="transform bg-palette-energy/10 px-3 py-1 text-palette-energy transition-transform hover:scale-105"
						>Svelte 5 Ready</Badge
					>

					<Badge
						class="transform bg-palette-energy/10 px-3 py-1 text-palette-energy transition-transform hover:scale-105"
						>TypeScript</Badge
					>

					<Badge
						class="transform bg-palette-energy/10 px-3 py-1 text-palette-energy transition-transform hover:scale-105"
						>Accessible</Badge
					>

					<Badge
						class="transform bg-palette-energy/10 px-3 py-1 text-palette-energy transition-transform hover:scale-105 "
						>Reactive</Badge
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
				Why Choose Atomic Fusion?
			</h2>
			<p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
				Experience the perfect reaction between performance and developer experience
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</section>

<!-- Quick Start Section -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
				Start Your Fusion in Minutes
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-300">
				Ignite atomic reactions in your project with reactive components
			</p>
		</div>

		<div class="mx-auto max-w-4xl">
			<div class="overflow-hidden rounded-2xl bg-palette-graphite/50 shadow-xl">
				<div class="flex items-center justify-between px-6 py-4">
					<div class="flex space-x-2">
						<div class="h-3 w-3 rounded-full bg-red-500"></div>
						<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
						<div class="h-3 w-3 rounded-full bg-green-500"></div>
					</div>
					<div class="text-sm text-palette-black">Installation</div>
				</div>
				<div class="p-6">
					<div class="space-y-4">
						<div>
							<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
								1. Install the package
							</h3>
							<div class="rounded-lg bg-palette-carbon/50 p-4 font-mono text-sm">
								<span class="text-gray-500 dark:text-gray-400">$</span>
								<span class="text-orange-600 dark:text-orange-400">npm install</span> atomic-sv
							</div>
						</div>

						<div>
							<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
								2. Import and use components
							</h3>
							<div class="rounded-lg bg-palette-carbon/50 p-4 font-mono text-sm">
								<div class="text-blue-600 dark:text-red-400">&lt;script&gt;</div>
								<div class="ml-4 text-gray-700 dark:text-gray-300">
									import {'{'} Button {'}'} from 'atomic-sv/button';
								</div>
								<div class="text-blue-600 dark:text-red-400">&lt;/script&gt;</div>
								<br />
								<div class="text-blue-600 dark:text-red-400">&lt;Button&gt;</div>
								<div class="ml-4 text-gray-700 dark:text-gray-300">React instantly!</div>
								<div class="text-blue-600 dark:text-red-400">&lt;/Button&gt;</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-12 text-center">
			<a href="/getting-started">
				<Button
					class="transform bg-gradient-to-r from-palette-ion to-palette-neutron/50 px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-palette-ion hover:to-palette-neutron/80"
				>
					View Full Documentation
				</Button>
			</a>
		</div>
	</div>
</section>

<!-- Component Preview Section -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
				Reactive Component Gallery
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-300">
				Experience the fusion of beauty and functionality
			</p>
		</div>

		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
					Atomic Component Library
				</h3>
				<p class="mb-6 text-gray-600 dark:text-gray-300">
					From reactive buttons to dynamic data grids, each component creates perfect atomic
					reactions. Designed for instant fusion with your existing systems.
				</p>
				<ul class="space-y-3">
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
						<span class="text-gray-700 dark:text-gray-300"
							>Reactive Forms (Button, Input, Checkbox, etc.)</span
						>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-red-500"></div>
						<span class="text-gray-700 dark:text-gray-300"
							>Fusion Navigation (Menu, Breadcrumb, Tabs)</span
						>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-emerald-500"></div>
						<span class="text-gray-700 dark:text-gray-300">Dynamic Data (DataGrid, List, Tree)</span
						>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-pink-500"></div>
						<span class="text-gray-700 dark:text-gray-300"
							>Floating Elements (Dialog, Tooltip, Popover)</span
						>
					</li>
				</ul>
			</div>

			<div
				class="rounded-2xl border border-gray-200 bg-gradient-to-br from-orange-50/50 to-pink-50/50 p-8 dark:border dark:border-gray-800 dark:bg-gradient-to-br dark:from-orange-900/10 dark:to-pink-900/10"
			>
				<div class="space-y-6">
					<div class="flex flex-wrap items-center gap-2 space-x-4">
						<Button
							class="bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
						>
							Primary
						</Button>
						<Button
							class="border border-orange-500 px-4 py-2 text-orange-600 transition-colors hover:bg-orange-50 dark:border dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
						>
							Secondary
						</Button>
						<Button
							class="bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
						>
							Neutral
						</Button>
					</div>

					<div class="flex flex-wrap items-center gap-2 space-x-2">
						<Badge
							class="bg-orange-100 px-2 py-1 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
							>Reactive</Badge
						>
						<Badge
							class="bg-emerald-100 px-2 py-1 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
							>Fusion</Badge
						>
						<Badge class="bg-red-100 px-2 py-1 text-red-800 dark:bg-red-900/50 dark:text-red-300"
							>Atomic</Badge
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
