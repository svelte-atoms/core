<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Input } from '$lib/components/input';
	import { Label } from '$lib/components/label';
</script>

<div class="w-full max-w-40 flex flex-col gap-1.5 scale-80">
	<div class="flex flex-col gap-0.5">
		<Label class="text-[11px] font-medium leading-tight">Full name</Label>
		<Input.Root class="w-full h-7">
			<Input.TextControl placeholder="Jane Doe" class="px-2 text-xs" />
		</Input.Root>
	</div>
	<div class="flex flex-col gap-0.5">
		<Label class="text-[11px] font-medium leading-tight">Email</Label>
		<Input.Root class="w-full h-7">
			<Input.TextControl placeholder="jane@example.com" class="px-2 text-xs" />
		</Input.Root>
	</div>
	<Button size="sm" class="h-7 px-2 text-xs">Submit</Button>
</div>
