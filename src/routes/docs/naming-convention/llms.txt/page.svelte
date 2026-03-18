<script lang="ts">
	import { FrontMatter } from '$docs/md/components';
	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# Naming Conventions

- Files, components & Directories: use kebab-case (e.g. \`my-component.svelte\`, \`my-component.stories.svelte\`)
- Variables & Functions: use camelCase (e.g. \`myVariable\`, \`myFunction()\`)
- Molecules: use Pascal Case format to declare molecules components \`Molecule.Atom\`, ex: \`<Dropdown.Root></Dropdown.Root>\`
