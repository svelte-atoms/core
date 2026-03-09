<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as ColorPicker from './atoms';

	const { Story } = defineMeta({
		title: 'ATOMS/ColorPicker'
	});
</script>

<script>
	let value = $state('#3b82f6');
	let tab = $state('hsl');

	const swatches = [
		'#ef4444', '#f97316', '#eab308', '#22c55e',
		'#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
		'#000000', '#6b7280', '#d1d5db', '#ffffff'
	];
</script>

<Story name="Color Area (Figma-style)">
	{#snippet children()}
		<ColorPicker.Root bind:value {swatches}>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-56 flex-col gap-3 p-3">
							<!-- 2D area: drag to pick S+V -->
							<ColorPicker.ColorArea />
							<!-- Hue strip only -->
							<ColorPicker.HsvSliders class="[&>*:not(:first-child)]:hidden" />
							<ColorPicker.HexInput />
							<ColorPicker.Swatches />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>

<Story name="HSL Sliders">
	{#snippet template()}
		<div class="flex items-center gap-3">
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
			<span class="font-mono text-sm">{value}</span>
		</div>
	{/snippet}
</Story>

<Story name="HSV Sliders">
	{#snippet template()}
		<ColorPicker.Root bind:value {swatches}>
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
						<div class="flex w-56 flex-col gap-4 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.HsvSliders />
							<ColorPicker.Swatches />
						</div>
				</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>

<Story name="RGB Sliders">
	{#snippet template()}
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

<Story name="HWB Sliders">
	{#snippet template()}
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

<Story name="Multi-domain panel">
	{#snippet template()}
		<ColorPicker.Root bind:value {swatches}>
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
						<div class="flex w-64 flex-col gap-3 p-3">
							<ColorPicker.HexInput />

							<div class="border-border flex rounded-md border text-xs">
								{#each ['hsl', 'hsv', 'rgb', 'hwb'] as d (d)}
									<button
										type="button"
										onclick={() => tab = d}
										class={[
											'flex-1 py-1 transition-colors first:rounded-l-md last:rounded-r-md',
											tab === d ? 'bg-foreground text-background' : 'hover:bg-muted'
										].join(' ')}
									>{d.toUpperCase()}</button>
								{/each}
							</div>

							{#if tab === 'hsl'}   <ColorPicker.HslSliders />
							{:else if tab === 'hsv'} <ColorPicker.HsvSliders />
							{:else if tab === 'rgb'} <ColorPicker.RgbSliders />
							{:else}                  <ColorPicker.HwbSliders />
							{/if}

							<ColorPicker.Swatches />
						</div>
				</ColorPicker.Content>
		</ColorPicker.Root>
	{/snippet}
</Story>
