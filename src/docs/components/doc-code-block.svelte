<script lang="ts">
	import CodeBlock from './code-block.svelte';

	interface Props {
		filepath: string;
		language: string;
		code: string;
	}

	let { filepath, language, code }: Props = $props();
</script>

<div class="my-2">
	<p class="text-muted-foreground mb-1 text-xs">{filepath}</p>
	<CodeBlock lang={language} {code} />
</div>
