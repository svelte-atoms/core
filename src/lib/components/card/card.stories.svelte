<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Atoms/Card',
		args: {}
	});
</script>

<script lang="ts">
	import { Card } from '.';
	import { Root } from '$svelte-atoms/core/components/root';
	import gsap from 'gsap';
</script>

<!-- Default Card -->
<Story name="Default">
	<Root>
		<Card.Root class="max-w-sm">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description
					>This is a card description that provides additional context.</Card.Description
				>
			</Card.Header>
			<Card.Body>
				<p>
					This is the main content area of the card. You can put any content here including text,
					images, or other components.
				</p>
			</Card.Body>
			<Card.Footer>
				<button
					class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 active:bg-blue-700"
					>Action</button
				>
				<button
					class="border-border hover:bg-foreground/5 active:bg-foreground/10 rounded border px-3 py-1 text-sm"
					>Cancel</button
				>
			</Card.Footer>
		</Card.Root>
	</Root>
</Story>

<!-- Card with Media -->
<Story name="With Media">
	<Root>
		<Card.Root class="max-w-sm">
			<Card.Media>
				<img
					src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
					alt="Beautiful landscape"
					class="h-48 w-full object-cover"
				/>
			</Card.Media>
			<Card.Header>
				<Card.Title>Beautiful Landscape</Card.Title>
				<Card.Subtitle>Photography</Card.Subtitle>
			</Card.Header>
			<Card.Body>
				<p>A stunning landscape photograph capturing the beauty of nature.</p>
			</Card.Body>
			<Card.Footer>
				<span class="text-sm text-gray-500">Posted 2 hours ago</span>
			</Card.Footer>
		</Card.Root>
	</Root>
</Story>

<!-- Clickable Card -->
<Story name="Clickable">
	<Root>
		<Card.Root
			class="hover:bg-card/90 active:bg-card/80 max-w-sm cursor-pointer pb-4"
			onclick={() => alert('Card clicked!')}
		>
			<Card.Header>
				<Card.Title>Clickable Card</Card.Title>
				<Card.Description
					>This card is clickable and will show an alert when clicked.</Card.Description
				>
			</Card.Header>
			<Card.Body>
				<p>Click anywhere on this card to trigger the action.</p>
			</Card.Body>
		</Card.Root>
	</Root>
</Story>

<!-- Card Variants -->
<Story name="Variants">
	<Root>
		<div class="grid grid-cols-2 gap-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Default Card</Card.Title>
					<Card.Description>Default variant with border and shadow.</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root class="bg-transparent shadow-none">
				<Card.Header>
					<Card.Title>Outlined Card</Card.Title>
					<Card.Description>Outlined variant with border only.</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root class="shadow-lg">
				<Card.Header>
					<Card.Title>Elevated Card</Card.Title>
					<Card.Description>Elevated variant with enhanced shadow.</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root class="bg-background border-none">
				<Card.Header>
					<Card.Title>Filled Card</Card.Title>
					<Card.Description>Filled variant with background color.</Card.Description>
				</Card.Header>
			</Card.Root>
		</div>
	</Root>
</Story>

<!-- Disabled Card -->
<Story
	name="Disabled"
	args={{
		clickable: true,
		disabled: true
	}}
>
	<Root>
		<Card.Root class="max-w-sm pb-4 opacity-50">
			<Card.Header>
				<Card.Title>Disabled Card</Card.Title>
				<Card.Description>This card is disabled and cannot be interacted with.</Card.Description>
			</Card.Header>
			<Card.Body>
				<p>The card appears dimmed and is not clickable.</p>
			</Card.Body>
		</Card.Root>
	</Root>
</Story>
