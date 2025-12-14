import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type {
	CallToolRequest,
	CallToolResult,
	GetPromptRequest,
	GetPromptResult,
	ListPromptsResult,
	ListResourcesResult,
	ListToolsResult,
	ReadResourceRequest,
	ReadResourceResult
} from '@modelcontextprotocol/sdk/types.js';
import pkg from '../../../package.json';

// MCP Server Implementation for @svelte-atoms/core
// Using @modelcontextprotocol/sdk types with HTTP transport

const SERVER_NAME = '@svelte-atoms/core';
const SERVER_VERSION = pkg.version;

// Base URL for internal requests (will be set from request context)
let baseUrl = 'http://localhost:5173';

// Helper to read documentation from llms.txt endpoints
async function readDocFromEndpoint(path: string): Promise<string> {
	try {
		const url = `${baseUrl}${path}`;
		const response = await fetch(url);
		if (response.ok) {
			return await response.text();
		}
		return '';
	} catch {
		return '';
	}
}

// Helper to read documentation files (fallback for non-component docs)
function readDocFile(relativePath: string): string {
	try {
		const fullPath = join(process.cwd(), 'docs', relativePath);
		if (existsSync(fullPath)) {
			return readFileSync(fullPath, 'utf-8');
		}
		return '';
	} catch {
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
		return [];
	} catch {
		return [];
	}
}

// MCP Request Handlers using SDK types

function handleInitialize() {
	return {
		protocolVersion: '2024-11-05',
		serverInfo: {
			name: SERVER_NAME,
			version: SERVER_VERSION
		},
		capabilities: {
			resources: {},
			tools: {},
			prompts: {}
		}
	};
}

function handleListResources(): ListResourcesResult {
	const components = listComponentDocs();

	const resources = [
		// Essential documentation
		{
			uri: 'docs://overview',
			name: 'Library Overview',
			description: 'Introduction, features, and quick start guide',
			mimeType: 'text/markdown'
		},
		{
			uri: 'docs://agent',
			name: 'Agent Guidelines',
			description: 'Code generation rules and best practices for LLMs',
			mimeType: 'text/markdown'
		},
		{
			uri: 'docs://philosophy',
			name: 'Library Philosophy',
			description: 'Atoms vs Bonds, rendering system, and extension patterns',
			mimeType: 'text/markdown'
		},
		{
			uri: 'docs://quick-reference',
			name: 'Quick Reference',
			description: 'Component lookup table and common patterns',
			mimeType: 'text/markdown'
		},
		{
			uri: 'docs://common-patterns',
			name: 'Common Patterns',
			description: 'Real-world code examples and recipes',
			mimeType: 'text/markdown'
		},
		{
			uri: 'docs://naming-convention',
			name: 'Naming Conventions',
			description: 'File, variable, and component naming standards',
			mimeType: 'text/markdown'
		},
		// Component documentation
		...components.map((component) => ({
			uri: `docs://components/${component}`,
			name: `${component} Component`,
			description: `Documentation for ${component} component`,
			mimeType: 'text/markdown'
		}))
	];

	return { resources };
}

function handleReadResource(
	request: ReadResourceRequest
): ReadResourceResult | Promise<ReadResourceResult> {
	const uri = request.params.uri;

	if (!uri.startsWith('docs://')) {
		throw new Error('Invalid URI format');
	}

	const path = uri.replace('docs://', '');

	// For component docs, use llms.txt endpoint
	if (path.startsWith('components/')) {
		const componentName = path.replace('components/', '');
		return readDocFromEndpoint(`/docs/components/${componentName}/llms.txt`).then((content) => {
			if (!content) {
				throw new Error('Resource not found');
			}
			return {
				contents: [
					{
						uri,
						mimeType: 'text/plain',
						text: content
					}
				]
			};
		});
	}

	// For other docs, read from file
	const content = readDocFile(`${path}.md`);
	if (!content) {
		throw new Error('Resource not found');
	}

	return {
		contents: [
			{
				uri,
				mimeType: 'text/markdown',
				text: content
			}
		]
	};
}

