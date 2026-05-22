<script lang="ts">
	import { Select } from '$lib/components/select';
	import { Input } from '$lib/components/input';

	let singleValue = $state<string | undefined>();
</script>

<div class="w-48">
	<Select.Root bind:value={singleValue}>
		<Select.Trigger base={Input.Root}>
			<span>{singleValue ?? 'Select an option...'}</span>
		</Select.Trigger>
		<Select.Content class="border-border bg-background mt-1 rounded-lg border shadow-lg">
			<Select.Item value="apple">Apple</Select.Item>
			<Select.Item value="banana">Banana</Select.Item>
			<Select.Item value="cherry">Cherry</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
