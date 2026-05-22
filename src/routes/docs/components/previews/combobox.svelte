<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import { Input } from '$lib/components/input';

	let comboVal = $state<string | undefined>();
</script>

<div class="w-44">
	<Combobox.Root bind:value={comboVal}>
		<Combobox.Trigger base={Input.Root}>
			<Combobox.Control placeholder="Pick a fruit..." />
		</Combobox.Trigger>
		<Combobox.Content class="border-border bg-background z-50 mt-1 rounded-lg border shadow-xl">
			<Combobox.Item value="apple">Apple</Combobox.Item>
			<Combobox.Item value="banana">Banana</Combobox.Item>
			<Combobox.Item value="cherry">Cherry</Combobox.Item>
		</Combobox.Content>
	</Combobox.Root>
</div>
