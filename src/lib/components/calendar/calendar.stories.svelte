<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Calendar as CalendarModule } from '.';

	const { Story } = defineMeta({
		title: 'Atoms/Calendar'
	});
</script>

<script>
	import { Root } from '../root';
</script>

<Story name="Calendar">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<div class="flex h-fit items-center justify-center">
					<CalendarModule.Root>
						<CalendarModule.Header></CalendarModule.Header>
						<CalendarModule.Body>
							{#snippet children({ day })}
								<CalendarModule.Day {day}></CalendarModule.Day>
							{/snippet}
						</CalendarModule.Body>
					</CalendarModule.Root>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
