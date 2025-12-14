export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

/**
 * Converts prop definitions to markdown table format
 */
export function propsToMarkdown(props: PropDefinition[]): string {
	if (!props || props.length === 0) return '';

	let markdown = '| Name | Type | Default | Description |\n';
	markdown += '|------|------|---------|-------------|\n';

	for (const prop of props) {
		const name = prop.name.replace(/\|/g, '\\|');
		const type = prop.type.replace(/\|/g, '\\|');
		const defaultVal = prop.default.replace(/\|/g, '\\|');
		const description = prop.description.replace(/\|/g, '\\|');

		markdown += `| ${name} | ${type} | ${defaultVal} | ${description} |\n`;
	}

	return markdown;
}

/**
 * Injects props into markdown content by replacing placeholders
 * Placeholders format: {{propName}}
 */
export function injectPropsIntoMarkdown(
	markdown: string,
	propsMap: Record<string, PropDefinition[]>
): string {
	let result = markdown;

	for (const [key, props] of Object.entries(propsMap)) {
		const placeholder = new RegExp(`{{${key}}}`, 'g');
		const propsMarkdown = propsToMarkdown(props);
		result = result.replace(placeholder, propsMarkdown);
	}

	return result;
}

/**
 * Converts markdown content to LLM-friendly text format
 * Keeps markdown syntax as-is since LLMs parse it well
 */
export function markdownToLLM(markdown: string): string {
	let text = markdown;

	// Remove HTML comments
	text = text.replace(/<!--[\s\S]*?-->/g, '');

	// Remove excessive blank lines (more than 2)
	text = text.replace(/\n{3,}/g, '\n\n');

	// Trim whitespace
	text = text.trim();

	return text;
}

/**
 * Reads markdown files from the docs directory
 */
export async function readMarkdownFile(filePath: string): Promise<string> {
	try {
		// In production, you might want to use a different approach
		// This is a placeholder - adjust based on your build setup
		const response = await fetch(filePath);
		if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
		return await response.text();
	} catch (error) {
		console.error(`Error reading markdown file: ${filePath}`, error);
		return '';
	}
}

/**
 * Generate LLM-friendly documentation metadata
 */
export function generateLLMHeader(title: string, description: string, version = '1.0.0-alpha.30') {
	return `# ${title}

${description}

---
Generated: ${new Date().toISOString()}
Version: ${version}
---

`;
}
