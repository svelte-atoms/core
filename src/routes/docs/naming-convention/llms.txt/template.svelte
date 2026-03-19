<script lang="ts">
	import { inlineCode } from '$docs/md/template';
	import { FrontMatter } from '$docs/md/components';
	
	let { data } = $props();
	const { frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# Naming Conventions

- Files, components & Directories: use kebab-case (e.g. {inlineCode('my-component.svelte')}, {inlineCode('my-component.stories.svelte')})
- Variables & Functions: use camelCase (e.g. {inlineCode('myVariable')}, {inlineCode('myFunction()')})
- Molecules: use Pascal Case format to declare molecules components {inlineCode('Molecule.Atom')}, ex: {inlineCode('<Dropdown.Root></Dropdown.Root>')}
