export interface ColumnDefinition<T> {
	name: string;
	accessor: (item: T) => string;
	format?: (value: string) => string;
}

export function table<T>(data: T[], columns: ColumnDefinition<T>[]): string {
	// Create header row
	const headers = columns.map((col) => col.name).join(' | ');
	const separator = columns.map(() => '---').join(' | ');

	// Create data rows
	const rows = data.map((item) => {
		const cells = columns.map((col) => {
			const value = col.accessor(item);
			return col.format ? col.format(value) : value;
		});
		return cells.join(' | ');
	});

	return `| ${headers} |\n| ${separator} |\n${rows.map((row) => `| ${row} |`).join('\n')}`;
}

export function codeBlock(code: string, language: string = ''): string {
	return `\`\`\`${language}\n${code}\n\`\`\``;
}

export function inlineCode(code: string): string {
	return `\`${code}\``;
}

export function list(items: string[], ordered: boolean = false): string {
	if (ordered) {
		return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
	} else {
		return items.map((item) => `- ${item}`).join('\n');
	}
}

export function link(text: string, url: string): string {
	return `[${text}](${url})`;
}

export function image(alt: string, url: string): string {
	return `![${alt}](${url})`;
}

export function content(text: string): string {
	return text.trim();
}
