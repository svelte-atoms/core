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
</script>

<Story name="AInput" args={{}}>
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
<Story name="TimeControl">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.TimeControl bind:value={timeValue} hourFormat={12} />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {timeValue || '(none)'}</p>
	</div>
</Story>

<Story name="TimeControl/WithRange">
	<div class="flex flex-col gap-4 p-4">
		<p class="text-muted-foreground text-sm">08:00 – 18:00 only</p>
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.TimeControl bind:value={timeValue} min="08:00" max="18:00" />
		</MyInput.Root>
	</div>
</Story>

<!-- ─── DateTimeControl ─────────────────────────────────────────────────── -->
<Story name="DateTimeControl">
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
<Story name="FileControl">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.FileControl bind:files placeholder="Choose a file…" />
		</MyInput.Root>
		{#if files.length}
			<p class="text-muted-foreground text-sm">{files.length} file(s) selected</p>
		{/if}
	</div>
</Story>

<Story name="FileControl/Multiple">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.FileControl bind:files multiple accept="image/*" placeholder="Choose images…" />
		</MyInput.Root>
	</div>
</Story>

<Story name="FileControl/CustomTrigger">
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
<Story name="UrlControl">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.UrlControl bind:value={urlValue} placeholder="example.com" />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {urlValue || '(none)'}</p>
	</div>
</Story>

<Story name="UrlControl/HttpScheme">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-80 items-center rounded-md border">
			<MyInput.UrlControl bind:value={urlValue} scheme="http://" placeholder="example.com" />
		</MyInput.Root>
	</div>
</Story>

<!-- ─── PhoneControl ─────────────────────────────────────────────────────── -->
<Story name="PhoneControl">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.PhoneControl bind:value={phoneValue} />
		</MyInput.Root>
		<p class="text-muted-foreground text-sm">Value: {phoneValue || '(none)'}</p>
	</div>
</Story>

<Story name="PhoneControl/UK">
	<div class="flex flex-col gap-4 p-4">
		<MyInput.Root class="border-border flex h-10 w-64 items-center rounded-md border">
			<MyInput.PhoneControl bind:value={phoneValue} countryCode="+44" placeholder="7700 900000" />
		</MyInput.Root>
	</div>
</Story>