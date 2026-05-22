<script lang="ts">
	import { HtmlAtom } from '$lib/components/atom';
</script>

<div class="flex flex-col gap-4">
	<HtmlAtom class="rounded-lg border p-4">Default div element</HtmlAtom>
	<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
		Click me
	</HtmlAtom>
</div>
