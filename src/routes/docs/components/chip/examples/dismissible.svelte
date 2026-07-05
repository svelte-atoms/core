<script lang="ts">
	import { Chip } from '$lib/components/chip';
</script>

<!-- Each chip carries its own dismiss handler; the label is the chip's children. -->
<div class="flex flex-wrap items-center gap-2">
	<Chip onclose={() => {}}>Svelte</Chip>
	<Chip onclose={() => {}}>TypeScript</Chip>
	<Chip onclose={() => {}}>Tailwind</Chip>
	<Chip onclose={() => {}}>Vite</Chip>
</div>
