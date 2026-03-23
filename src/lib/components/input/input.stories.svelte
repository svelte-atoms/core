<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input as MyInput } from '.';
	import { Label } from '../label';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Input',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let timeValue = $state('');
	let dateTimeValue = $state('');
	let dateTimeDate = $state<Date | null>(null);
	let files = $state<File[]>([]);
	let urlValue = $state('');
	let phoneValue = $state('');
	let locationValue = $state('');
	let locationLat = $state<number | undefined>(undefined);
	let locationLng = $state<number | undefined>(undefined);

	let today = $state(new Date());	
</script>

<Story name="Input" args={{}}>
	<div class="flex flex-col">
		<Label for="price-input">Price</Label>
		<MyInput.Root>
			<MyInput.Icon class="text-foreground box-content px-0">$</MyInput.Icon>
			<MyInput.Control id="price-input" class="border-border box-content border-x px-2 py-2">
				<!--  -->
			</MyInput.Control>
			<MyInput.Icon class="text-foreground box-content px-2">.00</MyInput.Icon>

			<MyInput.Placeholder class="text-foreground/20 pl-2">Hello World</MyInput.Placeholder>
		</MyInput.Root>
	</div>
</Story>

<Story name="Number Control">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>Quantity</Label>
			<MyInput.Root>
				<MyInput.NumberControl number={1} min={0} max={99} />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Step 5</Label>
			<MyInput.Root>
				<MyInput.NumberControl number={0} min={0} max={100} step={5} />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Disabled</Label>
			<MyInput.Root>
				<MyInput.NumberControl number={3} disabled />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Custom buttons</Label>
			<MyInput.Root>
				<MyInput.NumberControl number={0}>
					{#snippet decrementContent({ decrement, disabled })}
						<button
							onclick={decrement}
							{disabled}
							class="px-3 text-lg font-bold disabled:opacity-30"
						>−</button>
					{/snippet}
					{#snippet incrementContent({ increment, disabled })}
						<button
							onclick={increment}
							{disabled}
							class="px-3 text-lg font-bold disabled:opacity-30"
						>+</button>
					{/snippet}
				</MyInput.NumberControl>
			</MyInput.Root>
		</div>
	</div>
</Story>

<!-- ─── TimeControl ──────────────────────────────────────────────────────── -->
<Story name="Time Control">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.TimeControl bind:value={timeValue} bind:date={today} hourFormat={12} />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {timeValue || '(none)'}</p>
		<p class="text-muted-foreground text-sm">Date: {today.toLocaleString()}</p>
	</div>
</Story>

<Story name="Time Control (WithRange)">
	<div class="flex flex-col gap-4 p-4">
		<p class="text-muted-foreground text-sm">08:00 – 18:00 only</p>
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.TimeControl bind:value={timeValue} min="08:00" max="18:00" hourFormat={24} />
		</MyInput.Root>
	</div>
</Story>

<!-- ─── DateTimeControl ─────────────────────────────────────────────────── -->
<Story name="Date Time Control">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-72 items-center rounded-md border">
			<MyInput.DateTimeControl bind:value={dateTimeValue} bind:date={dateTimeDate} />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">
			String: {dateTimeValue || '(none)'}<br />
			Date: {dateTimeDate?.toLocaleString() ?? '(none)'}
		</p>
	</div>
</Story>

<!-- ─── FileControl ──────────────────────────────────────────────────────── -->
<Story name="File Control">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.FileControl bind:files placeholder="Choose a file…" />
		</MyInput.Root>
		{#if files.length}
			<p class="text-muted-foreground text-sm">{files.length} file(s) selected</p>
		{/if}
	</div>
</Story>

<Story name="File Control (Multiple)">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.FileControl bind:files multiple accept="image/*" placeholder="Choose images…" />
		</MyInput.Root>
	</div>
</Story>

<Story name="File Control (CustomTrigger)">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.FileControl bind:files>
				{#snippet triggerContent({ hasFiles, files: f, open })}
					{#if hasFiles}
						<span class="text-foreground px-2 text-sm">{f[0].name}</span>
					{:else}
						<button type="button" onclick={open} class="text-primary px-2 text-sm underline">
							Upload file
						</button>
					{/if}
				{/snippet}
			</MyInput.FileControl>
		</MyInput.Root>
	</div>
</Story>

<!-- ─── UrlControl ───────────────────────────────────────────────────────── -->
<Story name="Url Control">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.UrlControl bind:value={urlValue} placeholder="example.com" />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {urlValue || '(none)'}</p>
	</div>
</Story>

<Story name="Url Control (HttpScheme)">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.UrlControl bind:value={urlValue} scheme="http://" placeholder="example.com" />
		</MyInput.Root>
	</div>
</Story>

<!-- ─── PhoneControl ─────────────────────────────────────────────────────── -->
<Story name="Phone Control">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.PhoneControl bind:value={phoneValue} format="+# (###) ###-####" />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {phoneValue || '(none)'}</p>
	</div>
</Story>

<Story name="Phone Control (UK)">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.PhoneControl bind:value={phoneValue} format="+44 #### ######" placeholder="7700 900000" />
		</MyInput.Root>
	</div>
</Story>

<!-- ─── LocationControl ──────────────────────────────────────────────────── -->
<Story name="Location Control">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>Decimal degrees (default)</Label>
			<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dd"
					placeholder="lat, lng"
				/>
			</MyInput.Root>
		</div>

		<div class="text-muted-foreground grid grid-cols-3 gap-x-4 text-sm">
			<span>value: <span class="text-foreground font-mono">{locationValue || '(none)'}</span></span>
			<span>lat: <span class="text-emerald-600 dark:text-emerald-400 font-mono">{locationLat ?? '—'}</span></span>
			<span>lng: <span class="text-sky-600 dark:text-sky-400 font-mono">{locationLng ?? '—'}</span></span>
		</div>
	</div>
</Story>

<Story name="Location Control (DMS)">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>Degrees, minutes, seconds overlay</Label>
			<MyInput.Root class="border-border flex h-10 w-96 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dms"
				/>
			</MyInput.Root>
		</div>
		<div class="text-muted-foreground text-sm">
			value: <span class="text-foreground font-mono">{locationValue || '(none)'}</span>
		</div>
	</div>
</Story>

<Story name="Location Control (Precision)">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>2 decimal places</Label>
			<MyInput.Root class="border-border flex h-10 w-72 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dd"
					precision={2}
				/>
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>4 decimal places</Label>
			<MyInput.Root class="border-border flex h-10 w-72 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dd"
					precision={4}
				/>
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>8 decimal places (max GPS precision)</Label>
			<MyInput.Root class="border-border flex h-10 w-96 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dd"
					precision={8}
				/>
			</MyInput.Root>
		</div>
	</div>
</Story>

<Story name="Location Control (NoLocate)">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>Without geolocation button</Label>
			<MyInput.Root class="border-border flex h-10 w-72 items-center rounded-md border">
				<MyInput.LocationControl
					bind:value={locationValue}
					locate={false}
					placeholder="Enter coordinates manually"
				/>
			</MyInput.Root>
		</div>
	</div>
</Story>

<Story name="Location Control (States)">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>Disabled</Label>
			<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<MyInput.LocationControl value="40.712800, -74.006000" disabled />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Readonly</Label>
			<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<MyInput.LocationControl value="51.507351, -0.127758" readonly />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Prefilled (New York)</Label>
			<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<MyInput.LocationControl value="40.712800, -74.006000" />
			</MyInput.Root>
		</div>

		<div class="flex flex-col gap-1">
			<Label>Prefilled DMS (Paris)</Label>
			<MyInput.Root class="border-border flex h-10 w-96 items-center rounded-md border">
				<MyInput.LocationControl value="48.8566, 2.3522" format="dms" />
			</MyInput.Root>
		</div>
	</div>
</Story>

<Story name="Location Control (WithIcon)">
	<div class="flex flex-col gap-4 p-4">
		<div class="flex flex-col gap-1">
			<Label>With leading icon</Label>
			<MyInput.Root class="border-border flex h-10 w-96 items-center rounded-md border">
				<MyInput.Icon>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
						<circle cx="12" cy="10" r="3"/>
					</svg>
				</MyInput.Icon>
				<MyInput.LocationControl
					bind:value={locationValue}
					bind:lat={locationLat}
					bind:lng={locationLng}
					format="dd"
				/>
			</MyInput.Root>
		</div>
	</div>
</Story>