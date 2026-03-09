<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { DropzoneProps, DropzoneFile, DropzoneContext } from './types';

	let {
		class: klass = '',
		accept = undefined,
		multiple = false,
		maxSize = undefined,
		disabled = false,
		files = $bindable([]),
		preset = 'dropzone',
		onadd = undefined,
		onreject = undefined,
		onchange = undefined,
		children = undefined,
		idleContent = undefined,
		dragContent = undefined,
		...restProps
	}: DropzoneProps & HTMLAttributes<HTMLDivElement> = $props();

	let isDragging = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();

	function makeDropzoneFile(file: File): DropzoneFile {
		return {
			file,
			id: `${file.name}-${file.size}-${file.lastModified}`,
			url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
		};
	}

	function processFiles(incoming: File[]) {
		const added: DropzoneFile[] = [];

		for (const file of incoming) {
			if (maxSize && file.size > maxSize) {
				onreject?.(file, 'size');
				continue;
			}
			if (accept) {
				const accepted = accept.split(',').map((a) => a.trim());
				const ok = accepted.some((a) => {
					if (a.startsWith('.')) return file.name.toLowerCase().endsWith(a.toLowerCase());
					if (a.endsWith('/*')) return file.type.startsWith(a.slice(0, -1));
					return file.type === a;
				});
				if (!ok) { onreject?.(file, 'type'); continue; }
			}
			added.push(makeDropzoneFile(file));
		}

		if (!added.length) return;

		files = multiple ? [...files, ...added] : [added[added.length - 1]];
		onadd?.(added);
		onchange?.(files);
	}

	function open() {
		if (disabled) return;
		inputEl?.click();
	}

	function remove(id: string) {
		const removed = files.find((f) => f.id === id);
		if (removed?.url) URL.revokeObjectURL(removed.url);
		files = files.filter((f) => f.id !== id);
		onchange?.(files);
	}

	function clear() {
		files.forEach((f) => { if (f.url) URL.revokeObjectURL(f.url); });
		files = [];
		onchange?.(files);
	}

	function handleInputChange(ev: Event) {
		const input = ev.target as HTMLInputElement;
		if (input.files) processFiles(Array.from(input.files));
		input.value = '';
	}

	function handleDragOver(ev: DragEvent) {
		if (disabled) return;
		ev.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(ev: DragEvent) {
		const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
		if (
			ev.clientX < rect.left || ev.clientX > rect.right ||
			ev.clientY < rect.top  || ev.clientY > rect.bottom
		) isDragging = false;
	}

	function handleDrop(ev: DragEvent) {
		if (disabled) return;
		ev.preventDefault();
		isDragging = false;
		if (ev.dataTransfer?.files) processFiles(Array.from(ev.dataTransfer.files));
	}

	const ctx: DropzoneContext = {
		get files() { return files; },
		get isDragging() { return isDragging; },
		open,
		remove,
		clear
	};
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultIdle(ctx: DropzoneContext)}
	<div class="flex flex-col items-center gap-2 text-center">
		<svg viewBox="0 0 24 24" fill="none" class="text-muted-foreground h-8 w-8" aria-hidden="true">
			<path d="M12 16V8m0 0-3 3m3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-1a7 7 0 0 0-7-7h-1a7 7 0 0 0-7 7v1Z" stroke="currentColor" stroke-width="1.5"/>
		</svg>
		<p class="text-sm">
			<button type="button" onclick={ctx.open} class="text-foreground font-medium underline underline-offset-2">
				Click to upload
			</button>
			<span class="text-muted-foreground"> or drag and drop</span>
		</p>
	</div>
{/snippet}

{#snippet defaultDrag(_ctx: DropzoneContext)}
	<div class="flex flex-col items-center gap-2">
		<svg viewBox="0 0 24 24" fill="none" class="text-foreground h-8 w-8" aria-hidden="true">
			<path d="M12 16V8m0 0-3 3m3-3 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		<p class="text-foreground text-sm font-medium">Drop files here</p>
	</div>
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

<!-- Hidden file input -->
<input
	bind:this={inputEl}
	type="file"
	{accept}
	{multiple}
	{disabled}
	hidden
	tabindex="-1"
	aria-hidden="true"
	onchange={handleInputChange}
/>

<HtmlAtom
	{preset}
	as="div"
	class={[
		'dropzone-root border-border flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
		isDragging && 'border-foreground bg-muted',
		disabled && 'cursor-not-allowed opacity-50',
		'$preset',
		klass
	]}
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled || undefined}
	aria-label="File upload dropzone"
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	onclick={open}
	onkeydown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } }}
	{...restProps}
>
	{#if children}
		{@render children(ctx)}
	{:else if isDragging}
		{@render (dragContent ?? defaultDrag)(ctx)}
	{:else}
		{@render (idleContent ?? defaultIdle)(ctx)}
	{/if}
</HtmlAtom>
