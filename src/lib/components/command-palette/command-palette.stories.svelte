<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/CommandPalette'
	});
</script>

<script lang="ts">
	import { CommandPalette } from '.';
	import { Shortcut } from '../kbd';

	let open = $state(false);
	let query = $state('');

	const all = [
		{ group: 'Pages',    items: [{ label: 'Home',     icon: '🏠', shortcut: ['G', 'H'] }, { label: 'Settings', icon: '⚙️', shortcut: ['G', 'S'] }, { label: 'Profile', icon: '👤', shortcut: ['G', 'P'] }] },
		{ group: 'Actions',  items: [{ label: 'New File', icon: '📄', shortcut: ['⌘', 'N'] }, { label: 'Save',     icon: '💾', shortcut: ['⌘', 'S'] }, { label: 'Search',  icon: '🔍', shortcut: ['⌘', 'K'] }] },
		{ group: 'Theme',    items: [{ label: 'Light Mode', icon: '☀️', shortcut: [] }, { label: 'Dark Mode', icon: '🌙', shortcut: [] }] },
	];

	const filtered = $derived(
		query.trim()
			? all.map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) })).filter((g) => g.items.length)
			: all
	);

	const hasResults = $derived(filtered.some((g) => g.items.length));
</script>

<Story name="Default">
	{#snippet template()}
		<div>
			<button
				type="button"
				onclick={() => open = true}
				class="border-border text-muted-foreground flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
			>
				<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
					<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/>
					<path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<span>Search commands…</span>
				<Shortcut keys={['⌘', 'K']} class="ml-4" />
			</button>

			<CommandPalette.Root bind:open bind:query>
				<CommandPalette.Content class="w-full max-w-lg p-0">
					<CommandPalette.Input />
					<CommandPalette.List>
						{#if hasResults}
							{#each filtered as group}
								<CommandPalette.Group label={group.group}>
									{#each group.items as item}
										<CommandPalette.Item
											value={item.label}
											onselect={() => { console.log('selected', item.label); open = false; }}
										>
											{#snippet iconContent()}{item.icon}{/snippet}
											{item.label}
											{#snippet suffixContent()}
												{#if item.shortcut.length}
													<Shortcut keys={item.shortcut} />
												{/if}
											{/snippet}
										</CommandPalette.Item>
									{/each}
								</CommandPalette.Group>
							{/each}
						{:else}
							<CommandPalette.Empty />
						{/if}
					</CommandPalette.List>
				</CommandPalette.Content>
			</CommandPalette.Root>
		</div>
	{/snippet}
</Story>
