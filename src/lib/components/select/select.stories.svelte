<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Select as ASelect } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { flip } from 'svelte/animate';
	import { filterSelectData } from './runes.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Select',
		parameters: {
			layout: 'centered'
		},
		args: {}
	});
</script>

<script lang="ts">
	// --- Multi-select: assign team members ---
	const teamMembers = $state([
		{ id: 1, value: 'alice', label: '👩‍💻 Alice Chen' },
		{ id: 2, value: 'bob', label: '👨‍🎨 Bob Martinez' },
		{ id: 3, value: 'charlie', label: '👨‍🔬 Charlie Kim' },
		{ id: 4, value: 'diana', label: '👩‍🏫 Diana Ross' },
		{ id: 5, value: 'evan', label: '👨‍🚀 Evan Wright' },
		{ id: 6, value: 'fiona', label: '👩‍⚕️ Fiona Garcia' }
	]);

	const teamFilter = filterSelectData(
		() => teamMembers,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);

	// --- Single select: pick a country ---
	const countries = $state([
		{ id: 1, value: 'us', label: '🇺🇸 United States' },
		{ id: 2, value: 'uk', label: '🇬🇧 United Kingdom' },
		{ id: 3, value: 'de', label: '🇩🇪 Germany' },
		{ id: 4, value: 'fr', label: '🇫🇷 France' },
		{ id: 5, value: 'jp', label: '🇯🇵 Japan' },
		{ id: 6, value: 'br', label: '🇧🇷 Brazil' },
		{ id: 7, value: 'au', label: '🇦🇺 Australia' },
		{ id: 8, value: 'ca', label: '🇨🇦 Canada' }
	]);

	const countryFilter = filterSelectData(
		() => countries,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Story name="Select" args={{}}>
	<div class="flex flex-col gap-8 p-6" style="width: 420px;">
		<!-- Multi-select: Team members -->
		<div class="flex flex-col gap-2">
			<p class="text-foreground text-sm font-medium">Assign Team Members</p>
			<p class="text-muted-foreground text-xs">Select one or more people to assign to this task.</p>
			<ASelect.Root keys={teamMembers.map((m) => m.value)} multiple>
				{#snippet children({ select })}
					<ASelect.Trigger
						base={Input.Root}
						class="border-border flex h-auto min-h-11 w-full flex-col items-start gap-1 rounded-lg border px-3 py-2 transition-colors"
						onclick={(ev: MouseEvent) => {
							ev.preventDefault();
							select.state.open();
						}}
					>
						<input
							class="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
							placeholder="Search team members..."
							bind:value={teamFilter.query}
						/>
						<ASelect.Selections class="flex flex-wrap gap-1">
							{#snippet children({ selections })}
								{#each selections as selection (selection.id)}
									<div animate:flip={{ duration: 200 }}>
										<ASelect.Selection
											{selection}
											class="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
										/>
									</div>
								{/each}
							{/snippet}
						</ASelect.Selections>
					</ASelect.Trigger>

					<ASelect.Content class="border-border bg-popover max-h-60 overflow-auto rounded-lg border shadow-lg">
						{#each teamFilter.current as item (item.id)}
							<div animate:flip={{ duration: 200 }}>
								<ASelect.Item
									value={item.value}
									class="text-foreground hover:bg-foreground/5 cursor-pointer px-3 py-2 text-sm transition-colors"
								>
									{item.label}
								</ASelect.Item>
							</div>
						{/each}
						{#if teamFilter.current.length === 0}
							<div class="text-muted-foreground px-3 py-4 text-center text-sm">No members found</div>
						{/if}
					</ASelect.Content>
				{/snippet}
			</ASelect.Root>
		</div>

		<!-- Single select: Country picker with search in dropdown -->
		<div class="flex flex-col gap-2">
			<p class="text-foreground text-sm font-medium">Country</p>
			<p class="text-muted-foreground text-xs">Choose your country of residence.</p>
			<ASelect.Root keys={countries.map((c) => c.value)}>
				{#snippet children({ select })}
					<ASelect.Trigger
						base={Input.Root}
						class="border-border flex h-11 w-full items-center gap-2 rounded-lg border px-3 transition-colors"
						onclick={(ev: MouseEvent) => {
							ev.preventDefault();
							select.state.open();
						}}
					>
						<ASelect.Selections class="text-foreground flex flex-1 flex-wrap gap-1 text-sm">
							{#snippet children({ selections })}
								{#if selections.length === 0}
									<span class="text-muted-foreground">Select a country...</span>
								{/if}
								{#each selections as selection (selection.id)}
									<span>{selection.label}</span>
								{/each}
							{/snippet}
						</ASelect.Selections>
						<span class="text-muted-foreground text-xs">▼</span>
					</ASelect.Trigger>

					<ASelect.Content class="border-border bg-popover overflow-hidden rounded-lg border shadow-lg">
						<div class="border-border border-b px-3 py-2">
							<input
								bind:value={countryFilter.query}
								class="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
								placeholder="Search countries..."
							/>
						</div>
						<div class="max-h-48 overflow-auto">
							{#each countryFilter.current as item (item.id)}
								<div animate:flip={{ duration: 200 }}>
									<ASelect.Item
										value={item.value}
										class="text-foreground hover:bg-foreground/5 cursor-pointer px-3 py-2 text-sm transition-colors"
									>
										{item.label}
									</ASelect.Item>
								</div>
							{/each}
							{#if countryFilter.current.length === 0}
								<div class="text-muted-foreground px-3 py-4 text-center text-sm">No countries found</div>
							{/if}
						</div>
					</ASelect.Content>
				{/snippet}
			</ASelect.Root>
		</div>
	</div>
</Story>
