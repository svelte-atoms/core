import type { RequestHandler } from './$types';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { dev } from '$app/environment';

// MCP Server Implementation for @svelte-atoms/core
// Using @modelcontextprotocol/sdk with HTTP transport

// Logging utility - only log in development
const log = {
	error: (message: string, error?: unknown) => {
		if (dev) {
			console.error(`[MCP Error] ${message}`, error);
		}
	},
	info: (message: string) => {
		if (dev) {
			console.log(`[MCP Info] ${message}`);
		}
	}
};

// Get base URL based on environment
function getBaseUrl(requestUrl?: string): string {
	// If we have a request URL, derive from that
	if (requestUrl) {
		const url = new URL(requestUrl);
		return `${url.protocol}//${url.host}`;
	}
	// Otherwise use environment-based defaults
	return dev ? 'http://localhost:5173' : 'https://sacore.netlify.app';
}

// Helper to read documentation from llms.txt endpoints
async function readDocFromEndpoint(path: string, baseUrl: string): Promise<string> {
	try {
		const url = `${baseUrl}${path}`;
		log.info(`Fetching documentation from: ${url}`);
		const response = await fetch(url);
		if (response.ok) {
			return await response.text();
		}
		log.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
		return '';
	} catch (error) {
		log.error(`Error fetching ${path}`, error);
		return '';
	}
}

// Helper to read documentation files (fallback for non-component docs)
function readDocFile(relativePath: string): string {
	try {
		const fullPath = join(process.cwd(), 'src', 'routes', 'api', '[transport]', relativePath);
		log.info(`Reading doc file: ${fullPath}`);
		if (existsSync(fullPath)) {
			return readFileSync(fullPath, 'utf-8');
		}
		log.error(`Doc file not found: ${fullPath}`);
		return '';
	} catch (error) {
		log.error(`Error reading ${relativePath}`, error);
		return '';
	}
}

// Helper to list component docs
function listComponentDocs(): string[] {
	try {
		const componentsPath = join(process.cwd(), 'docs', 'components');
		if (existsSync(componentsPath)) {
			return readdirSync(componentsPath)
				.filter((file) => file.endsWith('.md') && file !== 'README.MD')
				.map((file) => file.replace('.md', ''));
		}
		log.error(`Components path not found: ${componentsPath}`);
		return [];
	} catch (error) {
		log.error('Error listing component docs', error);
		return [];
	}
}

// Create MCP Server instance
// const server = new McpServer({
// 	name: SERVER_NAME,
// 	version: SERVER_VERSION,
// 	title: 'Svelte Atoms MCP Server',
// 	websiteUrl: 'https://sacore.netlify.app',
// });

