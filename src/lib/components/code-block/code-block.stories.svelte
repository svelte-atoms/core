<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/CodeBlock'
	});
</script>

<script lang="ts">
	import { CodeBlock } from '.';

	const tsCode = `import { defineVariants } from '@svelte-atoms/core';

const variants = defineVariants({
  base: 'rounded-md px-4 py-2 font-medium',
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      danger:  'bg-red-600 text-white hover:bg-red-700',
    }
  }
});`;

	const svelteCode = `<script lang="ts">
  import { Button } from '@svelte-atoms/core';
  let count = $state(0);
<\/script>

<Button onclick={() => count++}>
  Clicked {count} times
</Button>`;

	const bashCode = `npm install @svelte-atoms/core
npx svelte-atoms init
# Done — components are yours to own`;
</script>

<Story name="TypeScript">
	{#snippet template()}
		<div class="w-full max-w-xl">
			<CodeBlock {tsCode} lang="typescript" title="variants.ts" />
		</div>
	{/snippet}
</Story>

<Story name="Svelte">
	{#snippet template()}
		<div class="w-full max-w-xl">
			<CodeBlock code={svelteCode} lang="svelte" title="Button.svelte" />
		</div>
	{/snippet}
</Story>

<Story name="Line Numbers">
	{#snippet template()}
		<div class="w-full max-w-xl">
			<CodeBlock code={tsCode} lang="typescript" title="variants.ts" lineNumbers />
		</div>
	{/snippet}
</Story>

<Story name="No Header (floating copy)">
	{#snippet template()}
		<div class="w-full max-w-xl">
			<CodeBlock code={bashCode} lang="bash" />
		</div>
	{/snippet}
</Story>

<Story name="Light Theme">
	{#snippet template()}
		<div class="w-full max-w-xl">
			<CodeBlock code={tsCode} lang="typescript" title="variants.ts" theme="github-light" />
		</div>
	{/snippet}
</Story>
