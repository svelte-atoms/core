<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Carousel'
	});
</script>

<script lang="ts">
	import { Carousel } from '.';

	const slides = [
		{ bg: 'bg-rose-100',   label: 'Slide 1', emoji: '🌸' },
		{ bg: 'bg-sky-100',    label: 'Slide 2', emoji: '🌊' },
		{ bg: 'bg-amber-100',  label: 'Slide 3', emoji: '🌻' },
		{ bg: 'bg-violet-100', label: 'Slide 4', emoji: '🦄' },
		{ bg: 'bg-emerald-100',label: 'Slide 5', emoji: '🌿' },
	];

	let current = $state(0);
</script>

<Story name="Default">
	{#snippet template()}
		<div class="w-full max-w-md space-y-3">
			<Carousel.Root bind:current class="w-full">
				<Carousel.Track class="rounded-xl">
					{#each slides as slide}
						<Carousel.Item>
							<div class={[slide.bg, 'flex h-48 flex-col items-center justify-center gap-2 rounded-xl'].join(' ')}>
								<span class="text-4xl">{slide.emoji}</span>
								<p class="text-sm font-medium">{slide.label}</p>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Track>
				<div class="mt-3 flex items-center justify-between">
					<Carousel.Prev />
					<Carousel.Dots />
					<Carousel.Next />
				</div>
			</Carousel.Root>
		</div>
	{/snippet}
</Story>

<Story name="Loop + Autoplay">
	{#snippet template()}
		<div class="w-full max-w-md space-y-3">
			<Carousel.Root loop autoplay={3000} class="w-full">
				<Carousel.Track class="rounded-xl">
					{#each slides as slide}
						<Carousel.Item>
							<div class={[slide.bg, 'flex h-48 items-center justify-center rounded-xl text-4xl'].join(' ')}>
								{slide.emoji}
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Track>
				<div class="mt-3 flex justify-center">
					<Carousel.Dots />
				</div>
			</Carousel.Root>
		</div>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template()}
		<div class="h-64 w-full max-w-md">
			<Carousel.Root orientation="vertical" class="h-full w-full">
				<Carousel.Track class="h-full rounded-xl">
					{#each slides as slide}
						<Carousel.Item class="h-full">
							<div class={[slide.bg, 'flex h-full items-center justify-center rounded-xl text-4xl'].join(' ')}>
								{slide.emoji}
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Track>
				<div class="mt-3 flex items-center justify-center gap-2">
					<Carousel.Prev />
					<Carousel.Dots />
					<Carousel.Next />
				</div>
			</Carousel.Root>
		</div>
	{/snippet}
</Story>

<Story name="Custom Dots">
	{#snippet template()}
		<div class="w-full max-w-md space-y-3">
			<Carousel.Root class="w-full">
				<Carousel.Track class="rounded-xl">
					{#each slides as slide}
						<Carousel.Item>
							<div class={[slide.bg, 'flex h-48 items-center justify-center rounded-xl text-4xl'].join(' ')}>
								{slide.emoji}
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Track>
				<div class="mt-3 flex justify-center">
					<Carousel.Dots>
						{#snippet dotContent({ index, active })}
							<span class={['text-xs transition-all', active ? 'font-bold' : 'opacity-40'].join(' ')}>
								{index + 1}
							</span>
						{/snippet}
					</Carousel.Dots>
				</div>
			</Carousel.Root>
		</div>
	{/snippet}
</Story>
