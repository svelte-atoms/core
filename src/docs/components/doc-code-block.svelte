<script lang="ts">
	import { Badge } from '$svelte-atoms/core/components/badge';

	interface Props {
		filepath: string;
		language: string;
		code: string;
	}

	let { filepath, language, code }: Props = $props();
</script>

<div class="border-border/50 overflow-hidden rounded-lg border">
	<div class="border-border/30 bg-muted/30 flex items-center justify-between border-b px-4 py-3">
		<code class="text-muted-foreground text-sm font-medium">{filepath}</code>
		<Badge variant="secondary" class="text-xs">{language}</Badge>
	</div>
	<div class="bg-muted/30 p-5">
		<pre class="text-sm leading-relaxed"><code class="text-foreground">{code}</code></pre>
	</div>
</div>
