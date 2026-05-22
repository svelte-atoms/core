<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
</script>

<div class="scale-60 origin-center">
	<Card.Root class="w-52 p-0">
		<Card.Header class="py-2">
			<Card.Title class="text-sm">Pro Plan</Card.Title>
			<Card.Subtitle class="text-xs">$12 / month</Card.Subtitle>
		</Card.Header>
		<Card.Body class="py-2 text-xs text-muted-foreground">
			Unlimited projects and collaborators.
		</Card.Body>
		<Card.Footer class="py-2 gap-2">
			<Button size="sm" class="h-7 text-xs">Upgrade</Button>
			<Button variant="ghost" size="sm" class="h-7 text-xs">Learn more</Button>
		</Card.Footer>
	</Card.Root>
</div>
