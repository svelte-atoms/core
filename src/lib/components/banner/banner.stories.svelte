<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Banner'
	});
</script>

<script lang="ts">
	import { Banner } from '.';

	let open1 = $state(true);
	let open2 = $state(true);
	let open3 = $state(true);
</script>

<Story name="Announcement">
	{#snippet template()}
		<div class="relative h-32 w-full overflow-hidden">
			<Banner.Root position="inline" bind:open={open1} ondismiss={() => open1 = true}>
				<p class="text-sm">🎉 New release is out — <a href="#" class="underline font-medium">See what's new</a></p>
			</Banner.Root>
		</div>
	{/snippet}
</Story>

<Story name="With Actions">
	{#snippet template()}
		<Banner.Root position="inline" bind:open={open2} ondismiss={() => open2 = true}>
			<p class="text-sm flex-1">We use cookies to improve your experience.</p>
			<Banner.Actions>
				<button type="button" class="text-background/70 hover:text-background text-xs underline">
					Learn more
				</button>
				<button type="button" class="bg-background text-foreground rounded px-3 py-1 text-xs font-medium">
					Accept
				</button>
			</Banner.Actions>
		</Banner.Root>
	{/snippet}
</Story>

<Story name="Custom Close">
	{#snippet template()}
		<Banner.Root position="inline" bind:open={open3} dismissible={false} ondismiss={() => open3 = true}>
			<p class="text-sm flex-1">⚠️ Scheduled maintenance on March 12, 2–4 AM UTC.</p>
			<Banner.Actions>
				<Banner.Close>Got it</Banner.Close>
			</Banner.Actions>
		</Banner.Root>
	{/snippet}
</Story>

<Story name="Bottom">
	{#snippet template()}
		<div class="relative h-32">
			<Banner.Root position="inline">
				<p class="text-sm flex-1">📦 Your order has shipped and is on its way.</p>
			</Banner.Root>
		</div>
	{/snippet}
</Story>
