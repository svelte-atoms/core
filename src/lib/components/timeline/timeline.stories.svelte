<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Timeline'
	});
</script>

<script lang="ts">
	import { Timeline } from '.';
</script>

<Story name="Vertical (default)">
	{#snippet template()}
		<Timeline.Root class="w-72">
			<Timeline.Item completed>
				<p class="text-sm font-medium">Order placed</p>
				<p class="text-muted-foreground text-xs">March 9, 10:00 AM</p>
			</Timeline.Item>
			<Timeline.Item completed>
				<p class="text-sm font-medium">Payment confirmed</p>
				<p class="text-muted-foreground text-xs">March 9, 10:05 AM</p>
			</Timeline.Item>
			<Timeline.Item active>
				<p class="text-sm font-medium">Preparing shipment</p>
				<p class="text-muted-foreground text-xs">In progress</p>
			</Timeline.Item>
			<Timeline.Item>
				<p class="text-sm font-medium">Out for delivery</p>
				<p class="text-muted-foreground text-xs">Pending</p>
			</Timeline.Item>
			<Timeline.Item>
				<p class="text-sm font-medium">Delivered</p>
				<p class="text-muted-foreground text-xs">Pending</p>
			</Timeline.Item>
		</Timeline.Root>
	{/snippet}
</Story>

<Story name="Alternate">
	{#snippet template()}
		<Timeline.Root align="alternate" class="w-[480px]">
			<Timeline.Item completed>
				{#snippet oppositeContent()}
					<span class="text-muted-foreground text-xs">10:00 AM</span>
				{/snippet}
				<p class="text-sm font-medium">Project kickoff</p>
				<p class="text-muted-foreground text-xs">Team assembled</p>
			</Timeline.Item>
			<Timeline.Item completed>
				{#snippet oppositeContent()}
					<span class="text-muted-foreground text-xs">11:30 AM</span>
				{/snippet}
				<p class="text-sm font-medium">Design review</p>
				<p class="text-muted-foreground text-xs">Wireframes approved</p>
			</Timeline.Item>
			<Timeline.Item active>
				{#snippet oppositeContent()}
					<span class="text-muted-foreground text-xs">2:00 PM</span>
				{/snippet}
				<p class="text-sm font-medium">Development</p>
				<p class="text-muted-foreground text-xs">Sprint 1 in progress</p>
			</Timeline.Item>
			<Timeline.Item>
				{#snippet oppositeContent()}
					<span class="text-muted-foreground text-xs">TBD</span>
				{/snippet}
				<p class="text-sm font-medium">QA & Testing</p>
			</Timeline.Item>
		</Timeline.Root>
	{/snippet}
</Story>

<Story name="Horizontal">
	{#snippet template()}
		<Timeline.Root orientation="horizontal" class="w-full">
			<Timeline.Item completed>
				<p class="text-xs font-medium">Cart</p>
			</Timeline.Item>
			<Timeline.Item completed>
				<p class="text-xs font-medium">Shipping</p>
			</Timeline.Item>
			<Timeline.Item active>
				<p class="text-xs font-medium">Payment</p>
			</Timeline.Item>
			<Timeline.Item>
				<p class="text-xs font-medium">Review</p>
			</Timeline.Item>
			<Timeline.Item>
				<p class="text-xs font-medium">Confirm</p>
			</Timeline.Item>
		</Timeline.Root>
	{/snippet}
</Story>

<Story name="Custom Dot">
	{#snippet template()}
		<Timeline.Root class="w-72">
			<Timeline.Item completed>
				{#snippet dotContent({ completed })}
					<span class={['flex h-6 w-6 items-center justify-center rounded-full text-xs', completed ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'].join(' ')}>
						✓
					</span>
				{/snippet}
				<p class="text-sm font-medium">Account created</p>
			</Timeline.Item>
			<Timeline.Item active>
				{#snippet dotContent()}
					<span class="bg-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs">
						⚡
					</span>
				{/snippet}
				<p class="text-sm font-medium">Email verified</p>
			</Timeline.Item>
			<Timeline.Item>
				{#snippet dotContent()}
					<span class="bg-muted flex h-6 w-6 items-center justify-center rounded-full text-xs">
						3
					</span>
				{/snippet}
				<p class="text-sm font-medium">Profile complete</p>
			</Timeline.Item>
		</Timeline.Root>
	{/snippet}
</Story>
