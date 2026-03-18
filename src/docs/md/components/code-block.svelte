<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		lang?: string;
		children: Snippet;
	}

	let { lang = '', children }: Props = $props();
</script>
```{lang}
{@render children()}
```
