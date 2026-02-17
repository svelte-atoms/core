import { md } from '$docs/md/template';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

function build(): string {
	return md`
---
id: naming-convention
title: Naming Conventions
category: fundamentals
depth: foundational
prerequisites: []
related: []
---

# Naming Conventions

- Files, components & Directories: use kebab-case (e.g. \`my-component.svelte\`, \`my-component.stories.svelte\`)
- Variables & Functions: use camelCase (e.g. \`myVariable\`, \`myFunction()\`)
- Molecules: use Pascal Case format to declare molecules components \`Molecule.Atom\`, ex: \`<Dropdown.Root></Dropdown.Root>\``;
}
