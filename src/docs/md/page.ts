import type { PropDefinition } from '$docs/types';
import { table } from './utils';

// Legacy function for backward compatibility
export function propsTable(props: PropDefinition[]): string {
	return table(props, [
		{ name: 'name', accessor: (p) => p.name, format: (v) => `${v}` },
		{ name: 'type', accessor: (p) => p.type, format: (v) => `\`${v}\`` },
		{ name: 'default', accessor: (p) => p.default, format: (v) => `\`${v}\`` },
		{ name: 'description', accessor: (p) => p.description }
	]);
}
