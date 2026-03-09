<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as ColorPicker from './atoms';

	const { Story } = defineMeta({
		title: 'ATOMS/ColorPicker'
	});
</script>

<script>
	let value = $state('#3b82f6');

	const swatches = [
		'#ef4444', '#f97316', '#eab308', '#22c55e',
		'#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
		'#000000', '#6b7280', '#d1d5db', '#ffffff'
	];
</script>

<!-- Full-featured: trigger opens popover with all parts -->
<Story name="Default">
	{#snippet children()}
		<div class="flex items-center gap-3">
			<ColorPicker.Root bind:value {swatches} onchange={(v) => console.log(v)}>
				{#snippet children()}
					<ColorPicker.Trigger>
						<ColorPicker.Preview />
					</ColorPicker.Trigger>

					<ColorPicker.Content>
						{#snippet children()}
							<div class="flex w-56 flex-col gap-4 p-3">
								<ColorPicker.HexInput />
								<ColorPicker.Sliders />
								<ColorPicker.Swatches />
							</div>
						{/snippet}
					</ColorPicker.Content>
				{/snippet}
			</ColorPicker.Root>
			<span class="font-mono text-sm">{value}</span>
		</div>
	{/snippet}
</Story>

<!-- Minimal: hex input + swatches only -->
<Story name="Swatches Only">
	{#snippet children()}
		<ColorPicker.Root bind:value {swatches}>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>

				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-52 flex-col gap-3 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.Swatches />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- Sliders only, no swatches -->
<Story name="Sliders Only">
	{#snippet children()}
		<ColorPicker.Root bind:value>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>

				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-52 flex-col gap-3 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.Sliders />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>
