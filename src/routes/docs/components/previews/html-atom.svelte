<script lang="ts">
	import { HtmlAtom } from '$lib/components/atom';
</script>

<div class="flex flex-col gap-2 items-start">
	<HtmlAtom class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
		Base element
	</HtmlAtom>
	<HtmlAtom
		as="button"
		class="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 transition-colors"
	>
		Button atom
	</HtmlAtom>
	<HtmlAtom
		as="span"
		class="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium"
	>
		Badge atom
	</HtmlAtom>
</div>
