<script lang="ts">
	import { Shortcut } from '$lib/components/kbd';
</script>

<div class="flex flex-col gap-2">
	<Shortcut keys={['Ctrl', 'Alt', 'Del']} separator="+" />
	<Shortcut keys={['Alt', 'Tab']} separator="→" />
</div>