const handler = createMcpHandler(
	(server, requestContext) => {
		// Get base URL from request context
		const baseUrl = getBaseUrl(requestContext?.url);

		// Register Tools
		server.registerTool(
			'get-component-info',
			{
				description:
					'Get detailed information about a specific component including API, usage, and examples',
				inputSchema: {
					name: z.string().min(1, 'Component name cannot be empty')
				}
			},
			async ({ name }) => {
				// Validate and sanitize input
				const lowercaseName = name?.toLowerCase().trim();
				if (!lowercaseName || !/^[a-z0-9-]+$/.test(lowercaseName)) {
					throw new Error('Invalid component name. Use lowercase letters, numbers, and hyphens only.');
				}

				const content = await readDocFromEndpoint(`/docs/components/${lowercaseName}/llms.txt`, baseUrl);

				if (!content) {
					return {
						content: [
							{
								type: 'text',
								text: `Component "${lowercaseName}" not found. Use list-components to see available components.`
							}
						]
					};
				}

				return {
					content: [
						{
							type: 'text',
							text: content
						}
					]
				};
			}
		);

		server.registerTool(
			'list-components',
			{
				description: 'List all available components in the library with brief descriptions',
				inputSchema: {}
			},
			() => {
				const components = listComponentDocs();
				const componentList = components.map((name) => `- ${name}`).join('\n');

				return {
					content: [
						{
							type: 'text',
							text: `# Available Components\n\nTotal: ${components.length} components\n\n${componentList}\n\nUse get_component_info to get detailed information about any component.`
						}
					]
				};
			}
		);

		server.registerTool(
			'get-quick-start',
			{
				description: 'Get quick start guide for using the library',
				inputSchema: {}
			},
			() => {
				const overview = readDocFile('overview.md');
				const quickRef = readDocFile('quick-reference.md');

				return {
					content: [
						{
							type: 'text',
							text: `# Quick Start Guide\n\n## Overview\n\n${overview}\n\n## Quick Reference\n\n${quickRef}`
						}
					]
				};
			}
		);

		server.registerTool(
			'use-preset',
			{
				description: 'Configurate components global presets',
				inputSchema: {}
			},
			() => {
				const presetDoc = readDocFile('preset.md');
				// const quickRef = readDocFile('quick-reference.md');

				return {
					content: [
						{
							type: 'text',
							text: presetDoc
						}
					]
				};
			}
		);

		server.registerTool(
			'create-variant',
			{
				description: 'Create components with custom variants',
				inputSchema: {}
			},
			() => {
				const variantsDoc = readDocFile('variants.md');

				return {
					content: [
						{
							type: 'text',
							text: variantsDoc
						}
					]
				};
			}
		);

		// Consolidated component crafting tool (replaces create/improve/fix-component)
		server.registerTool(
			'craft-component',
			{
				description:
					'Get guidance for creating, improving, or fixing components using atoms architecture',
				inputSchema: {
					action: z.enum(['create', 'improve', 'fix']).optional().describe('The action to perform (create, improve, or fix)')
				}
			},
			({ action }) => {
				const craftingDoc = readDocFile('crafting.md');
				
				if (!craftingDoc) {
					throw new Error('Crafting documentation not found');
				}

				const actionText = action ? ` (${action})` : '';
				return {
					content: [
						{
							type: 'text',
							text: `# Component Crafting Guide${actionText}\n\n${craftingDoc}`
						}
					]
				};
			}
		);

		// Register Resources
		const resourceDocs = [
			{
				name: 'overview',
				title: 'Library Overview',
				description: 'Introduction, features, and quick start guide'
			},
			{
				name: 'agent',
				title: 'Agent Guidelines',
				description: 'Code generation rules and best practices for LLMs'
			},
			{
				name: 'imports',
				title: 'Import Guide',
				description: 'How to import components and utilities from @svelte-atoms/core'
			},
			{
				name: 'variants',
				title: 'Variants System',
				description: 'How to use and create component custom variants locally & globally'
			},
			{
				name: 'preset',
				title: 'Preset System',
				description: 'How to use and create components presets'
			},
			{
				name: 'motion',
				title: 'Motion System',
				description: 'Animation and motion utilities for components'
			},
			{
				name: 'philosophy',
				title: 'Library Philosophy',
				description: 'Atoms vs Bonds, rendering system, and extension patterns'
			},
			{
				name: 'quick-reference',
				title: 'Quick Reference',
				description: 'Component lookup table and common patterns'
			},
			{
				name: 'common-patterns',
				title: 'Common Patterns',
				description: 'Real-world code examples and recipes'
			},
			{
				name: 'naming-convention',
				title: 'Naming Conventions',
				description: 'File, variable, and component naming standards'
			}
		];

		resourceDocs.forEach(({ name, title, description }) => {
			server.registerResource(
				`docs-${name}`,
				`docs://${name}`,
				{
					title,
					description,
					mimeType: 'text/markdown'
				},
				() => {
					const content = readDocFile(`./${name}.md`);
					log.info(`Loading resource doc: ${name}`);
					
					if (!content) {
						throw new Error(`Resource not found: ${name}`);
					}

					return {
						contents: [
							{
								uri: `docs://${name}`,
								mimeType: 'text/markdown',
								text: content
							}
						]
					};
				}
			);
		});

		// Register component resources dynamically
		const components = listComponentDocs();

		components.forEach((component) => {
			server.registerResource(
				`docs-component-${component}`,
				`docs://components/${component}`,
				{
					title: `${component} Component`,
					description: `Documentation for ${component} component`,
					mimeType: 'text/plain'
				},
				async () => {
					log.info(`Loading component resource: ${component}`);
					const content = await readDocFromEndpoint(`/docs/components/${component}/llms.txt`, baseUrl);

					if (!content) {
						throw new Error(`Component resource not found: ${component}`);
					}

					return {
						contents: [
							{
								uri: `docs://components/${component}`,
								mimeType: 'text/plain',
								text: content
							}
						]
					};
				}
			);
		});

		// Register Prompts
		server.registerPrompt(
			'create-component',
			{
				description: 'Generate a new component using @svelte-atoms/core',
				argsSchema: {
					componentType: z
						.string()
						.describe('Type of component to create (e.g., "form", "button", "dialog")'),
					features: z.string().optional().describe('Specific features or requirements')
				}
			},
			({ componentType, features }) => {
				const type = componentType || 'component';
				const feat = features || 'standard functionality';

				return {
					messages: [
						{
							role: 'user',
							content: {
								type: 'text',
								text: `Create a ${type} component using @svelte-atoms/core library with the following features: ${feat}\n\nCRITICAL IMPORT RULES:\n- ALL imports MUST use named imports from '@svelte-atoms/core'\n- Example: import { Button, Input, Dialog } from '@svelte-atoms/core';\n- NEVER use default imports\n- NEVER use subpath imports like '@svelte-atoms/core/components/button'\n- Component names are PascalCase (Button, Dialog, Dropdown)\n- Utility names are camelCase (clickOutside, portal, focusTrap)\n\nFollow these guidelines:\n1. Use Svelte 5 syntax with runes ($state, $derived, $effect)\n2. Import components using named imports from @svelte-atoms/core\n3. Use proper TypeScript types\n4. Follow kebab-case for file names\n5. Include accessibility features\n6. Add inline code comments\n\nProvide complete, working code with correct imports.`
							}
						}
					]
				};
			}
		);

		server.registerPrompt(
			'fix-component',
			{
				description: 'Help fix issues with an existing component',
				argsSchema: {
					code: z.string().describe('The component code with issues'),
					issue: z.string().describe('Description of the issue')
				}
			},
			({ code, issue }) => {
				const codeStr = code || '';
				const issueStr = issue || 'unknown issue';

				return {
					messages: [
						{
							role: 'user',
							content: {
								type: 'text',
								text: `Fix the following component from @svelte-atoms/core:\n\nIssue: ${issueStr}\n\nCode:\n\`\`\`svelte\n${codeStr}\n\`\`\`\n\nCRITICAL: Ensure all imports use named imports from '@svelte-atoms/core'\nExample: import { Button, Input } from '@svelte-atoms/core';\n\nProvide the corrected code following @svelte-atoms/core best practices.`
							}
						}
					]
				};
			}
		);

		server.registerPrompt(
			'improve-component',
			{
				description: 'Suggest improvements for a component',
				argsSchema: {
					code: z.string().describe('The component code to improve')
				}
			},
			({ code }) => {
				const codeStr = code || '';

				return {
					messages: [
						{
							role: 'user',
							content: {
								type: 'text',
								text: `Improve the following component using @svelte-atoms/core best practices:\n\n\`\`\`svelte\n${codeStr}\n\`\`\`\n\nSuggestions should include:\n1. Correct imports (named imports from '@svelte-atoms/core')\n2. Better use of library features\n3. Performance optimizations\n4. Accessibility improvements\n5. Code organization\n6. TypeScript type safety`
							}
						}
					]
				};
			}
		);
	},
	{},
	{
		basePath: '/api', // must match where [transport] is located
		maxDuration: 60,
		verboseLogs: true
	}
);

// SvelteKit handlers that bridge HTTP to MCP

export const POST: RequestHandler = async ({ request }) => {
	return handler(request);
};

// SvelteKit GET handler - returns server info
// export const GET: RequestHandler = async () => {
// 	return json({
// 		name: SERVER_NAME,
// 		version: SERVER_VERSION,
// 		protocol: 'MCP/1.0',
// 		description: 'Model Context Protocol server for @svelte-atoms/core component library',
// 		sdk: '@modelcontextprotocol/sdk',
// 		endpoints: {
// 			mcp: '/mcp (POST)'
// 		},
// 		capabilities: [
// 			'resources (documentation)',
// 			'tools (component info, search)',
// 			'prompts (code generation)'
// 		]
// 	});
// };

export const GET: RequestHandler = async ({ request }) => {
	return handler(request);
};

export const DELETE: RequestHandler = async ({ request }) => {
	return handler(request);
};
