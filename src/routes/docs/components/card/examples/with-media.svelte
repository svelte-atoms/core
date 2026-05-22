<script lang="ts">
	import { Card } from '$lib/components/card';
</script>

<Card.Root class="w-80 overflow-hidden rounded-lg border">
	<Card.Media>
		<img src="https://picsum.photos/320/160?grayscale" alt="Card visual" class="w-full" />
	</Card.Media>
	<Card.Header>
		<Card.Title>Media Card</Card.Title>
		<Card.Description>Card with an image media section.</Card.Description>
	</Card.Header>
	<Card.Body>
		<p class="text-sm">Card body content after the media section.</p>
	</Card.Body>
</Card.Root>
