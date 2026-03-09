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

<Story name="HSL (default)">
	{#snippet children()}
		<div class="flex items-center gap-3">
			<ColorPicker.Root bind:value {swatches}>
				{#snippet children()}
					<ColorPicker.Trigger>
						<ColorPicker.Preview />
					</ColorPicker.Trigger>
					<ColorPicker.Content>
						{#snippet children()}
							<div class="flex w-56 flex-col gap-4 p-3">
								<ColorPicker.HexInput />
								<ColorPicker.Sliders domain="hsl" />
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

<Story name="HSV">
	{#snippet children()}
		<ColorPicker.Root bind:value {swatches}>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-56 flex-col gap-4 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.Sliders domain="hsv" />
							<ColorPicker.Swatches />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>

<Story name="RGB">
	{#snippet children()}
		<ColorPicker.Root bind:value>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-56 flex-col gap-4 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.Sliders domain="rgb" />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>

<Story name="HWB">
	{#snippet children()}
		<ColorPicker.Root bind:value>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
					{#snippet children()}
						<div class="flex w-56 flex-col gap-4 p-3">
							<ColorPicker.HexInput />
							<ColorPicker.Sliders domain="hwb" />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>

<Story name="Multi-domain panel">
	{#snippet children()}
		<ColorPicker.Root bind:value {swatches}>
			{#snippet children()}
				<ColorPicker.Trigger>
					<ColorPicker.Preview />
				</ColorPicker.Trigger>
				<ColorPicker.Content>
					{#snippet children()}
						{@const tab = $state('hsl')}
						<div class="flex w-64 flex-col gap-3 p-3">
							<ColorPicker.HexInput />

							<!-- Domain tabs -->
							<div class="border-border flex rounded-md border text-xs">
								{#each ['hsl', 'hsv', 'rgb', 'hwb'] as d}
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

							<ColorPicker.Sliders domain={tab} />
							<ColorPicker.Swatches />
						</div>
					{/snippet}
				</ColorPicker.Content>
			{/snippet}
		</ColorPicker.Root>
	{/snippet}
</Story>
