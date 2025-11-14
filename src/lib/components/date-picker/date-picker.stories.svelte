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
	import { addDays, set, subDays } from 'date-fns';
	import { date } from 'zod';

	let value: Date | undefined = $state(undefined);
</script>

<Story name="Date Picker">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<div class="flex h-fit items-center justify-center">
					<ADatePicker.Root bind:value min={subDays(new Date(), 5)} max={addDays(new Date(), 15)}>
						<ADatePicker.Trigger base={Button} class="w-sm gap-4">
							{#if value}
								<div>{value.toDateString()}</div>
							{:else}
								<div>Open Date Picker</div>
							{/if}

							<ADatePicker.Indicator class="ml-auto" />
						</ADatePicker.Trigger>
						<ADatePicker.Calendar>
							<ADatePicker.Header class="col-span-full"></ADatePicker.Header>
							<ADatePicker.WeekDays></ADatePicker.WeekDays>
							<ADatePicker.Body>
								{#snippet children({ day })}
									<ADatePicker.Day {day} class=""></ADatePicker.Day>
								{/snippet}
							</ADatePicker.Body>

							<ADatePicker.Years></ADatePicker.Years>
							<ADatePicker.Months></ADatePicker.Months>
						</ADatePicker.Calendar>
					</ADatePicker.Root>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
