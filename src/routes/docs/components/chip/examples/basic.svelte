<script lang="ts">
	import { Chip } from '$lib/components/chip';
</script>

<!-- A chip is dismissible by default: it renders a close button wired to `onclose`. -->
<Chip onclose={() => {}}>Svelte</Chip>
