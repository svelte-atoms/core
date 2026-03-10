<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Duration from './atoms';

	const { Story } = defineMeta({
		title: 'ATOMS/Duration'
	});
</script>

<script lang="ts">
	import type { DurationValue } from './types';
	let value = $state<DurationValue | undefined>(undefined);
</script>

<Story name="Default">
	{#snippet template()}
		<Duration.Root bind:value class="flex flex-col gap-4 p-4">
			<div class="flex gap-4">
				<Duration.From label="Start" class="flex-1" />
				<Duration.To label="End" class="flex-1" />
			</div>
			<div class="text-sm text-muted-foreground">
				Duration: <span class="font-medium text-foreground"><Duration.Display /></span>
			</div>
		</Duration.Root>
	{/snippet}
</Story>

<Story name="Custom Format">
	{#snippet template()}
		<Duration.Root class="flex flex-col gap-4 p-4">
			<div class="flex gap-4">
				<Duration.From label="Start" class="flex-1" />
				<Duration.To label="End" class="flex-1" />
			</div>
			<div class="text-sm text-muted-foreground">
				<Duration.Display format="Y years, M months, D days" />
			</div>
			<div class="text-sm text-muted-foreground">
				<Duration.Display format="h:mm:ss" />
			</div>
		</Duration.Root>
	{/snippet}
</Story>

<Story name="Show Zero Units">
	{#snippet template()}
		<Duration.Root class="flex flex-col gap-4 p-4">
			<div class="flex gap-4">
				<Duration.From label="Start" class="flex-1" />
				<Duration.To label="End" class="flex-1" />
			</div>
			<Duration.Display showZero class="text-sm" />
		</Duration.Root>
	{/snippet}
</Story>
