<script lang="ts">
	import { Input } from '$lib/components/input';
	import { Select } from '$lib/components/select';

	let selectVal = $state<string | undefined>();
</script>

<div class="w-44">
	<Select.Root bind:value={selectVal}>
		<Select.Trigger base={Input.Root} class="w-full">
			<span class="text-sm {selectVal ? 'text-foreground' : 'text-muted-foreground'}">
				{selectVal ?? 'Select a plan...'}
			</span>
		</Select.Trigger>
		<Select.Content class="border-border bg-background z-50 mt-1 rounded-lg border shadow-xl">
			<Select.Item value="starter">Starter</Select.Item>
			<Select.Item value="pro">Pro</Select.Item>
			<Select.Item value="enterprise">Enterprise</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
