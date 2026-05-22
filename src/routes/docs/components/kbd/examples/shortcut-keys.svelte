<script lang="ts">
	import { Shortcut } from '$lib/components/kbd';
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center justify-between gap-8">
		<span class="text-sm">Command Palette</span>
		<Shortcut keys={['⌘', 'K']} />
	</div>
	<div class="flex items-center justify-between gap-8">
		<span class="text-sm">Save</span>
		<Shortcut keys={['Ctrl', 'S']} />
	</div>
	<div class="flex items-center justify-between gap-8">
		<span class="text-sm">Find &amp; Replace</span>
		<Shortcut keys={['Ctrl', 'Shift', 'H']} />
	</div>
</div>
