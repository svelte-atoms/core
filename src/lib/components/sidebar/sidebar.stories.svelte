<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Sidebar as Sidebar_, animateSidebarContent } from '.';

	const { Story } = defineMeta({
		title: 'Atoms/Sidebar',
		parameters: {
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let isOpen = $state(true);

	const navSections = [
		{
			title: 'Overview',
			items: [
				{ icon: '🏠', label: 'Dashboard', active: true },
				{ icon: '📊', label: 'Analytics', active: false },
				{ icon: '📋', label: 'Projects', active: false }
			]
		},
		{
			title: 'Management',
			items: [
				{ icon: '👥', label: 'Team Members', active: false },
				{ icon: '📁', label: 'Documents', active: false },
				{ icon: '⚙️', label: 'Settings', active: false }
			]
		},
		{
			title: 'Support',
			items: [
				{ icon: '💬', label: 'Messages', active: false },
				{ icon: '🔔', label: 'Notifications', active: false }
			]
		}
	];

	let activeItem = $state('Dashboard');
</script>

<Story name="Sidebar" args={{}}>
	<Sidebar_.Root bind:open={isOpen}>
		{#snippet children({ sidebar })}
			<div class="flex h-150 w-full">
				<Sidebar_.Content
					class="bg-card border-border flex flex-col border-r whitespace-nowrap"
					{@attach animateSidebarContent({ axis: 'x', 0: '56px', 1: '260px' })}
				>
					<!-- Logo & Toggle -->
					<div class="border-border flex h-14 items-center gap-3 border-b px-4">
						{#if isOpen}
							<span class="text-lg font-bold tracking-tight">Atoms UI</span>
							<button
								class="text-muted-foreground hover:text-foreground ml-auto rounded p-1 transition-colors"
								onclick={() => sidebar.state.toggle()}
							>
								✕
							</button>
						{:else}
							<button
								class="text-muted-foreground hover:text-foreground mx-auto rounded p-1 transition-colors"
								onclick={() => sidebar.state.toggle()}
							>
								☰
							</button>
						{/if}
					</div>

					<!-- Navigation -->
					<nav class="flex-1 overflow-y-auto py-3">
						{#each navSections as section (section.title)}
							{#if isOpen}
								<p class="text-muted-foreground mb-1 mt-4 px-4 text-xs font-semibold uppercase tracking-wider first:mt-0">
									{section.title}
								</p>
							{/if}
							{#each section.items as item (item.label)}
								<button
									class={[
										'flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors',
										activeItem === item.label
											? 'bg-primary/10 text-primary font-medium'
											: 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
									]}
									onclick={() => (activeItem = item.label)}
									title={item.label}
								>
									<span class="text-base">{item.icon}</span>
									{#if isOpen}
										<span>{item.label}</span>
									{/if}
								</button>
							{/each}
						{/each}
					</nav>

					<!-- User -->
					<div class="border-border border-t px-4 py-3">
						<div class="flex items-center gap-3">
							<div class="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
								JD
							</div>
							{#if isOpen}
								<div class="min-w-0 flex-1">
									<p class="text-foreground truncate text-sm font-medium">Jane Doe</p>
									<p class="text-muted-foreground truncate text-xs">jane@example.com</p>
								</div>
							{/if}
						</div>
					</div>
				</Sidebar_.Content>

				<!-- Main Content -->
				<main class="bg-background flex-1 overflow-auto p-8">
					<h1 class="text-foreground mb-1 text-2xl font-bold">{activeItem}</h1>
					<p class="text-muted-foreground mb-6 text-sm">Welcome back, Jane. Here's what's happening.</p>

					<div class="grid grid-cols-3 gap-4">
						{#each [
							{ title: 'Total Users', value: '2,841', change: '+12.5%' },
							{ title: 'Revenue', value: '$45,231', change: '+8.2%' },
							{ title: 'Active Projects', value: '12', change: '+2' }
						] as stat (stat.title)}
							<div class="border-border bg-card rounded-lg border p-4">
								<p class="text-muted-foreground text-xs font-medium">{stat.title}</p>
								<p class="text-foreground mt-1 text-2xl font-bold">{stat.value}</p>
								<p class="mt-1 text-xs text-green-500">{stat.change}</p>
							</div>
						{/each}
					</div>
				</main>
			</div>
		{/snippet}
	</Sidebar_.Root>
</Story>
