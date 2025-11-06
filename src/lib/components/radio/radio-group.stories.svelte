<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as RadioComponent } from './radio.svelte';
	import { default as RadioGroupComponent } from './radio-group.svelte';
	import { Root } from '$svelte-atoms/core/components/root/';

	const { Story } = defineMeta({
		title: 'ATOMS/Radio'
	});
</script>

<script>
	let value = $state('t1');
</script>

<Story name="Group">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<div class="flex h-full w-full flex-col items-center justify-center">
					<RadioGroupComponent class="gap-4" name="choice" bind:value>
						<label class="flex items-center gap-2">
							<RadioComponent class="size-8" value="t1" />
							<div>Test 1</div>
						</label>

						<label class="flex items-center gap-2">
							<RadioComponent class="size-8" value="t2" />
							<div>Test 2</div>
						</label>

						<label class="flex items-center gap-2">
							<RadioComponent class="size-8" value="t3" />
							<div>Test 3</div>
						</label>

						<label class="flex items-center gap-2">
							<RadioComponent class="size-8" value="t4" />
							<div>Test 4</div>
						</label>
					</RadioGroupComponent>

					<div class="mt-8">
						Selected value: <strong>{value}</strong>
					</div>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
