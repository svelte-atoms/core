/**
 * Markdown template literal tag for syntax highlighting and processing
 * 
 * Usage:
 * ```ts
 * const content = md`
 *   # Hello World
 *   This is **markdown**!
 * `;
 * ```
 * 
 * For syntax highlighting in VS Code:
 * - Install "es6-string-html" or "lit-html" extension
 * - Use comment annotation: const x = /* md *\/ `markdown here`;
 * - Or configure your editor to recognize the `md` tag
 */
export function md(strings: TemplateStringsArray, ...values: any[]): string {
	// Combine template parts
	let result = strings.reduce((acc, str, i) => {
		return acc + str + (values[i] ?? '');
	}, '');

	// Remove common leading whitespace (dedent)
	const lines = result.split('\n');
	const nonEmptyLines = lines.filter((line) => line.trim());

	if (nonEmptyLines.length === 0) return '';

	const minIndent = Math.min(
		...nonEmptyLines.map((line) => line.match(/^\s*/)?.[0].length ?? 0)
	);

	return lines
		.map((line) => line.slice(minIndent))
		.join('\n')
		.trim();
}

/**
 * Markdown template literal tag that preserves exact formatting (no dedent)
 */
export function mdRaw(strings: TemplateStringsArray, ...values: any[]): string {
	return strings.reduce((acc, str, i) => {
		return acc + str + (values[i] ?? '');
	}, '');
}

// Optional: Export type for markdown strings
export type MarkdownString = string & { readonly __brand: 'markdown' };

export function newLine(): string {
	return '\n';
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