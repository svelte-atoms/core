<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Atoms/Date Picker'
	});
</script>

<script lang="ts">
	import { Root } from '../root';
	import { DatePicker as ADatePicker } from '.';
	import { Button } from '../button';
	import { addDays, subDays } from 'date-fns';

	let value: Date | undefined = $state(undefined);

	let min = $state(subDays(new Date(), 5));
	let max = $state(addDays(new Date(), 15));
</script>

<Story name="Date Picker">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<div class="flex h-fit items-center justify-center">
					<ADatePicker.Root bind:value {min} {max}>
						<ADatePicker.Trigger base={Button} class="w-sm gap-4">
							{#if value}
								<div>{value.toDateString()}</div>
							{:else}
								<div>Open Date Picker</div>
							{/if}

							<ADatePicker.Indicator class="ml-auto" />
						</ADatePicker.Trigger>
						<ADatePicker.Calendar />
					</ADatePicker.Root>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
