<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/ColorPicker'
	});
</script>

<script lang="ts">
	import * as ColorPicker from './atoms';

	let value = $state('#3b82f6');

	const swatches = [
		'#ef4444', '#f97316', '#eab308', '#22c55e',
		'#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
		'#000000', '#6b7280', '#d1d5db', '#ffffff'
	];
</script>

<!-- HSV Area — classic Figma-style 2D picker + hue strip -->
<Story name="HSV Area">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value {swatches}>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-3 p-3">
					<ColorPicker.HsvArea />
					<ColorPicker.HsvSliders />
					<ColorPicker.HexInput />
					<ColorPicker.Swatches />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- HSL Area -->
<Story name="HSL Area">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value {swatches}>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-3 p-3">
					<ColorPicker.HslArea />
					<ColorPicker.HslSliders />
					<ColorPicker.HexInput />
					<ColorPicker.Swatches />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- HWB Area -->
<Story name="HWB Area">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value {swatches}>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-3 p-3">
					<ColorPicker.HwbArea />
					<ColorPicker.HwbSliders />
					<ColorPicker.HexInput />
					<ColorPicker.Swatches />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- HSL Sliders only -->
<Story name="HSL Sliders">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value {swatches}>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-4 p-3">
					<ColorPicker.HexInput />
					<ColorPicker.HslSliders />
					<ColorPicker.Swatches />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- RGB Sliders only -->
<Story name="RGB Sliders">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-4 p-3">
					<ColorPicker.HexInput />
					<ColorPicker.RgbSliders />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- HWB Sliders only -->
<Story name="HWB Sliders">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-56 flex-col gap-4 p-3">
					<ColorPicker.HexInput />
					<ColorPicker.HwbSliders />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<!-- Swatches only -->
<Story name="Swatches Only">
	{#snippet children({ args })}
		<ColorPicker.Root bind:value {swatches}>
			<ColorPicker.Trigger>
				<ColorPicker.Preview />
			</ColorPicker.Trigger>
			<ColorPicker.Content>
				<div class="flex w-48 flex-col gap-3 p-3">
					<ColorPicker.HexInput />
					<ColorPicker.Swatches />
				</div>
			</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>
