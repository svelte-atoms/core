<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Button } from '$lib/components/button';
</script>

<Card.Root class="w-80">
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Subtitle>Card subtitle</Card.Subtitle>
	</Card.Header>
	<Card.Body>
		<p class="text-sm">Main content goes here. This card has a header, body, and footer section.</p>
	</Card.Body>
	<Card.Footer class="gap-2">
		<Button size="sm">Action</Button>
		<Button variant="outline" size="sm">Cancel</Button>
	</Card.Footer>
</Card.Root>