function handleListTools(): ListToolsResult {
	return {
		tools: [
			{
				name: 'get_component_info',
				description:
					'Get detailed information about a specific component including API, usage, and examples',
				inputSchema: {
					type: 'object',
					properties: {
						componentName: {
							type: 'string',
							description: 'The name of the component (e.g., "button", "dropdown", "accordion")'
						}
					},
					required: ['componentName']
				}
			},
			{
				name: 'list_components',
				description: 'List all available components in the library with brief descriptions',
				inputSchema: {
					type: 'object',
					properties: {
						category: {
							type: 'string',
							description: 'Optional category filter (e.g., "form", "layout", "overlay")',
							enum: ['all', 'form', 'layout', 'overlay', 'data', 'navigation']
						}
					}
				}
			},
			{
				name: 'get_quick_start',
				description: 'Get quick start guide for using the library',
				inputSchema: {
					type: 'object',
					properties: {}
				}
			},
			{
				name: 'search_patterns',
				description: 'Search for common implementation patterns',
				inputSchema: {
					type: 'object',
					properties: {
						query: {
							type: 'string',
							description: 'Search query (e.g., "form validation", "modal dialog", "dropdown menu")'
						}
					},
					required: ['query']
				}
			}
		]
	};
}

function handleCallTool(request: CallToolRequest): CallToolResult | Promise<CallToolResult> {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'get_component_info': {
			const componentName = args?.componentName?.toLowerCase();
			if (!componentName) {
				throw new Error('componentName is required');
			}

			// Fetch from llms.txt endpoint
			return readDocFromEndpoint(`/docs/components/${componentName}/llms.txt`).then((content) => {
				if (!content) {
					return {
						content: [
							{
								type: 'text',
								text: `Component "${componentName}" not found. Use list_components to see available components.`
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
			});
		}

		case 'list_components': {
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

		case 'get_quick_start': {
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

		case 'search_patterns': {
			const query = args?.query?.toLowerCase();
			if (!query) {
				throw new Error('query is required');
			}

			const patterns = readDocFile('common-patterns.md');

			return {
				content: [
					{
						type: 'text',
						text: `# Common Patterns\n\nSearching for: "${query}"\n\n${patterns}`
					}
				]
			};
		}

		default:
			throw new Error(`Unknown tool: ${name}`);
	}
}

function handleListPrompts(): ListPromptsResult {
	return {
		prompts: [
			{
				name: 'create_component',
				description: 'Generate a new component using @svelte-atoms/core',
				arguments: [
					{
						name: 'componentType',
						description: 'Type of component to create (e.g., "form", "button", "dialog")',
						required: true
					},
					{
						name: 'features',
						description: 'Specific features or requirements',
						required: false
					}
				]
			},
			{
				name: 'fix_component',
				description: 'Help fix issues with an existing component',
				arguments: [
					{
						name: 'code',
						description: 'The component code with issues',
						required: true
					},
					{
						name: 'issue',
						description: 'Description of the issue',
						required: true
					}
				]
			},
			{
				name: 'improve_component',
				description: 'Suggest improvements for a component',
				arguments: [
					{
						name: 'code',
						description: 'The component code to improve',
						required: true
					}
				]
			}
		]
	};
}

function handleGetPrompt(request: GetPromptRequest): GetPromptResult {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'create_component': {
			const componentType = args?.componentType || 'component';
			const features = args?.features || 'standard functionality';

			return {
				messages: [
					{
						role: 'user',
						content: {
							type: 'text',
							text: `Create a ${componentType} component using @svelte-atoms/core library with the following features: ${features}\n\nFollow these guidelines:\n1. Use Svelte 5 syntax with runes ($state, $derived, $effect)\n2. Import components from @svelte-atoms/core\n3. Use proper TypeScript types\n4. Follow kebab-case for file names\n5. Include accessibility features\n6. Add inline code comments\n\nProvide complete, working code.`
						}
					}
				]
			};
		}

		case 'fix_component': {
			const code = args?.code || '';
			const issue = args?.issue || 'unknown issue';

			return {
				messages: [
					{
						role: 'user',
						content: {
							type: 'text',
							text: `Fix the following component from @svelte-atoms/core:\n\nIssue: ${issue}\n\nCode:\n\`\`\`svelte\n${code}\n\`\`\`\n\nProvide the corrected code following @svelte-atoms/core best practices.`
						}
					}
				]
			};
		}

		case 'improve_component': {
			const code = args?.code || '';

			return {
				messages: [
					{
						role: 'user',
						content: {
							type: 'text',
							text: `Improve the following component using @svelte-atoms/core best practices:\n\n\`\`\`svelte\n${code}\n\`\`\`\n\nSuggestions should include:\n1. Better use of library features\n2. Performance optimizations\n3. Accessibility improvements\n4. Code organization\n5. TypeScript type safety`
						}
					}
				]
			};
		}

		default:
			throw new Error(`Unknown prompt: ${name}`);
	}
}

// SvelteKit handlers that bridge HTTP to MCP

interface MCPRequest {
	jsonrpc: string;
	id?: string | number;
	method: string;
	params?: any;
}

interface MCPResponse {
	jsonrpc: string;
	id?: string | number;
	result?: any;
	error?: {
		code: number;
		message: string;
	};
}

function handleMCPRequest(request: MCPRequest): MCPResponse | Promise<MCPResponse> {
	const response: MCPResponse = {
		jsonrpc: '2.0',
		id: request.id
	};

	try {
		switch (request.method) {
			case 'initialize':
				response.result = handleInitialize();
				return response;

			case 'resources/list':
				response.result = handleListResources();
				return response;

			case 'resources/read': {
				const result = handleReadResource(request as any);
				if (result instanceof Promise) {
					return result
						.then((res) => {
							response.result = res;
							return response;
						})
						.catch((error) => {
							response.error = {
								code: error.code || -32603,
								message: error.message || 'Internal error'
							};
							return response;
						});
				}
				response.result = result;
				return response;
			}

			case 'tools/list':
				response.result = handleListTools();
				return response;

			case 'tools/call': {
				const result = handleCallTool(request as any);
				if (result instanceof Promise) {
					return result
						.then((res) => {
							response.result = res;
							return response;
						})
						.catch((error) => {
							response.error = {
								code: error.code || -32603,
								message: error.message || 'Internal error'
							};
							return response;
						});
				}
				response.result = result;
				return response;
			}

			case 'prompts/list':
				response.result = handleListPrompts();
				return response;

			case 'prompts/get':
				response.result = handleGetPrompt(request as any);
				return response;

			default:
				response.error = {
					code: -32601,
					message: `Method not found: ${request.method}`
				};
				return response;
		}
	} catch {
		response.error = {
			code: error.code || -32603,
			message: error.message || 'Internal error'
		};
		return response;
	}
}

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		// Set base URL from request context
		baseUrl = `${url.protocol}//${url.host}`;

		const body = await request.json();
		const mcpResponse = await Promise.resolve(handleMCPRequest(body));
		return json(mcpResponse);
	} catch (error) {
		return json(
			{
				jsonrpc: '2.0',
				error: {
					code: -32700,
					message: 'Parse error',
					data: error.message
				}
			},
			{ status: 400 }
		);
	}
};

// SvelteKit GET handler - returns server info
export const GET: RequestHandler = async () => {
	return json({
		name: SERVER_NAME,
		version: SERVER_VERSION,
		protocol: 'MCP/1.0',
		description: 'Model Context Protocol server for @svelte-atoms/core component library',
		sdk: '@modelcontextprotocol/sdk (types)',
		endpoints: {
			mcp: '/mcp (POST)'
		},
		capabilities: [
			'resources (documentation)',
			'tools (component info, search)',
			'prompts (code generation)'
		]
	});
};
