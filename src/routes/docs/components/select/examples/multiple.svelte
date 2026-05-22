<script lang="ts">
	import { Select } from '$lib/components/select';
	import { Input } from '$lib/components/input';

	let multiValues = $state<string[]>([]);
</script>

<div class="w-64">
	<Select.Root bind:values={multiValues} multiple>
		<Select.Trigger base={Input.Root} class="flex h-auto min-h-10 flex-wrap items-start gap-1">
			<Select.Selections class="flex flex-wrap gap-1" />
			<Select.Placeholder>Choose fruits...</Select.Placeholder>
		</Select.Trigger>
		<Select.Content class="border-border bg-background mt-1 rounded-lg border shadow-lg">
			<Select.Item value="apple">Apple</Select.Item>
			<Select.Item value="banana">Banana</Select.Item>
			<Select.Item value="cherry">Cherry</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
