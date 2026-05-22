<script lang="ts">
	import { Scrollable } from '$lib/components/scrollable';

	const flights = [
		{ from: 'CDG', to: 'FCO', time: '08:15', gate: 'B12', duration: '2h 05m' },
		{ from: 'FCO', to: 'ATH', time: '11:40', gate: 'A03', duration: '1h 35m' },
		{ from: 'ATH', to: 'IST', time: '14:25', gate: 'C22', duration: '1h 25m' },
		{ from: 'IST', to: 'DXB', time: '18:10', gate: 'D08', duration: '4h 45m' },
		{ from: 'DXB', to: 'SIN', time: '23:55', gate: 'E17', duration: '7h 20m' },
		{ from: 'SIN', to: 'HND', time: '09:30', gate: 'A14', duration: '6h 45m' }
	];
</script>

<Scrollable.Root class="h-64 w-72 rounded-xl border border-border scale-50" orientation="vertical">
	<Scrollable.Container>
		<Scrollable.Content class="flex flex-col gap-3 p-3.5">
			{#each flights as flight (`${flight.from}-${flight.to}-${flight.time}`)}
				<article class="rounded-lg border border-border bg-surface p-3">
					<p class="text-xs text-muted-foreground">Boarding {flight.time}</p>
					<p class="mt-1 text-sm font-medium tracking-wide">{flight.from} -> {flight.to}</p>
					<div class="mt-2 flex items-center justify-between text-xs text-muted-foreground">
						<span>Gate {flight.gate}</span>
						<span>{flight.duration}</span>
					</div>
				</article>
			{/each}
		</Scrollable.Content>
	</Scrollable.Container>
	<Scrollable.Track orientation="vertical">
		<Scrollable.Thumb orientation="vertical" />
	</Scrollable.Track>
</Scrollable.Root>
