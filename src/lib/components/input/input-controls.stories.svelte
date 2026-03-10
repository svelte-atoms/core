<script lang="ts">
	import { Story } from '$docs/components/story';
	import * as Input from '$lib/components/input';

	let timeValue = $state('');
	let dateTimeValue = $state('');
	let dateTimeDate = $state<Date | null>(null);
	let files = $state<File[]>([]);
	let urlValue = $state('');
	let phoneValue = $state('');
</script>

<!-- ─── TimeControl ──────────────────────────────────────────────────────── -->
<Story name="TimeControl">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-64 items-center rounded-md border">
				<Input.TimeControl bind:value={timeValue} />
			</Input.Root>
			<p class="text-muted-foreground text-sm">Value: {timeValue || '(none)'}</p>
		</div>
	{/snippet}
</Story>

<Story name="TimeControl/WithRange">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<p class="text-muted-foreground text-sm">08:00 – 18:00 only</p>
			<Input.Root class="border-border flex h-10 w-64 items-center rounded-md border">
				<Input.TimeControl bind:value={timeValue} min="08:00" max="18:00" />
			</Input.Root>
		</div>
	{/snippet}
</Story>

<!-- ─── DateTimeControl ─────────────────────────────────────────────────── -->
<Story name="DateTimeControl">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-72 items-center rounded-md border">
				<Input.DateTimeControl bind:value={dateTimeValue} bind:date={dateTimeDate} />
			</Input.Root>
			<p class="text-muted-foreground text-sm">
				String: {dateTimeValue || '(none)'}<br />
				Date: {dateTimeDate?.toLocaleString() ?? '(none)'}
			</p>
		</div>
	{/snippet}
</Story>

<!-- ─── FileControl ──────────────────────────────────────────────────────── -->
<Story name="FileControl">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<Input.FileControl bind:files placeholder="Choose a file…" />
			</Input.Root>
			{#if files.length}
				<p class="text-muted-foreground text-sm">{files.length} file(s) selected</p>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="FileControl/Multiple">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<Input.FileControl bind:files multiple accept="image/*" placeholder="Choose images…" />
			</Input.Root>
		</div>
	{/snippet}
</Story>

<Story name="FileControl/CustomTrigger">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<Input.FileControl bind:files>
					{#snippet triggerContent({ hasFiles, files: f, open })}
						{#if hasFiles}
							<span class="text-foreground px-2 text-sm">{f[0].name}</span>
						{:else}
							<button type="button" onclick={open} class="text-primary px-2 text-sm underline">
								Upload file
							</button>
						{/if}
					{/snippet}
				</Input.FileControl>
			</Input.Root>
		</div>
	{/snippet}
</Story>

<!-- ─── UrlControl ───────────────────────────────────────────────────────── -->
<Story name="UrlControl">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<Input.UrlControl bind:value={urlValue} placeholder="example.com" />
			</Input.Root>
			<p class="text-muted-foreground text-sm">Value: {urlValue || '(none)'}</p>
		</div>
	{/snippet}
</Story>

<Story name="UrlControl/HttpScheme">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-80 items-center rounded-md border">
				<Input.UrlControl bind:value={urlValue} scheme="http://" placeholder="example.com" />
			</Input.Root>
		</div>
	{/snippet}
</Story>

<!-- ─── PhoneControl ─────────────────────────────────────────────────────── -->
<Story name="PhoneControl">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-64 items-center rounded-md border">
				<Input.PhoneControl bind:value={phoneValue} />
			</Input.Root>
			<p class="text-muted-foreground text-sm">Value: {phoneValue || '(none)'}</p>
		</div>
	{/snippet}
</Story>

<Story name="PhoneControl/UK">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<Input.Root class="border-border flex h-10 w-64 items-center rounded-md border">
				<Input.PhoneControl bind:value={phoneValue} countryCode="+44" placeholder="7700 900000" />
			</Input.Root>
		</div>
	{/snippet}
</Story>
